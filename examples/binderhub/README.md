<a href="https://binderhub.readthedocs.io/en/latest/" alt="Apache Nifi"><img src="images/logos/binderhub.png" width="200px" /></a>

# What's Binderhub

*The primary goal of BinderHub is creating custom computing environments that can be used by many remote users. BinderHub enables an end user to easily specify a desired computing environment from a Git repo. BinderHub then serves the custom computing environment at a URL which users can access remotely.*

# Add Binderhub around FADI

## Disable jupyterhub in the default FADI deployement.
the BinderHub Helm chart take care of the deployement of JupyterHub. We could think that it's possible to
add the following values in a values.yaml file :
```
jupyterhub:
  enabled: false
```
We assume that you have already a stable cluster with the default version of FADI installed


```
echo -e "jupyterhub:\n  enabled: false" >> values.yaml
helm upgrade --install fadi cetic/fadi -f ./values.yaml --namespace fadi
helm install binderhub jupyterhub/binderhub -f ./values.yaml --namespace binderhub

helm install jupyterhub/binderhub --version=0.2.0-3b53fce  --name=<choose-name> --namespace=<choose-namespace> -f 
```

# Basic example of binderhub workflow
# References
 - [https://binderhub.readthedocs.io/en/latest/](https://binderhub.readthedocs.io/en/latest/)
