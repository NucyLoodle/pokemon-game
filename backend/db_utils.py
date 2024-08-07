"""
Functions to connect to and query the database
"""

import mysql.connector
from config import HOST, USER, PASSWORD
#from flask import request, jsonify
#from datetime import datetime


class DbConnectionError(Exception):
    pass


def _connect_to_db(db_name):
    """
    Pass in user login details to MySQL
    """
    cnx = mysql.connector.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        auth_plugin='mysql_native_password',
        database=db_name
    )
    return cnx


def connect_db(query):
    """
    Connects to database and passes in query
    """
    try:
        db_name = 'pokemon-game'
        db_connection = _connect_to_db(db_name)
        cur = db_connection.cursor(dictionary=True)
        print("Connected to DB: %s" % db_name)
        cur.execute(query)
        result = cur.fetchall()
        db_connection.commit()
        cur.close()
    except Exception:
        raise DbConnectionError("Failed to read data from the DB")
    finally:
        if db_connection:
            db_connection.close()
            print('DB connection is closed')
        return result