# Abbreviations list
<table>
  <tr>
   <td><strong>Abbreviation</strong>
   </td>
   <td><strong>Meaning</strong>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>

# Actors abbreviations list
<table>
  <tr>
   <td><strong>Abbreviation</strong>
   </td>
   <td><strong>Meaning</strong>
   </td>
  </tr>
  <tr>
   <td>JEST
   </td>
   <td>The test runner
   </td>
  </tr>
  <tr>
   <td>PUP
   </td>
   <td>The API controlling operations on Google Chrome
   </td>
  </tr>
</table>

# Description of the content of the table
<table>
  <tr>
   <td><strong>Column</strong>
   </td>
   <td><strong>Meaning</strong>
   </td>
  </tr>
  <tr>
   <td>Test script ID
   </td>
   <td>The identifier of the test script 
   </td>
  </tr>
  <tr>
   <td>Test script name 
   </td>
   <td>The name of the test script 
   </td>
  </tr>
  <tr>
   <td>Actions 
   </td>
   <td>The action(s) to do for testing an assertion 
   </td>
  </tr>
  <tr>
   <td>Assertion
   </td>
   <td>Test to do once the actions have been realized 
   </td>
  </tr>
  <tr>
   <td>Comment
   </td>
   <td>Issues found / comment
   </td>
  </tr>
</table>

# Test scripts list
<table>
  <tr>
   <td><strong>Test script ID</strong>
   </td>
   <td><strong>Related use case</strong>
   </td>
   <td><strong>Test script name</strong>
   </td>
   <td><strong>Primary Actor</strong>
   </td>
   <td><strong>Scope</strong>
   </td>
  </tr>
  <tr>
   <td>TS-4
   </td>
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
   <td>TS-11
   </td>
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
   <td>TS-15
   </td>
   <td>TC-15
   </td>
   <td>Creating a chart in Superset 
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
</table>

## TS-4: Defining the Nifi workflow by uploading a template
### User story
*   **As a** data scientist/engineer **I want to** define a data workflow management **So I can** consider data coming from a new data source 
*   **As a** data scientist/engineer **I want to** define a data workflow management **So I can** support a new data type 
*   **As a** data scientist/engineer **I want to** define a data workflow management **So I can** integrate a new industrial partner 
### Initial data/state:
*   The FADI platform is installed
*   The actor is already authenticated in the FADI platform 
*   The database is already created
### TS dependencies:
*   No dependencies
<table>
  <tr>
   <td rowspan="2" >
<strong>Test script ID</strong>
   </td>
   <td colspan="4" ><strong>Test Actions</strong>
   </td>
   <td rowspan="2" ><strong>Assertion</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Sequence</strong>
   </td>
   <td><strong>Actor</strong>
   </td>
   <td><strong>Action</strong>
   </td>
   <td><strong>Automatic/ Manual</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="6" >TS-4
   </td>
   <td>1
   </td>
   <td>JEST
   </td>
   <td>Launch the Nifi page
   </td>
   <td>automatic
   </td>
   <td rowspan="6" >- Stop the data workflow once the data are correctly stored
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>PUP
   </td>
   <td>Upload the Nifi template
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>PUP
   </td>
   <td>Drag and drop the Nifi template
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>PUP
   </td>
   <td>Configure the password to connect to the database
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>PUP
   </td>
   <td>Enable both the required controller services.
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>PUP
   </td>
   <td>Start the process
   </td>
   <td>automatic
   </td>
  </tr>
</table>

## TS-11: Defining dashboards based on the analyzed data using Grafana
### User story
*   **As a** Business Analyst/Leader **I want to** define a dashboard **So I can** visualize the results of the analyzed data  
*   **As a** Business Analyst/Leader **I want to** define a dashboard **So I can** realize a global overview about the results of the analyzed data
### Initial data/state:
*   The FADI platform is installed
*   The actor is authenticated to the Grafana service 
### TS dependencies:
*   TS-10 : Configuring a data source in the Grafana dashboard
<table>
  <tr>
   <td rowspan="2" >
<strong>Test script ID</strong>
   </td>
   <td colspan="4" ><strong>Test Actions</strong>
   </td>
   <td rowspan="2" ><strong>Assertion</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Sequence</strong>
   </td>
   <td><strong>Actor</strong>
   </td>
   <td><strong>Action</strong>
   </td>
   <td><strong>Automatic/ Manual</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="6" >TS-11
   </td>
   <td>1
   </td>
   <td>JEST
   </td>
   <td>Launch the Grafana page
   </td>
   <td>automatic
   </td>
   <td rowspan="6" >- Exit from Grafana
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>PUP
   </td>
   <td>Choose the data source
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>PUP
   </td>
   <td>Edit the dashboard 
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>PUP
   </td>
   <td>Choose the type of the dashboard
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>PUP
   </td>
   <td>Edit the query
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>PUP
   </td>
   <td>Press on the Query inspector button to execute the query and visualize the dashboard
   </td>
   <td>automatic
   </td>
  </tr>
</table>

## TS-15: Creating a chart in Superset
### User story
*   **As a** Business Analyst/Leader **I want to** create a chart in Superset **So I can** visualize the results of the analyzed data  
### Initial data/state:
*   The FADI platform is installed
*   The actor is authenticated to the Superset service 
### TS dependencies:
*   TS-13 : Configuring a database in Superset
*   TS-14 : Configuring a table in Superset
<table>
  <tr>
   <td rowspan="2" >
<strong>Test script ID</strong>
   </td>
   <td colspan="4" ><strong>Test Actions</strong>
   </td>
   <td rowspan="2" ><strong>Assertion</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Sequence</strong>
   </td>
   <td><strong>Actor</strong>
   </td>
   <td><strong>Action</strong>
   </td>
   <td><strong>Automatic/ Manual</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="8" >TS-15
   </td>
   <td>1
   </td>
   <td>JEST
   </td>
   <td>Launch the Superset page
   </td>
   <td>automatic
   </td>
   <td rowspan="8" >- Exit from Superset
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>PUP
   </td>
   <td>Choose the Chart option menu
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>PUP
   </td>
   <td>Add a new record 
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>PUP
   </td>
   <td>Choose the datasource
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>PUP
   </td>
   <td>Choose the visualization type
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>PUP
   </td>
   <td>Click “Create new chart”
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>PUP
   </td>
   <td>Configure the chart by defining the time requirements and the query
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>PUP
   </td>
   <td>Run the query
   </td>
   <td>automatic
   </td>
  </tr>
</table>