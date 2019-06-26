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

kubectl get namespace tiller  2> /dev/null || kubectl create namespace tiller
kubectl get namespace ${NAMESPACE}  2> /dev/null || kubectl create namespace ${NAMESPACE}

printf "\n\nSetup Tiller...\n"
# create sa for tiller
kubectl get sa tiller -n tiller 2> /dev/null || kubectl create -f ./tiller/rbac-config.yaml

helm init --history-max 200 --tiller-namespace tiller --service-account tiller --upgrade
# wait for tiller to be deployed
kubectl rollout status deployment tiller-deploy --namespace tiller

printf "\n\nHelm all the things!...\n"

# add helm repos
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo add cetic https://cetic.github.io/helm-charts/
helm repo update

# update helm dependencies
helm dep up

# install/upgrade FADI
helm upgrade --install ${NAMESPACE} cetic/fadi -f ./values.yaml --namespace ${NAMESPACE} --tiller-namespace tiller

printf "\n\nInstallation successful!\n"
