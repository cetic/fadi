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