User Management
=============

* [1. Create the LDAP server](#1-create-the-ldap-server)
* [2. Configure the various services](#2-configure-the-various-services)
     * [Grafana](#grafana)
     * [JupyterHub](#jupyterhub)
     * [Superset](#superset)
     * [PostgreSQL](#postgresql)
* [3. Manage your LDAP server](#3-manage-your-ldap-server)
     * [Adding a user](#adding-a-user)


This page provides information on how to configure FADI user authentication and authorization (LDAP, RBAC, ...).

For user management FADI uses [OpenLDAP](https://www.openldap.org) to ensure the [LDAP user authentication](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) for the platform services.

## 1. Create the LDAP server

<a href="https://www.openldap.org/" alt="OpenLDAP"> <img src="images/logos/OpenLDAP.png" width="100px" /></a>

> "OpenLDAP Software is an open source implementation of the Lightweight Directory Access Protocol."

The **OpenLDAP** service creates an empty LDAP server for the company `Example Inc.` and the domain `example.org` by default, which we will overwrite via the environment variables in the Helm chart. 

The first entry that will be created is for the administrator user ; to initially connect to any of the services you can use the following credentials:

* Username: `admin`
* Password: `password1`

Once created we either add the users/groups manually through the phpLDAPadmin web interface, or you can pass a [LDIF file](https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format) (see the [sample ldif file](/examples/basic/example.ldif)).

## 2. Configure the various services

### Grafana

Grafana has 3 roles by default: **Admin** , **Editor** and **Viewer**. To assign these roles to the different groups of LDAP users, you need to pass that in the configuration. Let's assume you have a group of developers in your LDAP server with the entry `cn=developers,ou=groups,dc=ldap,dc=cetic,dc=be` that you want to give the role of **Editor**. You can add these 3 lines of configuration under the default LDAP configuration that FADI already provides:

```
[[servers.group_mappings]]
group_dn = "cn=developers,ou=groups,dc=ldap,dc=cetic,dc=be"
org_role = "Editor"
```

For more information [grafana LDAP configuration](https://grafana.com/docs/auth/ldap/#configuration-examples) is very well documented.

### JupyterHub

JupyterHub configuration allows you to give access to users/groups through templates, the templates usually follow this syntax:

* `uid={username},cn=admin,dc=ldap,dc=cetic,dc=be`
* `uid={username},ou=developers,dc=ldap,dc=cetic,dc=be`

where `{username}` will be overwrought by the value the user passes as username in the authentication screen. Let's suppose we only have those two templates, when the user david passes his name for authentication, for him to successfully sign on, his entry should be one of the following:

* `uid=david,ou=admins,dc=ldap,dc=cetic,dc=be`
* `uid=david,ou=developers,dc=ldap,dc=cetic,dc=be`

which means if david isn't in the developers group or the admins group, he will not be able to sign in.

### Superset

Superset uses **Flask-AppBuilder** Security for the LDAP authentication, in order to activate we need to pass the configuration inside python config `configFile.py`.

For more information on how to configure Superset with LDAP: the official documentation for the [flask-appbuilder authentication-ldap](https://flask-appbuilder.readthedocs.io/en/latest/security.html#authentication-ldap).

For more information about the different options you can use to configure your Superset LDAP authentication: the official documentation for the [Base Configuration](https://flask-appbuilder.readthedocs.io/en/latest/config.html).

### PostgreSQL

LDAP authentication method in PostgreSQL uses LDAP as the password verification method. LDAP is used only to validate the username/password pairs. Therefore there's a Cron job that executes the tool [pg-ldap-sync](https://github.com/larskanis/pg-ldap-sync) to synchronise the users between the LDAP server and the database.

Client authentication is controlled by a configuration file called `pg_hba.conf`, you can pass your authentication config through the variable `pghba` in the `values.yaml` file.

The most common formats of authentication configuration are :


```
local      database  user  auth-method  [auth-options]
host       database  user  address  auth-method  [auth-options]
```

For example, to use LDAP authentication for local users, your configuration should look something like this :


```
local      all  all  ldap  ldapserver=example.com  ldapport=389 [other-ldap-options]
```


For more information about how to add LDAP authentication to PostgreSQL: [LDAP authentication in PostgreSQL](https://www.postgresql.org/docs/11/auth-ldap.html)

For more information about pg-ldap-sync: [Use LDAP permissions in PostgreSQL](https://github.com/larskanis/pg-ldap-sync)


## 3. Manage your LDAP server

<a href="http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page" alt="phpLDAPadmin"><img src="images/logos/phpldapadmin.jpg" width="100px" /></a>

> " phpLDAPadmin is a web app for administering Lightweight Directory Access Protocol (LDAP) servers.."

In order to use [phpLDAPadmin](http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page) you have to pass the configuration for your LDAP server through the environmental variable `_PHPLDAPADMIN_LDAP_HOSTS_`. To connect this service with the OpenLDAP server, you need to pass **the name of the service** (`fadi-openldap`). To connect to the web application, simply run the following command:

```bash
minikube service fadi-phpldapadmin -n fadi
```

The main page for phpLDAPadmin will open in your default browser where you can connect to your LDAP server and manage it.

<img src="images/installation/phpldapadmin.gif" />

The first entry that will be created is for the administrator and the password is initialized to `password1` which makes the credentials to use to connect to this server in phpLDAPadmin the following:

* Login DN: `cn=admin,dc=ldap,dc=cetic,dc=be`
* Password: `password1`

For more information on how to use phpLDAPadmin, see the [phpLDAPadmin documentation](http://phpldapadmin.sourceforge.net/function-ref/1.2/)

### Adding a user

This section provides an example on how to add a user through phpLDAPadmin and access the Superset, Grafana and JupyterHub services.

#### 1. Connect to phpLDAPadmin

<a href="http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page" alt="phpLDAPadmin"><img src="images/logos/phpldapadmin.jpg" width="100px" /></a>

Access your phpLDAPadmin service and connect using the admin Login DN & password, the default Login DN & password are:

* Login DN: `cn=admin,dc=ldap,dc=cetic,dc=be`
* Password: `password1`

<img src="images/installation/phpldapadmin.gif" />

#### 2. Add the user

To add users,  there are two ways: using a tempalte and manually.

#### Import the user using a template

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

Change the user name and other misc info ( mail, etc.) and copy/paste it in the import field, here is an example of a modified template for a user called `Luke Skywalker`.

```
dn: cn=Luke,cn=admin,dc=ldap,dc=cetic,dc=be
cn: Luke
givenname: Luke
mail: luke.skywalker@mail.com
objectclass: inetOrgPerson
objectclass: top
sn: Skywalker
uid: Luke Skywalker
userpassword: ThereIsNoTry
```

Now you can go to `import`, paste that template and click `proceed` and the user will be added.

<img src="images/installation/Luke.gif" alt="Add a user"/>

#### Add the user manually

You can add a user manually through phpLDAPadmin, after connecting go to `⭐️Create new entry here` :

<img src="images/installation/Create_new.gif" alt="Create user"/>

You can for example create a user in the default admin group `cn=admin,dc=ldap,dc=cetic,dc=be`, or create a new group in which you can create new users. 

In this example we are going to create a simple user under the default admin user (which is also a group).

When you click on  `⭐️Create new entry here`, a new window called `Select a template for the creation process` will show up with all the different entries you can create:

<img src="images/installation/Generic_User_Account.png" alt="Create a new user"/>

Go to `Generic: User Account` and a list of fields will show up. Enter the information about the user you want to create and click `Create Object`.
 



