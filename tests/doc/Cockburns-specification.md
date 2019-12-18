# General definitions

In this section, the main concepts and technologies are introduced in order to ease the understanding of the different test use cases.



*   **FADI platform** is a Cloud Native platform for Big Data based on mature open source tools. The FADI project is dedicated to making the deployment of Big Data tools simple, portable and scalable. The goal is to provide a straightforward way to deploy open-source systems for Big Data to various infrastructures (private and public clouds). 
*   **FADI dashboard** is actually the Kubernetes dashboard that enables to have an idea about the status of the Kubernetes pods by launching the command “minikube dashboard”.
*   **Apache Nifi** is an open source tool designed to automate the flow of data between software systems. It used in the FADI platform in order to collect data, to extract it, to transform it and to store it in the appropriate data store. 
*   **PostgreSQL** is an open source relational database management system and it is used to store the data in the FADI platform. 
*   **PgAdmin** is an open source graphical administration tool for PostgreSQL databases. It is used in FADI in order to ease the management of the PostgreSQL databases.
*   **Grafana** is an open source tool enabling the visualization and the formatting of metrics data coming from different type of databases. It can play the role of the FADI dashboard.
*   **Apache Superset** is an open source tool to visualize big data and it can play the role of th FADI dashboard.
*   **Spark** is an open source analytics engine for large-scale data processing. It is used in the FADI platform to analyse data.
*   **Jupyter** is a notebook  that provides an easy interface to the Spark processing engine that runs on your cluster. It is used in the FADI platform to enable the use of Spark and explore data.


# Abbreviations list


<table>
  <tr>
   <td>Abbreviation
   </td>
   <td>Meaning
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>



# Actors


<table>
  <tr>
   <td>The client side
   </td>
   <td>
<ul>

<li><strong>Operator (</strong>Fraiseur/responsable de maintenance)<strong> (co)</strong>: operator on machine. He must understand information given by analysis dashboards to achieve his work.

<li><strong>Factory Leader (cfl)</strong>:<strong> </strong>he manages the factory (Tenant) and the Operators.

<li><strong>Business Analyst (cba)</strong>: he builds BI analysis dashboard based on the data warehouse.

<li><strong>Business Leader (cbl)</strong>: He manages the business of the factory (Tenant) and the Business Analysts.

<li><strong>Data Scientist (cds)</strong>: he defines algorithms to analyse data for trends identification. He defines the data warehouse structure and content.

<li><strong>Data Engineer (cde)</strong>: he configures the resources the Data Scientist needs and the ingestion process from the factories to the datalake.

<li><strong>Tenant Admin (cta)</strong>: it is the user in charge of the Tenant.
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>The backend side
   </td>
   <td>
<ul>

<li><strong>Platform Admin (hpa)</strong>: he manages tenants.

<li><strong>System Admin (hsa)</strong>: he installs and maintains the platform.

<li><strong>Stakeholders (hs)</strong>: board of directors.

<li><strong>ICT manager (hm)</strong>: he manages the project, the Platform Admin and the System Admin.
</li>
</ul>
   </td>
  </tr>
</table>



# Test case list


<table>
  <tr>
   <td><strong>Test case ID</strong>
   </td>
   <td><strong>Test case name</strong>
   </td>
   <td><strong>Primary Actor</strong>
   </td>
   <td><strong>Scope</strong>
   </td>
  </tr>
  <tr>
   <td>TC-1
   </td>
   <td>Authentication to a given tool via LDAP
   </td>
   <td>all actors
   </td>
   <td>Authentication
   </td>
  </tr>
  <tr>
   <td>TC-2
   </td>
   <td>Access to the FADI dashboard
   </td>
   <td>Platform Admin, System Admin, Stakeholders, ICT manager
   </td>
   <td>IHM
   </td>
  </tr>
  <tr>
   <td>TC-3
   </td>
   <td>Defining the Nifi workflow
   </td>
   <td>Data Scientist, Data Engineer
   </td>
   <td>Data ingestion
   </td>
  </tr>
  <tr>
   <td>TC-4
   </td>
   <td>Defining the Nifi workflow by uploading a template
   </td>
   <td>Data Scientist, Data Engineer
   </td>
   <td>Data ingestion
   </td>
  </tr>
  <tr>
   <td>TC-5
   </td>
   <td>Creating a database server in pgAdmin
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-6
   </td>
   <td>Creating a table in pgAdmin
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-7
   </td>
   <td>Deleting a table in pgAdmin
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-8
   </td>
   <td>Deleting a database in pgAdmin
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-9
   </td>
   <td>Inserting data in a given table
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-10
   </td>
   <td>Configuring a data source in the Grafana dashboard
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-11
   </td>
   <td>Defining dashboards based on the analyzed data using Grafana
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-12
   </td>
   <td>Defining alerts using Grafana
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-13
   </td>
   <td>Configuring a database in Superset
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-14
   </td>
   <td>Configuring a table in Superset 
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-15
   </td>
   <td>Creating a chart in Superset 
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-16
   </td>
   <td>Saving a dashboard in Superset 
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-17
   </td>
   <td>Preparing reports using Superset
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-18
   </td>
   <td>Loading data in Jupyter 
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-19
   </td>
   <td>Analyzing data using Jupyter
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Data processing
   </td>
  </tr>
  <tr>
   <td>TC-20
   </td>
   <td>Loading data in Spark
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-21
   </td>
   <td>Analyzing data using Spark
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Data processing
   </td>
  </tr>
</table>



## TC-1:Authentication to a given tool via LDAP


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-1
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Authentication to a given tool via LDAP
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>All actors
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >The actor wants to use one service of the FADI platform for the first time
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >This use case denotes the process of the authentication to the FADI platform.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor credentials should exist in the LDAP repository

<li>The FADI platform is already installed

<li>The actor already knows the URL address of the desired service (e.g grafana, pgAdmin, etc.) 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor is authenticated
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>The actor access to a given service via its URL address
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>The actor enter his/her credentials
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>The actor is authenticated
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor credentials does’t not exist in the LDAP repository

<li>The actor makes an error when entering his/her credentials
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the use is not logged-in in the FADI platform
</li>
</ul>
   </td>
  </tr>
</table>



## TC-2: Access to the FADI dashboard


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-2
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Access to the FADI dashboard
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Platform Admin 

<li>System Admin 

<li>Stakeholders 

<li>ICT manager
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Check the state of a given pod

<li>Check the installation of the FADI framework
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The dashboard of FADI enables the actor to access to a web interface in order to check the status of the installed services (called also pods).  
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The FADI is already installed

<li>The actor knows the namespace of FADI (e.g. fadi)
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor checks the status of a service
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the dashboard of FADI platform
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Select the appropriate dashboard
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Check if there is some dashboards and information about the installed services
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor does not find the service
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime an actor wants to check the status of a given service
</li>
</ul>
   </td>
  </tr>
</table>



## TC-3: Defining the Nifi workflow


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-3
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Defining the Nifi workflow
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Scientist 

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Adding a new industrial partner

<li>Adding a new data type

<li>Adding a new database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The Fadi platform enables the actors to define a workflow denoting how to collect and store data stream/batch. For this purpose, it integrates Nifi which is an open source tool to automate the flow of data between software systems.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Nifi service

<li>The actor is already authenticated in the FADI platform

<li>The actor knows the authentication credentials of the target database (e.g. the username and the password of the PostgreSQL database)

<li>The actor knows  
<ul>
 
<li>the name of the target database and the table
 
<li>the database connection URL, the database driver class name, database driver location, etc.
</li> 
</ul>

<li>The actor knows the source sending the data (e.g. data stream, a CSV file, etc.)
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The Nifi workflow is created and is successfully launched
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Nifi interface
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Create the desired Nifi workflow
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Launch the created workflow to start storing the data in the target database
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the actor has new data coming to the FADI framework
</li>
</ul>
   </td>
  </tr>
</table>



## TC-4: Defining the Nifi workflow by uploading a template


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-4
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Defining the Nifi workflow by uploading a template
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Scientist 

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Adding a new industrial partner

<li>Adding a new data type

<li>Adding a new database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The Fadi platform enables the actors to define a workflow denoting how to collect and store data stream/batch. For this purpose, it integrates Nifi which is an open source tool to automate the flow of data between software systems. In this use case, the actor will upload an existing template to create the Nifi workflow
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Nifi service

<li>The actor is already authenticated in the FADI platform

<li>The actor knows the source sending the data (e.g. data stream, a CSV file, etc.)

<li>The actor has the Nifi template
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The Nifi workflow is created and is successfully launched
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="8" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Nifi interface
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Upload the Nifi template
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Drag and Drop the imported template
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Configure the password to connect to the database
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Enable both the required controller services.
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Select the whole workflow and start the process
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Launch the created workflow to start storing the data in the target database
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Check that the data is correctly stored
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error when upload the Nifi template
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the actor has new data coming to the FADI framework
</li>
</ul>
   </td>
  </tr>
</table>



## TC-5: Creating a database server in pgAdmin


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-5
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Creating a database server in pgAdmin
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Adding a new industrial partner

<li>Adding a new data type
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to create database server using the tool pgAdmin. This use case allows to test if the database creation is successfully achieved.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the pgAdmin service

<li>The actor is connected to pgAdmin

<li>The actor knows the credentials of PostreSQL 
<ul>
 
<li>Host name: fadi-postgresql 
 
<li>Port: 5432 
 
<li>Maintenance database: postgres 
 
<li>Username: admin 
 
<li>Password: password1 
</li> 
</ul>
</li> 
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The database is created
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="5" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the interface to create a database server
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Enter the name of the database server in the “General” tab
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Enter the credentials of PostgreSQL in the “Connection” tab
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Save the edited information
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Check the existence of the new database 
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The credentials of PostgreSQL are not correct
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time a new database needs to be created
</li>
</ul>
   </td>
  </tr>
</table>



## TC-6: Creating a table in pgAdmin


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-6
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Creating a table in pgAdmin
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Creating a new table in the PostgreSQL database

<li>Adding a new industrial partner 

<li>Adding a new data type
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to create a new table via the interface of the pgAdmin tool. This use case allows to test whether the table creation is successfully achieved.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the pgAdmin service

<li>The database in which the table will be created already exists

<li>The actor is connected to pgAdmin

<li>The actor knows the name of the table to be created

<li>The actor knows the name of the target database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The table is created
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the interface to create a table
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Execute the creation query
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Check the existence of the new table
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The table already exists

<li>There is an error in the creation query
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the actor wants to create a new table
</li>
</ul>
   </td>
  </tr>
</table>



## TC-7: Deleting a table in pgAdmin


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-7
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Deleting a table in pgAdmin
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Removing a table from the PostgreSQL database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to delete a table via the interface of the pgAdmin tool. This use case allows to test whether the table deletion is successfully achieved.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the pgAdmin service

<li>The actor is connected to pgAdmin

<li>The table to delete already exists

<li>The database in which the table will be deleted already exists

<li>The actor knows the name of the table to be deleted

<li>The actor knows the name of the database containing the table
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The table is deleted
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the interface to delete a table
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Execute the deletion query
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Check the existence of the table (i.e. it should be deleted)
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The table does not exist

<li>There is an error in the deletion query
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the actor wants to delete a table
</li>
</ul>
   </td>
  </tr>
</table>



## TC-8: Deleting a database in pgAdmin


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-8
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Deleting a database in pgAdmin
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Removing a database from PostgreSQL
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to delete a database via the interface of the pgAdmin tool. This use case allows to test whether the database deletion is successfully achieved.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the pgAdmin service

<li>The actor is connected to pgAdmin

<li>The database to delete already exists

<li>The actor knows the name of the database to be deleted
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The database is deleted
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the interface to delete a database
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Execute the deletion query
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Check the existence of the database (i.e. it should be deleted)
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The database does not exist

<li>There is an error in the deletion query
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the actor wants to delete a database
</li>
</ul>
   </td>
  </tr>
</table>



## TC-9: Inserting data in a given table


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-9
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Inserting data in a given table
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Engineer
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Collecting stream data

<li>Collecting batch data

<li>Storing analyzed data

<li>Storing results (etc. analysis, dashboards, etc.)
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to collect data and to store it in a given database either via the pgAdmin interface or by defining a data workflow using Nifi. This use case allows to test whether the data insertion is successfully achieved.
<p>
In this use case, we will implement the case of data insertion using Nifi.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Nifi service

<li>The actor is connected to the FADI platform

<li>The target table already exists

<li>The actor knows the name of the table to be deleted

<li>The actor knows the name of the database containing the table
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The data is correctly inserted
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="7" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Nifi service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Upload a Nifi template
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Drag and Drop the imported template
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Configure the password to connect to the database
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Enable both the required controller services.
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Select the whole workflow and start the process
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Check that the data is correctly inserted in the database by verifying the success connection.
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error in the password of the database

<li>The controller services are enabled

<li>The data is not stored
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime data (stream or batch) is collected by the FADI platform
</li>
</ul>
   </td>
  </tr>
</table>



## TC-10: Configuring a data source in the Grafana dashboard


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-10
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Configuring a data source in the Grafana dashboard
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Visualizing results coming from a new database

<li>Connecting Grafana to a database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize data and results in various types of dashboards (e.g. curves, heatmaps, etc.) either by directly querying the databases or by collecting stream data. 
<p>
In this use case, the Grafana tool will be used and the way to connect this tool to a database is defined.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Grafana service

<li>The actor knows the credentials to connect to the Grafana service

<li>The actor knows the required credentials to connect to the database (i.e. host, database, user, password, SSL mode, Version)
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The Grafana tool is connected to the database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="5" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Grafana service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Grafana service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Add a data source and choose the type “PostgreSQL”
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Configure the following elements:
<ul>

<li>Host: fadi-postgresql:5432 

<li>database: postgres 

<li>user: admin 

<li>password: password1 

<li>SSL Mode: disable 

<li>Version: 10
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Check that the database is correctly created
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>An error in the credentials
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time a new database should be connected to the Grafana tool
</li>
</ul>
   </td>
  </tr>
</table>



## TC-11: Defining dashboards based on the analyzed data using Grafana 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-11
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Defining dashboards based on the analyzed data using Grafana
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Visualizing results in dashboards

<li>Realizing a global overview about the results
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize data and results in various types of dashboards (e.g. curves, heatmaps, etc.) either by directly querying the databases or by collecting stream data. 
<p>
In this use case, the Grafana tool will be used.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Grafana service

<li>The actor knows the credentials to connect to the Grafana service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor visualizes dashboards
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="7" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Grafana service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Grafana service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Choose the source of data
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Edit a new dashboard
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Select the type of a dashboard from the Visualization dropdown list (e.g. graph, heatmap, etc.)
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Edit the query
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Configure the time frame (if needed)
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>8
   </td>
   <td>Press on the Query inspector button to execute the query and visualize the dashboard
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>An error in the query
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the actor wants to visualize his/her results
</li>
</ul>
   </td>
  </tr>
</table>



## TC-12: Defining alerts using Grafana 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-12
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Defining alerts using Grafana
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Controlling visualized data

<li>Detecting anomalies
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize data and results in various types of dashboards (e.g. curves, heatmaps, etc.). In addition, it allows users to define alerts and rules in order to automatically detect misbehaviours, anomalies and errors when analyzing data. 
<p>
In this use case, the Grafana tool will be used
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Grafana service

<li>The actor knows the credentials to connect to the Grafana service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor visualizes the defined alert
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="12" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Grafana service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Grafana service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Add a data source and choose the type “PostgreSQL”
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Configure the following elements:
<ul>

<li>Host: fadi-postgresql:5432 

<li>database: postgres 

<li>user: admin 

<li>password: password1 

<li>SSL Mode: disable 

<li>Version: 10
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Edit a new dashboard
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Select the type of a dashboard from the Visualization dropdown list (e.g. graph, heatmap, etc.)
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Configure the query
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Configure the time frame (if needed)
   </td>
  </tr>
  <tr>
   <td>9
   </td>
   <td>Press on the Query inspector button to execute the query and visualize the dashboard
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>Go to the “Alert” tab
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>Create a new alert by specifying the alert threshold
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>Visualize the alert in the dashboard
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >N/A
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the actor wants to defines alerts
</li>
</ul>
   </td>
  </tr>
</table>



## TC-13: Configuring a database in Superset 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-13
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Configuring a database in Superset
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Visualize results coming from a new database

<li>Visualize results for the first time 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize the results of the data analysis and to export these results in reports. In this context, the Superset tool is used. The first thing to do is to link Superset to a data source.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Superset service

<li>The actor knows the credentials to connect to the Superset service

<li>The actor knows the credentials of the database (i.e. the database name, SQLAlchemy URI) 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The database is linked to the Superset
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="4" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Superset service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Superset service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Create a new database by entering the following information: 
<p>
the Database and the SQLAlchemy URI
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Confirm the creation by clicking on the “Test Connection” button to check the connection to the database
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error in the entered information

<li>The connection to the database failed
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time an actor wants to visualize data coming from a database which is not connected to Superset
</li>
</ul>
   </td>
  </tr>
</table>



## TC-14: Configuring a table in Superset 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-14
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Configuring a table in Superset
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Visualize results coming from a new table

<li>Visualize results for the first time 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize the results of the data analysis and to export these results in reports. In this context, the Superset tool is used to configure a table in a given database. 
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Superset service

<li>The actor knows the credentials to connect to the Superset service

<li>The actor knows the schema of the database

<li>The actor knows the name of the table
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The table is configured
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="7" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Superset service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Superset service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Create a new table by editing the following information: the database name and the table name
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Save the edited values
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Edit the columns of the created table by 
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Save the edited information
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Check that the table and the columns are correctly configured
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error in the entered information
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time an actor wants to visualize data coming from a given table
</li>
</ul>
   </td>
  </tr>
</table>



## TC-15: Creating a chart in Superset 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-15
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Creating a chart in Superset
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Visualize results in a chart
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize the results of the data analysis and to export these results in reports. In this use case, the Superset tool is used to create a chart in order to visualize the results. 
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Superset service

<li>The actor knows the credentials to connect to the Superset service

<li>The actor knows the schema of the database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>A chart is created
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="10" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Superset service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Superset service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>On the top menu, click on “Chart”
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Add a new record
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Choose the datasource
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Choose the visualization type
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Click “Create new chart”
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Configure the chart by defining the time requirements and the query
   </td>
  </tr>
  <tr>
   <td>9
   </td>
   <td>Click “Run query” to fetch the data from the database
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>Check the chart is correctly created
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error during the authentication

<li>Error in the edited information

<li>Error in the query
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the user wants to create a chart
</li>
</ul>
   </td>
  </tr>
</table>



## TC-16: Saving a dashboard in Superset 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-16
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Saving a dashboard in Superset
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Save a new dashboard

<li>Save a dashboard after a modification 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize the results of the data analysis and to export these results in reports. In this use case, the Superset tool is used to create and save a dashboard.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Superset service

<li>The actor knows the credentials to connect to the Superset service

<li>The actor knows the schema of the database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The dashboard is saved
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="6" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Superset service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Superset service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Create/modify a dashboard
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Click on “save” and edit the following information
<ul>

<li>Save as: Basic example 

<li>Add to new dashboard: Basic example dashboard 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Click on Save & go to dashboard.
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Visualize the saved dashboard
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error during the authentication

<li>Error editing the information
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the user creates or modifies a chart
</li>
</ul>
   </td>
  </tr>
</table>



## TC-17: Preparing reports using Superet


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-17
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Preparing reports using Superset
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Visualize and report the results
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to visualize the results of the data analysis and to export these results in reports. In this context, the Superset tool is used.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Superset service

<li>The actor knows the credentials to connect to the Superset service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>A report is generated
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="7" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Superset service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Superset service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Create a new database
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Create a new table in the database
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Create and configure a new chart by using the created database and table
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Visualize the resulted chart
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Export the resulted chard in a report
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error when creating the database

<li>Error when creating the table
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time an actor wants to visualize data and export results in reports
</li>
</ul>
   </td>
  </tr>
</table>



## TC-18: Loading data in Jupyter 


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-26
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Loading data in Jupyter
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Using data for the first time

<li>Having a new database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to process analysis techniques on the collected data. It provides to do simple analysis using the Jupyter tool. In this use case, the loading of the scripts is checked.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Jupyter service

<li>The actor know the credentials to connect to the Jupyter service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 

<li>The actor possesses the two code scripts to upload
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data is loaded
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="5" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Jupyter service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Jupyter service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Choose the “Minimal environment” option and click on “Spawn”
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Import the script(s)
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Check that the script is correctly loaded
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The connection to the database fails

<li>The authentication fails
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the user wants to load scripts in Jupyter
</li>
</ul>
   </td>
  </tr>
</table>



## TC-19: Analyzing data using Jupyter


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-17
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Analyzing data using Jupyter
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor wants to analyse data
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to process analysis techniques on the collected data. It provides to do simple analysis using the Jupyter tool. 
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Jupyter service

<li>The actor know the credentials to connect to the Jupyter service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 

<li>The actor possesses the two code scripts to upload
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The data is analyzed
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="6" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Jupyter service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Jupyter service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>In the option “Minimal environment”, go the “Files” tab
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Select the loaded script (i.e. module)
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Run the scripts to configure the connection to the database and visualize temperature curve as function of date
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Check that the scripts are executed with success
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The connection to the database fails

<li>The authentication fails
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the user wants to process analysis on data
</li>
</ul>
   </td>
  </tr>
</table>



## TC-20: Loading data in Spark


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-27
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Loading data in Spark
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Using data for the first time

<li>Having a new database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to process analysis techniques on the collected data. It provides to do complex analysis using the Spark tool. In this use case, the script loading is described.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Spark service

<li>The actor know the credentials to connect to the Spark service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 

<li>The actor possesses the scripts to upload
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The data is analyzed
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="5" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Spark service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Spark service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Choose the option “Spark environment” and Click the “Spawn” button
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Upload the code script to explore Spark
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Check that script is correctly uploaded
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The connection to the database fails

<li>The authentication fails
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the user wants to load scripts in Spark
</li>
</ul>
   </td>
  </tr>
</table>



## TC-21: Analyzing data using Spark


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-18
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Analyzing data using Spark
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Business Analyst 

<li>Business Leader
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor wants to analyse data
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The FADI platform enables to process analysis techniques on the collected data. It provides to do complex analysis using the Spark tool. 
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Spark service

<li>The actor know the credentials to connect to the Spark service

<li>The actor knows the schema of the target database (i.e. name of tables, name of attributes, etc.) 

<li>The actor possesses the scripts to upload
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The data is analyzed
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="5" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Spark service
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Authenticate to the Spark service
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Choose the option “Spark environment” and Click the “Spawn” button
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Launch the uploaded scripts to analyze data
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Check that the scripts are executed with success
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The connection to the database fails

<li>The authentication fails
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the actor wants to process analysis on data
</li>
</ul>
   </td>
  </tr>
</table>
