## Jupyter Hub Configuration

### Jupyter Hub Documentation

* https://github.com/jupyterhub/zero-to-jupyterhub-k8s
* https://z2jh.jupyter.org/en/latest/

To install or upgrade Jupyter Hub:

```
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/
helm repo update
helm upgrade --install fadi-jhub jupyterhub/jupyterhub --version=0.8.0 -f helm/jupyterhub/config.yml --tiller-namespace tiller
```

To get the service in minikube: minikube service -n fadi --url proxy-public

### Jupyter Hub Modifications

* update secret Token
* disable prePuller (prePuller / hook / enabled: false)
* singleuser to type storage: none (not persistant)
* sqlite-memory for testing! (hub: db: type)

TODO:

* https://z2jh.jupyter.org/en/latest/optimization.html
* Spark Integration, see: https://github.com/jupyterhub/zero-to-jupyterhub-k8s/issues/1030
* persitance

### Jupyter Hub Specifiactions for Openshift

Jupyter needs to launch itself containers:

oc adm policy add-scc-to-user privileged "system:serviceaccount:fadi-helm:hub"

Not the best option, see:

* https://docs.openshift.com/container-platform/3.9/admin_guide/manage_scc.html#enable-dockerhub-images-that-require-root

Enable Images to Run with USER in the Dockerfile

To relax the security in your cluster so that images are not forced to run as a pre-allocated UID, without granting everyone access to the privileged SCC:

Edit the restricted SCC:

```
$ oc edit scc restricted
```

* See https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html#enable-images-to-run-with-user-in-the-dockerfile

Change the runAsUser.Type strategy to RunAsAny.	

This allows images to run as the root UID if no USER is specified in the Dockerfile.

Add capabilities:

* https://docs.openshift.com/container-platform/3.9/admin_guide/manage_scc.html#provide-additional-capabilities
