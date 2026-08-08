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

        GIT_CREDENTIALS_ID  = 'github-ssh'
        COMPOSE_PROJECT_NAME = 'market'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:Wilpdrake/market-infrastructure.git',
                        credentialsId: env.GIT_CREDENTIALS_ID
                    ]]
                ])

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
