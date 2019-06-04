# Terraform 

## GKE provisioning

This repository contains a [Terraform](https://terraform.io) project that builds a [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) cluster with a custom node pool.

### Deploy a Kubernetes Cluster (GKE) with Terraform

The creation of the infrastructure and its modifications are done with [Terraform](https://www.terraform.io/).

> HashiCorp Terraform enables you to safely and predictably create, change, and improve infrastructure. It is an open source tool that codifies APIs into declarative configuration files that can be shared amongst team members, treated as code, edited, reviewed, and versioned. 

#### Requirements

Before this module can be used on a project, you must ensure that the following pre-requisites are fulfilled:

Install:
* [Terraform](https://terraform.io) >= 0.9.0
* [gcloud-sdk](https://cloud.google.com/sdk/docs/)
* [kubernetes-cli](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

1 Terraform and kubectl are installed on the machine where Terraform is executed.
2 The Service Account you execute the module with has the right permissions. [Create a service account](https://console.developers.google.com/iam-admin/serviceaccounts).

* Add Kubernetes Engine Admin role.
* Add [Service Account User](https://cloud.google.com/kubernetes-engine/docs/how-to/iam#service_account_user).
* Add the Editor role.
* Add the Storage Object Admin role (for terraform tfstate bucket).

```
gcloud auth activate-service-account --key-file sa_gke.json
```

Activate the service account to be used for auth.

3 The Compute Engine and Kubernetes Engine APIs are active on the project you will launch the cluster in. [Enable the GKE API](https://console.developers.google.com/apis/).
4 If using a Shared VPC, the APIs must also be activated on the Shared VPC host project and your service account needs the proper permissions there.
5 Create a bucket to store the tfstate. (This step should be done with Terraform)

```
gsutil mb -c regional -l europe-west1 gs://<your-project-id>-tfstate
```

#### Usage

Then perform the following commands on the [root folder](/terraform):

1. `terraform init` to fetch the relevant plug-ins,
2. `terraform plan` to see the infrastructure plan
2. `terraform apply` to build the cluster,
3. gcloud auth activate-service-account --key-file sa_gke.json
3. `gcloud config set project <your-project-id>` set the current project,
4. `gcloud container clusters list` (to list clusters),
5. `gcloud container clusters get-credentials gke-fadi --zone europe-west1-d` to setup `kubeconfig`,

Now you can access your cluster using the Kubernetes CLI: `kubectl cluster-info`.

6. `terraform destroy` to destroy the built infrastructure.
