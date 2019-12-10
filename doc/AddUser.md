Example to add a user
=============

This page provides an example on how to add a user  through phpLDAPadmin and access the services superset, grafana and jupyterhub using it.

## 1. Connect to phpLDAPadmin

<a href="http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page" alt="phpLDAPadmin"><img src="images/logos/phpldapadmin.jpg" width="100px" /></a>

Access your phpLDAPadmin service and connect using the admin Login DN & password, the default Login DN & password are:

* Login DN: `cn=admin,dc=ldap,dc=cetic,dc=be`
* Password: `password1`

<img src="images/installation/phpldapadmin.gif" />

## 2. Add the user

To add users there are two ways:

#### 2.1 Import the user using a template

The template below adds a user called John Doe:

```
dn: cn=John,cn=admin,dc=ldap,dc=cetic,dc=be
cn: John
givenname: John
mail: john@mail.com
objectclass: inetOrgPerson
objectclass: top
sn: Doe
uid: John Doe
userpassword: Johnpassword
```
Change the user name and the other info ( mail, etc.)  and copy past it in the import field, here's an example of a modified template for a user called Luke Skywalker.

```
dn: cn=Luke,cn=admin,dc=ldap,dc=cetic,dc=be
cn: Luke
givenname: Luke
mail: luke.skywalker@mail.com
objectclass: inetOrgPerson
objectclass: top
sn: Skywalker
uid: Luke Skywalker
userpassword: Lukepassword
```
now you can go to `import` and past that template and click `proceed` and the user will be add.

<img src="images/installation/Luke.gif" />

#### 2.2 Add the user manually

You can add a user manually through phpLDAPadmin, after connecting you can go to '⭐️Create new entry here' :

<img src="images/installation/Create_new.gif" />

The first one is to create a user in the default admin group `cn=admin,dc=ldap,dc=cetic,dc=be` and the second one is to create a new group in which you can create new users ). in this example we're going to create a simple user under the default admin user (and it is also a group).

when you click on  '⭐️Create new entry here' a  new window called `Select a template for the creation process` will show up with all the different entries you can create:

<img src="images/installation/Generic_User_Account.png" />


 go to ' 👨‍💼 Generic: User Account ' and a list of fields will show up. pass the information about the user you want to create and click `Create Object`.
 



