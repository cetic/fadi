provider "google" {
  credentials = "${file("sa_gke.json")}"
  project     = "<your-project-id>"
  region      = "europe-west1"
}

# Use gce for storing the terraform state.
terraform {
  backend "gcs" {
    bucket  = "<your-project-id>-tfstate"
    prefix  = "terraform/state"
    credentials = "sa_gke.json"
  }
}

resource "google_container_cluster" "primary" {
  name                     = "gke-fadi"
  location                 = "europe-west1-d"
  remove_default_node_pool = true
  initial_node_count = 1
  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.

  # Setting an empty username and password explicitly disables basic auth
  master_auth {
    username = ""
    password = ""
  }

  addons_config {
    kubernetes_dashboard {
      disabled = true
    }
  }
}

resource "google_container_node_pool" "primary_pool" {
  name       = "primary-pool"
  cluster    = "${google_container_cluster.primary.name}"
  location   = "europe-west1-d"

  node_config {
    machine_type = "n1-standard-1" 
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  autoscaling {
    min_node_count = 2
    max_node_count = 5
  }
}
