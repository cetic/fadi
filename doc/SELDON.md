Seldon
==========

<p align="left";>
	<a href="https://www.elastic.co" alt="elk">
	    <img src="./images/logos/seldon_logo.jpg" align="center" alt="ELK logo" width="200px" />
    </a>
</p>

[Seldon Core](https://www.seldon.io/tech/products/core/https://www.seldon.io/tech/products/core/) is an open source platform for deploying machine learning models on a Kubernetes cluster. It extends Kubernetes with **its own custom resource SeldonDeployment** where you can define your runtime inference graph made up of models and other components that Seldon will manage.


##Install Seldon Core
 
#### 1. Deploy Seldon core

Set seldon-core-operator.enabled to `true` in the `values.yaml`.


## Deploy your model

#### 1. Wrap your model ( Dockerize it )

To allow your component (model, router etc.) to be managed by seldon-core it needs to be built into a **Docker container** and to expose the appropriate [service microservice APIs over REST or gRPC](https://docs.seldon.io/projects/seldon-core/en/latest/reference/apis/internal-api.html).

To wrap your model follow these [instructions](https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/README.html).

#### 2. Create your inference graph

Seldon Core extends Kubernetes with its own custom resource **SeldonDeployment** where you can define your runtime [inference graph](https://docs.seldon.io/projects/seldon-core/en/latest/graph/inference-graph.html) made up of models and other components that Seldon will manage. 

A **SeldonDeployment** is a JSON or YAML file that allows you to define your graph of component images and the resources each of those images will need to run (using a Kubernetes PodTemplateSpec). The following is minimal example for a single model,  in YAML:

```
apiVersion: machinelearning.seldon.io/v1alpha2
kind: SeldonDeployment
metadata:
  name: seldon-model
spec:
  name: test-deployment
  predictors:
  - componentSpecs:
    - spec:
        containers:
        - name: classifier
          image: seldonio/mock_classifier:1.0
    graph:
      children: []
      endpoint:
        type: REST
      name: classifier
      type: MODEL
    name: example
    replicas: 1
```
The key components are:

* A list of Predictors, each with a specification for the number of replicas.
	* Each defines a graph and its set of deployments. Multiple predictors is useful when you want to split traffic between a main graph and a canary or for other production rollout scenarios.
* For each predictor a list of componentSpecs. Each componentSpec is a Kubernetes PodTemplateSpec which Seldon will build into a Kubernetes Deployment. Place here the images from your graph and their requirements, e.g. Volumes, ImagePullSecrets, Resources Requests etc.
* A graph specification that describes how your components are joined together.

To understand the inference graph definition in detail see [here](https://docs.seldon.io/projects/seldon-core/en/latest/reference/seldon-deployment.html)

#### 3. Deploy your model

 Once you have created your inference graph as a JSON or YAML Seldon Deployment resource ( the previous step ) you can deploy to Kubernetes with kubectl:

```
kubectl apply -f my_deployment.yaml
```
To delete ( or manage ) your **SeldonDeployment** you can use kubectl for the custom resource SeldonDeployment, for example to see if there are any models deployed:

```
kubectl get seldondeployment
```
to delete the model `seldon-model`:

```
kubectl delete seldondeployment seldon-model
```