FADI - Installation
=======

This page describes how to install the FADI platform:

* on any laptop using Minikube
* on a generic Kubernetes cluster
* on GKE 

## 0. Getting started

### 0.1. Prerequisites

* Install VirtualBox: https://www.virtualbox.org/wiki/Downloads
* Install Kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl/
* Install Minikube: https://github.com/kubernetes/minikube/releases (At least v0.32 of Minikube)
* Install Helm: https://helm.sh/docs/using_helm/#installing-helm

### 0.2. Local deployment

Start Minikube:

Delete any previous Minikube created:

```
minikube delete
```

Start Minikube:

```
minikube start --cpus 6 --memory 12288 --disk-size=40GB
```

To get the Kubernetes dashboard, type:

```
minikube dashboard
```

Clone this repository.

```
git clone https://github.com/cetic/fadi.git fadi
```

**For Mac users :** you need to change the network interface in the Minikube vm:

```
- in Virtual box go to minikube->Configuration->Network(Réseau)->Interface 1->advanced(avancé).
--> change Interface Type to PCnet-FAST III (the minikube vm should be shut down in order to be able to change the network interface -> you can use the command "minikube stop")
```

Launch the script:

```
cd helm
./deploy.sh
```

To access a service in your browser, you can just type, for instance:

```
minikube service -n bdf nifi
```

To update the FADI stack, re-type:

```
cd helm
./deploy.sh
```

To delete the FADI stack, type:

```
cd helm
./teardown.sh
```

### 0.3. Deployment with Helm and Kubernetes

The deployment of the FADI stack is achieved with:

* [Helm](https://helm.sh/).
* [Kubernetes](https://kubernetes.io/).

![](doc/architecture/helm-architecture.png)

First, clone this repository.

```
git clone https://github.com/cetic/fadi.git fadi
```

Then, to deploy FADI on your Kubernetes cluster, you can follow this [deployment script](/helm/deploy.sh).

You will need to modify the first line by your Kubernetes context:

```
kubectl config set-context <your-k8s-context>
```

Finally, you can deploy the FADI stack by typing:

```
cd helm
./deploy.sh
```

### 0.4. Deployment on GKE

[GKE](https://cloud.google.com/kubernetes-engine/) is a managed Kubernetes offer by the Google Cloud Platform (GCP).

> "Kubernetes Engine is a managed, production-ready environment for deploying containerized applications. It brings our latest innovations in developer productivity, resource efficiency, automated operations, and open source flexibility to accelerate your time to market."

* The creation of a GKE environment can be done with [Terraform](https://www.terraform.io/) or manually. 
See the [Terraform](https://www.terraform.io/) scripts for the creation of the Kubernetes cluster [here](/terraform) and its documentation.

To manually create a Kubernetes cluster (GKE):

You can access the console of GCP [here](https://console.cloud.google.com).

* 1- Visit the Google Kubernetes Engine menu in GCP Console. ...
* 2- Click Create cluster.
* 3- Choose the Standard cluster template or choose an appropriate template for your workload.
* 4- From the Cluster Version drop-down menu, select the desired GKE version to run in the cluster.

It's also possible to create the Kubernetes cluster in command lines, see: https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster

* The deployment of the FADI stack is achieved with [Helm](https://helm.sh/) and [Kubernetes](https://kubernetes.io/). See the Section 0.3.

### 0.5. Continuous integration and deployment

See [.gitlab-ci.sample.yml](.gitlab-ci.sample.yml) for an example CI setup with [Gitlab-CI](https://about.gitlab.com/product/continuous-integration/).
