def buildInitiator() {
    try {
        def githubCauses = currentBuild.getBuildCauses('com.cloudbees.jenkins.GitHubPushCause')
        if (githubCauses && githubCauses[0].pushedBy) {
            return githubCauses[0].pushedBy
        }

        def userCauses = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')
        if (userCauses && userCauses[0].userName) {
            return userCauses[0].userName
        }

        def causes = currentBuild.getBuildCauses()
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
    def stages = ['Checkout', 'Validate', 'Build', 'Security scan', 'AI review', 'Deploy', 'Smoke test']
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
    }

    stages {
        stage('Notify start') {
            steps {
                script {
                    env.STAGE_INDEX = '0'
                    env.SECURITY_SUMMARY = '⏳ ожидается проверка'
                    env.AI_REVIEW_UNSTABLE = 'false'
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
                        url: 'git@github.com:wilpdrake/market-backend'
                }

                dir('market-frontend') {
                    git branch: 'main',
                        url: 'git@github.com:yushiri/market-order.git'
                }

                script {
                    env.GIT_SUMMARY = [
                        gitRevisionLine('market-infrastructure', 'Wilpdrake/market-infrastructure'),
                        gitRevisionLine('market-backend', 'wilpdrake/market-backend'),
                        gitRevisionLine('market-frontend', 'yushiri/market-order'),
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
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml config --quiet'
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
                        env.SECURITY_SUMMARY = "Trivy: critical ${parts[0]}, high ${parts[1]}, medium ${parts[2]}, secrets ${parts[3]}, misconfig ${parts[4]}\nLaguna XS 2.1: ⏳ ожидается"
                        if (parts[0].toInteger() > 0 || parts[3].toInteger() > 0) {
                            error("Security gate failed: ${parts[0]} critical vulnerabilities, ${parts[3]} secrets")
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
                        sh 'chmod +x scripts/jenkins_ai_security_review.sh && timeout 4m scripts/jenkins_ai_security_review.sh "$WORKSPACE"'
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
                                    | sed 's/^AI_SECURITY_SUMMARY: /Laguna XS 2.1: /' \
                                    || printf 'Laguna XS 2.1: INCONCLUSIVE\n'
                            else
                                printf 'Laguna XS 2.1: INCONCLUSIVE\n'
                            fi
                        '''
                    ).trim()
                    env.SECURITY_SUMMARY = env.SECURITY_SUMMARY.replace('Laguna XS 2.1: ⏳ ожидается', aiSummary)
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    env.STAGE_INDEX = '5'
                    telegramProgress(5)
                }
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans'
                }
            }
        }

        stage('Smoke test') {
            steps {
                script {
                    env.STAGE_INDEX = '6'
                    telegramProgress(6)
                }
                sh '''
                    set -eu
                    for attempt in $(seq 1 30); do
                        if curl -fsS http://127.0.0.1/ >/dev/null; then
                            exit 0
                        fi
                        sleep 2
                    done

                    echo "Production smoke test failed" >&2
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
            script { telegramProgress(6, 'SUCCESS') }
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
