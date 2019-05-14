FROM python:3.6

ENV ADMIN_PWD "admin"
ENV ADMIN_MAIL "admin@admin.com"
ENV ADMIN_LAST_NAME "admin"
ENV ADMIN_FIRST_NAME "user"
ENV ADMIN_USER "admin"
ENV PORT 8088

RUN apt-get update
RUN apt-get -y install build-essential libssl-dev libffi-dev python-dev python-pip libsasl2-dev libldap2-dev python-dev
RUN pip install -U pip
RUN pip install psycopg2-binary
RUN pip install pymysql
RUN pip install "markdown<3.0.0" superset
EXPOSE $PORT

RUN fabmanager create-admin --app superset --username $ADMIN_USER --firstname $ADMIN_FIRST_NAME --lastname $ADMIN_LAST_NAME --email $ADMIN_MAIL --password $ADMIN_PWD
RUN superset db upgrade
RUN superset load_examples
RUN superset init
CMD ["superset", "runserver", "-d"]
