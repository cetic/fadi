### Postgresql

To install or upgrade postgreSQL:

```
helm upgrade --install fadi-postgres stable/postgresql -f ./postgresql/config.yml --namespace fadi --tiller-namespace tiller
```

#### Postgresql configuration:

See the default configuration [here](https://github.com/helm/charts/blob/master/stable/postgresql/values.yaml).

See the configuration for minikube [here](helm/postgresql/config.yml).

TODO: GKE config

##### Minikube Configuration

user: postgres
pass: postgres

Currently: service address: 
fadi-postgres-postgresql:5432

Should be changed.

* persistance = true / 8Gi

##### Helm Notes

PostgreSQL can be accessed via port 5432 on the following DNS name from within your cluster:

    fadi-postgres-postgresql.fadi.svc.cluster.local - Read/Write connection
To get the password for "postgres" run:

    export POSTGRES_PASSWORD=$(kubectl get secret --namespace fadi fadi-postgres-postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)

To connect to your database run the following command:

    kubectl run fadi-postgres-postgresql-client --rm --tty -i --restart='Never' --namespace fadi --image docker.io/bitnami/postgresql:10.7.0 --env="PGPASSWORD=$POSTGRES_PASSWORD" --command -- psql --host fadi-postgres-postgresql -U postgres

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace fadi svc/fadi-postgres-postgresql 5432:5432 &
    PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U postgres

