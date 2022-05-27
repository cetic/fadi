Load testing NiFi with k6
========

This use case will show how to use the [k6 Helm chart](/helm/helmk6/README.md) for a load test on NiFi. k6 will be used to send a pre-defined number of binary files in a pre-defined duration.

## NiFi deployment

First, you have to install and configure NiFi and a listener processor.

### a. NiFi installation

You can follow the [FADI installation instructions](/doc/INSTALLATION.md) to deploy Nifi.

### b. Processor configuration

The [ListenHTTP](https://nifi.apache.org/docs/nifi-docs/components/org.apache.nifi/nifi-standard-nar/1.6.0/org.apache.nifi.processors.standard.ListenHTTP/) processor will be used to consume incoming data from k6. 

For that NiFi processor to be reachable from a browser, we need to add a `NodePort` service to it. For that, navigate to the `processors` part of `service` section in values.yaml file and add this config : 

```
processors:
    enabled: true
    ports:
      - name: listenHTTP
        port: 7001
        targetPort: 7001
```

Then, upgrade the NiFi release :

```
helm upgrade <your_release> <your_Nifi_helm_repo>
```

Then, you can go to the Nifi UI, login and add the `ListenHTTP` processor with the port number defined in the values.yaml file.

## k6 deployment

First, edit the `values.yaml` file :

```
target: 
  virtualuser: 1
  iterations: 100
  duration: "10s"
  host: <your_Nifi_server_address>
  port: <your_Nifi_ListenHTTP_port>
  fileUpload: <path_to_your_file>

conf:
  schedule: "*/3 * * * *"
```

* `virtualuser` : number of virtual users simultaneously connected
* `iterations` : number of copies of the file sent per virtual user
* `duration` : period during which all files are sent
* `host` : the address of your Nifi server
* `port` : the port number of your `ListenHTTP` processor
* `fileUpload` : path to the file that will be copied and sent for the load testing
* `schedule` : as a cron job you need to set a schedule (every 3 min in this example)

Now, you can lauch the load test by typing this command :

```
helm install k6 .
```

To see the results, type this command : 

```
kubectl logs <your_k6_pod>
```