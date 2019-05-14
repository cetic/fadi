# Grafana

To install or upgrade grafana:

```
helm upgrade --install bdf-grafana stable/grafana -f helm/grafana/config.yml --namespace bdf --tiller-namespace tiller
```

## Config

* LoadBalancer service enabled.
Expose the grafana service to be accessed from outside the cluster.

* Persistant: 10Gi

### OpenShift Config

for openshift, update run as user / fsgroup (default : 472 -> 1000500000)

Should be resolved with scc restricted updated.
