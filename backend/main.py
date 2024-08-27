from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_session import Session
import battle
from flask_mysqldb import MySQL
import MySQLdb.cursors
import MySQLdb.cursors, re, hashlib
import db_utils as db
import login as lgn
import config as c
import display_profile as dp 
import add_pokemon as add

app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')


app.secret_key = 'BAD_SECRET_KEY'

@app.route("/login/")
def login_page():
    return render_template('login.html')

@app.route("/login/", methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']

        hash = password + app.secret_key
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
        if account:
            session['loggedin'] = True
            session['id'] = account['user_id']
            session['username'] = account['user_name']
            print("hi")
            return redirect(url_for('profile'))
        else:
            msg = "wrong username/password"
    return render_template('login.html', msg=msg)

@app.route("/profile")
def profile():
    # Check if the user is logged in
    if 'loggedin' in session:
        # User is loggedin show them the profile page
        return render_template('profile.html', username=session['username'])
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))
    
@app.route("/profile", methods=['GET', 'POST'])
def display_pokemon():
    if request.form['viewParty'] == 'viewParty':
        user_id = session['id']
        return dp.get_pokemon_names(user_id)

@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle")
def battle_page():
    print(session)
    if 'loggedin' in session:
        return render_template('battle.html') 
    return redirect(url_for('login'))

@app.route("/battle", methods=['POST', 'GET'])
def get_user_cpu_pokemon():
    user_pokemon_name = request.form['userPokemonChoice']
    user_id = session['id']
    data = battle.get_response_from_api(user_pokemon_name)
    pokemon_id = data['id']
    pokemon_type = data['types'][0]['type']['name']
    hp = data['stats'][0]['base_stat']
    level = 1
    exp = data['base_experience']
    weight = data['weight']

    if not add.pokemon_already_caught(user_id, pokemon_id):
        add.add_new_pokemon(user_id, pokemon_id, user_pokemon_name)
        add.add_pokemon_stats(user_id, user_pokemon_name, pokemon_type, hp, level, exp, weight)
    else:
        print("You have already caught this pokemon")
        return jsonify ({"failure" :"You have already caught this pokemon"})
    return battle.get_pokemon_data()
    
    #
# @app.route("/battle", methods=['POST', 'GET'])
# def save_pokemon_to_db():
#     return add.add_new_pokemon()


if __name__ == '__main__':
    app.run(debug=True, port=5001)