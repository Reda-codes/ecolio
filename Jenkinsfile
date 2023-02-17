pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    sh "pip install -r requirements.txt"
                }
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
