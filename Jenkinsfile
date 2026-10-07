pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    // Pas de webhook possible vers une IP privée : Jenkins interroge GitHub toutes les ~2 minutes.
    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        GITHUB_REPO     = 'github.com/baye333/immo-appl.git'
        DOCKER_HUB_USER = 'bayelahad'          // <-- à remplacer par ton nom d'utilisateur Docker Hub
        IMAGE_NAME      = "${DOCKER_HUB_USER}/immo-app"
    }

    stages {
        // ── 1 : récupérer le code ─────────────────────────────────
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ── 2 : ignorer les commits faits par Jenkins lui-même ────
        stage('Vérifier le commit') {
            steps {
                script {
                    def msg = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    echo "Dernier commit : ${msg}"
                    if (msg.contains('[skip ci]')) {
                        env.SKIP_BUILD = 'true'
                        currentBuild.result = 'NOT_BUILT'
                        currentBuild.description = 'Ignoré : commit [skip ci]'
                        echo 'Build ignoré (commit [skip ci]).'
                    }
                }
            }
        }

        // ── 3 : lire la version dans le fichier VERSION ───────────
        stage('Lire la version') {
            when { expression { env.SKIP_BUILD != 'true' } }
            steps {
                script {
                    env.APP_VERSION = readFile('VERSION').trim()
                    if (!(env.APP_VERSION ==~ /^\d+\.\d+\.\d+$/)) {
                        error("Format de VERSION invalide : '${env.APP_VERSION}' (attendu : 1.2.3)")
                    }
                    currentBuild.displayName = "#${env.BUILD_NUMBER} — v${env.APP_VERSION}"
                    echo "Version à construire : ${env.APP_VERSION}"
                }
            }
        }

        // ── 4 : construire l'image (le build Vue.js a lieu dans le Dockerfile) ──
        stage('Build image Docker') {
            when { expression { env.SKIP_BUILD != 'true' } }
            steps {
                sh '''
                    docker build -t "$IMAGE_NAME:$APP_VERSION" -t "$IMAGE_NAME:latest" .
                '''
            }
        }

        // ── 5 : pousser l'image sur Docker Hub ────────────────────
        stage('Push Docker Hub') {
            when { expression { env.SKIP_BUILD != 'true' } }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials',
                                                  usernameVariable: 'DH_USER',
                                                  passwordVariable: 'DH_PASS')]) {
                    sh '''
                        echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                        docker push "$IMAGE_NAME:$APP_VERSION"
                        docker push "$IMAGE_NAME:latest"
                        docker logout
                    '''
                }
            }
        }

        // ── 6 : mettre à jour le manifest, taguer la release, préparer la version suivante ──
        stage('Mise à jour Git (GitOps)') {
            when { expression { env.SKIP_BUILD != 'true' } }
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-credentials',
                                                  usernameVariable: 'GH_USER',
                                                  passwordVariable: 'GH_TOKEN')]) {
                    sh '''
                        set -e
                        git config user.name  "Jenkins CI"
                        git config user.email "jenkins@immo-appl.local"
                        git remote set-url origin "https://${GITHUB_REPO}"

                        # a) nouvelle image dans le manifest (ArgoCD détectera ce commit)
                        sed -i "s|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${APP_VERSION}|" k8s/deployment.yaml
                        git add k8s/deployment.yaml
                        if ! git diff --cached --quiet; then
                            git commit -m "release: version ${APP_VERSION} [skip ci]"
                        fi

                        # b) tag de la release (créé seulement s'il n'existe pas)
                        if ! git rev-parse -q --verify "refs/tags/${APP_VERSION}" > /dev/null; then
                            git tag -a "${APP_VERSION}" -m "Release ${APP_VERSION}"
                        fi

                        # c) version suivante (incrément du dernier chiffre)
                        NEW_VERSION=$(echo "${APP_VERSION}" | awk -F. '{printf "%d.%d.%d", $1, $2, $3+1}')
                        echo "${NEW_VERSION}" > VERSION
                        git add VERSION
                        git commit -m "chore: bump version to ${NEW_VERSION} [skip ci]"

                        # d) un seul push (branche + tag), identifiants fournis sans apparaître dans l'URL
                        CRED='!f() { echo "username=${GH_USER}"; echo "password=${GH_TOKEN}"; }; f'
                        git -c credential.helper= -c credential.helper="$CRED" \
                            push origin HEAD:main "refs/tags/${APP_VERSION}"
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                if (env.SKIP_BUILD != 'true') {
                    echo "Version ${env.APP_VERSION} publiée. ArgoCD va la déployer d'ici quelques minutes."
                }
            }
        }
        failure {
            echo "Pipeline échoué : la version ${env.APP_VERSION ?: 'inconnue'} n'a pas été publiée."
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}