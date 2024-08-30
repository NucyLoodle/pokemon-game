import requests
from flask import session
import db_utils as db
import first_battle


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

def get_maximum_user_hp(user_id):
    # get hp of user_pokemon
    query =  """
                SELECT MAX(hp) 
                FROM pokemon_stats 
                WHERE pokemon_stats.pokemon_db_id IN (SELECT pokemon.pokemon_db_id FROM pokemon WHERE pokemon.user_id = %s);
                """
    result = db.connect_db(query, (user_id,))
    return result




# get a list of names of pokemon that have similar hp to the user_pokemon

def get_pokemon_with_similar_hp(user_id):
    pokemon_names = []
    poke_data = []
    for i in range(1, 151):
        api_url = f"https://pokeapi.co/api/v2/pokemon/{i}"
        pokemon_response = requests.get(api_url)
        pokemon_data = pokemon_response.json()
        poke_data.append(pokemon_data)
    
    for j in range(0, 150):
        if poke_data[j]['stats'][0]['base_stat'] < get_maximum_user_hp(user_id)['MAX(hp)']:
                pokemon_names.append(poke_data[j]['name'])
    print(pokemon_names) 
    return pokemon_names   