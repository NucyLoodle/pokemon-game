from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import first_battle
import hashlib
import db_utils as db
import display_profile as dp 
import add_pokemon as add
import main_battle as mb
import release_pokemon as rp
import re

app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')


app.secret_key = 'fa5107419e490df4c861a681'

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
        print(account)
        if account:
            session['loggedin'] = True
            session['id'] = account['user_id']
            session['username'] = account['user_name']
            return redirect(url_for('profile'))
        else:
            msg = "wrong username/password"
    return render_template('login.html', msg=msg)

@app.route("/profile/flag", methods=['GET', 'POST'])
def first_battle_flag():
    if 'loggedin' in session:
        user_id = session['id']
        print(dp.get_flag(user_id))
        return dp.get_flag(user_id)

@app.route("/profile", methods=["GET", "POST"])
def profile():
    if 'loggedin' in session:
        user_id = session['id']
        # print(dp.get_flag(user_id))
        # if dp.get_flag(user_id)['first_battle'] == 1:
        #     msg = "first battle completed"
        return render_template('profile.html', username=session['username'])
    return redirect(url_for('login'))
    
@app.route("/profile/party", methods=['GET', 'POST'])
def display_pokemon():
    if request.form['viewParty'] == 'viewParty':
        user_id = session['id']
        return dp.get_pokemon_info(user_id)
    
@app.route("/profile/release", methods=['DELETE'])
def release_pokemon():
    pokemon_name = request.form['releaseButton']
    user_id = session['id']
    print(pokemon_name)    
    return rp.delete_pokemon(user_id, pokemon_name)


    
@app.route("/first-battle")
def battle_page():
    print(session['flag'])
    # if 'loggedin' in session and session['flag'] == True:

    #     return redirect(url_for('main_battle_page'))
         
    if 'loggedin' in session:
        return render_template('first-battle.html')
    
    return redirect(url_for('login'))

@app.route("/first-battle", methods=['POST', 'GET'])
def get_user_cpu_pokemon():

    if request.method == 'POST' and "userPokemonChoice" in request.form:
        user_pokemon_name = request.form['userPokemonChoice']
        user_id = session['id']
        data = first_battle.get_response_from_api(user_pokemon_name)
        pokemon_id = data['id']
        pokemon_type = data['types'][0]['type']['name']
        hp = data['stats'][0]['base_stat']
        level = 1
        exp = data['base_experience']
        weight = data['weight']
        pokemon_sprite = data['sprites']['versions']['generation-i']['yellow']['front_default']

        if not add.pokemon_already_caught(user_id, pokemon_id):
            add.add_new_pokemon(user_id, pokemon_id, user_pokemon_name)
            add.add_pokemon_stats(user_id, user_pokemon_name, pokemon_type, hp, level, exp, weight)
            add.add_pokemon_sprites(user_id, user_pokemon_name, pokemon_sprite)
            add.add_pokemon_moves(user_id, user_pokemon_name)
        else:
            return jsonify ({"failure" :"You have already caught this pokemon"})
        return first_battle.get_pokemon_data()

@app.route("/first-battle/end", methods=['POST', 'GET'])
def finish_battle():
    user_id = session['id']
    return first_battle.first_battle_completed(user_id)

@app.route("/battle")
def main_battle_page():
    if 'loggedin' in session:
        return render_template('battle.html') 
    return redirect(url_for('login'))

@app.route("/battle/party" , methods=['POST', 'GET'])
def show_party():
    user_id = session['id']
    return mb.get_pokemon_info_for_battle(user_id)

@app.route("/battle/cpu", methods=['POST', 'GET'])
def get_cpu_pokemon():
    user_id = session['id']
    max_hp = mb.get_maximum_user_hp(user_id)['MAX(hp)']
    pokemon_names = mb.get_pokemon_with_similar_hp(max_hp,user_id)
    cpu_pokemon_name = mb.cpu_pokemon_choice(pokemon_names)
    session['cpu_pokemon_name'] = cpu_pokemon_name
    return mb.get_pokemon_data(cpu_pokemon_name)




# @app.route("/battle/end" , methods=['POST', 'GET'])
# def end_of_battle():
#     return render_template('battle-end.html')

@app.route("/battle/end", methods=['POST', 'GET'])
def catch_pokemon():
    cpu_pokemon_name = session['cpu_pokemon_name']
    user_id = session['id']
    pokemon_id = mb.get_pokemon_id(cpu_pokemon_name)
    pokemon_type = mb.get_pokemon_type(cpu_pokemon_name)
    pokemon_sprite = mb.get_pokemon_sprite(cpu_pokemon_name)
    hp = first_battle.get_hp_stat(cpu_pokemon_name)
    level = 1
    exp = mb.get_pokemon_exp(cpu_pokemon_name)
    weight = mb.get_pokemon_weight(cpu_pokemon_name)

    add.add_new_pokemon(user_id, pokemon_id, cpu_pokemon_name)
    add.add_pokemon_stats(user_id, cpu_pokemon_name, pokemon_type, hp, level, exp, weight)
    add.add_pokemon_sprites(user_id, cpu_pokemon_name, pokemon_sprite)
    add.add_pokemon_moves(user_id, cpu_pokemon_name)
    return "success"
    
@app.route("/logout")
def logout():
    # Remove session data, this will log the user out
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    # Redirect to login page
    return redirect(url_for('login'))


@app.route('/', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    msg = ''
    # Check if "username", "password" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        # Create variables for easy access
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        hash = password + app.secret_key
        hash = hashlib.sha1(hash.encode())
        password = hash.hexdigest()

        queryOne = """
                    INSERT INTO user_profile (email, user_name, first_battle)
                    VALUES (%s, %s, %s);
                    """
        queryTwo =  """
                    INSERT INTO passwords (user_id, password)
                    VALUES 
                    ((SELECT user_id FROM user_profile 
                    WHERE email = %s 
                    AND user_name = %s), %s);
                    """
        account = db.connect_db(queryOne, (email, username, 0,))
        db.connect_db(queryTwo, (email, username, password,))
        if account:
            msg = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers!'
        elif not username or not password or not email:
            msg = 'Please fill out the form!'
        else:
            # Hash the password
            hash = password + app.secret_key
            hash = hashlib.sha1(hash.encode())
            password = hash.hexdigest()
            msg = 'You have successfully registered!'
    
    elif request.method == 'POST':
        # Form is empty... (no POST data)
        msg = 'Please fill out the form!'
    # Show registration form with message (if any)
    return render_template('index.html', msg=msg)

if __name__ == '__main__':
    app.run(debug=True, port=5001)