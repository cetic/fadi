# FADI Helm scripts

![](/doc/images/logos/helm.png)

This folder contains the installation scripts for FADI.

See the [FADI helm chart](https://github.com/cetic/helm-fadi) for more information.

Using a custom Helm chart
-------

To use a custom Helm chart:

* copy the FADI helm chart in this folder
* modify it to your needs 
* adapt `deploy.sh` and `teardown.sh`:

    ```bash
    helm upgrade --install ${NAMESPACE} cetic/fadi -f ./values.yaml --namespace ${NAMESPACE} --tiller-namespace tiller
    ```
    
    should become 
    
    ```bash
    helm upgrade --install ${NAMESPACE} . -f ./values.yaml --namespace ${NAMESPACE} --tiller-namespace tiller
    ```
