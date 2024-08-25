from flask import Flask, render_template, request, session
from flask_session import Session
import battle
from flask_mysqldb import MySQL
import MySQLdb.cursors
import MySQLdb.cursors, re, hashlib
import db_utils as db
import login as lgn
import config as c




app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')


app.secret_key = 'BAD_SECRET_KEY'

@app.route("/login", methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        lgn.check_login_details()
        # Retrieve the hashed password
        # hash = password + app.secret_key
        # hash = hashlib.sha1(hash.encode())
        # password = hash.hexdigest()
        # Check if account exists using MySQL
       
    return render_template('login.html', msg=msg)


@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle")
def battle_page():
    return render_template('battle.html') 

@app.route("/battle", methods=['POST', 'GET'])
def get_user_cpu_pokemon():
    return battle.get_pokemon()

if __name__ == '__main__':
    app.run(debug=True, port=5001)