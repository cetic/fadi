## TS-6: Creating a table in Adminer
### User story
*   **As a** data engineer  **I want to** create a table  **So I can** store the collected data
*   **As a** data engineer  **I want to** create a table  **So I can** structure the collected data
### Initial data/state:
*   The FADI platform is installed
*   The actor is authenticated to the Adminer service
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
   <td rowspan="10" >TS-6
   </td>
   <td>1
   </td>
   <td>JEST
   </td>
   <td>Launch the Adminer page 
   </td>
   <td> automatic
   </td>
   <td rowspan="10" > - Exit from Adminer
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>PUP
   </td>
   <td>Authenticate the user to the Adminer
   </td>
   <td>automatic
   </td>
  </tr>
    <tr>
   <td>3
   </td>
   <td>PUP
   </td>
   <td>Connect to the appropriate database
   </td>
   <td>automatic
   </td>
  </tr>
    <tr>
   <td>4
   </td>
   <td>PUP
   </td>
   <td>Launch the query to create the table
   </td>
   <td>automatic
   </td>
  </tr>
    <tr>
   <td>5
   </td>
   <td>PUP
   </td>
   <td> Check the creation of the table
   </td>
   <td>automatic
   </td>
</table>
