output "client_certificate" {
  description = "Public certificate used by clients to authenticate to the cluster endpoint."
  value       = "${base64decode(google_container_cluster.primary.master_auth.0.client_certificate)}"
}

output "client_key" {
  description = "Private key used by clients to authenticate to the cluster endpoint."
  value       = "${base64decode(google_container_cluster.primary.master_auth.0.client_key)}"
}

output "cluster_ca_certificate" {
  description = "Public certificate that is the root of trust for the cluster."
  value       = "${base64decode(google_container_cluster.primary.master_auth.0.cluster_ca_certificate)}"
}

output "endpoint" {
  description = "The IP address of this cluster's Kubernetes master."
  value       = "${google_container_cluster.primary.endpoint}"
}

output "endpoint-minio" {
  description = "The static IP address of Minio"
  value       = "${google_compute_address.static-minio.address}"
}

output "endpoint-superset" {
  description = "The static IP address of Superset"
  value       = "${google_compute_address.static-superset.address}"
}

output "endpoint-jupyterhub" {
  description = "The static IP address of Jupyterhub"
  value       = "${google_compute_address.static-jupyterhub.address}"
}

output "endpoint-grafana" {
  description = "The static IP address of Grafana"
  value       = "${google_compute_address.static-grafana.address}"
}

output "endpoint-nifi" {
  description = "The static IP address of Nifi"
  value       = "${google_compute_address.static-nifi.address}"
}

output "endpoint-pgadmin" {
  description = "The static IP address of Pgadmin"
  value       = "${google_compute_address.static-pgadmin.address}"
}

#output "endpoint-sparkui" {
#  description = "The static IP address of Spark UI"
#  value       = "${google_compute_address.static-sparkui.address}"
#}


