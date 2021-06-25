KeyCloak
=============

* [1. Configure keycloak](#1-configure-keycloak)
     * [Create realm](#Create-realm)
     * [Create grafana client](#Create-grafana-client)
     * [Create Nifi client](#Create-Nifi-client)
     * [Create users](#Create-users)
     * [Role mapping](#Role-mapping)

* [2. Integrate Keycloak](#2-Integrate-Keycloak)
     * [Integrate with Grafana](#Integrate-with-Grafana)
     * [Integrate with Nifi](#Integrate-with-Nifi)


## 1. Configure keycloak

<a href="https://www.openldap.org/" alt="OpenLDAP"> <img src="images/logos/keycloak-logo.png" width="100px" /></a>

> "Keycloak is an open source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code."

Keycloak is first deployed with one admin user that we need to configure before deployment, to do so we need to pass the username/password in the values file like follows:

```
  auth:
    createAdminUser: true
    adminUser: admin
    adminPassword: "password1"
```

Once deployed we can access the ui and log in, when trying to access keycloak will get the following screen 

<img src="images/installation/keycloak-first-screen.png" alt="Create user"/>

We click on **administration console** then we log in using the credentials we configured above:

* Username: `admin`
* Password: `password1`

once logged in we get the following UI:

<img src="images/installation/keycloak-ui.png" alt="Create user"/>


##Create realm

When you log in to the admin console, you work in a realm, which is a space where you manage objects. Two types of realms exist:

* **Master realm** - This realm was created for you when you first started Keycloak. It contains the admin account you created at the first login. You use this realm only to create other realms.

* **Other realms** - These realms are created by the admin in the master realm. In these realms, administrators create users and applications. The applications are owned by the users.


<img src="images/installation/keycloak-realms.png" alt="Create user"/>

To create a realm head to the Master menu, click Add Realm. When you are logged in to the master realm, this menu lists all other realms, then we type **devops** in the Name field to name our new real devops.


<img src="images/installation/add-realm.png" alt="Create user"/>

when we click **Create** the main admin console page opens with realm set to Devops, now we can switch between managing the master realm and the realm we just created by clicking entries in the Select realm drop-down list.

<img src="images/installation/devops-realm.png" alt="Create user"/>



##Create grafana client

To create clients we first click **Clients** in the **left side menu** to open the Clients page.

<img src="images/installation/keycloak-clients.png" alt="Create user"/>

On the right side, we click **Create** and then on the Add Client dialog, we create a client called Grafana by completing the fields as follows:

* Client ID: Grafana
* Root URL: \<your-grafana-address>, for this example our grafana adress is http://10.10.10.10:30300


<img src="images/installation/grafana-client.png" alt="Create user"/>


Once the client is created,we open the client configuration and change the **access type** to **confidential** from public and complete the rest of the fields as shown below assuming our grafana adress is http://10.10.10.10:30300, then we **Save the config**.


<img src="images/installation/grafana-client-created.png" alt="Create user"/>


Now we open the client grafana again and go to **credentials tag** and copy the client id and secret because we're going to need them to configure grafana later.

<img src="images/installation/client-credentials.png" alt="Create user"/>

##Create Nifi client

The same way we're going to create a client for Nifi, we select Clients from the menu on the left, and then click the Create button to add a new client. Enter the Client ID `Org:apache:nifi:saml:sp`, select SAML as the Client Protocol, and click Save.

<img src="images/installation/client-nifi.png" alt="Create user"/>


once created we need to configure **Root URL**, **Valid Redirect URIs**, **Base URL**, and **Master SAML Processing URL** as follows where `https://192.168.64.57:30236` is the link to nifi:

```
Root URL: https://192.168.64.57:30236

Valid Redirect URIs: /nifi-api/access/saml/*

Base URL: /nifi

Master SAML Processing URL: https://192.168.64.57:30236/nifi-api/access/saml/metadata

```

Since NiFi’s SAML implementation doesn’t use a single processing URL, we also need to configure the fine-grained SAML URLs. The values for the URLs should look like the following:

<img src="images/installation/fine-grain-saml.png" alt="Create user"/>

The last step is to add the `keystore.jks` **that we're going to use to secure the nifi cluster**, to do so we click on the **SAML Keys** tab, and then click Import. We are going to import the `keystore.jks` that is used in `nifi.properties`.

<img src="images/installation/import-keystore.png" alt="Create user"/>

Now all the rest is to configure nifi accordingly.

##Create user

In the devops realm, we need to create a new user and a temporary password for that new user, we head to the left menu, click Users to open the user list page.

<img src="images/installation/users-page.png" alt="Create user"/>


On the right side of the empty user list, click Add User to open the Add user page.

<img src="images/installation/add-user.png" alt="Create user"/>


we enter a name in the Username field (this is the only required field), then we flip the Email Verified switch to On and click Save.

<img src="images/installation/john-doe.png" alt="Create user"/>



The management page for the new user opens, we Click the **Credentials tab** to set a temporary password for the new user, we type a new password and confirm it.

<img src="images/installation/change-pass.png" alt="Create user"/>


the we Click **Set Password** to set the user password to the new one we specified.

##Role mapping

After creating the user we need to map this user to the grafana client we created earlier.

first we head to the clients page and choose grafana, then  we Click the **Roles tab** and then click add Role:

<img src="images/installation/create-role.png" alt="Create user"/>

we fill in the role name and description then click save.

<img src="images/installation/admin-role.png" alt="Create user"/>

now that we have at least one role for grafana we map this new role to the user we created earlier so we can log in using the new user.

now we head back to the Clients page and chose john, then we click the **Role mappings** tab, in **client role** dropdown menu we choose grafana.


<img src="images/installation/role-mapping.png" alt="Create user"/>


then we can find the role admin that we created, we **select admin** and then click **add selected**.

## 2. Integrate Keycloak

### Integrate with Grafana

After creating the client in keycloak we have to configure Grafana to use Oauth and connect it to keyclaok, we do so in grafana's **grafana.ini** file that we can configure in the **helm chart's configmap** [keycloak.yaml](https://github.com/cetic/helm-fadi/blob/feature/keycloak/templates/keycloak.yaml).

Now to configure grafana we edit as below where devops is the realm name, client id is the client name and client secret the **previously copied code**, in this example **Keyclaok's NodePort** is **30330** which makes **keycloak's address** **http://10.10.10.10:30330** ( we can find the Generic OAuth at **line 469** in [keycloak.yaml](https://github.com/cetic/helm-fadi/blob/feature/keycloak/templates/keycloak.yaml).. 

```
    #################################### Generic OAuth #######################
    [auth.generic_oauth]
    name = OAuth
    enabled = true
    allow_sign_up = true
    client_id = Grafana
    client_secret = ad35e16d-96d1-46ab-88d8-7cdb1512b608
    scopes = openid profile email
    email_attribute_name = email:primary
    email_attribute_path =
    login_attribute_path =
    name_attribute_path =
    role_attribute_path =
    id_token_attribute_name =
    auth_url = http://10.10.10.10:30330/auth/realms/devops/protocol/openid-connect/auth
    token_url = http://10.10.10.10:30330/auth/realms/devops/protocol/openid-connect/token
    api_url = http://10.10.10.10:30330/auth/realms/devops/protocol/openid-connect/userinfo
    allowed_domains =
    team_ids =
    allowed_organizations =
    tls_skip_verify_insecure = false
    tls_client_cert =
    tls_client_key =
    tls_client_ca =
```

Then back to the **server** configuration ( **line 35** ), we configure as shown below where 10.10.10.10 is the minikube IP ( or kubernetes IP ) and **http://10.10.10.10:30300** is the **grafana address**.

```
 #################################### Server ##############################
    [server]
    # Protocol (http, https, h2, socket)
    protocol = http

    # The ip address to bind to, empty will bind to all interfaces
    http_addr =

    # The http port to use
    http_port = 3000

    # The public facing domain name used to access grafana from a browser
    domain = 10.10.10.10

    # Redirect to correct domain if host header does not match domain
    # Prevents DNS rebinding attacks
    enforce_domain = false

    # The full public facing url
    # root_url = %(protocol)s://%(domain)s:%(http_port)s/
    root_url = http://10.10.10.10:30300

```

> PS: this is a temporary and not the final format of the document as it will be completed as we progress with adding keycloak to fadi.

Now after configuring grafana we need to apply these modifications, to do so we can use the command:

```
helm upgrade --install fadi
```

Once fadi upgrades grafana will reboot with our new configuration, now we can head to our grafana and we should notice that we have the option **Sign in with OAuth** which the option we're going to choose.


<img src="images/installation/sign-in-with-oauth.png" alt="Create user"/>

that will take us to a keycloak themed authentification screen, that's where we can authenticate using the **user** that we created earlier in keycloak and mapped to the Grafana client.

<img src="images/installation/grafana-keycloak-auth.png" alt="Create user"/>

here we can authenticate using the user john and the temporary password we set up earlier, before logging in to grafana we will be asked to **update the password** like shown below:


<img src="images/installation/update-password.png" alt="Create user"/>


We set a new password for ou user and then click **submit**, after we submit we will receive a grafana server error that's fine all we have to do is to try to log in to grafana again and this time we will be logged in automatically.


This document is inspired by keycloak's [getting started](https://www.keycloak.org/docs/latest/getting_started/) and this [tutorial](https://www.techrunnr.com/how-to-setup-oauth-for-grafana-using-keycloak/).

### Integrate with Nifi

To perform any type of authentication, we need a secured NiFi instance with a keystore, truststore, and https host/port.

The main configuration is in the `nifi.properties` file, it should look something like this :

```
nifi.remote.input.secure=true

nifi.web.http.host=
nifi.web.http.port=

nifi.web.https.host=localhost
nifi.web.https.port=9443

nifi.security.keystore=/path/to/keystore.jks
nifi.security.keystoreType=JKS
nifi.security.keystorePasswd=changeit
nifi.security.keyPasswd=changeit

nifi.security.truststore=/path/to/truststore.jks
nifi.security.truststoreType=JKS
nifi.security.truststorePasswd=changeit

```

then we need to add the **SAML** configuration since it's the protocol used here, mainly we need to set `nifi.security.user.saml.idp.metadata.url` to `http://<link-to-keycloak>/auth/realms/devops/protocol/saml/descriptor` and `nifi.security.user.saml.sp.entity.id` to the previously created nifi client `org:apache:nifi:saml:sp` so the configuration should look something like this :

```
# SAML Properties #
nifi.security.user.saml.idp.metadata.url=http://192.168.64.57:32766/auth/realms/devops/protocol/saml/descriptor
nifi.security.user.saml.sp.entity.id=org:apache:nifi:saml:sp
nifi.security.user.saml.identity.attribute.name=
nifi.security.user.saml.group.attribute.name=
nifi.security.user.saml.metadata.signing.enabled=false
nifi.security.user.saml.request.signing.enabled=false
nifi.security.user.saml.want.assertions.signed=true
nifi.security.user.saml.signature.algorithm=http://www.w3.org/2001/04/xmldsig-more#rsa-sha256
nifi.security.user.saml.signature.digest.algorithm=http://www.w3.org/2001/04/xmlenc#sha256
nifi.security.user.saml.message.logging.enabled=false
nifi.security.user.saml.authentication.expiration=12 hours
nifi.security.user.saml.single.logout.enabled=false
nifi.security.user.saml.http.client.truststore.strategy=JDK
nifi.security.user.saml.http.client.connect.timeout=30 secs
nifi.security.user.saml.http.client.read.timeout=30 secs

```

The last thing we need to do is configure NiFi’s authorizers.xml. We will use the file-based providers, so we need to setup an initial user and initial admin that corresponds to one of the users we added to Keycloak. We’ll use the user john.

```
<userGroupProvider>
    <identifier>file-user-group-provider</identifier>
    <class>org.apache.nifi.authorization.FileUserGroupProvider</class>
    <property name="Users File">./conf/users.xml</property>
    <property name="Legacy Authorized Users File"></property>
    <property name="Initial User Identity 1">john</property>
</userGroupProvider>

<accessPolicyProvider>
    <identifier>file-access-policy-provider</identifier>
    <class>org.apache.nifi.authorization.FileAccessPolicyProvider</class>
    <property name="User Group Provider">file-user-group-provider</property>
    <property name="Authorizations File">./conf/authorizations.xml</property>
    <property name="Initial Admin Identity">john</property>
    <property name="Legacy Authorized Users File"></property>
    <property name="Node Identity 1"></property>
    <property name="Node Group"></property>
</accessPolicyProvider>

```
We need to pre-configure all of this in the [helm chart](https://github.com/cetic/helm-nifi) before deploying it for it to work in a kubernetes cluser, here's an **already configured** [branch](https://github.com/cetic/helm-nifi/blob/feature/keycloak/configs/nifi.properties).

> PS: the current configuration restults in a ERR_BAD_SSL_CLIENT_AUTH_CERT error because we're using self-signed certs auto-generated by the tls-toolkit, we're currently working to replace them with valid certs.