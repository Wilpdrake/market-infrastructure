// TODO Refactor


def githubPusherFromCauses(causes) {
    for (def cause : causes ?: []) {
        if (cause.pushedBy) {
            return cause.pushedBy
        }

        def upstreamPusher = githubPusherFromCauses(cause.upstreamCauses)
        if (upstreamPusher) {
            return upstreamPusher
        }
    }

    return null
}

def buildInitiator() {
    try {
        def causes = currentBuild.getBuildCauses()
        def githubPusher = githubPusherFromCauses(causes)
        if (githubPusher) {
            return githubPusher
        }

        def userCauses = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')
        if (userCauses && userCauses[0].userName) {
            return userCauses[0].userName
        }

        if (causes && causes[0].shortDescription) {
            def description = causes[0].shortDescription
            def githubPrefix = 'Started by GitHub push by '
            return description.startsWith(githubPrefix)
                ? description.substring(githubPrefix.length())
                : description
        }
    } catch (Exception err) {
        echo "Cannot determine build initiator: ${err.getMessage()}"
    }

    return 'Неизвестно'
}

def gitRevisionLine(String path, String repository) {
    dir(path) {
        withEnv(["GIT_REPOSITORY=${repository}"]) {
            return sh(
                label: "Read ${repository} revision",
                returnStdout: true,
                script: '''
                    set -eu
                    branch="$(git branch --show-current)"
                    if [ -z "$branch" ]; then
                        branch="$(git name-rev --name-only HEAD)"
                        branch="${branch#remotes/origin/}"
                        branch="${branch#origin/}"
                    fi
                    commit="$(git rev-parse --short=8 HEAD)"
                    subject="$(git log -1 --pretty=%s | cut -c1-100)"
                    printf '• %s\n  %s · %s — %s\n' "$GIT_REPOSITORY" "$branch" "$commit" "$subject"
                '''
            ).trim()
        }
    }
}

def telegramProgress(int stageIndex, String state = 'RUNNING') {
    def stages = ['Checkout', 'Validate', 'Build', 'Security scan', 'AI review', 'Security gate', 'Deploy', 'Smoke test']
    def advisoryAiFailure = state == 'UNSTABLE' && env.AI_REVIEW_UNSTABLE == 'true'
    def currentStage = state == 'SUCCESS'
        ? 'Completed'
        : advisoryAiFailure
            ? 'AI review (advisory)'
            : stages[stageIndex]
    def status = [
        RUNNING: '🔄 Выполняется',
        SUCCESS: '✅ Успешно',
        FAILURE: '❌ Ошибка',
        UNSTABLE: '⚠️ Нестабильно',
        ABORTED: '⛔ Остановлено',
    ][state]
    def stageLines = []
    for (int index = 0; index < stages.size(); index++) {
        def marker
        if (advisoryAiFailure) {
            marker = index == 4 ? '⚠️' : index <= stageIndex ? '✅' : '⏳'
        } else {
            marker = state == 'SUCCESS' || index < stageIndex
                ? '✅'
                : index == stageIndex
                    ? (state == 'RUNNING' ? '🔄' : state == 'ABORTED' ? '⛔' : state == 'UNSTABLE' ? '⚠️' : '❌')
                    : '⏳'
        }
        stageLines.add("${marker} ${stages[index]}")
    }
    def stageList = stageLines.join('\n')
    def initiator = buildInitiator()
    def gitSummary = env.GIT_SUMMARY ?: '⏳ ожидается checkout'
    def securitySummary = env.SECURITY_SUMMARY ?: '⏳ ожидается проверка'
    def message = "🛠 Jenkins ${env.JOB_NAME} #${env.BUILD_NUMBER}\n" +
        "Инициатор: ${initiator}\n" +
        "Статус: ${status}\n" +
        "Текущая стадия: ${currentStage}\n\n" +
        "Git:\n${gitSummary}\n\n" +
        "Безопасность:\n${securitySummary}\n\n" +
        "Стадии:\n${stageList}"

    try {
        withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_BOT_TOKEN')]) {
            withEnv([
                "TELEGRAM_MESSAGE=${message}",
                "TELEGRAM_MESSAGE_ID_VALUE=${env.TELEGRAM_MESSAGE_ID ?: ''}",
            ]) {
                def messageId = sh(
                    label: 'Update Telegram build status',
                    returnStdout: true,
                    script: '''
                        set +x
                        response_file="$(mktemp)"
                        trap 'rm -f "$response_file"' EXIT

                        if [ -n "$TELEGRAM_MESSAGE_ID_VALUE" ]; then
                            method='editMessageText'
                            message_id_args="--data-urlencode message_id=${TELEGRAM_MESSAGE_ID_VALUE}"
                        else
                            method='sendMessage'
                            message_id_args=''
                        fi

                        # shellcheck disable=SC2086
                        http_code="$(curl -sS -o "$response_file" -w '%{http_code}' \
                            --connect-timeout 10 --max-time 20 \
                            --request POST \
                            --data-urlencode 'chat_id=-1003815110768' \
                            --data-urlencode 'message_thread_id=278' \
                            --data-urlencode "text=${TELEGRAM_MESSAGE}" \
                            $message_id_args \
                            "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}")"

                        if [ "$http_code" != '200' ] || ! grep -q '"ok":true' "$response_file"; then
                            echo "Telegram update failed (HTTP ${http_code})" >&2
                            exit 1
                        fi

                        if [ -n "$TELEGRAM_MESSAGE_ID_VALUE" ]; then
                            printf '%s\n' "$TELEGRAM_MESSAGE_ID_VALUE"
                        else
                            jq -r '.result.message_id // empty' "$response_file"
                        fi
                    '''
                ).trim()

                if (messageId ==~ /[0-9]+/) {
                    env.TELEGRAM_MESSAGE_ID = messageId
                } else {
                    echo 'Telegram returned no message ID; the pipeline continues.'
                }
            }
        }
    } catch (Exception err) {
        echo "Telegram update error: ${err.getMessage()}; the pipeline continues."
    }
}

def telegramSecurityReport() {
    try {
        withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_BOT_TOKEN')]) {
            withEnv([
                "TELEGRAM_MESSAGE_ID_VALUE=${env.TELEGRAM_MESSAGE_ID ?: ''}",
                "BUILD_RESULT=${currentBuild.currentResult}",
            ]) {
                sh(
                    label: 'Send Telegram security report',
                    script: '''
                        set +x
                        chmod +x market-infrastructure/scripts/jenkins_send_security_report.sh
                        market-infrastructure/scripts/jenkins_send_security_report.sh "$WORKSPACE"
                    '''
                )
            }
        }
    } catch (Exception err) {
        echo "Telegram security report error: ${err.getMessage()}; the pipeline continues."
    }
}

pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
    }

    triggers {
        githubPush()
    }

    environment {
        COMPOSE_PROJECT_NAME = 'market'
        POSTGRES_USER = credentials('postgres-user')
        POSTGRES_PASSWORD = credentials('postgres-password')
        POSTGRES_DB = credentials('postgres-db')
        BACKEND_SECRET_KEY = credentials('backend-secret-key')
        FIRST_SUPERUSER_EMAIL = credentials('first-developer-email')
        FIRST_SUPERUSER_PASSWORD = credentials('first-developer-password')
        // Username and role are identifiers rather than secrets; passwords and keys remain
        // Jenkins Secret text credentials and are never echoed into the build log.
        FIRST_SUPERUSER_USERNAME = 'wilpdrake'
        FIRST_SUPERUSER_ROLE = 'developer'
    }

    stages {
        stage('Notify start') {
            steps {
                script {
                    env.STAGE_INDEX = '0'
                    env.SECURITY_SUMMARY = '⏳ ожидается проверка'
                    env.AI_REVIEW_UNSTABLE = 'false'
                    env.SECURITY_GATE_BLOCKED = 'false'
                    env.SECURITY_GATE_REASON = ''
                    telegramProgress(0)
                }
            }
        }

        stage('Checkout') {
            steps {
                script { env.STAGE_INDEX = '0' }
                deleteDir()

                dir('market-infrastructure') {
                    checkout scm
                }

                dir('market-backend') {
                    git branch: 'main',
                        url: 'git@github.com:Wilpdrake/market-backend.git'
                }

                dir('market-frontend') {
                    git branch: 'main',
                        url: 'git@github.com:yushiri/market-order.git'
                }

                dir('market-bot') {
                    git branch: 'main',
                        url: 'git@github.com:Wilpdrake/market-bot.git'
                }

                script {
                    env.GIT_SUMMARY = [
                        gitRevisionLine('market-infrastructure', 'Wilpdrake/market-infrastructure'),
                        gitRevisionLine('market-backend', 'wilpdrake/market-backend'),
                        gitRevisionLine('market-frontend', 'yushiri/market-order'),
                        gitRevisionLine('market-bot', 'wilpdrake/market-bot'),
                    ].join('\n')
                }
            }
        }

        stage('Validate') {
            steps {
                script {
                    env.STAGE_INDEX = '1'
                    telegramProgress(1)
                }
                dir('market-infrastructure') {
                    sh '''
                        set -eu
                        docker compose -f docker-compose.yml -f docker-compose.prod.yml config --quiet

                        # Build isolated CI targets so Jenkins does not need project-specific
                        # Python or Node tooling installed on the host.
                        docker build --target development -t market-backend-ci ../market-backend
                        docker run --rm market-backend-ci uv run ruff check app tests alembic
                        docker run --rm market-backend-ci uv run mypy app
                        docker run --rm market-backend-ci uv run pytest -q

                        docker build --target development -t market-bot-ci ../market-bot
                        docker run --rm market-bot-ci uv run --no-sync ruff check src tests
                        docker run --rm market-bot-ci uv run --no-sync ruff format --check src tests
                        docker run --rm market-bot-ci uv run --no-sync mypy
                        docker run --rm market-bot-ci uv run --no-sync pytest -q

                        docker build --target test -t market-frontend-ci ../market-frontend
                        docker run --rm market-frontend-ci npm run lint
                        docker run --rm market-frontend-ci npm run type-check
                        docker run --rm market-frontend-ci npm test
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    env.STAGE_INDEX = '2'
                    telegramProgress(2)
                }
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml build'
                }
            }
        }

        stage('Security scan') {
            steps {
                script {
                    env.STAGE_INDEX = '3'
                    telegramProgress(3)
                }
                dir('market-infrastructure') {
                    sh '''
                        set -eu
                        mkdir -p reports
                        docker run --rm \
                            -v "$WORKSPACE:/workspace:ro" \
                            -v "$WORKSPACE/market-infrastructure/reports:/reports" \
                            -v market-trivy-cache:/root/.cache/trivy \
                            aquasec/trivy:0.66.0@sha256:086971aaf400beebd94e8300fd8ea623774419597169156cec56eec5b00dfb1e fs \
                            --scanners vuln,secret,misconfig \
                            --quiet \
                            --skip-version-check \
                            --format json \
                            --output /reports/trivy.json \
                            --skip-dirs /workspace/market-infrastructure/.git \
                            --skip-dirs /workspace/market-backend/.git \
                            --skip-dirs /workspace/market-frontend/.git \
                            --skip-dirs /workspace/market-bot/.git \
                            /workspace
                    '''
                    script {
                        def counts = sh(
                            label: 'Summarize deterministic security findings',
                            returnStdout: true,
                            script: '''
                                set -eu
                                jq -r '
                                    [(.Results[]?.Vulnerabilities[]? | .Severity)] as $v |
                                    [(.Results[]?.Secrets[]?)] as $s |
                                    [(.Results[]?.Misconfigurations[]? | select(.Status != "PASS"))] as $m |
                                    "\\([$v[] | select(. == "CRITICAL")] | length)|" +
                                    "\\([$v[] | select(. == "HIGH")] | length)|" +
                                    "\\([$v[] | select(. == "MEDIUM")] | length)|" +
                                    "\\($s | length)|\\($m | length)"
                                ' reports/trivy.json
                            '''
                        ).trim()
                        def parts = counts.tokenize('|')
                        if (parts.size() != 5) {
                            error("Unexpected Trivy summary: ${counts}")
                        }
                        env.SECURITY_SUMMARY = "Trivy: critical ${parts[0]}, high ${parts[1]}, medium ${parts[2]}, secrets ${parts[3]}, misconfig ${parts[4]}\nNous Laguna: ⏳ ожидается"
                        if (parts[0].toInteger() > 0 || parts[3].toInteger() > 0) {
                            env.SECURITY_GATE_BLOCKED = 'true'
                            env.SECURITY_GATE_REASON = "${parts[0]} critical vulnerabilities, ${parts[3]} secrets"
                        }
                    }
                }
            }
        }

        stage('AI review') {
            steps {
                script {
                    env.STAGE_INDEX = '4'
                    telegramProgress(4)
                }
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    dir('market-infrastructure') {
                        sh '''
                            set +x
                            chmod +x scripts/jenkins_ai_security_review.sh
                            timeout 4m scripts/jenkins_ai_security_review.sh "$WORKSPACE"
                        '''
                    }
                }
                script {
                    if (currentBuild.currentResult == 'UNSTABLE') {
                        env.AI_REVIEW_UNSTABLE = 'true'
                    }
                    def aiSummary = sh(
                        label: 'Read Laguna security summary',
                        returnStdout: true,
                        script: '''
                            report="$WORKSPACE/market-infrastructure/reports/ai-security-review.md"
                            if [ -f "$report" ]; then
                                grep -m1 '^AI_SECURITY_SUMMARY:' "$report" \
                                    | sed 's/^AI_SECURITY_SUMMARY: /Nous Laguna: /' \
                                    || printf 'Nous Laguna: INCONCLUSIVE\n'
                            else
                                printf 'Nous Laguna: INCONCLUSIVE\n'
                            fi
                        '''
                    ).trim()
                    env.SECURITY_SUMMARY = env.SECURITY_SUMMARY.replace('Nous Laguna: ⏳ ожидается', aiSummary)
                }
            }
        }

        stage('Security gate') {
            steps {
                script {
                    env.STAGE_INDEX = '5'
                    telegramProgress(5)
                    if (env.SECURITY_GATE_BLOCKED == 'true') {
                        error("Security gate failed: ${env.SECURITY_GATE_REASON}")
                    }
                }
            }
        }

        stage('Deploy') {
            environment {
                TELEGRAM_BOT_TOKEN = credentials('telegram-bot-token')
            }
            steps {
                script {
                    env.STAGE_INDEX = '6'
                    telegramProgress(6)
                }
                dir('market-infrastructure') {
                    sh '''
                        set +x
                        set -eu
                        umask 077
                        trap 'rm -f .env' EXIT

                        test "${#BACKEND_SECRET_KEY}" -ge 16 || {
                            echo 'BACKEND_SECRET_KEY must contain at least 16 characters' >&2
                            exit 1
                        }
                        test "${#FIRST_SUPERUSER_PASSWORD}" -ge 8 || {
                            echo 'FIRST_SUPERUSER_PASSWORD must contain at least 8 characters' >&2
                            exit 1
                        }
                        test -n "$TELEGRAM_BOT_TOKEN" || {
                            echo 'TELEGRAM_BOT_TOKEN must not be empty' >&2
                            exit 1
                        }
                        case "$FIRST_SUPERUSER_EMAIL" in
                            *@*) ;;
                            *) echo 'FIRST_SUPERUSER_EMAIL must be an email address' >&2; exit 1 ;;
                        esac

                        quote_env() {
                            jq -Rrn --arg value "$1" '$value | @json'
                        }

                        {
                            printf 'POSTGRES_USER=%s\n' "$(quote_env "$POSTGRES_USER")"
                            printf 'POSTGRES_PASSWORD=%s\n' "$(quote_env "$POSTGRES_PASSWORD")"
                            printf 'POSTGRES_DB=%s\n' "$(quote_env "$POSTGRES_DB")"
                            printf 'BACKEND_SECRET_KEY=%s\n' "$(quote_env "$BACKEND_SECRET_KEY")"
                            printf 'FIRST_SUPERUSER_EMAIL=%s\n' "$(quote_env "$FIRST_SUPERUSER_EMAIL")"
                            printf 'FIRST_SUPERUSER_USERNAME=%s\n' "$(quote_env "$FIRST_SUPERUSER_USERNAME")"
                            printf 'FIRST_SUPERUSER_ROLE=%s\n' "$(quote_env "$FIRST_SUPERUSER_ROLE")"
                            printf 'FIRST_SUPERUSER_PASSWORD=%s\n' "$(quote_env "$FIRST_SUPERUSER_PASSWORD")"
                            printf 'FIRST_SUPERUSER_NAME=%s\n' 'Admin'
                            printf 'FIRST_SUPERUSER_SURNAME=%s\n' 'Administrator'
                            printf 'TELEGRAM_BOT_TOKEN=%s\n' "$(quote_env "$TELEGRAM_BOT_TOKEN")"
                            printf 'BOT_LOG_LEVEL=%s\n' 'INFO'
                        } > .env

                        test "$(stat -c '%a' .env)" = '600'
                        tls_cert_path=${CLOUDFLARE_ORIGIN_CERT_PATH:-/etc/market/tls/cloudflare-origin.pem}
                        tls_key_path=${CLOUDFLARE_ORIGIN_KEY_PATH:-/etc/market/tls/cloudflare-origin.key}
                        test -f "$tls_cert_path" || {
                            echo "Cloudflare Origin Certificate is missing: $tls_cert_path" >&2
                            exit 1
                        }
                        test -f "$tls_key_path" || {
                            echo "Cloudflare Origin private key is missing: $tls_key_path" >&2
                            exit 1
                        }
                        # A one-shot container upgrades the schema before any new application
                        # container starts serving requests against it.
                        docker compose -f docker-compose.yml -f docker-compose.prod.yml run --rm backend alembic upgrade head
                        docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans
                        # nginx.conf is bind-mounted and upstream addresses are resolved when
                        # Nginx starts. Recreate only the proxy after application containers
                        # have converged so it loads the new config and current container IPs.
                        docker compose -f docker-compose.yml -f docker-compose.prod.yml \
                            up -d --no-deps --force-recreate nginx
                    '''
                }
            }
        }

        stage('Smoke test') {
            steps {
                script {
                    env.STAGE_INDEX = '7'
                    telegramProgress(7)
                }
                sh '''
                    set -eu
                    index_file=$(mktemp)
                    asset_file=$(mktemp)
                    trap 'rm -f "$index_file" "$asset_file"' EXIT
                    base_url=https://127.0.0.1
                    bot_stable_restarts=
                    bot_stable_since=0
                    for attempt in $(seq 1 30); do
                        bot_id=$(docker compose \
                            -f market-infrastructure/docker-compose.yml \
                            -f market-infrastructure/docker-compose.prod.yml \
                            ps -q bot 2>/dev/null || true)
                        bot_state=$(docker inspect \
                            --format '{{.State.Status}}|{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}|{{.RestartCount}}' \
                            "$bot_id" 2>/dev/null || true)
                        bot_status=${bot_state%%|*}
                        bot_state_tail=${bot_state#*|}
                        bot_health=${bot_state_tail%%|*}
                        bot_restarts=${bot_state##*|}
                        bot_ready=false
                        if test "$bot_status" = running \
                            && { test "$bot_health" = healthy || test "$bot_health" = none; }; then
                            now=$(date +%s)
                            if test "$bot_stable_restarts" != "$bot_restarts"; then
                                bot_stable_restarts=$bot_restarts
                                bot_stable_since=$now
                            elif test $((now - bot_stable_since)) -ge 10; then
                                bot_ready=true
                            fi
                        else
                            bot_stable_restarts=
                            bot_stable_since=0
                        fi
                        if test "$bot_ready" = true \
                            && curl -kfsS --connect-timeout 2 --max-time 5 \
                            "$base_url/" > "$index_file" \
                            && grep -qi '<div id="app"' "$index_file" \
                            && curl -kfsS --connect-timeout 2 --max-time 5 \
                            "$base_url/healthz" >/dev/null \
                            && curl -kfsS --connect-timeout 2 --max-time 5 \
                            "$base_url/admin" | grep -qi '<div id="app"' \
                            && curl -kfsS --connect-timeout 2 --max-time 5 \
                            "$base_url/api/v1/products" >/dev/null \
                            && curl -kfsS --connect-timeout 2 --max-time 5 \
                            "$base_url/openapi.json" \
                            | jq -e '.openapi and (.paths | has("/api/v1/health/live"))' \
                            >/dev/null; then
                            asset_path=$(
                                grep -oE '<script[^>]+src="[^"]+"' "$index_file" \
                                    | head -n 1 \
                                    | grep -oE 'src="[^"]+"' \
                                    | cut -d'"' -f2
                            )
                            admin_status=$(curl -ksS --connect-timeout 2 --max-time 5 \
                                -H 'Authorization: Bearer smoke-invalid-token' \
                                -o /dev/null -w '%{http_code}' \
                                "$base_url/api/v1/admin/auth/me" || true)
                            if test -n "$asset_path" \
                                && curl -kfsS --connect-timeout 2 --max-time 5 \
                                    "$base_url$asset_path" > "$asset_file" \
                                && grep -Eq '/admin/(signin|dashboard)' "$asset_file" \
                                && test "$admin_status" = '401'; then
                                exit 0
                            fi
                        fi
                        sleep 2
                    done

                    echo "Production smoke test failed" >&2
                    docker ps -a --filter 'name=market-' \
                        --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}' >&2
                    docker compose \
                        -f market-infrastructure/docker-compose.yml \
                        -f market-infrastructure/docker-compose.prod.yml \
                        logs --tail 100 bot >&2 || true
                    exit 1
                '''
            }
        }
    }

    post {
        always {
            script { telegramSecurityReport() }
            archiveArtifacts(
                artifacts: 'market-infrastructure/reports/**',
                allowEmptyArchive: true
            )
        }
        success {
            script { telegramProgress(7, 'SUCCESS') }
        }
        failure {
            script { telegramProgress(env.STAGE_INDEX.toInteger(), 'FAILURE') }
        }
        unstable {
            script { telegramProgress(env.STAGE_INDEX.toInteger(), 'UNSTABLE') }
        }
        aborted {
            script { telegramProgress(env.STAGE_INDEX.toInteger(), 'ABORTED') }
        }
    }
}
