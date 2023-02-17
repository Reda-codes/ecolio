pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                sh "sudo docker build -t redacodes/ecolio-api ."

            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                    sh "sudo docker login -u $USERNAME -p $PASSWORD"
                    sh "sudo docker push $USERNAME/ecolio-api"
                }
            }
        }
    }
}
