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
   <td colspan="2" >The FADI platform enables to collect data and to store it in a given database either via the Adminer interface or by defining a data workflow using Nifi. This use case allows to test whether the data insertion is successfully achieved.
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
