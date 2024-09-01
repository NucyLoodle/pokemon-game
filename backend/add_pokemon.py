import db_utils as db
import first_battle as fb

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
    return f"success {user_pokemon_name} added to your party"
   
def add_pokemon_stats(user_id, user_pokemon_name, pokemon_type, hp, level, exp, weight):
    query = """
            INSERT INTO pokemon_stats(pokemon_db_id, pokemon_type, hp, level, exp, weight)
            VALUES ((SELECT pokemon_db_id FROM pokemon p WHERE p.user_id = %s AND p.pokemon_name = %s), %s, %s, %s, %s, %s); 
            """ 
    db.connect_db(query, (user_id, user_pokemon_name, pokemon_type, hp, level, exp, weight,)) # edit type is now in new table
    return f"success"

def add_pokemon_sprites(user_id, user_pokemon_name, pokemon_sprite):
    query = """
            INSERT INTO pokemon_sprites(pokemon_db_id, pokemon_sprite)
            VALUES ((SELECT pokemon_db_id FROM pokemon p WHERE p.user_id = %s AND p.pokemon_name = %s), %s);
            """
    db.connect_db(query, (user_id, user_pokemon_name, pokemon_sprite,))

def add_pokemon_moves(user_id, user_pokemon_name):
    moves = fb.get_initial_moves(user_pokemon_name)
    if (len(moves) < 4):
        for i in range(1, 5 - len(moves)):
            moves.append('null')
    
    query = """
            INSERT INTO pokemon_moves (pokemon_db_id, move_1, move_2, move_3, move_4)
            VALUES (
                (SELECT pokemon.pokemon_db_id FROM pokemon WHERE pokemon.user_id = %s AND pokemon.pokemon_name = %s), 
                %s, %s, %s, %s);
            """
    db.connect_db(query, (user_id, user_pokemon_name, moves[0], moves[1], moves[2], moves[3], ))
    


