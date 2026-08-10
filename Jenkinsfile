pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        POSTGRES_USER       = credentials('postgres-user')
        POSTGRES_PASSWORD   = credentials('postgres-password')
        POSTGRES_DB         = credentials('postgres-db')
        BACKEND_SECRET_KEY  = credentials('backend-secret-key')
        TBANK_TERMINAL_KEY  = credentials('tbank-terminal-key')
        TBANK_PASSWORD      = credentials('tbank-password')
        TBANK_API_URL       = 'https://securepay.tinkoff.ru/v2'
        TBANK_SUCCESS_URL   = 'https://woodandclay.ru/checkout/return'
        TBANK_FAIL_URL      = 'https://woodandclay.ru/checkout/return?payment=failed'
        TBANK_NOTIFICATION_URL = 'https://woodandclay.ru/api/v1/payments/tbank/webhook'

        // Primary (first) superuser bootstrap — consumed by the backend on startup.
        // Create these as Jenkins Secret Text credentials in each environment.
        FIRST_SUPERUSER_EMAIL    = credentials('first-superuser-email')
        FIRST_SUPERUSER_USERNAME = credentials('first-superuser-username')
        FIRST_SUPERUSER_ROLE     = 'developer'
        FIRST_SUPERUSER_PASSWORD = credentials('first-superuser-password')
        FIRST_SUPERUSER_NAME     = 'DevOps'
        FIRST_SUPERUSER_SURNAME  = 'Developer'

        GIT_CREDENTIALS_ID  = 'github-ssh'
        COMPOSE_PROJECT_NAME = 'market'
    }

    stages {
        stage('Checkout infrastructure') {
            steps {
                dir('market-infrastructure') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'git@github.com:Wilpdrake/market-infrastructure.git',
                            credentialsId: env.GIT_CREDENTIALS_ID
                        ]]
                    ])
                }
            }
        }

        stage('Checkout backend') {
            steps {
                dir('market-backend') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'git@github.com:Wilpdrake/market-backend.git',
                            credentialsId: env.GIT_CREDENTIALS_ID
                        ]]
                    ])
                }
            }
        }

        stage('Checkout bot') {
            steps {
                dir('market-bot') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'git@github.com:Wilpdrake/market-bot.git',
                            credentialsId: env.GIT_CREDENTIALS_ID
                        ]]
                    ])
                }
            }
        }

        stage('Checkout frontend') {
            steps {
                dir('market-frontend') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'git@github.com:yushiri/market-order.git',
                            credentialsId: env.GIT_CREDENTIALS_ID
                        ]]
                    ])
                }
            }
        }

        stage('Validate') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose config --quiet'
                }
            }
        }

        stage('Build') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose build'
                }
            }
        }

        stage('Migrate') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose up -d postgres'
                    sh 'docker compose run --rm backend alembic upgrade head'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose up -d --remove-orphans'
                }
            }
        }

        stage('Status') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose ps'
                }
            }
        }
    }

    post {
        cleanup {
            cleanWs(
                deleteDirs: true,
                disableDeferredWipeout: true
            )
        }
    }
}
