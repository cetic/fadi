Security
==========

* [1. Tools description](#1-tools-description)
    * [1.1. TLS](#11-tls)
    * [1.2. Let's Encrypt](#12-lets-encrypt)
    * [1.3. Cert-manager](#13-cert-manager)
* [2. Enable TLS](#2-enable-tls)
    * [2.1. Enable Cert-manager](#21-enable-cert-manager)
    * [2.2. Enable ClusterIssuer](#22-enable-clusterissuer)
* [3. Migrate to the Production Environment](#3-migrate-to-the-production-environment)

This page describes how to enable TLS using Cert-manager and Let's Encrypt tools.

## 1. Tools description

### 1.1. TLS

TLS is a protocol for the secure transmission of data based on SSLv3. It offers confidentiality, integrity, and authentication ([explanation](https://medium.com/talpor/ssl-tls-authentication-explained-86f00064280)). 

Here we will explain how to enable TLS on FADI services.

### 1.2. Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/about/) is a non-profit certificate authority run by [Internet Security Research Group (ISRG)](https://www.abetterinternet.org/about/) that provides X.509 certificates for Transport Layer Security (TLS) encryption at no charge ([ref](https://en.wikipedia.org/wiki/Let%27s_Encrypt)).

We will use it to get certificates from a known certificate authority.

### 1.3. Cert-manager

[cert-manager](https://cert-manager.io/docs/) adds certificates and certificate issuers as resource types in Kubernetes clusters, and simplifies the process of obtaining, renewing and using those certificates.

It will be used to provide certificates to FADI services.

## 2. Enable TLS

### 2.1. Enable Cert-manager

The first step is to enable cert-manager in the `values.yaml` file:

```yaml
cert-manager:
  enabled: true
  installCRDs: true
```

If FADI is already deployed (refer [here](../INSTALL.md#122-install-fadi-services-on-the-local-cluster) for the installation), type:

```
helm upgrade fadi <fadi_folder>
```

else:

```
helm install fadi <fadi_folder>
```

> It is important to deploy Cert-Manager at this step, the next step will not work otherwise.

### 2.2. Enable ClusterIssuer

This step will create a `ClusterIssuer` object wich will get certificates from Let's Encrypt service. 

In the values.yaml file, set these values:

```yaml
clusterIssuer:
  enabled: true
  prod: false
  email: <your e-mail address>
```

Before upgrading your FADI deployment, you must choose the services on which you want to enable TLS. To do this, under each application section of the `values.yaml` file, navigate to the `ingressTraefik` part and enable TLS. For the Grafana example:

```yaml
traefikIngress:
    enabled: true
    tls: true
    host: grafana.test.local
```

Then, type the following command to upgrade FADI:

```
helm upgrade fadi <fadi_folder>
```

Let's suppose that you have created TLS for Grafana, if you type in your browser [http://grafana.example.cetic.be](http://grafana.example.cetic.be), your will get an error.
You have to type [https://grafana.example.cetic.be](https://grafana.example.cetic.be) to access Grafana in the secure mode.

## 3. Migrate to the Production Environment

Now, if you check carefully, you will see that it looks like your connection is not secure. You may even receive a warning message before accessing your app's UI.

That is because the default enabled Let' Encrypt service is a staging service. Staging certificates are valid but not trusted by browsers. It is a good practice to use the staging environment while you are setting up your integration to avoid hitting Let’s Encrypt’s stringent production [rate limits](https://letsencrypt.org/docs/rate-limits/).

Once you have successfully acquired a staging certificate, you can migrate to the Let’s Encrypt production servers. (All this third part of documentation has been copied from [this site](https://www.cloudsavvyit.com/14069/how-to-install-kubernetes-cert-manager-and-configure-lets-encrypt/)).

First, you have to delete the old ClusterIssuer, Certificates and Secrets. To get them, type:

```
$ kubectl get clusterissuer
NAME               READY   AGE
fadi-letsencrypt   True    83m
```

```
$ kubectl get certificate
NAME                    READY   SECRET                  AGE
grafana.example.cetic.be   True    grafana.example.cetic.be   83m
```

```
$ kubectl get secret
NAME                                       TYPE                                  DATA   AGE
grafana.example.cetic.be                      kubernetes.io/tls                     2      83m
```

To delete them, type

```bash
kubectl delete <resource type> <resource name>
```

Then, enable the production service of Let's Encrypt. To do that, go to the `values.yaml` file under `clusterIssuer` section and set `prod` to `true`:

```yaml
clusterIssuer:
  enabled: true
  prod: true
```

Finaly, upgrade your FADI deployment :

```bash
helm upgrade fadi <fadi_folder>
```
