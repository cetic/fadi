FADI User guide
=========

This page provides documentation on how to use the FADI big data framework.

A sample use case - Building monitoring at CETIC offices
---------------

![FADI sample use case - building monitoring](doc/usecases/usecase1.svg)

In this tutorial, we will ingest temperature measurements from the CETIC building sensors, store it and display them in a simple dashboard.

### 1. Install FADI

To install the FADI framework on your workstation or on a cloud, see https://github.com/cetic/fadi/INSTALL.md

### 2. Ingest and store measurements 

<a href="http://nifi.apache.org/" alt="Apache Nifi"><img src="doc/logos/nifi.png" width="100px" /></a>

> "An easy to use, powerful, and reliable system to process and distribute data."

[Apache Nifi](http://nifi.apache.org/) provides ingestion mechanism (to e.g. connect a database or API for ingestion): in this case we want to read the temperature sensors data from our HVAC system and store it in a database.

In the following video, temperature measurements from the last 5 days (see [HVAC sample temperatures extract](doc/usecases/usecase1.csv)) are ingested:



For more information on how to use Apache Nifi, see the [Nifi user guide](https://nifi.apache.org/docs/nifi-docs/html/user-guide.html)

### 3. Display 