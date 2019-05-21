# Script for local env (minikube)
kubectl config set-context minikube

kubectl get namespace tiller  2> /dev/null || kubectl create namespace tiller
kubectl get namespace bdf  2> /dev/null || kubectl create namespace bdf

kubectl get configmap config-nifi-bootstrap -n bdf 2> /dev/null || kubectl create configmap config-nifi-bootstrap --from-file=../k8s/nifi/bootstrap.conf -n bdf

# create sa for tiller
kubectl get sa tiller -n tiller 2> /dev/null || kubectl create -f ./tiller/rbac-config.yaml

helm init --history-max 200 --tiller-namespace tiller --service-account tiller --upgrade
#wait that tiller is deployed
kubectl rollout status deployment tiller-deploy --namespace tiller

# add helm repos
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update

#dashboard (already there with minikube and gke)
#helm upgrade --install k8s-dashboard stable/kubernetes-dashboard -f ./k8s-dashboard/config.yml --tiller-namespace tiller

# spark (+ zeppelin, set to 0 for the moment)
helm upgrade --install bdf-spark stable/spark -f ./spark/config.yml --namespace bdf --tiller-namespace tiller
# superset
helm upgrade --install bdf-superset stable/superset -f ./superset/config.yml --namespace bdf --tiller-namespace tiller
# postgres
helm upgrade --install bdf-postgres stable/postgresql -f ./postgresql/config.yml --namespace bdf --tiller-namespace tiller
# minio
helm upgrade --install bdf-minio stable/minio -f ./minio/config.yml --namespace bdf --tiller-namespace tiller
# jupyter-hub:
helm upgrade --install bdf-jhub jupyterhub/jupyterhub --version=0.8.2 -f ./jupyterhub/config.yml --namespace bdf --tiller-namespace tiller
# nifi: TODO Helm
# Don't update nifi at this time
kubectl get services nifi -n bdf 2> /dev/null || kubectl apply -f ../k8s/nifi/nifi.yml -n bdf
# grafana
helm upgrade --install bdf-grafana stable/grafana -f ./grafana/config.yml --namespace bdf --tiller-namespace tiller
# pg4admin: TODO Helm
# Don't update pg4admin at this time
kubectl get services pg4admin -n bdf 2> /dev/null || kubectl apply -f ../k8s/pg4admin/pg4admin.yml -n bdf
