#!/usr/bin/env bash
# this script will deploy the various FADI services on a Kubernetes cluster using Helm and kubectl
# usage: ./deploy.sh [namespace]
set -o errexit

LOG_FILE="deploy.log"
[ -e ${LOG_FILE} ] && rm ${LOG_FILE}
exec > >(tee -a ${LOG_FILE} )
exec 2> >(tee -a ${LOG_FILE} >&2)

printf "\n\nFadi is deployed...Now helm will Install Binderhub Around FADI...\n"
# install/binderhub around FADI
kubectl get namespace binderhub 2> /dev/null || kubectl create namespace binderhub
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update
helm upgrade --install binderhub jupyterhub/binderhub --version=0.2.0-n132.h1a8ce62  -f ./config.yaml --namespace binderhub

sleep 5s
# Get the node IP where jupyterhub is deployed
nodeIP=$(kubectl get po -n binderhub -o wide |sed -n '/proxy/p' |awk '{ print $7 }')
if [ $nodeIP = "minikube" ];then
  nodeIP=$(minikube ip)
fi

#Upgrade the binderhub release with hub_url
printf "\n\n Find jupyterhub deployed at $nodeIP\n"
helm upgrade binderhub jupyterhub/binderhub --version=0.2.0-n132.h1a8ce62 -f ./config.yaml --set config.BinderHub.hub_url=http://$nodeIP:30902 --namespace binderhub
printf "\n\nInstallation successful!\n"
