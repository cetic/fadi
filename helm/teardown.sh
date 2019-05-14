# Script for local env (minikube)

## Delete releases

helm delete --purge bdf-spark --tiller-namespace tiller
helm delete --purge bdf-jhub --tiller-namespace tiller
helm delete --purge bdf-postgres --tiller-namespace tiller
helm delete --purge bdf-superset --tiller-namespace tiller
helm delete --purge bdf-minio --tiller-namespace tiller
helm delete --purge bdf-grafana --tiller-namespace tiller

# Delete nifi
kubectl delete -f ../k8s/nifi/nifi.yml -n bdf

# Delete sa for tiller
kubectl delete -f ./tiller/rbac-config.yaml

# Delete configmaps
kubectl delete configmap config-nifi-bootstrap -n bdf

# Delete namespaces
kubectl delete namespace tiller
kubectl delete namespace bdf
