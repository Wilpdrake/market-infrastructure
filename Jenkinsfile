pipeline {
    agent any

    stages {
        stage('Update submodules') {
            steps {
                sh '''
                    git submodule sync --recursive
                    git submodule update --init --remote --recursive
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}