from flask import request, session
import db_utils as db
import battle 

def pokemon_already_caught(user_id, pokemon_id):
    query = """
            SELECT pokemon_id FROM pokemon p WHERE p.user_id = %s AND p.pokemon_id = %s
            """
    result = db.connect_db(query, (user_id, pokemon_id,))
    if result:
        return True 
    else:
        return False

def add_new_pokemon(user_id, pokemon_id, user_pokemon_name):
    
    query = """
            INSERT INTO pokemon (user_id, pokemon_id, pokemon_name)
            VALUES (%s, %s, %s);
            """
    db.connect_db(query, (user_id, pokemon_id, user_pokemon_name,)) 
    print("yay")
    return f"success {user_pokemon_name} added to your party"
   


def add_pokemon_stats(user_id, pokemon_type, hp, level, exp, weight):
    #user_id = session['id']
    query = """
    INSERT INTO pokemon_stats(pokemon_db_id, pokemon_type, hp, level, exp, weight)
    VALUES ((SELECT pokemon_db_id FROM pokemon p WHERE p.user_id = %s), %s, %s, %s, %s, %s); 

    """ # problem with multiple pokemon
    db.connect_db(query, (user_id, pokemon_type, hp, level, exp, weight,)) # edit type is now in new table
    print("yay")
    return f"success"




