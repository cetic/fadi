Reverse Proxy
==========

<p align="left";>
  <a href="https://traefik.io/" alt="traefik">
    <img src="/doc/images/logos/traefik-logo.png" width="200px" />
  </a>
</p>

* [1. Create the Traefik reverse proxy](#1-enable-the-traefik-reverse-proxy)
* [2. Configure the various services to use Traefik](#2-configure-the-various-services-to-use-traefik)

This page provides information on how to configure FADI with the [Traefik](https://traefik.io/) Reverse Proxy.

> Traefik is an open-source reverse proxy and load balancer for HTTP and TCP-based applications that is easy, dynamic, automatic, fast, full-featured, production proven, provides metrics, and integrates with every major cluster technology... No wonder it's so popular!

Note: other Reverse Proxy than Traefik that could be used with FADI, check the list [here](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).

You can find information about the Helm chart [here](https://github.com/traefik/traefik-helm-chart/tree/master/traefik) as the Traefik Helm chart is hosted in the traefik helm repository.

## 1. Enable the Traefik reverse proxy

To enable the Traefik reverse proxy, you will need to set the `values.yaml`. Create a `example.yaml` file and add these lines:

```
traefik:
  enabled: true
```
You can enable the dashboard by adding these lines in the `example.yaml` file:

```
traefik:
  enabled: false
  dashboardIngress:
    enabled: true
  dashboardHost: dashboard.example.local
  globalArguments:
    - "--api.insecure=true"
```

See the [default values file](https://github.com/traefik/traefik-helm-chart/blob/master/traefik/values.yaml) from the official repository for more configuration options.


## 2. Configure the various services to use Traefik

You will need to update ingressroutes definitions for each service you want to expose, behind your domain name.

See https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/ for the documentation.

Update the FADI `values.yaml` file. You can set all the service types to `ClusterIP` as all services are now exposed through an Ingressroute. 

For instance, for Grafana:
```
grafana:
  enabled: true
  service:
    type: ClusterIP
.............
  traefikIngress:
    enabled: true
    host: grafana.yourdomain.com
```

You should now be able to access Grafana through the domain name you have chosen: `http(s)://grafana.yourdomain.com`

There are three services (Grafana, Nifi Jupyterhub) and the traefik dashboard which have already been built with an ingressroute. You just have to activate them. If you want to build ingressroutes for other services, you must add them in the `ingressroutes.yaml` file. E.g. for grafana:

```
{{- if .Values.grafana.traefikIngress.enabled -}}
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: grafana
spec:
  entryPoints:
    - web
  routes:
  - kind: Rule
    match: Host(`{{ .Values.grafana.traefikIngress.host }}`) && PathPrefix(`/`)
    services:
    - name: {{ .Release.Name }}-grafana
      port: 80
{{- end }}
```

Next you will also want to configure SSL access to your services. For that, have a look at the [security documentation](/doc/SECURITY.md). 
