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

# spark (+ zeppelin, set to 0 for the moment)
helm upgrade --install ${NAMESPACE}-spark stable/spark -f ./spark/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# superset
helm upgrade --install ${NAMESPACE}-superset stable/superset -f ./superset/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# postgres
helm upgrade --install ${NAMESPACE}-postgres stable/postgresql -f ./postgresql/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# minio
helm upgrade --install ${NAMESPACE}-minio stable/minio -f ./minio/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# jupyter-hub:
helm upgrade --install ${NAMESPACE}-jhub jupyterhub/jupyterhub --version=0.8.2 -f ./jupyterhub/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# nifi
helm upgrade --install ${NAMESPACE}-nifi cetic/nifi -f ./nifi/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# grafana
helm upgrade --install ${NAMESPACE}-grafana stable/grafana -f ./grafana/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller
# pg4admin: 
helm upgrade --install ${NAMESPACE}-pgadmin cetic/pgadmin -f ./pgadmin/config.yml --namespace ${NAMESPACE} --tiller-namespace tiller

printf "\n\nInstallation successful!\n"
