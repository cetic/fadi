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

printf "\n\nHelm all the things!...\n"

# add cetic helm repo
helm repo add cetic https://cetic.github.io/helm-charts/ --force-update
helm repo update

# install/upgrade FADI
helm dep up
helm upgrade --install ${NAMESPACE} cetic/fadi -f ./values.yaml --namespace ${NAMESPACE}

printf "\n\nInstallation successful!\n"
