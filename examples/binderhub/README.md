BinderHub
===========

* [What is BinderHub](#what-is-binderhub)
* [Add Binderhub to FADI](#add-binderhub-to-fadi)
* [Basic example of BinderHub workflow](#basic-example-of-binderhub-workflow)
    * [BinderHub Configuration](#binderhub-configuration)
    * [Build the image](#building-the-image)
    * [Publish the image](#publishing-the-image)
    * [View the project in JupyterHub](#view-the-project-in-jupyterhub)
    * [Launch the project](#launch-the-project)
* [References](#references)            
    
## What is Binderhub

<a href="https://binderhub.readthedocs.io/en/latest/" title="BinderHub"><img src="images/binderhub.png" width="200px" alt="Binderhub" /></a>

> *The primary goal of BinderHub is creating custom computing environments that can be used by many remote users. BinderHub enables an end user to easily specify a desired computing environment from a Git repo. BinderHub then serves the custom computing environment at a URL which users can access remotely.*

> *BinderHub will build Docker images out of Git repositories, and then push them to a Docker registry so that JupyterHub can launch user servers based on these images*

## Prerequisites

We assume in this documentation that 

* you have already a Kubernetes cluster deployed. If not, you can refer and follow our [Installation guide](https://github.com/cetic/fadi/blob/master/INSTALL.md) to install a local minikube cluster. 
* you will have a [valid Docker account](https://hub.docker.com/signup/).

## Add BinderHub to FADI

Follow the following steps to install FADI with BinderHub on your cluster:

1. Clone this repository and go to the [BinderHub example folder](/examples/binderhub):

```bash
git clone https://github.com/cetic/fadi.git fadi
cd fadi/examples/binderhub
```

2. Edit the [`config.yaml`](/examples/binderhub/config.yaml) file to set your Docker credentials (you need a Docker account because the containerized notebook will be stored on the official Docker registry - [Docker Hub](https://hub.docker.com/signup/)) and the name of your project:

```yaml
config:
    BinderHub:
      use_registry: true
      image_prefix: <DOCKER_ID>/<PROJECT_NAME>-
registry:
    username: <DOCKER_ID>
    password: <DOCKER_PASSWORD>
```

> The prefix of an image is always built in the same way when you want to save a container image in the Docker Hub. First the *username*, *a backslash* and then the *name of the project*. In our case, BinderHub will be responsible for adding a tag to version the container image.

3. Launch the Helm scripts, those will deploy all the FADI services and BinderHub on the cluster (this may take some time).
```bash
../helm/deploy.sh
./deploy_binderhub.sh
# see deploy.log for connection information to the various services
```
> The first script deploys FADI. It is important to do this from the **fadi/examples/binderhub** folder so that the **values.yaml** file is taken into account and that JupyterHub is not deployed. The second script will deploy BinderHub.

## Basic example of BinderHub workflow

This example is used to test the deployment of BinderHub with a project using a `requirement.txt` file.

### BinderHub configuration

The first step is to access the BinderHub page.

If your Kubernetes cluster is deployed with **minikube**, the command `minikube service list` will allow you to recover the address to copy/paste in your browser. On the other hand, in the case of a bare-metal cluster, the command: `kubectl get svc -n binderhub` will allow you to recover the service port.
As this service is of `NodePort` type, you can use the IP address of any node to reach the BinderHub home page.

Once on the BinderHub page is opened, simply fill in the fields with the following inputs:

- **GitHub repository name or url:** `https://github.com/binder-examples/requirements`
- **branch:** `master`

Finally, click on the `launch` button:

![images/1_input.png](images/1_input.png)

### Build the image

From now on, everything is automated. BinderHub will create a container image based on what resides in the git project.

![images/2_building.png](images/2_building.png)

### Publish the image

The image is now built, it will be saved in your Docker repository, e.g. ([hub.docker.com](https://hub.docker.com)). It will no longer be necessary to go back through the build stages to access this project. The duration of this step will be dependent on your internet connection (the image size is almost 600MB).

![images/3_pushing.png](images/3_pushing.png)

### View the project in JupyterHub

The project will automatically be launched in JupyterHub once all the previous steps are completed.

![images/4_jupyter.png](images/4_jupyter.png)

### Launch the project

You can now enjoy your work environment!

![images/5_notebook.png](images/5_notebook.png)

## References

- [https://binderhub.readthedocs.io/en/latest/](https://binderhub.readthedocs.io/en/latest/)