pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
    }

    // Секреты инжектятся из Jenkins credentials (тип "Secret text") как env-переменные.
    // docker compose подхватывает ${POSTGRES_*} из окружения, так что .env-файл в CI не нужен.
    environment {
        POSTGRES_USER     = credentials('market-postgres-user')
        POSTGRES_PASSWORD = credentials('market-postgres-password')
        POSTGRES_DB       = credentials('market-postgres-db')
    }

    stages {
        stage('Update submodules') {
            steps {
                sh '''
                    git submodule sync --recursive
                    git submodule update --init --remote --recursive
                '''
            }
        }

        stage('Validate') {
            steps {
                sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml config'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml build'
            }
        }

        stage('Smoke test') {
            steps {
                sh '''
                    set -e
                    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
                    # ждём подъёма nginx
                    for i in $(seq 1 30); do
                        if curl -fsS http://localhost/ >/dev/null 2>&1; then break; fi
                        sleep 2
                    done
                    curl -fsS http://localhost/ || { echo "smoke test failed"; exit 1; }
                '''
            }
        }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans'
            }
        }
    }

    post {
        // Всё, кроме деплоя, гасим после smoke-теста, чтобы не держать контейнеры на агенте.
        success {
            script {
                if (env.BRANCH_NAME != 'main') {
                    sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml down || true'
                }
            }
        }
        failure {
            sh 'docker compose -f docker-compose.yml -f docker-compose.prod.yml down || true'
        }
    }
}
