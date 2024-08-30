import requests
import db_utils as db
import random



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

def get_pokemon_with_similar_hp(max_hp):
    graphql_url = "https://beta.pokeapi.co/graphql/v1beta"
    payload = {
        "operationName": "samplePokeAPIquery",
        "query": r"query samplePokeAPIquery($maxhp: Int) {pokemon_v2_pokemon (where: {pokemon_v2_pokemonstats: {base_stat: {_lt: $maxhp}}, id: {_lte: 151}}) {name}}",
        "variables": {"maxhp": max_hp},
    }
    data = requests.post(graphql_url, json=payload)
    data = data.json()
    pokemon_names = []
    for i in range(0, len(data['data']['pokemon_v2_pokemon'])):
        pokemon_names.append(data['data']['pokemon_v2_pokemon'][i]['name'])
    return pokemon_names



# cpu will choose random pokemon from list

def cpu_pokemon_choice(pokemon_names):
    return random.choice(pokemon_names)
