#!/usr/bin/env bash
set -euo pipefail
set +x

WORKSPACE_ROOT="${1:-${WORKSPACE:-}}"
if [[ -z "$WORKSPACE_ROOT" ]]; then
    echo 'Workspace path is required' >&2
    exit 2
fi

REPORTS_DIR="$WORKSPACE_ROOT/market-infrastructure/reports"
TRIVY_REPORT="$REPORTS_DIR/trivy.json"
AI_REPORT="$REPORTS_DIR/ai-security-review.md"
OUTPUT_FILE="$REPORTS_DIR/security-report.txt"
mkdir -p "$REPORTS_DIR"

{
    echo 'MARKET SECURITY REPORT'
    printf 'Jenkins: %s #%s\n' "${JOB_NAME:-market}" "${BUILD_NUMBER:-unknown}"
    printf 'Result at report time: %s\n' "${BUILD_RESULT:-${currentBuild:-unknown}}"
    printf 'Generated (UTC): %s\n\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"

    echo '=== TRIVY SUMMARY ==='
    if [[ -s "$TRIVY_REPORT" ]] && jq -e . "$TRIVY_REPORT" >/dev/null 2>&1; then
        jq -r '
            [(.Results[]?.Vulnerabilities[]? | .Severity)] as $v |
            [(.Results[]?.Secrets[]?)] as $s |
            [(.Results[]?.Misconfigurations[]? | select(.Status != "PASS"))] as $m |
            {
                critical: ([$v[] | select(. == "CRITICAL")] | length),
                high: ([$v[] | select(. == "HIGH")] | length),
                medium: ([$v[] | select(. == "MEDIUM")] | length),
                low: ([$v[] | select(. == "LOW")] | length),
                secrets: ($s | length),
                misconfigurations: ($m | length)
            } |
            "Critical: \(.critical)\nHigh: \(.high)\nMedium: \(.medium)\nLow: \(.low)\nSecrets: \(.secrets)\nMisconfigurations: \(.misconfigurations)"
        ' "$TRIVY_REPORT"

        echo
        echo '=== CRITICAL/HIGH VULNERABILITIES (max 100) ==='
        jq -r '
            [
                .Results[]? as $result
                | $result.Vulnerabilities[]?
                | select(.Severity == "CRITICAL" or .Severity == "HIGH")
                | [.Severity, .VulnerabilityID, .PkgName, .InstalledVersion, (.FixedVersion // "not fixed"), $result.Target]
            ][:100][]
            | @tsv
        ' "$TRIVY_REPORT" | while IFS=$'\t' read -r severity id package installed fixed target; do
            printf '%s | %s | %s %s | fixed: %s | %s\n' \
                "$severity" "$id" "$package" "$installed" "$fixed" "$target"
        done

        echo
        echo '=== SECRET FINDINGS (metadata only; no secret values) ==='
        jq -r '
            [
                .Results[]? as $result
                | $result.Secrets[]?
                | [(.Severity // "UNKNOWN"), (.RuleID // "unknown"), (.Title // "Secret finding"), $result.Target]
            ][:100][]
            | @tsv
        ' "$TRIVY_REPORT" | while IFS=$'\t' read -r severity rule title target; do
            printf '%s | %s | %s | %s\n' "$severity" "$rule" "$title" "$target"
        done

        echo
        echo '=== MISCONFIGURATIONS (max 100) ==='
        jq -r '
            [
                .Results[]? as $result
                | $result.Misconfigurations[]?
                | select(.Status != "PASS")
                | [(.Severity // "UNKNOWN"), (.ID // "unknown"), (.Title // "Misconfiguration"), $result.Target]
            ][:100][]
            | @tsv
        ' "$TRIVY_REPORT" | while IFS=$'\t' read -r severity id title target; do
            printf '%s | %s | %s | %s\n' "$severity" "$id" "$title" "$target"
        done
    else
        echo 'Trivy report is unavailable or invalid.'
    fi

    echo
    echo '=== TENCENT HY3 AI REVIEW ==='
    if [[ -s "$AI_REPORT" ]]; then
        sed -n '1,1200p' "$AI_REPORT"
    else
        echo 'AI report is unavailable.'
    fi
} > "$OUTPUT_FILE"

if [[ -z "${TELEGRAM_BOT_TOKEN:-}" ]]; then
    echo "Security report created at $OUTPUT_FILE; Telegram token is unavailable" >&2
    exit 1
fi

chat_id="${TELEGRAM_CHAT_ID:--1003815110768}"
thread_id="${TELEGRAM_THREAD_ID:-278}"
message_id="${TELEGRAM_MESSAGE_ID_VALUE:-}"
response_file="$(mktemp)"
trap 'rm -f "$response_file"' EXIT

curl_args=(
    --silent --show-error
    --output "$response_file"
    --write-out '%{http_code}'
    --connect-timeout 10
    --max-time 60
    --request POST
    --form-string "chat_id=$chat_id"
    --form-string "message_thread_id=$thread_id"
    --form-string "caption=Security report: ${JOB_NAME:-market} #${BUILD_NUMBER:-unknown}"
    --form "document=@${OUTPUT_FILE};filename=security-report-${BUILD_NUMBER:-unknown}.txt;type=text/plain"
)

if [[ "$message_id" =~ ^[0-9]+$ ]]; then
    curl_args+=(--form-string "reply_parameters={\"message_id\":${message_id}}")
fi

http_code="$(curl "${curl_args[@]}" "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument")"
if [[ "$http_code" != '200' ]] || ! grep -q '"ok":true' "$response_file"; then
    echo "Telegram security report upload failed (HTTP $http_code)" >&2
    exit 1
fi

printf 'Security report created and sent: %s\n' "$OUTPUT_FILE"
