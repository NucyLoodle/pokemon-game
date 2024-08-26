from flask import request, session
import db_utils as db
import battle 

def add_new_pokemon(user_id, pokemon_id, user_pokemon_name, pokemon_type):
    # user_pokemon_name = request.form['userPokemonChoice']
    # user_id = session['id']
    # data = battle.get_response_from_api(user_pokemon_name)
    # pokemon_id = data['id']
    # pokemon_type = data['types'][0]['type']['name']


    query = """
            INSERT INTO pokemon (user_id, pokemon_id, pokemon_name, pokemon_type)
            VALUES (%s, %s, %s, %s);
            """
    db.connect_db(query, (user_id, pokemon_id, user_pokemon_name, pokemon_type,)) # edit params
    print("yay")
    return f"success {user_pokemon_name} added to your party"

