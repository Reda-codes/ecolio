pipeline {
    agent {
        label 'docker'
    }
    stage('Build Docker Image') {
        steps {
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME')]) {
                sh "docker build -t $DOCKER_USERNAME/ecolio-api ."
            }
        }
    }

    stage('Push Docker Image') {
        steps {
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                sh "docker push $DOCKER_USERNAME/ecolio-api"
            }
        }
    }
}
