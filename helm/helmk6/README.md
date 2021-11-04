# Helm Chart for Fadi Loadtest

## Introduction

This [Helm](https://helm.sh/) chart installs [k6 ](https://k6.io/) and differents tools to load test ,monitoring ,troubleshoot  fadi services  in a [Kubernetes](https://kubernetes.io/) cluster.

## Prerequisites

- Kubernetes cluster 1.10+
- Helm 3.0.0+
- [Persistent Volumes (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) provisioner support in the underlying infrastructure.

## Installation

### Install from local clone

```bash
git clone git@git.cetic.be:h.belkiria/loadtest.git
cd helmk6
helm dep up
helm install k6loadtest .

NAME: k6loadtest
LAST DEPLOYED: Sat Aug 14 13:21:43 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=k6,app.kubernetes.io/instance=k6loadtest" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

```

## Uninstallation

To uninstall/delete the `k6loadtest` deployment:

```bash
helm delete  k6loadtest
release "k6loadtest" uninstalled

```

## Configuration

The following table lists the configurable parameters of the  chart and the default values.

| Parameter                                                                   | Description                                                                                                        | Default                         |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------| ------------------------------- |
| **ReplicaCount**                                                            |
| `replicaCount`                                                              | Number of k6 pod                                                                                               | `1`                             |
| **Image**                                                                   |
| `image.repository`                                                          | k6 Image name                                                                                                    | `loadimpact`                   |
| `image.tag`                                                                 | k6 Image tag                                                                                                     | `k6`                        |
| `image.pullPolicy`                                                          | k6 Image pull policy                                                                                             | `IfNotPresent`                  |
| `image.pullSecret`                                                          | k6 Image pull secret                                                                                             | `nil`                           |
| **cronJob**                                                |
| `conf.schedule`                                                                | confugiration cronJob schedule                                                                                             | ` */10 * * * * `            |
| **grafana**                                                               |
| `grafana.enabled`                                                                 | Enable grafana                            | `true`                           |
| `grafana.env`                                                                 | environment variable                                | `{GF_AUTH_ANONYMOUS_ORG_ROLE: "Admin",GF_AUTHNONYMOUS_ENABLED: "true",GF_AUTH_BASIC_ENABLED: "false"}`                           |
| `grafana.service.type`                                                                 | service type                                 | `NodePort`                           |
| `grafana.service.port`                                                                 | service port                                 | `3000`                           |
| `grafana.datasources`                                                                 | datasources config .yaml                                  | ` datasources.yaml`                           |
| **influxdb**                                                        |
| `influxdb.authEnabled`                                                             | authEnabled influxdb                                                                              | `false`                     |
| `influxdb.adminUser.name`                                                      | admin  name                                                                                       | `hamza`|
| `influxdb.adminUser.pwd`                                                              |admin  password                                                                                     | ``                  |
| `influxdb.architecture`                                                          | Architecture deployment                                                                                             | `standalone`                            |
| `influxdb.database`                                                         | name of database influxdb to be create| `k6`     |                      |      |
| **Load test conf**                                                             |
| `target.virtualuser`                                                       | number of virtual user to be semulate                                                                               | ``                         |
| `target.duration`                                                  | test duration                                                        |                 |
| `target.host`                                                    | host service  address to be tested                                                                                       |                |
| `target.port`                                            | service port                                                                                  | 
                                   
## Troubleshooting

Before [filing a bug report](https://github.com/cetic/helm-nifi/issues/new/choose), you may want to:

* check that [persistent storage](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) is configured on your cluster
* keep in mind that a first installation may take a significant amount of time on a home internet connection
* check if a pod is in error: 
```bash
kubectl get po
NAME                                   READY   STATUS      RESTARTS   AGE
k6-test-1628944200-dg8pr               0/1     Completed   0          2m10s
k6loadtest-grafana-5589f69c96-wdlt2    1/1     Running     0          10m
k6loadtest-influxdb-85c844958f-6nfzx   1/1     Running     0          10m
nifi-0                                 4/4     Running     25         10d

```

* check if a pod is in error: 
```bash
 kubectl logs k6-test-1628944200-dg8pr 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: /scripts/nginx-test.js
     output: InfluxDBv1 (http://k6loadtest-influxdb:8086)

  scenarios: (100.00%) 1 scenario, 10 max VUs, 31s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 1s over 1 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (01.0s), 09/10 VUs, 3845 complete and 0 interrupted iterations
default   [  99% ] 09/10 VUs  1.0s/1.0s

running (01.0s), 00/10 VUs, 3955 complete and 0 interrupted iterations
default ✓ [ 100% ] 00/10 VUs  1s

     ✓ http response status code is 200

     checks.........................: 100.00% ✓ 3955        ✗ 0   
     data_received..................: 5.5 MB  5.4 MB/s
     data_sent......................: 340 kB  336 kB/s
     http_req_blocked...............: avg=6.37µs  min=700ns    med=1.43µs   max=9.78ms   p(90)=2.35µs  p(95)=3.1µs   
     http_req_connecting............: avg=863ns   min=0s       med=0s       max=1.33ms   p(90)=0s      p(95)=0s      
     http_req_duration..............: avg=1.15ms  min=121.93µs med=744.33µs max=399.13ms p(90)=1.64ms  p(95)=2.16ms  
       { expected_response:true }...: avg=1.15ms  min=121.93µs med=744.33µs max=399.13ms p(90)=1.64ms  p(95)=2.16ms  
     http_req_failed................: 0.00%   ✓ 0           ✗ 3955
     http_req_receiving.............: avg=59.62µs min=9.59µs   med=23.64µs  max=6.9ms    p(90)=59.3µs  p(95)=129.24µs
     http_req_sending...............: avg=15.23µs min=3.27µs   med=6.65µs   max=3.25ms   p(90)=11.91µs p(95)=20.77µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=1.07ms  min=102.92µs med=682.98µs max=399.02ms p(90)=1.52ms  p(95)=1.99ms  
     http_reqs......................: 3955    3902.325748/s
     iteration_duration.............: avg=1.27ms  min=160.41µs med=834.85µs max=399.65ms p(90)=1.85ms  p(95)=2.44ms  
     iterations.....................: 3955    3902.325748/s
     vus............................: 9       min=9         max=9 
     vus_max........................: 10      min=10        max=10

```

Inspect the pod, check the "Events" section at the end for anything suspicious.

```bash
minikube service k6loadtest-grafana
|-----------|--------------------|--------------|-----------------------------|
| NAMESPACE |        NAME        | TARGET PORT  |             URL             |
|-----------|--------------------|--------------|-----------------------------|
| default   | k6loadtest-grafana | service/3000 | http://192.168.99.113:32372 |
|-----------|--------------------|--------------|-----------------------------|
🎉  Opening service default/k6loadtest-grafana in default browser...

```

Get logs on a failed container inside the pod (here the `server` one):

```bash
kubectl logs myrelease-nifi-0 server
```

## License

[Apache License 2.0](/LICENSE)
