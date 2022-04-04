---
name: Bug report
about: Create a report to help us improve
title: ''
labels: 'bug'
assignees: ''

---

<!-- Thanks for filing an issue! Before hitting the button, please answer these questions. It's helpful to search the existing GitHub issues first. It's likely that another user has already reported the issue you're facing, or it's a known issue that we're already aware of 

Fill in as much of the template below as you can.  If you leave out information, we can't help you as well.

Be ready for followup questions, and please respond in a timely manner. If we can't reproduce a bug or think a feature already exists, we might close your issue. If we're wrong, PLEASE feel free to reopen it and explain why.
-->

**Describe the bug**
A clear and concise description of what the bug is.

**Environment**:
Provide the environment in which the bug has happened (minikube on a workstation, full fledged Kubernetes cluster, ...)

* **OS** (e.g. from `/etc/os-release`)
* **VM driver** (e.g. `cat ~/.minikube/machines/minikube/config.json | grep DriverName`)
* **Minikube version** (e.g. `minikube version`)

**What happened**:


**What you expected to happen**:


**How to reproduce it** (as minimally and precisely as possible):

**Output of `minikube logs` (if applicable)**:

**Output of Kubectl for pods, events**

```bash
kubectl get events --all-namespaces
kubectl get events -n fadi
kubectl get pods -n fadi
kubectl logs fadi-nifi
```

**Anything else we need to know**:

