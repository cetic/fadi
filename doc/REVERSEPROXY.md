Reverse Proxy
==========

<p align="left";>
  <a href="https://traefik.io/" alt="traefik">
    <img src="/doc/images/logos/traefik-logo.png" width="200px" />
  </a>
</p>

* [1. Create the Traefik reverse proxy](#1-create-the-traefik-reverse-proxy)
* [2. Configure the various services to use Traefik](#2-configure-the-various-services-to-use-traefik)

This page provides informations on how to configure FADI with the [Traefik](https://traefik.io/) Reverse Proxy.

> Traefik is an open-source reverse proxy and load balancer for HTTP and TCP-based applications that is easy, dynamic, automatic, fast, full-featured, production proven, provides metrics, and integrates with every major cluster technology... No wonder it's so popular!

It exists other Reverse Proxy than Traefik that can be used with FADI, check the list [here](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).

## 1. Create the Traefik reverse proxy

To create the Traefik reverse proxy, you will need to add the `stable` helm repository:

```
helm repo add stable https://kubernetes-charts.storage.googleapis.com
```

You can find informations about this Helm chart [here](https://github.com/helm/charts/tree/master/stable/traefik) as the Traefik Helm chart is hosted on the stable helm repository.

First, you will need to create a clusterrole for traefik:

```
kubectl get clusterrole traefik-ingress-controller 2> /dev/null || kubectl create -f ./traefik/rbac-config.yaml
```

Take a look at the sample file [here](/helm/traefik/rbac-config.yaml).

Then, you can install Traefik with helm: (If you want further informations, you can follow this [tutorial](https://docs.traefik.io/v1.3/user-guide/kubernetes/#deploy-trfik-using-helm-chart))

```
helm upgrade --install traefik stable/traefik -f ./traefik/values.yaml --namespace kube-system --tiller-namespace tiller
```

The values file can be found [here](/helm/traefik/values.yaml).

```
loadBalancerIP: "yourLoadBalancerIP"
ssl:
  enabled: true
dashboard:
  enabled: true
  domain: <yourdomain>
  serviceType: NodePort
  ingress:
    annotations: {kubernetes.io/ingress.class: traefik}
    path: /
```

See the [default values file](https://github.com/helm/charts/blob/master/stable/traefik/values.yaml) from the official repository for more configuration options.


## 2. Configure the various services to use Traefik

You will need to update ingress definitions for each service you want to expose, behind your domain name.

See https://docs.traefik.io/providers/kubernetes-ingress/ for the documentation.

Update the FADI values.yaml file. You can set all the service types to `ClusterIP` as all services are now exposed through an Ingress. 

For instance, for grafana:
```
grafana:
  enabled: true
  service:
    type: ClusterIP
  ingress:
    enabled: true
    annotations: {kubernetes.io/ingress.class: traefik}
    path: /
    hosts: [grafana.yourdomain]
```

You should now be able to access grafana through the domain name you have chosen.

Next you can also configure the SSL. For that, have a look at the next  [section](/doc/SECURITY.md). 