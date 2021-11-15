Monitoring
=======

<p align="left";>
	<a href="https://www.elastic.co" alt="elk">
	    <img src="images/logos/zabbix_logo.png" align="center" alt="Zabbix logo" width="200px" />
    </a>
</p>

**[ZABBIX](https://www.zabbix.com)** Zabbix is an open-source monitoring software tool for diverse IT components, including networks, servers, virtual machines and cloud services. Zabbix provides monitoring metrics, among others network utilization, CPU load and disk space consumption.
 
## Zabbix components

### Zabbix Server

Zabbix server is the central process of Zabbix software.

The server performs the polling and trapping of data, it calculates triggers, sends notifications to users. It is the central component to which Zabbix agents and proxies report data on availability and integrity of systems. The server can itself remotely check networked services (such as web servers and mail servers) using simple service checks.

### Zabbix Agent

Zabbix agent is deployed on a monitoring target to actively monitor local resources and applications (hard drives, memory, processor statistics etc).

### Zabbix Web ( frontend )

Zabbix web interface is a part of Zabbix software. It is used to manage resources under monitoring and view monitoring statistics.

### Zabbix Proxy 

Zabbix proxy is a process that may collect monitoring data from one or more monitored devices and send the information to the Zabbix server, essentially working on behalf of the server. All collected data is buffered locally and then transferred to the Zabbix server the proxy belongs to.

## How to use

Make sure to enable zabbix in the `values.yaml` file, then to access the front-end use the following command:

```
minikube service fadi-zabbix-web
```

The default username/password are `Admin`/`zabbix`, once connected make sure the zabbix-server is working on the global view, to see the received metrics ( or graphs ) head to the tab `Latest data` under `monitoring` and then click on select on **host groups** and **hosts** and choose your `zabbix servers`.

![zabbix](images/carousel/zabbix.gif)

## LDAP Authentication 


By default, internal [Zabbix authentication](https://www.zabbix.com/documentation/4.0/manual/web_interface/frontend_sections/administration/authentication) is used globally. To change to LDAP - select LDAP as Default authentication and enter **authentication details** in the LDAP settings tab. 

The default **authentication details** for FADI:

```
LDAP host: fadi-openldap
Port: 389
Base DN: dc=ldap,dc=cetic,dc=be
Search attribute: cn
Bind DN: cn=admin,dc=ldap,dc=cetic,dc=be
Bind password: password1
User password: password1
```


![zabbix](images/carousel/zabbix-auth.gif)

For more details you can always go to: [Zabbix Documentation 4.0](https://www.zabbix.com/documentation/4.0/manual/introduction).
