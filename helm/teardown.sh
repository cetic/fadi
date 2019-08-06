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

# Delete release

printf "\n\nDeleting FADI release...\n"

helm delete --purge ${NAMESPACE} --tiller-namespace tiller || true

printf "\n\nDeleting Traefik release...\n"

helm delete --purge traefik --tiller-namespace tiller || true

printf "\n\nDeleting Tiller and namespaces...\n"

# Delete sa for tiller
kubectl delete -f ./tiller/rbac-config.yaml

# Delete clusterrole for traefik
kubectl delete -f ./traefik/rbac-config.yaml

# Delete namespaces
kubectl delete namespace tiller
kubectl delete namespace ${NAMESPACE}

printf "\n\nTeardown complete!\n"
