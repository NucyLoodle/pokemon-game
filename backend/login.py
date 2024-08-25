import db_utils as db
from flask import request
import hashlib
import main as m

"""
Functions for logging in and registering new users
"""
def check_account_exists(username):
    """
    Check to see if the account has already been registered with the entered username
    """
    query = f"""
                SELECT * FROM user_profile u 
                INNER JOIN passwords p 
                ON u.user_id = p.user_id
                WHERE u.user_name = '{username}';
            """
    result = db.connect_db(query)
    return result


def login_valid(username, password):
    """
    Checks the entered email and password against the details in the db
    - returns a boolean
    """
    query = f"""
                SELECT * FROM user_profile u 
                INNER JOIN passwords p 
                ON u.user_id = p.user_id
                WHERE u.user_name = '{username}' 
                AND p.password = '{password}';
            """
    result = db.connect_db(query)

    if result:
        return True
    else:
        return False

def check_login_details():
    """
    Check database to see if both email and password exist for user
    Send message to be checked in frontend to determine redirection
    """
    update = request.form
    username = request.form['username']
    password = request.form['password']

    hash = password + m.app.secret_key
    hash = hashlib.sha1(hash.encode())
    password = hash.hexdigest()
    print(password)


    username_exists = check_account_exists(username)
    if username_exists:
        result = login_valid(username, password)
        if result:
            rtn_msg = "account found"
            print(rtn_msg)
        else:
            rtn_msg = "password incorrect"
            print(rtn_msg)
    else:
        rtn_msg = "account not found, please sign up"
        print(rtn_msg)
    return rtn_msg