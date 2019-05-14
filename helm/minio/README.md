### Minio

To install or upgrade minio:

```
helm upgrade --install bdf-minio stable/minio -f helm/minio/config.yml --namespace bdf --tiller-namespace tiller
```

#### Configuration

* persistance: 10 Gi

* LoadBalancer service enabled.
Expose the minio service to be accessed from outside the cluster.
