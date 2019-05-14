# Script for local env (minikube)
eval $(minikube docker-env)

kubectl create configmap config-nifi-bootstrap --from-file=nifi/bootstrap.conf

kubectl apply -f ./postgres/postgres.yml
kubectl apply -f ./pg4admin/pg4admin.yml
kubectl apply -f ./jlab/jupyterlab.yml
kubectl apply -f ./nifi/nifi.yml
kubectl apply -f ./superset/superset.yml

#kubectl apply -f ./kafka/zookeeper.yml
#kubectl apply -f ./kafka/kafka.yml
#sleep 10
