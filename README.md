# FADI - A framework for big data analytics

[![CircleCI](https://circleci.com/gh/cetic/fadi.svg?style=svg)](https://circleci.com/gh/cetic/fadi/tree/master)

<p align="center">
  <p align="center" style="width: 50%; height: 200px;">
    <img src="doc/logo.png" height="200"/>
  </p>
  <p align="center" style="margin-top: 16px">
      <table style="border:none;">
        <tr>
          <td style="text-align: center; vertical-align: middle;"><a href="INSTALL.md"><img alt="Installation guide" src="doc/install.svg" height="50"></a></td>
          <td style="text-align: center; vertical-align: middle;"><a href="USERGUIDE.md"><img alt="User guide" src="doc/userguide.svg" height="50"></a></td>
          <td style="text-align: center; vertical-align: middle;"><a href="https://fadi.presentations.cetic.be"><img alt="Presentation slides" src="doc/presentation.svg" height="50"></a></td>
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">Installation</td>
          <td style="text-align: center; vertical-align: middle;">User guide</td>
          <td style="text-align: center; vertical-align: middle;">Presentation</td>
        </tr>
      </table>
  </p>
</p>
 
## What is FADI?

FADI is a Cloud Native platform for Big Data based on mature open source tools.
The FADI project is dedicated to making the deployment of Big Data tools simple, portable and scalable. 
The goal is to provide a straightforward way to deploy open-source systems for Big Data to various infrastructures (private and public clouds). 
Anywhere you can run [Kubernetes](https://kubernetes.io/), you should be able to run FADI.

### 1. FADI technology Stack

#### 1.1. available or in-progress

| FADI Tools | Current version  | Helm Chart | Configuration | Additional Information |
|-----------|:----------------:|-----------:|--------------:|------------------------:|
| **Superset** | 0.28.1 | https://github.com/helm/charts/tree/master/stable/superset | [&#8505;](helm/superset/README.md) | Persistent: 8Gi
| **PostgreSQL** | 10.7.0 | https://github.com/helm/charts/tree/master/stable/postgresql | [&#8505;](helm/postgresql/README.md) | Persistent: 8Gi
| **PgAdmin** | 4.7 | https://github.com/cetic/helm-pgadmin | [&#8505;](helm/pgadmin/README.md) | /
| **Minio** | RELEASE.2018-12-06T01-27-43Z |  https://github.com/helm/charts/tree/master/stable/minio | [&#8505;](helm/minio/README.md) |  Persistent: 10Gi
| **Jupyter Hub** | 0.8.2 | https://github.com/jupyterhub/zero-to-jupyterhub-k8s | [&#8505;](helm/jupyterhub/README.md) | Not persistent, to change , https://z2jh.jupyter.org/en/latest/
| **Nifi** | 1.9.2 | https://github.com/cetic/helm-nifi | [&#8505;](helm/nifi/README.md) | Pesistant: 
| **Grafana** | 6.1.4 | https://github.com/helm/charts/tree/master/stable/grafana | [&#8505;](helm/grafana/README.md) | Persistent: 10Gi
| **Spark** | 1.5.1_v3 | https://github.com/helm/charts/tree/master/stable/spark | [&#8505;](helm/spark/README.md) | The Helm Chart includes Zeppelin.

#### 1.2. not available for the moment

* **airflow**: https://github.com/helm/charts/tree/master/stable/airflow

* **zeppelin**: https://github.com/helm/charts/tree/master/stable/zeppelin (Zeppelin is already integrated in the Spark Helm Chart.)

* **OpenLDAP**: https://github.com/helm/charts/tree/master/stable/openldap

* **Prometheus**: https://github.com/helm/charts/tree/master/stable/prometheus

* **Vault**: https://github.com/helm/charts/tree/master/stable/vault-operator, https://github.com/helm/charts/tree/master/incubator/vault

* **Istio**: https://github.com/helm/charts/tree/master/incubator/istio

* **Kafka**: https://github.com/helm/charts/tree/master/incubator/kafka

* **Zookeeper**: https://github.com/helm/charts/tree/master/incubator/zookeeper

* **Kubernetes Dashboard**: https://github.com/helm/charts/tree/master/stable/kubernetes-dashboard

### Support

In case you encounter an issue with FADI, have a feature request or any other question, feel free to [open an issue](https://github.com/cetic/fadi/issues/new/choose).

### Fridge

* Helm Secrets: https://github.com/futuresimple/helm-secrets

* For GKE: https://helm.sh/docs/using_helm/#gke
