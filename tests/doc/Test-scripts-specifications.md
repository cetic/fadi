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
   <td>The identifier of the test script. It contains two links: spec and impl to consult the specification and the implementation of the test script respectively 
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
   <td>TS-4 [<a href="./test-scripts/TS-4.md">Spec</a>, <a href="../__tests__/2-nifi.test.js">Impl</a>]
   </td>
   <td><a href="./cockburns/TC-4.md" title="TC-4">TC-4</a>
   </td>
   <td><a href="./test-scripts/TS-4.md">Defining the Nifi workflow by uploading a template</a>
   </td>
   <td>Data Scientist, Data Engineer
   </td>
   <td>Data ingestion
   </td>
  </tr>
  <tr>
   <td>TS-11 [<a href="./test-scripts/TS-11.md">Spec</a>, <a href="../__tests__/3-grafana.test.js">Impl</a>]
   </td>
   <td><a href="./cockburns/TC-11.md" title="TC-11">TC-11</a>
   </td>
   <td> <a href="./test-scripts/TS-11.md">Defining dashboards based on the analyzed data using Grafana</a>
   </td>
   <td>Business Analyst, Business Leader
   </td>
   <td>Exploring and  displaying data
   </td>
  </tr>
  <tr>
   <td>TS-6 [<a href="./test-scripts/TS-6.md">Spec</a>, <a href="../__tests__/1-adminer.test.js" title="TS-6">Impl</a>]
   </td>
   <td><a href="./cockburns/TC-6.md">TC-6</a>
   </td>
   <td><a href="./test-scripts/TS-6.md">Creating a table in Adminer</a>
   </td>
   <td>Data Engineer
   </td>
   <td>Data storage
   </td>
  </tr>
</table>
