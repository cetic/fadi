FAQ - Frequently asked questions
==========

## What do I need to test FADI?

* a minimal setup can run on your laptop using minikube (see [the local deployment](https://github.com/cetic/fadi#02-local-deployment). Currently 16GB RAM with a modern CPU should be sufficient.
* if you have an account at a public cloud that provides Kubernetes as a service (AWS, GCP, Azure, ...), or have a Kubernetes cluster at hand, you can install the stack using our Helm template. (see [GKE instructions](https://github.com/cetic/fadi#04-deployment-on-gke))

## How can I get help on how to use FADI?

In case you encounter an issue with FADI, have a feature request or any other question, feel free to [open an issue](https://github.com/cetic/fadi/issues/new/choose).

## How can I extend FADI

FADI relies on Helm to integrate the various service together. To add another service to the stack, you can package it inside a [Helm chart](https://helm.sh/docs/howto/) and [add it to your own FADI chart](helm/README.md).

## Why "FADI"?

FADI is the acronym for "Framework for Automating the Deployment and orchestration of container-based Infrastructures"

## FADI is not working

In case you encounter an issue with FADI, have a feature request or any other question, feel free to [open an issue](https://github.com/cetic/fadi/issues/new/choose).

Please make sure the following steps have been taken beforehand:

* update Minikube to the latest version
* update Helm to the latest version
* check the logs for any suspicious error message:

```bash
minikube logs
kubectl get events --all-namespaces
kubectl get events -n fadi
kubectl get pods -n fadi
kubectl logs fadi-nifi
```

## OSx - slow installation

**Note for Mac users :** you need to change the network interface in the Minikube vm: in the VirtualBox GUI, go to `minikube->Configuration->Network->Interface 1->advanced` and change `Interface Type` to `PCnet-FAST III` (the minikube vm should be shut down in order to be able to change the network interface: `minikube stop`

## Windows Installation

This is still not totally supported, some guidelines here #55

## How to configure external access to the deployed services?

When deploying on a generic Kubernetes cluster, you will want to make the services accessible from the outside.

See

* https://github.com/cetic/fadi/blob/feature/documentation/doc/REVERSEPROXY.md for the reverse proxy configuration guide 
* https://github.com/cetic/fadi/issues/81 for port forwarding instructions

## How to configure Kubernetes Storage Class?

If you encounter the error `pod has unbound PersistentVolumeClaims`, make sure you have a **default StorageClass** in your cluster.

To list the StorageClasses in your cluster: 

```bash
kubectl get storageclass
```

The output should be similar to this:

```
NAME                 PROVISIONER               AGE
standard (default)   kubernetes.io/gce-pd      1d
```

If there is no StorageClass, you can create one by using [Local Path Provisioner](https://github.com/rancher/local-path-provisioner).
 
To mark a StorageClass as default, run this command where `<your-class-name>` is the StorageClass name:
 
 
```bash
kubectl patch storageclass <your-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

If you follow [Local Path Provisioner](https://github.com/rancher/local-path-provisioner) your StorageClass name will be `local-path`, so to mark it as default you can run this command:

```bash
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

**Important note:** FADI should be installed in the same namespace as the StorageClass.


See also:
 
 * Kubernetes official documentation on storage classes: https://kubernetes.io/docs/concepts/storage/storage-classes/
 * https://github.com/cetic/helm-fadi/issues/15
