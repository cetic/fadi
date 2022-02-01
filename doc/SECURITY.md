Security
==========

## 1. Tools
### TLS
TLS is a protocol for the secure transmission of data based on SSLv3. It offers confidentiality, integrity, and authentication ([medium](https://medium.com/talpor/ssl-tls-authentication-explained-86f00064280)). 

Here we will explain how to enable TLS on FADI's services.

### Let's Encrypt
Let's Encrypt is a non-profit certificate authority run by Internet Security Research Group (ISRG) that provides X.509 certificates for Transport Layer Security (TLS) encryption at no charge([wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt)).

We will use it to get certificates from e known certificate authority.

### Cert-manager
cert-manager adds certificates and certificate issuers as resource types in Kubernetes clusters, and simplifies the process of obtaining, renewing and using those certificates ([cert-manager](https://cert-manager.io/docs/)).

It will be used to provide certificates to FADIS's services.

## 2. Enable TLS

It is important to follow the order of the following steps.

### Cert-manager
The first step is to enable the cert-manager in the values.yaml file:

```
cert-manager:
  enabled: true
  installCRDs: true
```
If FADI is already deployed, type:

```
helm upgrade fadi <fadi_folder>
```
else:

```
helm install fadi <fadi_folder>
```

It is important to deploy Cert-Manager at this step. The next step will not work otherwise.

### Cluster issuer
This step will create a ClusterIssuer object wich will get certificates from Let's Encrypt service. 
In the values.yaml file, set these values:
```
clusterIssuer:
  enabled: true
  prod: false
  email: <your e-mail address>
```
Before upgrading your FADI deployment, you must choose the services on which you want to enable TLS. To do this, under each application section of the values.yaml file, navigate to the ingressTraefik part and enable TLS. For the grafana example:

```
traefikIngress:
    enabled: true
    tls: true
    host: grafana.test.local
```
Then, type the following command to upgrade FADI:
```
helm upgrade fadi <fadi_folder>
```
Let's suppose that you have created TLS for Grafana, if you type in your browser "http://grafana.flaracc.cetic.be", your will get an error.
You have to type "https://grafana.flaracc.cetic.be" to access Grafana in the secure mode.

## 3. Production Environment

Now, if you check carefully, you will see that it looks like your connection is not secure. You may even receive a warning message before accessing your app's UI.

That is because the default enabled Let' Encrypt service is a staging service. Staging certificates are valid but not trusted by browsers. It is a good practice to use the staging environment while you’re setting up your integration to avoid hitting Let’s Encrypt’s stringent production [rate limits](https://letsencrypt.org/docs/rate-limits/).

Once you’ve successfully acquired a staging certificate, you can migrate to the Let’s Encrypt production servers. (All this third part of documentation has been copied from [this site](https://www.cloudsavvyit.com/14069/how-to-install-kubernetes-cert-manager-and-configure-lets-encrypt/)).

## 4. Migrate to the Production Environment
First, you have to delete the old ClusterIssuer, Certificates and Secrete. To get them, type:
```
$ kubectl get clusterissuer
NAME               READY   AGE
fadi-letsencrypt   True    83m
```
```
$ kubectl get certificate
NAME                    READY   SECRET                  AGE
nifi.flaracc.cetic.be   True    nifi.flaracc.cetic.be   83m
```
```
$ kubectl get secret
NAME                                       TYPE                                  DATA   AGE
nifi.flaracc.cetic.be                      kubernetes.io/tls                     2      83m
```
To delete them, type
```
kubectl delete <resource type> <resource name>
```
Then, enable the prod service of Let's Encrypt. To do that, go to the values.yaml file under clusterIssuer section and set prod to true:
```
clusterIssuer:
  enabled: true
  prod: true
```
Finaly, upgrade you FADI deployment.