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