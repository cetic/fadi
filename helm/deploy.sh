#!/usr/bin/env bash
# this script will deploy the various FADI services on a Kubernetes cluster using Helm and kubectl
# usage: ./deploy.sh [namespace]
set -o errexit

LOG_FILE="deploy.log"
[ -e ${LOG_FILE} ] && rm ${LOG_FILE}
exec > >(tee -a ${LOG_FILE} )
exec 2> >(tee -a ${LOG_FILE} >&2)

# default namespace is fadi
NAMESPACE=${1:-fadi}

printf "\n\nCreating namespaces...\n"

kubectl get namespace ${NAMESPACE}  2> /dev/null || kubectl create namespace ${NAMESPACE}

#printf "\n\nSetup Tiller...\n"
# create sa for tiller
# kubectl get sa tiller -n tiller 2> /dev/null || kubectl create -f ./tiller/rbac-config.yaml

# helm init --history-max 200 --tiller-namespace tiller --service-account tiller --upgrade
# wait for tiller to be deployed
#kubectl rollout status deployment tiller-deploy --namespace tiller

printf "\n\nHelm all the things!...\n"

# add cetic helm repo
helm repo add cetic https://cetic.github.io/helm-charts/
helm repo update

# create clusterrole for traefik
#kubectl get clusterrole traefik-ingress-controller 2> /dev/null || kubectl create -f ./traefik/rbac-config.yaml

# install/upgrade traefik

#helm upgrade --install traefik stable/traefik -f ./traefik/values.yaml --namespace kube-system --tiller-namespace tiller

# install/upgrade FADI
helm upgrade --install ${NAMESPACE} cetic/fadi -f ./values.yaml --namespace ${NAMESPACE} --tiller-namespace tiller

printf "\n\nInstallation successful!\n"
