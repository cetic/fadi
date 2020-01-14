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
   <td rowspan="6" ><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js" title="TS-4">TS-4</a>
   </td>
   <td>1
   </td>
   <td>JEST
   </td>
   <td><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js#L121" title="Launch the Nifi page">Launch the Nifi page</a>
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
   <td><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js#L128" title="Upload the Nifi template">Upload the Nifi template</a>
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>PUP
   </td>
   <td><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js#L198" title="Drag and drop the Nifi template">Drag and drop the Nifi template</a>
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>PUP
   </td>
   <td><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js#L213" title="Configure the password to connect to the database">Configure the password to connect to the database</a>
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>PUP
   </td>
   <td><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js#L245" title="Enable both the required controller services">Enable both the required controller services</a>
   </td>
   <td>automatic
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>PUP
   </td>
   <td><a href="https://github.com/cetic/fadi/blob/feature/tests/tests/__tests__/1-nifi.test.js#L280" title="Start the process">Start the process</a>
   </td>
   <td>automatic
   </td>
  </tr>
</table>
