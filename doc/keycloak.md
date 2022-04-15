KeyCloak
=============

```
git clone -b feature/keycloak https://github.com/cetic/helm-fadi.git
cd helm-fadi
helm dep up
helm install fadi .
```

## 1. Configure keycloak

<a href="https://www.keycloak.org/" alt="Keycloak"> <img src="images/logos/keycloak-logo.png" width="100px" alt="Keycloak logo"/></a>

> "Keycloak is an open source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code."

Keycloak is first deployed with one admin user that we need to configure before deployment, to do so we need to pass the username/password in the `values.yaml` file like follows:

```
keycloak:
  enabled: true
  auth:
    createAdminUser: true
    adminUser: admin
    adminPassword: "password1"
```

Once deployed we can access the user interface and log in: 

<img src="images/installation/keycloak-first-screen.png" alt="Keycloak login"/>

We click on **administration console** then we log in using the credentials we configured above.

<img src="images/installation/keycloak-ui.png" alt="Keycloak home"/>

## Create realm

When you log in to the admin console, you work in a realm, which is a space where you manage objects. Two types of realms exist:

* **Master realm** - This realm was created for you when you first started Keycloak. It contains the admin account you created at the first login. You use this realm only to create other realms.

* **Other realms** - These realms are created by the admin in the master realm. In these realms, administrators create users and applications. The applications are owned by the users.

<img src="images/installation/keycloak-realms.png" alt="Keycloak realms"/>

To create a realm, head to the Master menu, click `Add Realm`. When you are logged in to the master realm, this menu lists all other realms, then type for example `devops` in the Name field to name our new realm devops.

<img src="images/installation/add-realm.png" alt="Keycloak add realm"/>

When we click `Create`, the main admin console page opens with realm set to devops, now we can switch between managing the master realm and the realm we just created by clicking entries in the `Select realm` drop-down list.

<img src="images/installation/devops-realm.png" alt="Keycloak select realm"/>

## Create grafana client

To create clients we first click **Clients** in the **left side menu** to open the Clients page.

<img src="images/installation/keycloak-clients.png" alt="Keycloak create client"/>

On the right side, we click `Create` and then on the `Add Client` dialog, we create a client called `Grafana` by filling the fields as follows:

* Client ID: `grafana`
* Root URL: `\<your-grafana-address>`, for this example our grafana adress is http://grafana.example.cetic.be

<img src="images/installation/grafana-client.png" alt="Keycloak create client"/>

Once the client is created, we open the client configuration and change the **access type** to **confidential** from public, and complete the rest of the fields as shown below assuming our Grafana address is http://grafana.example.cetic.be, then we **Save the config**.


<img src="images/installation/grafana-client-created.png" alt="Keycloak Grafana client created"/>


Now we open the client Grafana again, go to **credentials tag** and copy the `client id` and `secret` because we are going to need them to configure Grafana later.

<img src="images/installation/client-credentials.png" alt="Keycloak get Grafana credentials"/>


## Create Nifi client

Repeat the same steps as Grafana and replace the appropriate fields as follows :

* Client ID: `nifi`
* Root URL: `\<your-nifi-address>`, for this example our grafana adress is https://nifi.example.cetic.be (for Nifi, don't forget the "s" in https)

## Create jupyterhub client

Repeat the same steps as Grafana and replace the appropriate fields as follows :

* Client ID: `jupyterhub`
* Root URL: `\<your-jupyterhub-address>`, for this example our grafana adress is https://jupyterhub.example.cetic.be

## Create user

In the devops realm, we need to create a new user and a password for that new user, we head to the left menu, click Users to open the user list page.

<img src="images/installation/users-page.png" alt="Create user"/>


On the right side of the empty user list, click Add User to open the Add user page.

<img src="images/installation/add-user.png" alt="Create user"/>


We enter a name in the Username field (this is the only required field), then we flip the Email Verified switch to On and click Save.

<img src="images/installation/john-doe.png" alt="Create user"/>



The management page for the new user opens, we Click the **Credentials tab** to set a password for the new user, we type a new password and confirm it. For this example, we desactivate the temporary option.

<img src="images/installation/change-pass.png" alt="Create user"/>


Then we Click **Set Password** to set the user password to the new one we specified.

## Role mapping

After creating the user we need to map this user to the grafana client we created earlier.

First we head to the clients page and choose grafana, then  we Click the **Roles tab** and then click add Role:

<img src="images/installation/create-role.png" alt="Create user"/>

We fill in the role name and description then click save.

<img src="images/installation/admin-role.png" alt="Create user"/>

Now that we have at least one role for grafana we map this new role to the user we created earlier so we can log in using the new user.

Now we head back to the Users page and chose john, then we click the **Role mappings** tab, in **client role** dropdown menu we choose grafana.


<img src="images/installation/role-mapping.png" alt="Create user"/>


Then we can find the role admin that we created, we **select admin** and then click **add selected**.

## 2. Integrate Keycloak

### Integrate with Grafana

After creating the client in Keycloak we have to configure Grafana to use openid connect and connect it to Keycloak, we do so in Grafana's **grafana.ini** file that we can configure in the **helm chart's values file** [values.yaml](https://github.com/cetic/helm-fadi/blob/master/values.yaml).

Now to configure Grafana we edit as below: 

* `devops` is the realm name, client id is the client name and client secret the **previously copied code**, in this example **keycloak's address** is **http://keycloak.example.cetic.be**. 
* `client_secret` with Keycloak > Clients > Grafana > Credentials > Secret

```
grafana:
---
  grafana.ini:
---
    auth.generic_oauth:
      enabled: true
      scopes: openid email profile
      name: keycloak
      tls_skip_verify_insecure: false
      allow_sign_up: true
      client_id: grafana
      client_secret: cfcb88cb-78c5-4301-9ffd-e9779d7d8c5e
      auth_url: http://keycloak.example.cetic.be/auth/realms/devops/protocol/openid-connect/auth
      token_url: http://keycloak.example.cetic.be/auth/realms/devopsr/protocol/openid-connect/token
      api_url: http://keycloak.example.cetic.be/auth/realms/devops/protocol/openid-connect/userinfo
      ---
    server:
      root_url: http://grafana.example.cetic.be  # change to your grafana domainname
```

Now after configuring Grafana we need to apply these modifications, to do so we can use the command:

```bash
helm upgrade --install fadi .
```

Once FADI upgrades, Grafana will restart with our new configuration, now we can head to our Grafana and we should notice that we have the option **Sign in with keycloak** which is the option we are going to choose.

<img src="images/installation/sign-in-with-keycloak.png" alt="Create user" />

That will take us to a keycloak themed authentification screen, that's where we can authenticate using the **user** that we created earlier in keycloak and mapped to the Grafana client.

<img src="images/installation/grafana-keycloak-auth.png" alt="Create user"/>

Here we can authenticate using the user emal john@mail.com and the password we set up earlier.

This document is inspired by keycloak's [getting started](https://www.keycloak.org/docs/latest/getting_started/) and this [tutorial](https://www.techrunnr.com/how-to-setup-oauth-for-grafana-using-keycloak/).

### Integrate with Nifi

To configure Nifi, we edit [values.yaml](https://github.com/cetic/helm-fadi/blob/master/values.yaml) as below: 


* `client_secret` with Keycloak > Clients > Nifi > Credentials > Secret

```
nifi:
  enabled: true
  ---
  auth:
    ---
    oidc:
      enabled: true
      discoveryUrl: http://keycloak.example.cetic.be/auth/realms/devops/.well-known/openid-configuration
      clientId: nifi
      clientSecret: 49342125-4715-4b1f-8d84-57e20c92db2c
      claimIdentifyingUser: email
      admin: john@mail.com
      ## Request additional scopes, for example profile
      additionalScopes: 
```

Now after configuring Nifi we need to apply these modifications, to do so we can use the command:

```bash
helm upgrade --install fadi .
```

Once FADI upgrades, Nifi will restart with our new configuration. Now we can head to our Nifi and we will autimatically redirect to Keycloak for the authentication.

<img src="images/installation/grafana-keycloak-auth.png" alt="Create user"/>

Here we can authenticate using the user emal john@mail.com and the password we set up earlier.

### Integrate with Jupyterhub

To configure Nifi, we edit [values.yaml](https://github.com/cetic/helm-fadi/blob/master/values.yaml) as below: 


* `client_secret` with Keycloak > Clients > Nifi > Credentials > Secret

```
jupyterhub:
  enabled: true
  ---
  hub:
    config:
    ---
      GenericOAuthenticator:
        client_id: jupyterhub
        client_secret: 5677bb90-794e-4cff-a8ef-0586c2df73cf
        oauth_callback_url: http://jupyterhub.example.cetic.be/hub/oauth_callback
        authorize_url: http://keycloak.example.cetic.be/auth/realms/devops/protocol/openid-connect/auth
        token_url: http://keycloak.example.cetic.be/auth/realms/devops/protocol/openid-connect/token
        userdata_url: http://keycloak.example.cetic.be/auth/realms/devops/protocol/openid-connect/userinfo
        login_service: keycloak
        username_key: email
        userdata_params:
          state: state
      JupyterHub:
        authenticator_class: generic-oauth
```

Now after configuring Jupyterhub we need to apply these modifications, to do so we can use the command:

```bash
helm upgrade --install fadi .
```

Once FADI upgrades, Jupyterhub will restart with our new configuration, now we can head to our Jupyterhub and we should notice that we have the option **Sign in with keycloak** which is the option we are going to choose.

<img src="images/installation/hub-sign-in-with-keycloak.png" alt="Create user" />

That will take us to a keycloak themed authentification screen, that's where we can authenticate using the **user** that we created earlier in keycloak.

<img src="images/installation/grafana-keycloak-auth.png" alt="Create user"/>

Here we can authenticate using the user emal john@mail.com and the password we set up earlier.
