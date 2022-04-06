Use case K6
========

This use case will show how to use the K6 helm chart for a load test on Nifi. K6 will be used to send a pre-defined number of binary files in a pre-defined duration.

## Nifi deployment

First, you have to install and configure Nifi and a listener processor.

### a. Nifi installation

You can follow the [INSTALLATION.md](https://github.com/cetic/helm-nifi/blob/master/doc/INSTALLATION.md) file to deploy Nifi.

### b. Processor configuration

The [ListenHTTP](https://nifi.apache.org/docs/nifi-docs/components/org.apache.nifi/nifi-standard-nar/1.6.0/org.apache.nifi.processors.standard.ListenHTTP/) processor will be used to consume incoming data from K6. 

To be reachable, we need to add a NodePort service to Nifi. For that, navigate to the "processors" part of "service" section in values.yaml file and add this config : 

```
processors:
    enabled: true
    ports:
      - name: listenHTTP
        port: 7001
        targetPort: 7001
```

Then, upgrade the Nifi helm chart :

```
helm upgrade <your_release> <your_Nifi_helm_repo>
```

Then, you can go to the Nifi UI, login and add the "ListenHTTP" processor with the port number defined in the values.yaml file.

## K6 deployment

First, set the values.yaml file :

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

* virtualuser : number of virtual users simultaneously connected
* iterations : number of copies of the file sent per virtual user
* duration : period during which all files are sent
* host : the address of your Nifi server
* port : the port number of your ListenHTTP processor
* fileUpload : path to the file that will be copied and sent for the load testing
* schedule : as a cron job you need to set a schedule (every 3 min in this example)

Now, you can lauch the load test by typind this command :

```
helm install k6 .
```

To see results, type this command : 

```
kubectl logs <your_k6_pod>
```