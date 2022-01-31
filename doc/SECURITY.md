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
This step will 

TODO

* [cert-manager](https://cert-manager.io/docs/installation/kubernetes/).
* ...