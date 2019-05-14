#!python

import sqlite3, os
conn = sqlite3.connect("/var/lib/pgadmin/pgadmin4.db")
c= conn.cursor()

def insert_env_var(s):
    ss = s
    for k, v in os.environ.items():
        ss = ss.replace("<"+k+">",v)
    return ss
try:
    st= "INSERT INTO server (id, user_id, servergroup_id, name, host, port, maintenance_db, username, ssl_mode, hostaddr, db_res, sslcert, sslkey, sslcompression, use_ssh_tunnel, tunnel_port, tunnel_authentication, connect_timeout) values (1, 1, 1, 'Data Ware House', '<POSTGRES_SERVICE>', '<POSTGRES_PORT>', '<POSTGRES_USER>', '<POSTGRES_PASSWORD>', 'prefer', '', '', '<STORAGE_DIR>/.postgresql/postgresql.crt', '<STORAGE_DIR>/.postgresql/postgresql.key', 0, 0, '22', 0, 0);"
    statement = insert_env_var(st)
    c.execute(statement)
    conn.commit()
except Exception as e:
    conn.rollback()
