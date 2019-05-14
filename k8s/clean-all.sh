# Script for local env (minikube)

kubectl delete -f ./postgres/postgres.yml
kubectl delete -f ./pg4admin/pg4admin.yml
kubectl delete -f ./jlab/jupyterlab.yml
kubectl delete -f ./superset/superset.yml
kubectl delete -f ./nifi/nifi.yml
kubectl delete configmap config-nifi-bootstrap

#kubectl delete -f ./kafka/kafka.yml
#kubectl delete -f ./kafka/zookeeper.yml
