def telegramNotify(String icon, String title, String details = '') {
    try {
        def duration = currentBuild.durationString?.replace(' and counting', '') ?: '0 sec'
        def stageName = env.LAST_STAGE ?: 'Initialization'
        def message = "${icon} ${title}\n" +
            "Job: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n" +
            "Stage: ${stageName}\n" +
            "Duration: ${duration}\n" +
            (details ? "${details}\n" : '') +
            "URL: ${env.BUILD_URL}"

        withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TELEGRAM_BOT_TOKEN')]) {
            withEnv(["TELEGRAM_MESSAGE=${message}"]) {
                int rc = sh(
                    label: 'Send Telegram notification',
                    returnStatus: true,
                    script: '''
                        set +x
                        response_file="$(mktemp)"
                        trap 'rm -f "$response_file"' EXIT

                        http_code="$(curl -sS -o "$response_file" -w '%{http_code}' \
                            --connect-timeout 10 --max-time 20 \
                            --request POST \
                            --data-urlencode "chat_id=-1003815110768" \
                            --data-urlencode "message_thread_id=278" \
                            --data-urlencode "disable_web_page_preview=true" \
                            --data-urlencode "text=${TELEGRAM_MESSAGE}" \
                            "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage")"

                        if [ "$http_code" != '200' ] || ! grep -q '"ok":true' "$response_file"; then
                            echo "Telegram notification failed (HTTP ${http_code})" >&2
                            exit 1
                        fi
                    '''
                )
                if (rc != 0) {
                    echo "Telegram notification failed with exit code ${rc}; pipeline continues."
                }
            }
        }
    } catch (Exception err) {
        echo "Telegram notification error: ${err.getMessage()}; pipeline continues."
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
        // Сохраняет имя уже развёрнутого Compose-проекта и его volumes/network.
        COMPOSE_PROJECT_NAME = 'market'

        POSTGRES_USER = credentials('postgres-user')
        POSTGRES_PASSWORD = credentials('postgres-password')
        POSTGRES_DB = credentials('postgres-db')

        LAST_STAGE = 'Initialization'
    }

    stages {
        stage('Notify start') {
            steps {
                script {
                    env.LAST_STAGE = 'Pipeline started'
                    telegramNotify('🚀', 'Build started')
                }
            }
        }

        stage('Checkout') {
            steps {
                script { env.LAST_STAGE = 'Checkout' }
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
                    def revisions = sh(
                        returnStdout: true,
                        script: '''
                            printf 'Infrastructure: %s\n' "$(git -C market-infrastructure rev-parse --short HEAD)"
                            printf 'Backend: %s\n' "$(git -C market-backend rev-parse --short HEAD)"
                            printf 'Frontend: %s' "$(git -C market-frontend rev-parse --short HEAD)"
                        '''
                    ).trim()
                    telegramNotify('📦', 'Checkout completed', revisions)
                }
            }
        }

        stage('Validate') {
            steps {
                script { env.LAST_STAGE = 'Validate' }
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml config --quiet'
                }
                script { telegramNotify('✅', 'Compose validation passed') }
            }
        }

        stage('Build') {
            steps {
                script { env.LAST_STAGE = 'Build images' }
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml build'
                }
                script { telegramNotify('🏗️', 'Docker images built') }
            }
        }

        stage('Deploy') {
            steps {
                script { env.LAST_STAGE = 'Deploy' }
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans'
                }
                script { telegramNotify('🚢', 'Deployment completed') }
            }
        }

        stage('Smoke test') {
            steps {
                script { env.LAST_STAGE = 'Smoke test' }
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
                script { telegramNotify('🩺', 'Production smoke test passed') }
            }
        }
    }

    post {
        success {
            script { telegramNotify('🎉', 'Build succeeded', 'Production is healthy.') }
        }
        failure {
            script {
                telegramNotify('❌', 'Build failed', "Failed stage: ${env.LAST_STAGE}\nProduction containers were left running for investigation.")
            }
        }
        unstable {
            script { telegramNotify('⚠️', 'Build is unstable') }
        }
        aborted {
            script { telegramNotify('⛔', 'Build aborted') }
        }
    }
}
