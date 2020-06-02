## TC-6: Creating a table in Adminer


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
   <td colspan="2" >Creating a table in Adminer
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
   <td colspan="2" >The FADI platform enables to create a new table via the interface of the Adminer tool. This use case allows to test whether the table creation is successfully achieved.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Adminer service

<li>The database in which the table will be created already exists

<li>The actor is connected to Adminer

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
