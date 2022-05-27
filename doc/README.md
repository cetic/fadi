FADI Documentation
==========

* [Services logs management](LOGGING.md) - configure and setup a centralised logging system
* [Users management](USERMANAGEMENT.md) - user identification and authorization (LDAP, RBAC, ...)
* [Reverse proxy](REVERSEPROXY.md) - Traefik reverse proxy configuration
* [Security](SECURITY.md) - SSL setup
* [IAM](IAM.md) - Identity and Access Management using Keycloak
* [Testing](/tests/README.md) - tests for the FADI framework
* [TSimulus](TSIMULUS.md) - how to simulate sensors and generate realistic data with [TSimulus](https://github.com/cetic/TSimulus)
* [Machine learning models management](SELDON.md) - how to package and score machine learning models using [Seldon Core](https://www.seldon.io/tech/products/core/)
* [Sample self-hosted infrastructure](RANCHER_PROXMOX.md) - How to install FADI on a self hosted infrastructure using 
    * [Proxmox](https://www.proxmox.com/en/) as a self-hosted private cloud (IaaS) provider. It provides virtual machines for the various Kubernetes nodes.
    * [Rancher](https://rancher.com/what-is-rancher/what-rancher-adds-to-kubernetes/) to manage (install, provision, maintain, upgrade, ...) several Kubernetes clusters, e.g. when needing several environments on various IaaS providers or several well separated tenant installations, or doing airgapped installations on premises.
 
For tutorials and examples, see the [examples section](../examples/README.md)