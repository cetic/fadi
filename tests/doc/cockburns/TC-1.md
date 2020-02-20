## TC-1:Authentication to a given tool via LDAP


<table>
  <tr>
   <td><strong>Use case ID</strong>
   </td>
   <td colspan="2" >TC-1
   </td>
  </tr>
  <tr>
   <td><strong>Use case name</strong>
   </td>
   <td colspan="2" >Authentication to a given tool via LDAP
   </td>
  </tr>
  <tr>
   <td><strong>Actors</strong>
   </td>
   <td colspan="2" >
<ul>

<li>All actors
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Trigger</strong>
   </td>
   <td colspan="2" >The actor wants to use one service of the FADI platform for the first time
   </td>
  </tr>
  <tr>
   <td><strong>Short Description</strong>
   </td>
   <td colspan="2" >This use case denotes the process of the authentication to the FADI platform.
   </td>
  </tr>
  <tr>
   <td><strong>Pre-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor credentials should exist in the LDAP repository

<li>The FADI platform is already installed

<li>The actor already knows the URL address of the desired service (e.g grafana, pgAdmin, etc.) 
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Post-Conditions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor is authenticated
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Steps</strong>
   </td>
   <td>1
   </td>
   <td>The actor access to a given service via its URL address
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>The actor enter his/her credentials
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>The actor is authenticated
   </td>
  </tr>
  <tr>
   <td><strong>Exceptions</strong>
   </td>
   <td colspan="2" >
<ul>

<li>The actor credentials does’t not exist in the LDAP repository

<li>The actor makes an error when entering his/her credentials
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Frequency</strong>
   </td>
   <td colspan="2" >
<ul>

<li>Every time the use is not logged-in in the FADI platform
</li>
</ul>
   </td>
  </tr>
</table>