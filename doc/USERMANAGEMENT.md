User Management
=============

* [1. Create the LDAP server](#1-create-the-ldap-server)
* [2. Configure the various services](#2-configure-the-various-services)
     * [Grafana](#grafana)
     * [JupyterHub](#jupyterhub)
     * [Superset](#superset)
     * [PostgreSQL](#postgresql)
* [3. Manage your LDAP server](#3-manage-your-ldap-server)


This page provides information on how to configure FADI user identification and authorization (LDAP, RBAC, ...).

For user management FADI uses [OpenLDAP](https://www.openldap.org) to ensure the [LDAP user authentication](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) for the platform services.

## 1. Create the LDAP server
<a href="https://www.openldap.org/" alt="OpenLDAP"> <img src="doc/images/logos/OpenLDAP.png" width="100px" /></a>

> "OpenLDAP Software is an open source implementation of the Lightweight Directory Access Protocol."

The **OpenLDAP** service creates an empty LDAP server for the company `Example Inc.` and the domain `example.org` by default, which we will overwrite via the environment variables in the Helm chart. 

The first entry that will be created is for the administrator user ; to initially connect to any of the services you can use the following credentials:

* Username: `admin`
* Password: `password1`

Once created we either add the users/groups manually through the phpLDAPadmin web interface, or you can pass a [LDIF file](https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format) (see the [sample ldif file](examples/basic/example.ldif)).

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

which means if david isn't in the developers group or the admins group, he will not be able to sign on.

### Superset

Superset uses **Flask-AppBuilder** Security for the LDAP authentication, in order to activate we need to pass the configuration inside python config `configFile.py`.

For more information about how to configure your superset with ldap: the official documentation for the [flask-appbuilder authentication-ldap](https://flask-appbuilder.readthedocs.io/en/latest/security.html#authentication-ldap).

For more information about the different options you can use to configure your Superset LDAP authentication: the official documentation for the [Base Configuration](https://flask-appbuilder.readthedocs.io/en/latest/config.html).

### PostgreSQL

LDAP authentication method in PostgreSQL uses LDAP as the password verification method. LDAP is used only to validate the username/password pairs. Therefore the user must already exist in the database before LDAP can be used for authentication. Thus a synchronisation tool has to be used to synchronise  users, groups and their memberships from LDAP to PostgreSQL. For that we are using [pg-ldap-sync](https://github.com/larskanis/pg-ldap-sync).

To use **pg-ldap-sync** you need to install it inside the postgres container:

Connect to the PostgreSQL container as root

```
kubectl ssh -u root -p <pod_name>
```

Install the following packages
 
```bash
apt update
apt install ruby libpq-dev
apt install gcc ruby-dev rubygems
apt install gem
apt install make
gem install pg-ldap-sync
```

Once the sync tool has been installed, you can run it using your own yaml config file. See the [FADI sample config file](examples/basic/pg_ldap_sync_sample_config.yaml) or the [original pg-ldap-sync example config file](https://github.com/larskanis/pg-ldap-sync/blob/master/config/sample-config.yaml) or you can use this tested  .

**important note** : you need to enter the dbname, username and the password in the config file before using it, to get the password you can use this command:

```bash
kubectl get secret --namespace fadi <pod_name> -o jsonpath="{.data.postgresql-password}" | base64 --decode
```

Once **pg-ldap-sync** is installed and your config file is in place you can copy the users from your LDAP server using this command:

```
pg_ldap_sync -c my_config.yaml -vv
```

This will copy all the users from your LDAP server to you PostgreSQL database. To assign a password to each user, connect to the database (in this case using the default database and user) :

```
psql postgres postgres
or 
psql -d postgres -U postgres
```

To assign a new password for the user `admin`, run this:

```
postgres=> \password admin
```

A prompt for the password will appear and you can assign the new password for that that user.

<img src="doc/images/postgres-password.gif" width="300px" />

For more information about pg-ldap-sync: [Use LDAP permissions in PostgreSQL](https://github.com/larskanis/pg-ldap-sync)


## 3. Manage your LDAP server

<a href="http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page" alt="phpLDAPadmin"><img src="doc/images/logos/phpldapadmin.jpg" width="100px" /></a>

> " phpLDAPadmin is a web app for administering Lightweight Directory Access Protocol (LDAP) servers.."

In order to use [phpLDAPadmin](http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page) you have to pass the configuration for your LDAP server through the environmental variable *_PHPLDAPADMIN_LDAP_HOSTS_*. To connect this service with the OpenLDAP server, you need to pass **the name of the service** (`fadi-openldap`). To connect to the web app, simply run the following command: (or access it at [http://phpldapadmin.fadi.minikube](http://phpldapadmin.fadi.minikube))

```bash
minikube service fadi-phpldapadmin -n fadi
```

The main page for phpLDAPadmin will open in your default browser where you can connect to your LDAP server and manage it.

<img src="doc/images/phpldapadmin.gif" />

The first entry that will be created is for the administrator and the password is initialized to `password1` which makes the credentials to use to connect to this server in phpLDAPadmin the following:

* Login DN: `cn=admin,dc=ldap,dc=cetic,dc=be`
* Password: `password1`

For more information on how to use phpLDAPadmin, see the [phpLDAPadmin documentation](http://phpldapadmin.sourceforge.net/function-ref/1.2/)
