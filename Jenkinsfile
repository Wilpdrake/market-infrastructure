pipeline {
    agent any

    options {
        skipDefaultCheckout(true)

        disableConcurrentBuilds()

        timestamps()
    }

    // parameters {
    //     string(
    //         name: 'TRIGGER_REPOSITORY',
    //         defaultValue: 'manual',
    //         description: 'Репозиторий, инициировавший сборку'
    //     )

    //     string(
    //         name: 'TRIGGER_COMMIT',
    //         defaultValue: '',
    //         description: 'Commit SHA, вызвавший сборку'
    //     )
    // }

    environment {
        POSTGRES_USER     = credentials('postgres-user')
        POSTGRES_PASSWORD = credentials('postgres-password')
        POSTGRES_DB       = credentials('postgres-db')
        BACKEND_SECRET_KEY = credentials('backend-secret-key')

        GIT_CREDENTIALS_ID = 'github-ssh'
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

        // stage('Information') {
        //     steps {
        //         echo """
        //             Trigger repository: ${params.TRIGGER_REPOSITORY}
        //             Trigger commit:     ${params.TRIGGER_COMMIT}
        //         """.stripIndent()

        //         sh '''
        //             echo "Infrastructure: $(git -C market-infrastructure rev-parse HEAD)"
        //             echo "Backend:        $(git -C market-backend rev-parse HEAD)"
        //             echo "Bot:            $(git -C market-bot rev-parse HEAD)"
        //             echo "Frontend:       $(git -C market-frontend rev-parse HEAD)"
        //         '''
        //     }
        // }

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
