from flask import request, session
import db_utils as db
import battle 

def add_new_pokemon(user_id, pokemon_id, user_pokemon_name):

        # user_pokemon_name = request.form['userPokemonChoice']
        # user_id = session['id']
        # data = battle.get_response_from_api(user_pokemon_name)
        # pokemon_id = data['id']
        # pokemon_type = data['types'][0]['type']['name']


        query = """
                INSERT INTO pokemon (user_id, pokemon_id, pokemon_name)
                VALUES (%s, %s, %s);
                """
        db.connect_db(query, (user_id, pokemon_id, user_pokemon_name,)) # edit type is now in new table
        print("yay")
        return f"success {user_pokemon_name} added to your party"


def add_pokemon_stats(user_id, pokemon_type, hp, level, exp, weight):

        query = """
        INSERT INTO pokemon_stats(pokemon_db_id, pokemon_type, hp, level, exp, weight)
        VALUES ((SELECT pokemon_db_id FROM pokemon p WHERE p.user_id = %s), %s, %s, %s, %s, %s)

        """
        db.connect_db(query, (user_id, pokemon_type, hp, level, exp, weight,)) # edit type is now in new table
        print("yay")
        return f"success"



