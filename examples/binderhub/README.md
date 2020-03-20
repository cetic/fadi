<a href="https://binderhub.readthedocs.io/en/latest/" alt="Apache Nifi"><img src="images/logos/binderhub.png" width="200px" /></a>

# What's Binderhub

*The primary goal of BinderHub is creating custom computing environments that can be used by many remote users. BinderHub enables an end user to easily specify a desired computing environment from a Git repo. BinderHub then serves the custom computing environment at a URL which users can access remotely.*

# Add Binderhub around FADI

We assume that you have already a cluster deployed. If not, you can refer and follow our [Installation guide]() until the point 1.2.2

Clone this repository and go to the binderhub example folder:

```bash
git clone https://github.com/cetic/fadi.git fadi
cd $pwd/fadi/examples/binderhub
```

Launch the Helm script, this will deploy all the FADI services and Binderhub on the cluster (and may take some time).

```bash
./deploy.sh
# see deploy.log for connection information to the various services
```

# Basic example of binderhub workflow
# References
 - [https://binderhub.readthedocs.io/en/latest/](https://binderhub.readthedocs.io/en/latest/)
