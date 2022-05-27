Reverse Proxy
==========

<p align="left";>
  <a href="https://traefik.io/" alt="traefik">
    <img src="/doc/images/logos/traefik-logo.png" width="200px" />
  </a>
</p>

* [1. Create the Traefik reverse proxy](#1-enable-the-traefik-reverse-proxy)
* [2. Configure the various services to use Traefik](#2-configure-the-various-services-to-use-traefik)

This page provides information on how to configure FADI with the [Traefik](https://traefik.io/) reverse proxy.

> Traefik is an open-source reverse proxy and load balancer for HTTP and TCP-based applications that is easy, dynamic, automatic, fast, full-featured, production proven, provides metrics, and integrates with every major cluster technology... No wonder it's so popular!

Note: other reverse Proxies than Traefik could be used with FADI, check the list [here](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).

You can find information about the Traefik Helm chart [in Traefik Helm repository](https://github.com/traefik/traefik-helm-chart/tree/master/traefik).

## 1. Enable the Traefik reverse proxy

To enable the Traefik reverse proxy, you will need to set the `values.yaml`. Create a `values.yaml` file and add these lines:

```
traefik:
  enabled: true
```

You can enable the dashboard by adding these lines in the `values.yaml` file:

```
traefik:
  enabled: true
  dashboardIngress:
    enabled: true
  dashboardHost: dashboard.example.cetic.be
  globalArguments:
    - "--api.insecure=true"
```

If you have your own public IP address and you want to use it, navigate to the `service` part of `traefik` section and set the `LoadBalancerIP` field to your public IP :

```
traefik:
  service:
    spec:
      loadBalancerIP: "<your_public_IP>"
```

To provide an IP address to your Traefik `LoadBalancer` service, you must have a loadbalancer like [Metallb](https://metallb.universe.tf/) for a bare metal deployment. If you are in the Cloud, cloud providers have their own load balancers. For a `Minikube` deployment, you can just type the following command:

```
minikube tunnel
```

See the [default values file](https://github.com/traefik/traefik-helm-chart/blob/master/traefik/values.yaml) from the official repository for more configuration options.

Note that this configuration is not suitable for a production environment because access to the API is not secure. If you are deploying Traefik in a production environment, you must define security features through middleware. Please refer to [Traefik documentation](https://doc.traefik.io/traefik/v2.0/operations/dashboard/).


## 2. Configure the various services to use Traefik

You will need to update `IngressRoute` definitions for each service you want to expose behind your domain name. See https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/ for the documentation.

Update the FADI `values.yaml` file. You can set all the service types to `ClusterIP` as all services are now exposed through an `IngressRoute`. 

For instance, for Grafana:
```
grafana:
  enabled: true
  service:
    type: ClusterIP
.............
  traefikIngress:
    enabled: true
    host: grafana.example.cetic.be
```

You should now be able to access Grafana through the domain name you have chosen: `http(s)://grafana.example.cetic.be`

There are four services (Grafana, Nifi, JupyterHub and superset) and the Traefik dashboard which have already been built with an [IngressRoute](https://doc.traefik.io/traefik/v2.2/routing/providers/kubernetes-crd/#kind-ingressroute). You just have to activate them. If you want to build `IngressRoutes` for other services, you must add them in the [ingressroutes.yaml](https://github.com/cetic/helm-fadi/blob/master/templates/ingressroutes.yaml) file. E.g. for Grafana:

```
{{- if and (.Values.grafana.enabled) (.Values.grafana.traefikIngress.enabled) -}}
{{- if .Values.grafana.traefikIngress.tls }}
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: grafana
spec:
  entryPoints:
    - websecure
  routes:
  - kind: Rule
    match: Host(`{{ .Values.grafana.traefikIngress.host }}`) && PathPrefix(`/`)
    services:
      - name: {{ .Release.Name }}-grafana
        port: 80
  tls:
    secretName: {{ .Values.grafana.traefikIngress.host }}  
---
{{- end }}
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: grafana-http
spec:
  entryPoints:
    - web
  routes:
  - kind: Rule
    match: Host(`{{ .Values.grafana.traefikIngress.host }}`) && PathPrefix(`/`)
    services:
    - name: {{ .Release.Name }}-grafana
      port: 80
    {{- if .Values.grafana.traefikIngress.tls }}
    middlewares:
      - name: https-redirect
    {{- end }}
---
{{- end }}
```

> Note : there is also a `middleware` object in the `ingressroute.yaml` file. It provides a https redirect when TLS is enabled.

Next you will also want to configure TLS access to your services. For that, have a look at the [security documentation](/doc/SECURITY.md).
