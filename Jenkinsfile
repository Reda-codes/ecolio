pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                sh "docker build -t redacodes/ecolio-api ."

            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                    sh "docker login -u $USERNAME -p $PASSWORD"
                    sh "docker push $USERNAME/ecolio-api"
                }
            }
        }
    }
}
