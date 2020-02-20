## TC-3: Defining the Nifi workflow


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-3
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Defining the Nifi workflow
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Data Scientist 

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

<li>Adding a new database
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The Fadi platform enables the actors to define a workflow denoting how to collect and store data stream/batch. For this purpose, it integrates Nifi which is an open source tool to automate the flow of data between software systems.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Nifi service

<li>The actor is already authenticated in the FADI platform

<li>The actor knows the authentication credentials of the target database (e.g. the username and the password of the PostgreSQL database)

<li>The actor knows  
<ul>
 
<li>the name of the target database and the table
 
<li>the database connection URL, the database driver class name, database driver location, etc.
</li> 
</ul>

<li>The actor knows the source sending the data (e.g. data stream, a CSV file, etc.)
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The Nifi workflow is created and is successfully launched
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Nifi interface
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Create the desired Nifi workflow
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Launch the created workflow to start storing the data in the target database
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime the actor has new data coming to the FADI framework
</li>
</ul>
   </td>
  </tr>
</table>