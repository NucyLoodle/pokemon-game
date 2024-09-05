"""
Functions to connect to and query the database
"""

import MySQLdb
import MySQLdb.cursors



def connect_db(query, params):

    db_connection= MySQLdb.connect("HOST","USERNAME","PASSWORD","DBGAME", cursorclass=MySQLdb.cursors.DictCursor)
    cursor=db_connection.cursor()
    cursor.execute(query, params)
    db_connection.commit()
    result = cursor.fetchone()
    return result
    db_connection.close()


def connect_db_multiple_results(query, params):
    db_connection= MySQLdb.connect("HOST","USERNAME","PASSWORD","DBGAME", cursorclass=MySQLdb.cursors.DictCursor)
    cursor=db_connection.cursor()
    cursor.execute(query, params)
    db_connection.commit()
    result = cursor.fetchall()
    return result
    db_connection.close()




if __name__ == '__main__':
    pass