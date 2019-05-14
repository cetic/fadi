# Done in gitlab-ci
cd docker-superset
docker build -t superset .
cd ../jlab
docker build -t jlab .
cd ..
