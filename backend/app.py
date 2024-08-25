from flask import Flask, render_template, request, session
from flask_session import Session
import battle
from flask_mysqldb import MySQL
import MySQLdb.cursors, re, hashlib
import db_utils as db



app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')


app.secret_key = 'BAD_SECRET_KEY'
mysql = MySQL(app)

@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle")
def battle_page():
    return render_template('battle.html') 

@app.route("/battle", methods=['POST', 'GET'])
def get_user_cpu_pokemon():
    return battle.get_pokemon()

@app.route("/battle/launch", methods=['GET', 'POST'])
def cpu_move():
    return battle.cpu_turn()

@app.route("/battle/launch/turn", methods=['GET', 'POST'])
def user_move():
    return battle.user_turn()


if __name__ == '__main__':
    app.run(debug=True, port=5001)