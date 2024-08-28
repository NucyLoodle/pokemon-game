from flask import session, jsonify
import db_utils as db
# display images of user's pokemon
# display name
# display stats

#user_id = session['id']
user_id = 1

def get_pokemon_names(user_id):
    # access the db to get a list of user's pokemon

    query = """
            SELECT pokemon_name, pokemon_db_id FROM pokemon p WHERE p.user_id = %s
            """
    result = db.connect_db_multiple_results(query, (user_id,))
    return result




# def get_pokemon_stats
