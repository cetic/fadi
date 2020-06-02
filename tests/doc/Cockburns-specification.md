# General definitions

In this section, the main concepts and technologies are introduced in order to ease the understanding of the different test use cases.



*   **FADI platform** is a Cloud Native platform for Big Data based on mature open source tools. The FADI project is dedicated to making the deployment of Big Data tools simple, portable and scalable. The goal is to provide a straightforward way to deploy open-source systems for Big Data to various infrastructures (private and public clouds). 
*   **FADI dashboard** is actually the Kubernetes dashboard that enables to have an idea about the status of the Kubernetes pods by launching the command “minikube dashboard”.
*   **Adminer** is an open source graphical administration tool for relational databases. It is used in FADI in order to ease the management of the PostgreSQL databases.
*   **Apache Nifi** is an open source tool designed to automate the flow of data between software systems. It used in the FADI platform in order to collect data, to extract it, to transform it and to store it in the appropriate data store. 
*   **PostgreSQL** is an open source relational database management system and it is used to store the data in the FADI platform. 
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
   <td><a href="./cockburns/TC-1.md">Authentication to a given tool via LDAP</a>
   </td>
   <td>all actors
   </td>
   <td>Authentication
   </td>
  </tr>
  <tr>
   <td>TC-2
   </td>
    <td><a href="./cockburns/TC-2.md">Access to the FADI dashboard</a>
   </td>
   <td>Platform Admin, System Admin, Stakeholders, ICT manager
   </td>
   <td>IHM
   </td>
  </tr>
  <tr>
   <td>TC-3
   </td>
    <td><a href="./cockburns/TC-3.md">Defining the Nifi workflow</a>
   </td>
   <td>Data Scientist, Data Engineer
   </td>
   <td>Data ingestion
   </td>
  </tr>
  <tr>
   <td><a href="../__tests__/2-nifi.test.js" title="TC-4">TC-4</a>
   </td>
    <td><a href="./cockburns/TC-4.md">Defining the Nifi workflow by uploading a template</a>
   </td>
   <td>Data Scientist, Data Engineer
   </td>
   <td>Data ingestion
   </td>
  </tr>
  <tr>
   <td>TC-7
   </td>
    <td><a href="./cockburns/TC-7.md">Deleting a table in Adminer</a>
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-9
   </td>
    <td><a href="./cockburns/TC-9.md">Inserting data in a given table</a>
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
  <tr>
   <td>TC-10
   </td>
    <td><a href="./cockburns/TC-10.md">Configuring a data source in the Grafana dashboard</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-11
   </td>
   <td><a href="./cockburns/TC-11.md">Defining dashboards based on the analyzed data using Grafana</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-12
   </td>
    <td><a href="./cockburns/TC-12.md">Defining alerts using Grafana</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-13
   </td>
    <td><a href="./cockburns/TC-13.md">Configuring a database in Superset</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-14
   </td>
    <td><a href="./cockburns/TC-14.md">Configuring a table in Superset</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-15
   </td>
    <td><a href="./cockburns/TC-15.md">Creating a chart in Superset</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-16
   </td>
    <td><a href="./cockburns/TC-16.md">Saving a dashboard in Superset</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-17
   </td>
    <td><a href="./cockburns/TC-17.md">Preparing reports using Superset</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-18
   </td>
    <td><a href="./cockburns/TC-18.md">Loading data in Jupyter</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-19
   </td>
    <td><a href="./cockburns/TC-19.md">Analyzing data using Jupyter</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Data processing
   </td>
  </tr>
  <tr>
   <td>TC-20
   </td>
    <td><a href="./cockburns/TC-20.md">Loading data in Spark</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TC-21
   </td>
    <td><a href="./cockburns/TC-21.md">Analyzing data using Spark</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Data processing
   </td>
  </tr>
</table>
