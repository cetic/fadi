# PgAdmin

To install or upgrade pgAdmin:

```
helm upgrade --install bdf-pgadmin cetic/pgadmin -f helm/pgadmin/config.yml --namespace bdf --tiller-namespace tiller
```
