resource "google_compute_address" "static-minio" {
  name = "ipv4-address-minio"
}

resource "google_compute_address" "static-superset" {
  name = "ipv4-address-superset"
}

resource "google_compute_address" "static-jupyterhub" {
  name = "ipv4-address-jupyterhub"
}

resource "google_compute_address" "static-grafana" {
  name = "ipv4-address-grafana"
}

resource "google_compute_address" "static-nifi" {
  name = "ipv4-address-nifi"
}

resource "google_compute_address" "static-pgadmin" {
  name = "ipv4-address-pgadmin"
}

#resource "google_compute_address" "static-sparkui" {
#  name = "ipv4-address-sparkui"
#}
