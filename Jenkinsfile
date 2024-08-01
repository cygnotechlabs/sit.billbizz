pipeline {
    agent any

    environment {
        // Define environment variables for AWS ECR
        AWS_REGION = 'ap-south-1'
        ECR_REPOSITORY = 'billbizz_frontend'
        IMAGE_NAME = 'frontend-billbizz'
        AWS_CREDENTIALS_ID = '2157424a-b8a7-45c0-90c2-bc0d407f6cea'
        SONARQUBE_PROJECT_KEY = 'billbizz_cygnoz'
        SONARQUBE_SCANNER_CREDENTIALS_ID = 'sonartoken' // Jenkins credentials ID for SonarQube token
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository
                git branch: 'your-branch', credentialsId: 'git-credentials-id', url: 'https://github.com/your-repo.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Set up SonarQube Scanner
                    scannerHome = tool 'sonarqube' // Replace with your SonarQube Scanner tool name
                }
                withSonarQubeEnv('APIND_Sonarqube') { // Replace with your SonarQube server name
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONARQUBE_PROJECT_KEY} -Dsonar.sources=. -Dsonar.host.url=http://3.109.27.100 -Dsonar.login=${SONARQUBE_SCANNER_CREDENTIALS_ID}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Login to ECR') {
            steps {
                script {
                    // Authenticate Docker to the AWS ECR
                    withAWS(credentials: "${AWS_CREDENTIALS_ID}", region: "${AWS_REGION}") {
                        sh '$(aws ecr get-login --no-include-email --region ${AWS_REGION})'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Tag and push Docker image to ECR
                    sh 'docker tag $IMAGE_NAME:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest'
                    sh 'docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
