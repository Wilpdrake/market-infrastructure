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
            return causes[0].shortDescription
        }
    } catch (Exception err) {
        echo "Cannot determine build initiator: ${err.getMessage()}"
    }

    return 'Неизвестно'
}

def telegramProgress(int stageIndex, String state = 'RUNNING') {
    def stages = ['Checkout', 'Validate', 'Build', 'Deploy', 'Smoke test']
    def currentStage = state == 'SUCCESS' ? 'Completed' : stages[stageIndex]
    def status = [
        RUNNING: '🔄 Выполняется',
        SUCCESS: '✅ Успешно',
        FAILURE: '❌ Ошибка',
        UNSTABLE: '⚠️ Нестабильно',
        ABORTED: '⛔ Остановлено',
    ][state]
    def stageLines = []
    for (int index = 0; index < stages.size(); index++) {
        def marker = state == 'SUCCESS' || index < stageIndex
            ? '✅'
            : index == stageIndex
                ? (state == 'RUNNING' ? '🔄' : state == 'ABORTED' ? '⛔' : '❌')
                : '⏳'
        stageLines.add("${marker} ${stages[index]}")
    }
    def stageList = stageLines.join('\n')
    def initiator = buildInitiator()
    def message = "🛠 Jenkins ${env.JOB_NAME} #${env.BUILD_NUMBER}\n" +
        "Инициатор: ${initiator}\n" +
        "Статус: ${status}\n" +
        "Текущая стадия: ${currentStage}\n\n" +
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
                script { telegramProgress(0) }
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

        stage('Deploy') {
            steps {
                script {
                    env.STAGE_INDEX = '3'
                    telegramProgress(3)
                }
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans'
                }
            }
        }

        stage('Smoke test') {
            steps {
                script {
                    env.STAGE_INDEX = '4'
                    telegramProgress(4)
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
        success {
            script { telegramProgress(4, 'SUCCESS') }
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
