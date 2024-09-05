import backend.db_utils as db

def delete_pokemon(user_id, pokemon_name):
    query = """
            DELETE FROM pokemon WHERE pokemon_name = %s AND user_id = %s;
            """
    result = db.connect_db(query, (pokemon_name, user_id,))

    return f'{pokemon_name} released!'