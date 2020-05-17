FADI User guide
=========

This page provides documentation on how to use the FADI big data framework using a sample use case: monitoring CETIC offices building.

 * [1. Install FADI](#1-install-fadi)
 * [2. Prepare the database to store measurements](#2-prepare-the-database-to-store-measurements)
 * [3. Ingest measurements](#3-ingest-measurements)
 * [4. Display dashboards and configure alerts](#4-display-dashboards-and-configure-alerts)
 * [5. Explore](#5-explore)
 * [6. Process](#6-process)
 * [7. Summary](#7-summary)

![FADI sample use case - building monitoring](examples/basic/images/uc.svg)

In this simple example, we will ingest temperature measurements from sensors, store them and display them in a simple dashboard.

## 1. Install FADI

To install the FADI framework on your workstation or on a cloud, see the [installation instructions](INSTALL.md). 

The components needed for this use case are the following:

* Apache Nifi as a integration tool to ingest the sensor data from the data source (a csv file in this case) and store it in the database
* PostgreSQL as both a datawarehouse and datalake
* Gafana as a dashboard tool to display graphs from the data ingested and stored in the datalake
* Superset as a exploration dashboard tool
* Jupyter as a web interface to explore the data using notebooks

Those components are configured in the following [sample config file](helm/values.yaml), once the platform is ready, you can start working with it. 

The following instructions assume that you deployed FADI on your workstation inside minikube.

Unless specified otherwise, all services can be accessed using the username and password pair: `admin` / `password1` , see the [user management documentation](doc/USERMANAGEMENT.md) for detailed information on how to configure user identification and authorization (LDAP, RBAC, ...).

See the [logs management documentation](doc/LOGGING.md) for information on how to configure the management of the various service logs.

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
![Postgres Server](examples/basic/images/adminer_create_table.png)

* Execute the creation query by clicking on the `Execute` command. 

* Once the previous steps are finished, you can detect that a new table `example_basic` is created in the `Tables` field of adminer Browser. 

## 3. Ingest measurements 

<a href="http://nifi.apache.org/" alt="Apache Nifi"><img src="doc/images/logos/nifi.png" width="100px" /></a>

> "An easy to use, powerful, and reliable system to process and distribute data."

[Apache Nifi](http://nifi.apache.org/) provides ingestion mechanism (to e.g. connect a database, REST API, csv/json/avro files on a FTP, ... for ingestion): in this case we want to read the temperature sensors data from our HVAC system and store it in a database.

Temperature measurements from the last 5 days (see [HVAC sample temperatures csv extract](examples/basic/sample_data.csv)) are ingested:

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
2019-06-23 14:09:03.503,22.5
2019-06-23 14:09:33.503,22.5
2019-06-23 14:10:03.503,22.5
2019-06-23 14:10:33.504,22.5
2019-06-23 14:11:03.503,22.5
2019-06-23 14:11:33.503,22.5
2019-06-23 14:12:03.503,22.5
2019-06-23 14:12:33.504,22.5
2019-06-23 14:13:03.504,22.5
2019-06-23 14:13:33.504,22.5
2019-06-23 14:14:03.504,22.5
(...)
```

To start, head to the Nifi web interface, if you are using **minikube**, you can use the following command :
```
minikube service -n fadi fadi-nifi
```

![Nifi web interface](examples/basic/images/nifi_interface.png)

Now we need to tell Nifi to read the csv file and store the measurements in the data lake. 

So, create the following components : 

* InvokeHTTP processor:
    * right-click > `Configure` > `Settings` tab > `Automatically Terminate Relationships` : all except `Response`
    * right-click > `Configure` > `Properties` tab > Remote url: `https://raw.githubusercontent.com/cetic/fadi/master/examples/basic/sample_data.csv`
    * right-click > `Configure` > `Scheduling` tab > Run Schedule: 120s (this will download the sample file every 120 seconds)
* PutDatabaseRecord processor:
    * right-click > `Configure` > `Settings` tab > `Automatically Terminate Relationships` : all
    * right-click > `Configure` > `Properties` tab  > Record Reader > `Create a new service` > `CSV Reader`
         * `Go To` > `Configure` > `Properties` > 
         * Treat First Line as Header: `true`
    * right-click > `Configure` > `Properties` tab  > Statement Type: `INSERT`
    * right-click > `Configure` > `Properties` tab  > Database Connection Pooling Service > DBCPConnectionPool
        * `Go To` > `Configure` > `Properties` > 
            * Database Connection URL: `jdbc:postgresql://fadi-postgresql:5432/postgres?stringtype=unspecified`
            * Database Driver Class Name: `org.postgresql.Driver`
            * Database Driver Location(s): `/opt/nifi/psql/postgresql-42.2.6.jar`
            * Database User: `admin`
            * Password: `password1`
            * Enable service by clicking on the lightning icon.
    * right-click > `Configure` > `Properties` tab  > Schema Name > `public`
    * right-click > `Configure` > `Properties` tab  > Table Name > `example_basic`
    * right-click > `Configure` > `Properties` tab  > Translate Field Names > `false`
    * Now we need to enable the controller services:
        * Click anywhere on the Nifi workbench. 
        * Click on the `configuration` button. 
        * Enable both controller services.
        
* Response Connection:
    * Create an edge from `InvokeHTTP` processor to `PutDatabaseRecord`
    * Details > For relationships > `Response`
    
* Output Port:
    * Port Name > : `success_port`     

* Output Port:
    * Port Name > : `failure_port`   

* `Success` Connection:
    * Create an edge from `PutDatabaseRecord` to `Output Success Port`  
    * Details > relationships > only `success`    
    
* `Failure` Connection:
    * From `PutDatabaseRecord` to `Output Failure Port`
    * Details > relationships > : only `failure`   
    
* Recursive Connection on `DatabaseRecord`:
    * Details > relationships > only `retry`   

* Select both processors and both output ports
        * right-click, and select `Start`. 
        
![Nifi Ingest CSV and store in PostgreSQL](examples/basic/images/nifi_csv_to_sql_2.png)

See also [the nifi template](/examples/basic/basic_example_final_template.xml) that corresponds to this example. 
* To reuse the provided template (instead of designing our own template), you can:
    * Click `Upload template` in the **Operate** frame, select the template, and upload it.
    * From the Nifi menu, drag and drop the **Template** menu.
    * Choose your uploaded template. 
    * In the **Operate** frame of Nifi:
        * right-click on `Configuration`
        * Click on `View configuration` of `DBCPConnectionPool` controller service. 
        * In the `Properties` tab, complete the `password` field with `password1`
        * Enable both `CSVReader` and `DBCPConnectionPool` controller services.
    * Select both processors and both output ports
        * right-click, and select `Start`. 

For more information on how to use Apache Nifi, see the [official Nifi user guide](https://nifi.apache.org/docs/nifi-docs/html/user-guide.html) and this [Awesome Nifi](https://github.com/jfrazee/awesome-nifi) resources.

Finally, **start** the nifi flow in the **operate** window. 

## 4. Display dashboards and configure alerts

Once the measurements are stored in the database, we will want to display the results in a dashboard.

<a href="https://grafana.com/" alt="Grafana"><img src="doc/images/logos/grafana.png" width="100px" /></a>

> "Grafana allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data driven culture."

[Grafana](http://grafana.com/) provides a dashboard and alerting interface.

Head to the Grafana interface, if you are using **minikube**, you can use the following command :
```
minikube service -n fadi fadi-grafana
``` 
(the default credentials are `admin`/`password1`)

![Grafana web interface](examples/basic/images/grafana_interface.png)

First we will define the PostgreSQL datasource. To do that, in the Grafana Home Dashboard

* Select `Add data source`,
* Choose data source type: `PostgreSQL`,
* Complete the seeting as:
    * Host: `fadi-postgresql:5432`
    * database: `postgres`
    * user: `admin`
    * password: `password1`
    * SSL Mode: `disable`
    * Version: `10`

![Grafana datasource](examples/basic/images/grafana_datasource.gif)

Then we will configure a simple dashboard that shows the temperatures captured in the PostgreSQL database:

* Select `New dashboard`,
* Select `Choose Visualization`

A pre-filled SQL query is provided and shown in the **Queries** tab.

You can complete the `Where` clause with the following expression: `Expr: temperature > 20` for example.

To show the dashboard, it is necessary to specify a time frame between `2019-06-23 16:00:00` and `2019-06-28 16:00:00`.

![Grafana dashboard](examples/basic/images/grafana_time_frame.png)

Then, a diagram is displayed in the Grafana dashboard. 

![Grafana dashboard](examples/basic/images/grafana_dashboard.png)

And finally we will configure some alerts using very simple rules:
* Select `Alert` tab.
* Click on `Create Alert`
* Specify the alert threshold.
![Grafana alert](examples/basic/images/grafana_alerting.png)

For more information on how to use Grafana, see the [official Grafana user guide](https://grafana.com/docs/guides/getting_started/)

## 5. Explore

<a href="https://superset.incubator.apache.org/" alt="Superset"><img src="doc/images/logos/superset.png" width="100px" /></a>

> "BI tool with a simple interface, feature-rich when it comes to views, that allows the user to create and share dashboards. This tool is simple and doesn’t require programming, and allows the user to explore, filter and organise data."

[Apache Superset](https://superset.incubator.apache.org) provides some interesting features to explore your data and build basic dashboards.

Head to the Superset interface, if you are using **minikube**, you can use the following command :
```
minikube service -n fadi fadi-superset
``` 
(the default credentials are `admin`/`password1`): 

First we will define the datasource:

* On the top menu of Superset, click on `Sources` -> `Databases`

* Then, on the right, click on (+) (`add a new record` button).
    * Database: `example_basic`
    * SQLAlchemy URI: `postgresql://admin:password1@fadi-postgresql:5432/postgres`

* Finally, you can click on `Test Connection` to check to connection to the database.

![Superset datasource](examples/basic/images/superset_datasource.png)

* Once the database is created, we can now create a table. 
    * On the top menu of Superset, click on `Sources` -> `Tables`
    * Click on (+) (`add a new record` button).
    * Database: select `example_basic`. 
    * Table name: `example_basic`.
    * Click `Save`.
    * On the table `example_basic`, click `Edit record` button.
    * On the `List Columns` tab, in the `measure_ts`, click on the `Edit record` button. 
    * In the "Expression" box, enter `measure_ts ::timestamptz`.
    * Click `Save`.

![Superset table](examples/basic/images/superset_table.gif)
  
Then we will explore our data and build a simple dashboard with the data that is inside the database:

* On the top menu of Superset, click on `Charts` 
* Click on (+) (`add a new record` button).
* Choose a datasource: select `example_basic`. 
* Choose a visualization type: `Time Series - Line Chart`.
* Click `Create new chart`.
* In the `Data` tab 
    * in `Time` section, 
       * Time Grain: `hour`.
       * Time range: `Last quarter`
    * in `Query` section
       * Metrics: `AVG(temperature)`
       * Click `Save`
* Then, in the main window of the dashboard, click on `Run Query`.

A diagram will be shown.

* We can now save the dashboard, by clicking on `Save`.
   * Save as: `Basic example`
   * Add to new dashboard: `Basic example dashboard`
   * Click on `Save & go to bashboard`.
    
![Superset dashboard](examples/basic/images/superset_dashboard.gif)

For more information on how to use Superset, see the [official Superset user guide](https://superset.incubator.apache.org/tutorial.html)

## 6. Process

<a href="https://spark.apache.org/" alt="Apache Spark"><img src="doc/images/logos/spark.png" width="100px" /></a>

> "Apache Spark™ is a unified analytics engine for large-scale data processing."

[Jupyter](https://jupyter.org/) notebooks provide an easy interface to the [Spark](https://spark.apache.org/) processing engine that runs on your cluster.

In this simple use case, we will try to access the data that is stored in the data lake.

Head to the Jupyter notebook interface,  if you are using **minikube**, you can use the following command : 
```
minikube service -n fadi proxy-public
```  
Then, you can login using the default credentials `admin`/`password1`.

A Jupyter dashboard is shown. 

Choose `Minimal environment` and click on `Spawn`.

![Jupyter web interface](examples/basic/images/jupyter_interface.png)

* You can now do some data exploration in the notebook
   * At first, you load the [sample code](examples/basic/jupyter_exploration.ipynb):

![Jupyter exploration](examples/basic/images/jupyter_exploration.gif)

   * Click on the `jupyter_exploration.ipynb` module and run the different scripts.
   * You should obtain results similar to that: 

![Jupyter results1](examples/basic/images/jupyter_results_1.png)
![Jupyter results2](examples/basic/images/jupyter_results_2.png)
   
* Now, we will do some Spark processing in the notebook. Before starting, you need to change the environment. So:
   * Click on `Control panel`
   * Click on `Stop my server`
   * Finally, click on `Start server`, choose `Spark environment` and click on `Spawn`.

![Jupyter web interface](examples/basic/images/spark_interface.png)

* You can now load the [sample code](examples/basic/jupyter_spark.ipynb)
* Run the different scripts
* You should obtain results similar to that:

![Jupyter processing](examples/basic/images/spark_results.png)

For more information on how to use Superset, see the [official Jupyter documentation](https://jupyter.readthedocs.io/en/latest/)

## 7. Summary

In this use case, we have demonstrated a simple configuration for FADI, where we use various services to ingest, store, analyse, explore and provide dashboards and alerts 

You can find the various resources for this sample use case (Nifi flowfile, Grafana dashboards, ...) in the [examples folder](examples/basic)

The examples section contains other more specific examples (e.g. [Kafka streaming ingestion](examples/kafka/README.md))