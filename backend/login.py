import db_utils as db
import hashlib
import main as m
from flask import request, session

"""
Functions for logging in and registering new users
"""
# def check_account_exists(username):
#     """
#     Check to see if the account has already been registered with the entered username
#     """
#     query = f"""
#                 SELECT * FROM user_profile u 
#                 INNER JOIN passwords p 
#                 ON u.user_id = p.user_id
#                 WHERE u.user_name = %s;
#             """
#     result = db.connect_db(query, (username,))
#     return result


# def login_valid(username, password):
#     """
#     Checks the entered email and password against the details in the db
#     - returns a boolean
#     """
#     query = """
#                 SELECT * FROM user_profile u 
#                 INNER JOIN passwords p 
#                 ON u.user_id = p.user_id
#                 WHERE u.user_name = %s 
#                 AND p.password = %s;
#             """    
#     result = db.connect_db(query, (username, password,))

#     if result:
#         return True
#     else:
#         return False

# def check_login_details():
    
#     """
#     Check database to see if both email and password exist for user
#     Send message to be checked in frontend to determine redirection
#     """
#     username = request.form['username']
#     password = request.form['password']

#     hash = password + m.app.secret_key
#     hash = hashlib.sha1(hash.encode())
#     password = hash.hexdigest()
#     #print(password)
#     username_exists = check_account_exists(username)
#     if username_exists:
#         result = login_valid(username, password)
#         if result:
#             rtn_msg = "account found"
#             #print(rtn_msg)
#         else:
#             rtn_msg = "password incorrect"
#             #print(rtn_msg)
#     else:
#         rtn_msg = "account not found, please sign up"
#         #print(rtn_msg)
#     return rtn_msg


def check_login():
    username = request.form['username']
    password = request.form['password']

    hash = password + m.app.secret_key
    hash = hashlib.sha1(hash.encode())
    password = hash.hexdigest()

    query = """
                SELECT * FROM user_profile u 
                INNER JOIN passwords p 
                ON u.user_id = p.user_id
                WHERE u.user_name = %s 
                AND p.password = %s;
            """    
    account = db.connect_db(query, (username, password,))
    #print(account)
    #print(account[0]['user_id'])
    
    if account:
        session['loggedin'] = True
        session['id'] = account['user_id']
        session['username'] = account['user_name']
        return "Logged in"
    else:
        return "wrong username/password"