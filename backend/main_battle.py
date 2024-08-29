import db_utils as db

def get_pokemon_info_for_battle(user_id):
    
    # access the db to get a list of user's pokemon and their stats

    query = """
            SELECT pokemon.pokemon_name, pokemon_moves.move_1, pokemon_moves.move_2, pokemon_moves.move_3, pokemon_moves.move_4, pokemon_sprites.pokemon_sprite, pokemon_stats.pokemon_type, pokemon_stats.hp, pokemon_stats.level, pokemon_stats.exp, pokemon_stats.weight
            FROM pokemon
            INNER JOIN pokemon_moves ON pokemon.pokemon_db_id = pokemon_moves.pokemon_db_id
            INNER JOIN pokemon_sprites ON pokemon_moves.pokemon_db_id = pokemon_sprites.pokemon_db_id
            INNER JOIN pokemon_stats ON pokemon_sprites.pokemon_db_id = pokemon_stats.pokemon_db_id
            WHERE pokemon_moves.pokemon_db_id IN (SELECT pokemon.pokemon_db_id FROM pokemon WHERE pokemon.user_id = %s);
            """
    result = db.connect_db_multiple_results(query, (user_id,))
    return result