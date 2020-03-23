<a href="https://binderhub.readthedocs.io/en/latest/" alt="BinderHub"><img src="images/binderhub.png" width="200px"/></a>
# What's Binderhub

*The primary goal of BinderHub is creating custom computing environments that can be used by many remote users. BinderHub enables an end user to easily specify a desired computing environment from a Git repo. BinderHub then serves the custom computing environment at a URL which users can access remotely.*

*BinderHub will build Docker images out of Git repositories, and then push them to a Docker registry so that JupyterHub can launch user servers based on these images*

# Add Binderhub around FADI

We assume that you have already a cluster deployed. If not, you can refer and follow our [Installation guide]() until the point 1.2.2

you will also need to have a valid Docker account.


Follow this step to have FADI with Binderhub installed into your cluster:
1. Clone this repository and go to the binderhub example folder:
```bash
git clone https://github.com/cetic/fadi.git fadi
cd $pwd/fadi/examples/binderhub
```

2. open the **config.yaml** file to set your docker credentials and the the name of your project to the following inputs:
```yaml
config:
    BinderHub:
      use_registry: true
      image_prefix: <DOCKER_ID>/<PROJECT_NAME>-
registry:
    username: <DOCKER_ID>
    password: >DOCKER_PASSWORD>
```

3. Launch the Helm script, this will deploy all the FADI services and Binderhub on the cluster (and may take some time).
```bash
./deploy.sh
# see deploy.log for connection information to the various services
```

# Basic example of binderhub workflow
This example is used to test the deployment of binderhub with a project using a requirement.txt file.

## Input
the first step is to connect to the BinderHub page.

If you work with **minikube** the command `minikube service list` will allow you to recover the address to copy and paste in your browser. On the other hand in the case of a bare-metal cluster it is the command: `kubectl get svc -n binderhub` which will allow you to recover the service port.
As this service is of NodePort type, you can use the IP address of any node to reach the BinderHub home page.

Once on the binderhub page, simply fill in the fields with the following (as the figure below):
- **github repository name or url:** `https://github.com/binder-examples/requirements`
- **branch:** `master`


To finish click on `launch` button

![images/1_input.png](images/1_input.png)
## Building
From now, everything is automatic. BinderHub will create a container image based on the github project. depending on the power of your computer this step can take longer or shorter.

![images/2_building.png](images/2_building.png)
## Pushing
The image is now built, it will be saved in your docker image repo ([hub.docker.com](hub.docker.com)). It will no longer be necessary to go back through the build stages to access this project. The time of this step will be dependent on your internet connection, indeed the image size is almost 600mb

![images/3_pushing.png](images/3_pushing.png)
## Server
The project will automatically be launched in JupyterHub once all these steps are completed.

![images/4_jupyter.png](images/4_jupyter.png)
## Launch
You can now enjoy your work environment!

![images/5_notebook.png](images/5_notebook.png)
# References
 - [https://binderhub.readthedocs.io/en/latest/](https://binderhub.readthedocs.io/en/latest/)
