# Superset

To install or upgrade superset:

```
helm upgrade --install fadi-superset stable/superset -f helm/superset/config.yml --namespace fadi --tiller-namespace tiller
```

## Config

* LoadBalancer service enabled.
Expose the minio service to be accessed from outside the cluster.

* persistance = true / 8Gi

