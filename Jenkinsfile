pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        sh 'yarn'
        sh 'yarn run flow'
        sh 'yarn run lint'
        sh 'yarn run test'
        sh 'yarn run test --coverage'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn run build:debug'
        sh 'yarn run check:built'
      }
    }
    stage('Clean') {
      steps {
        cleanWs()
      }
    }
  }
}
