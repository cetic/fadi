## TC-2: Access to the FADI dashboard

<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-2
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Access to the FADI dashboard
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Platform Admin 

<li>System Admin 

<li>Stakeholders 

<li>ICT manager
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Check the state of a given pod

<li>Check the installation of the FADI framework
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >The dashboard of FADI enables the actor to access to a web interface in order to check the status of the installed services (called also pods).  
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The FADI is already installed

<li>The actor knows the namespace of FADI (e.g. fadi)
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor checks the status of a service
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>Access to the dashboard of FADI platform
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Select the appropriate dashboard
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Check if there is some dashboards and information about the installed services
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor does not find the service
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Everytime an actor wants to check the status of a given service
</li>
</ul>
   </td>
  </tr>
</table>