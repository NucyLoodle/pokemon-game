"""
Functions to connect to and query the database
"""

import mysql.connector
from config import HOST, USER, PASSWORD
from flask import request, jsonify
#from datetime import datetime


class DbConnectionError(Exception):
    pass


def _connect_to_db(db_name):
    """
    Pass in user login details to MySQL
    """
    try:

        cnx = mysql.connector.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            auth_plugin='mysql_native_password',
            database=db_name
        )
        return cnx
    except Exception as e:
        print(f'failed to connect + {str(e)}')


def connect_db(query, params):
    """
    Connects to database and passes in query
    """
    try:
        db_name = 'pokemon_game'
        db_connection = _connect_to_db(db_name)
        cur = db_connection.cursor(dictionary=True)
        print("Connected to DB: %s" % db_name)
        cur.execute(query, params)
        result = cur.fetchone()
        db_connection.commit()
        cur.close()
    except Exception:
        raise DbConnectionError("Failed to read data from the DB")
    finally:
        if db_connection:
            db_connection.close()
            print('DB connection is closed')
        return result

# Save user pokemon name to db

def add_new_pokemon(user_id, pokemon_id, pokemon_name, pokemon_type):
    update = request.get_json()
    query = f"""
            INSERT INTO pokemon (user_id, pokemon_id, pokemon_name, pokemon_type)
            VALUES ('{update[user_id]}', '{update[pokemon_id]}', '{update[pokemon_name]}', '{update[pokemon_type]}');
            """
    connect_db(query)
    return jsonify(
        {"success": f"{pokemon_name} added to your party"})


if __name__ == '__main__':
    pass