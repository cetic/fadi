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
