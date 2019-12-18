## TC-4: Defining the Nifi workflow by uploading a template


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-4
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Defining the Nifi workflow by uploading a template
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
   <td colspan="2" >The Fadi platform enables the actors to define a workflow denoting how to collect and store data stream/batch. For this purpose, it integrates Nifi which is an open source tool to automate the flow of data between software systems. In this use case, the actor will upload an existing template to create the Nifi workflow
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor knows either the URL address or the command to access to the Nifi service

<li>The actor is already authenticated in the FADI platform

<li>The actor knows the source sending the data (e.g. data stream, a CSV file, etc.)

<li>The actor has the Nifi template
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
   <td rowspan="8" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the Nifi interface
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Upload the Nifi template
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
   <td>Launch the created workflow to start storing the data in the target database
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Check that the data is correctly stored
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Error when upload the Nifi template
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