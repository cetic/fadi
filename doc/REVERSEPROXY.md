Reverse Proxy
==========

<p align="left";>
	<a href="https://www" alt="traefik">
	    <img src="/doc/images/logos/traefik-logo.svg" align="center" alt"ELK logo" width="200px" />
    </a>
</p>

* [1. Create the Traefik server](#1-create-the-ldap-server)
* [2. Configure the various services to use Traefik](#2-configure-the-various-services)

This page provides information on how to configure FADI with the [Traefik](https://traefik.io/) Reverse Proxy.

> Traefik is an open-source reverse proxy and load balancer for HTTP and TCP-based applications that is easy, dynamic, automatic, fast, full-featured, production proven, provides metrics, and integrates with every major cluster technology... No wonder it's so popular!

## 1. Create the Traefik reverse proxy

* https://github.com/helm/charts/tree/master/stable/traefik

* create a clusterrole for traefik

```
kubectl get clusterrole traefik-ingress-controller 2> /dev/null || kubectl create -f ./traefik/rbac-config.yaml
```

```
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: traefik-ingress-controller
rules:
  - apiGroups:
      - ""
    resources:
      - services
      - endpoints
      - secrets
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - extensions
    resources:
      - ingresses
    verbs:
      - get
      - list
      - watch
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: traefik-ingress-controller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: traefik-ingress-controller
subjects:
- kind: ServiceAccount
  name: default
  namespace: kube-system
```

* install traefik (https://docs.traefik.io/v1.3/user-guide/kubernetes/#deploy-trfik-using-helm-chart)

```
helm upgrade --install traefik stable/traefik -f ./traefik/values.yaml --namespace kube-system --tiller-namespace tiller
```

The values file: (ADD the link).

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

See the [default values file](https://github.com/helm/charts/blob/master/stable/traefik/values.yaml) for more configuration options.

## 2. Configure the various services to use Trafiek

You need to update ingress definition for each service you want to expose behind your dopmain name.

See https://docs.traefik.io/providers/kubernetes-ingress/

Update the values.yaml file:

For instance, for grafana:
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

You should now be able to access grafana through the domain name you choose.

Next you can also configure the SSL. For that, have a look at the next [section](). 


