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
# add stable repo
helm repo add stable https://kubernetes-charts.storage.googleapis.com


# add cetic helm repo
helm repo add cetic https://cetic.github.io/helm-charts/
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update

# create clusterrole for traefik
kubectl get clusterrole traefik-ingress-controller 2> /dev/null || kubectl create -f ./traefik/rbac-config.yaml

# install/upgrade traefik

helm upgrade --install traefik stable/traefik -f ./traefik/values.yaml --namespace kube-system

# install/upgrade FADI
#helm upgrade --install ${NAMESPACE} cetic/fadi -f ./values.yaml --namespace ${NAMESPACE}

# install/binderhub into FADI
helm upgrade --install ${NAMESPACE} jupyterhub/binderhub --version=0.2.0-n132.h1a8ce62  -f ./config.yaml --namespace ${NAMESPACE}

printf "\n\nInstallation successful!\n"
