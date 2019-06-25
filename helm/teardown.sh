#!/usr/bin/env bash
# this script will deploy the various FADI services on a Kubernetes cluster using Helm and kubectl
# usage: ./teardown.sh [namespace]
set -o errexit

LOG_FILE="teardown.log"
[ -e ${LOG_FILE} ] && rm ${LOG_FILE}
exec > >(tee -a ${LOG_FILE} )
exec 2> >(tee -a ${LOG_FILE} >&2)

# default namespace is fadi
NAMESPACE=${1:-fadi}

# Delete releases

printf "\n\nDeleting releases...\n"

helm delete --purge ${NAMESPACE}-spark --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-jhub --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-postgres --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-superset --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-minio --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-nifi --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-grafana --tiller-namespace tiller || true
helm delete --purge ${NAMESPACE}-pgadmin --tiller-namespace tiller || true

printf "\n\nDeleting Tiller and namespaces...\n"

# Delete sa for tiller
kubectl delete -f ./tiller/rbac-config.yaml

# Delete namespaces
kubectl delete namespace tiller
kubectl delete namespace ${NAMESPACE}

printf "\n\nTeardown complete!\n"
