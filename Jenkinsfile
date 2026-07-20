pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        // Сохраняет имя уже развёрнутого Compose-проекта и его volumes/network.
        COMPOSE_PROJECT_NAME = 'market'

        // Secret text credentials из Jenkins Credentials.
        POSTGRES_USER     = credentials('market-postgres-user')
        POSTGRES_PASSWORD = credentials('market-postgres-password')
        POSTGRES_DB       = credentials('market-postgres-db')
    }

    stages {
        stage('Checkout') {
            steps {
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
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml config --quiet'
                }
            }
        }

        stage('Build') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml build'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('market-infrastructure') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans'
                }
            }
        }

        stage('Smoke test') {
            steps {
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
        failure {
            echo 'Deployment failed. Existing production containers are left running for investigation.'
        }
    }
}
