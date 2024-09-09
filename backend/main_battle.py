import requests
import backend.db_utils as db
import random
import backend.first_battle as fb
import json
import sys



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
    return json.dumps(result)

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

def get_pokemon_with_similar_hp(max_hp, user_id):
    graphql_url = "https://beta.pokeapi.co/graphql/v1beta"
    payload = {
        "operationName": "samplePokeAPIquery",
        "query": r"query samplePokeAPIquery($maxhp: Int) {pokemon_v2_pokemon (where: {pokemon_v2_pokemonstats: {stat_id: {_eq: 1}, _and: {base_stat: {_lte: $maxhp}}}, id: {_lte: 151}}) {name}}",
        "variables": {"maxhp": max_hp},
    }
    data = requests.post(graphql_url, json=payload)
    data = data.json()
    pokemon_names = []
    for i in range(0, len(data['data']['pokemon_v2_pokemon'])):
        pokemon_names.append(data['data']['pokemon_v2_pokemon'][i]['name'])

    # get list of user's pokemon to prevent these from appearing as opponents

    query = """
            SELECT pokemon_name FROM pokemon WHERE pokemon.user_id = %s;
            """
    party_pokemon = db.connect_db_multiple_results(query, (user_id,))
    party_names = []

    for i in range(0, len(party_pokemon)):
        party_names.append(party_pokemon[i]['pokemon_name'])
        pokemon_names.remove(party_names[i])

    return pokemon_names




# cpu will choose random pokemon from list

def cpu_pokemon_choice(pokemon_names):
    return random.choice(pokemon_names)

def get_pokemon_id(pokemon_name):
    data = fb.get_response_from_api(pokemon_name)
    return data['id']

def get_pokemon_type(pokemon_name):
    data = fb.get_response_from_api(pokemon_name)
    return data['types'][0]['type']['name']


# get moves - keeping cpu pokemon at level 1
def get_moves(pokemon_name):
    data = fb.get_response_from_api(pokemon_name)
    move_names = []
    for i in range(len(data['moves'])):
        if data['moves'][i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" and data['moves'][i]['version_group_details'][0]['level_learned_at'] == 1:
            move_names.append(data['moves'][i]['move']['name'])
    if len(move_names) > 4:
        while len(move_names) > 4:
            rand_num = random.randint(0,len(move_names) - 1)
            del move_names[rand_num]
    return move_names

def get_pokemon_exp(pokemon_name):
    data = fb.get_response_from_api(pokemon_name)
    return data['base_experience']

def get_pokemon_weight(pokemon_name):
    data = fb.get_response_from_api(pokemon_name)
    return data['weight']

def get_pokemon_sprite(pokemon_name):
    data = fb.get_response_from_api(pokemon_name)
    return data['sprites']['versions']['generation-i']['yellow']['front_default']

"""later: match cpu pokemon level to user pokemon level"""

# get info about cpu pokemon

def get_pokemon_data(cpu_pokemon_name):
    cpu_pokemon = dict(name = f"{cpu_pokemon_name}", id = get_pokemon_id(cpu_pokemon_name), type = get_pokemon_type(cpu_pokemon_name), hp = fb.get_hp_stat(cpu_pokemon_name), moves = get_moves(cpu_pokemon_name), sprite = get_pokemon_sprite(cpu_pokemon_name) )
    return cpu_pokemon