#!/usr/bin/env bash
# This script will deploy the various FADI services on a Kubernetes cluster using Helm and kubectl
# See https://github.com/cetic/fadi/examples/binderhub/ for usage documentation
# Usage: ./deploy_binderhub.sh [namespace]
set -o errexit

LOG_FILE="deploy.log"
[ -e ${LOG_FILE} ] && rm ${LOG_FILE}
exec > >(tee -a ${LOG_FILE} )
exec 2> >(tee -a ${LOG_FILE} >&2)

printf "\n\nFadi is deployed... Now helm will Install BinderHub in FADI...\n"
# Install BinderHub in FADI
kubectl get namespace binderhub 2> /dev/null || kubectl create namespace binderhub
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update
helm upgrade --install binderhub jupyterhub/binderhub --version=0.2.0-n132.h1a8ce62  -f ./config.yaml --namespace binderhub

sleep 5s
# Get the node IP where JupyterHub is deployed
nodeIP=$(kubectl get po -n binderhub -o wide |sed -n '/proxy/p' |awk '{ print $7 }')
if [ $nodeIP = "minikube" ];then
  nodeIP=$(minikube ip)
fi

# Upgrade the BinderHub release with hub_url
printf "\n\n Found JupyterHub deployed at $nodeIP\n"
helm upgrade binderhub jupyterhub/binderhub --version=0.2.0-n132.h1a8ce62 -f ./config.yaml --set config.BinderHub.hub_url=http://$nodeIP:30902 --namespace binderhub
printf "\n\nInstallation successful, !\n"
