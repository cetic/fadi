Use Case - Streaming ingestion with Apache Kafka
=========

This page provides documentation on how to use the FADI big data framework using a sample use case: monitoring CETIC offices building.

 * [1. Install FADI](#1-install-fadi)
 * [2. Prepare the database to store measurements](#2-prepare-the-database-to-store-measurements)
 * [3. Ingest and Digest measurements](#3-ingest-and-digest-measurements)
 * [4. Display dashboards and configure alerts](#4-display-dashboards-and-configure-alerts)
 * [5. Explore](#5-explore)
 * [6. Process](#6-process)
 * [7. Summary](#7-summary)

![FADI sample use case - building monitoring](/examples/kafka/images/uck.svg)

In this example, we will ingest temperature measurements from sensors and push them into the [Apache Kafka](https://kafka.apache.org) message broker.
We are then going to store the data from the broker into a database.
Finally, we display the temperature values in a simple dashboard.

## 1. Install FADI

To install the FADI framework on your workstation or on a cloud, see the [installation instructions](INSTALL.md).

The components needed for this use case are the following:

* Apache Nifi as a integration tool to ingest the sensor data from the data source (a csv file in this case) and push it into the broker. We also use Apache Nifi to get the data back from the broker ans store it into the database.
* Apache Kafka as a message broker.
* PostgreSQL as both a datawarehouse and datalake
* Gafana as a dashboard tool to display graphs from the data ingested and stored in the datalake
* Superset as a exploration dashboard tool
* Jupyter as a web interface to explore the data using notebooks

Those components are configured in the following [sample config file](/examples/kafka/values.yaml).

The following instructions assume that you deployed FADI on your workstation inside minikube.

Unless specified otherwise, all services can be accessed using the username and password pair: `admin` / `password1` , see the [user management documentation](/doc/USERMANAGEMENT.md) for detailed information on how to configure user identification and authorization (LDAP, RBAC, ...).

## 2. Prepare the database to store measurements

<a href="https://www.adminer.org/" alt="adminer"><img src="doc/images/logos/adminer.png" width="200px" /></a>

First, setup the datalake by creating a table in the postgresql database. 

To achieve this you need to: 

* Head to the adminer interface, if you are using **minikube**, you can use the following command :
```
minikube service -n fadi fadi-adminer 
```

* Access to the adminer service and to the postgreSQL database using the following credentials:

    * System: PostgreSQL
    * Server: fadi-postgresql
    * Username: admin
    * Password: passowrd1
    * Database: postgres

* In the adminer Browser, launch the Query tool by clicking "SQL command".

* Copy/Paste the [table creation script](examples/basic/create_datalake_tables.sql) in the Query Editor. 
![Postgres Server](/examples/basic/images/adminer_create_table.png)

* Execute the creation query by clicking on the `Execute` command. 

* Once the previous steps are finished, you can detect that a new table `example_basic` is created in the `Tables` field of adminer Browser. 

## 3 Prepare Nifi to inter-connect the different components.
<a href="http://nifi.apache.org/" alt="Apache Nifi"><img src="doc/images/logos/nifi.png" width="100px" /></a>

> "An easy to use, powerful, and reliable system to process and distribute data."

[Apache Nifi](http://nifi.apache.org/) provides data ingestion and processing mechanism (to e.g. connect a database, REST API, csv/json/avro files on a FTP, ...): in this case we want to read the temperature sensors data from our HVAC system and store it in a database while using a broker to transmit the data between the various processing steps.

To start, head to the Nifi web interface, if you are using **minikube**, you can use the following command :
```
minikube service -n fadi fadi-nifi
```

![Nifi web interface](/examples/kafka/images/nifi_interface.png)

For more information on how to use Apache Nifi, see the [official Nifi user guide](https://nifi.apache.org/docs/nifi-docs/html/user-guide.html) and this [Awesome Nifi](https://github.com/jfrazee/awesome-nifi) resources.

### 3.1 Measurements ingestion
Temperature measurements from the last 5 days (see [HVAC sample temperatures csv extract](/examples/kafka/sample_data.csv)) are ingested:

```csv
measure_ts,temperature
2019-06-23 14:05:03.503,22.5
2019-06-23 14:05:33.504,22.5
2019-06-23 14:06:03.504,22.5
2019-06-23 14:06:33.504,22.5
2019-06-23 14:07:03.504,22.5
2019-06-23 14:07:33.503,22.5
2019-06-23 14:08:03.504,22.5
2019-06-23 14:08:33.504,22.5
(...)
```


Now we need to tell Nifi to read the csv file and push the measurements in broker, this can be done by creating the following components in Nifi:

#### Processors

To create processor, make a drag and drop from the following button :

<a href="https://grafana.com/" alt="Grafana"><img src="/examples/kafka/images/nifi_processor.png" width="50px" /></a>

We need to configure two processors:

1. InvokeHTTP processor:
    * right-click on the processor > Click on `Configure` >
      - On the `Settings` tab > `Automatically Terminate Relationships` : all except `Response`
      - On the `Properties` tab > `Remote url`: `https://raw.githubusercontent.com/cetic/fadi/master/examples/kafka/sample_data.csv`
      - On the `Scheduling` tab > `Run Schedule`: 120s (this will download the sample file every 120 seconds)


2. PublishKafka processor:
    * right-click on the processor > Click on `Configure` > go to `Properties` tab >
      - `Kafka Brokers`: `fadi-kafka:9092`
      - `Topic Name`: `nifi-kafka`



#### Output Port
To create output port, make a drag and drop from the following button :

<img src="/examples/kafka/images/nifi_output.png" width="50px" />

![Nifi button](/examples/kafka/images/nifi_output.png)


Create two output ports : `success_port` and `failure_port`

#### Connections

* `Response` Connection:
    * Create an edge from `InvokeHTTP` processor to `PublishKafka`
    * Details > For relationships > `Response`


* `Success` Connection:
    * Create an edge from `PutDatabaseRecord` to `Output Success Port`  
    * Details > relationships > only `success`    


* `Failure` Connection:
    * From `PutDatabaseRecord` to `Output Failure Port`
    * Details > relationships > : only `failure`   


Here is the target result :

![Nifi Ingest CSV and store in PostgreSQL](/examples/kafka/images/nifi_csv_to_kafka.png)

See also [the Nifi "Kafka_to_PostgreSQL" template](/examples/kafka/nifi_template_CSV_to_kafka.xml) that corresponds to this example.

To reuse the provided template (instead of designing your own template), you can:
* Click `Upload template` in the **Operate** frame, select the template, and upload it.
* From the Nifi menu, drag and drop the **Template** menu.
* Choose your uploaded template.
* right-click, and select `Start`.

### 3.2 Measurements digestion

#### Processors

To create the processor, drag and drop from the following button :

<a href="https://grafana.com/" alt="Grafana"><img src="/examples/kafka/images/nifi_processor.png" width="50px" /></a>

We need to configure two processors:

1. `ConsumeKafka` processor
    * right-click on the processor > Click on `Configure` > go to `Properties` tab >
      - `Kafka Brokers`: `fadi-kafka:9092`
      - `Topic Name`: `nifi-kafka`
      - `Group ID`: `fadi`
      - `Offset Reset`: `earliest`
2. `PutDatabaseRecord` processor:
* right-click on the processor > Click on `Configure` > go to `Settings` tab > uncheck all the box on the list `Automatically Terminate Relationships`
* right-click on the processor > Click on  `Configure` > go to  `Properties` tab >
   * Statement Type: `INSERT`
   * Schema Name > `public`
   * Table Name > `example_basic`
   * Translate Field Names > `false`
* right-click on the processor > Click on `Configure` > go to `Properties` tab  > Record Reader > `Create a new service` > `CSV Reader` > click on `Go To` (the litlle arrow on the right) > Click on `Configure`(the gear on the right side) > `Properties` > set `Treat First Line as Header` to `true`
* right-click on the processor > Click on `Configure` > go to `Properties` tab  > Database Connection Pooling Service > `DBCPConnectionPool` > Click on `Go To` (the litlle arrow on the right) > Click on `Configure`(the gear on the right side) > `Properties` > set up the following values:
   * Database Connection URL: `jdbc:postgresql://fadi-postgresql:5432/postgres?stringtype=unspecified`
   * Database Driver Class Name: `org.postgresql.Driver` 
   * Database Driver Location(s): `/opt/nifi/psql/postgresql-42.2.6.jar` 
   * Database User: `admin`
   * Password: `password1` 
   * Enable service by clicking on the lightning icon.

#### Output Port

To create output port, make a drag and drop from the following button :

<img src="/examples/kafka/images/nifi_output.png" width="50px" />

Create two output ports : `success_port` and `failure_port`

#### Connections

* `Response` Connection:
    * Create an edge from `InvokeHTTP` processor to `PublishKafka`
    * Details > For relationships > `Response`

* `Success` Connection:
    * Create an edge from `PutDatabaseRecord` to `Output Success Port`  
    * Details > relationships > only `success`    

* `Failure` Connection:
    * From `PutDatabaseRecord` to `Output Failure Port`
    * Details > relationships > : only `failure`  


Here is the result you need to arrive to:

![Nifi Ingest CSV and store in PostgreSQL](/examples/kafka/images/nifi_kafka_to_sql.png)

See also [the Nifi "CSV_to_Kafka" template](/examples/kafka/nifi_template_CSV_to_Kafka.xml) that corresponds to this example.

To reuse the provided template (instead of designing your own template), you can:
* Click `Upload template` in the **Operate** frame, select the template, and upload it.
* From the Nifi menu, drag and drop the **Template** menu.
* Choose your uploaded template.
* In the **Operate** frame of Nifi:
    * right-click on `Configuration`
    * Click on `View configuration` of `DBCPConnectionPool` controller service.
    * In the `Properties` tab, complete the `password` field with `password1`
    * Enable both `CSVReader` and `DBCPConnectionPool` controller services.
    * right-click, and select `Start`.

For more information on how to use Apache Nifi, see the [official Nifi user guide](https://nifi.apache.org/docs/nifi-docs/html/user-guide.html) and this [Awesome Nifi](https://github.com/jfrazee/awesome-nifi) resources.

Finally, **start** the Nifi flow in the **operate** window.

## 4. Display dashboards and configure alerts

This step is similar to [the basic use case](/USERGUIDE.md)

## 5. Explore

This step is similar to [the basic use case](/USERGUIDE.md)

## 6. Process

This step is similar to [the basic use case](/USERGUIDE.md)

## 7. Summary

In this use case, we have demonstrated a **streaming configuration** for FADI, where we use various services to ingest, store, analyse, explore and provide dashboards and alerts.