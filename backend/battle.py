import requests
import random
from flask import request, session

"""
Functions to create the initial battle between player and CPU
"""

def get_response_from_api(pokemon_name):
    api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
    response = requests.get(api_url)
    data = response.json()
    return data

def get_initial_moves(pokemon_name):
    data = get_response_from_api(pokemon_name)
    move_names = []
    for i in range(len(data)):
        if data['moves'][i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" and data['moves'][i]['version_group_details'][0]['level_learned_at'] == 1:
            move_names.append(data['moves'][i]['move']['name'])
    return move_names
            
def get_hp_stat(pokemon_name):
    data = get_response_from_api(pokemon_name)
    hp_stat = data['stats'][0]['base_stat']
    return hp_stat
    
def damage():
    return random.randint(1, 10)

def get_pokemon_data():
    user_pokemon_name = request.form['userPokemonChoice']
    session['pokemon_name'] = user_pokemon_name
    user_pokemon = dict(name = f"{user_pokemon_name}", hp = get_hp_stat(user_pokemon_name), moves = get_initial_moves(user_pokemon_name) )
    starter_pokemon =["bulbasaur", "charmander", "squirtle"]
    available_pokemon = [pokemon for pokemon in starter_pokemon if pokemon != user_pokemon_name]
    cpu_pokemon_name = random.choice(available_pokemon)
    session['cpu_pokemon_name'] = cpu_pokemon_name
    cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = get_hp_stat(cpu_pokemon_name), moves = get_initial_moves(cpu_pokemon_name) )
    poke_list = []
    poke_list.append(user_pokemon)
    poke_list.append(cpu_pokemon)
    return poke_list