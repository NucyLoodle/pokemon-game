import requests
from pprint import pprint as pp
import random
from flask import request, jsonify, session
import db_utils as db



def add_pokemon(pokemon_name):
    """
    Adds new pokemon
    """
    data = get_response_from_api(pokemon_name)
    pokemon_id = data['id']
    pokemon_type = data['types'][0]['type']['name']
    
    print(pokemon_id)
    print(pokemon_type)
    return db.add_new_pokemon(1, pokemon_id, pokemon_name, pokemon_type)

"""
Functions to create the initial battle between player and CPU
"""

def get_pokemon():
    user_pokemon_name = request.form['userPokemonChoice']
    session['pokemon_name'] = user_pokemon_name
    user_pokemon = dict(name = f"{user_pokemon_name}", hp = get_hp_stat(user_pokemon_name), moves = get_initial_moves(user_pokemon_name) )
    # launch_battle_button = request.form['launchBattle']   
    starter_pokemon =["bulbasaur", "charmander", "squirtle"]
    """later: cpu chooses pokemon with type advantage"""
    available_pokemon = [pokemon for pokemon in starter_pokemon if pokemon != user_pokemon_name]
    cpu_pokemon_name = random.choice(available_pokemon)
    session['cpu_pokemon_name'] = cpu_pokemon_name
    cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = get_hp_stat(cpu_pokemon_name), moves = get_initial_moves(cpu_pokemon_name) )
    poke_list = []
    poke_list.append(user_pokemon)
    poke_list.append(cpu_pokemon)
    print(poke_list)
    return poke_list

def get_response_from_api(pokemon_name):
    api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
    response = requests.get(api_url)
    data = response.json()
    return data

def get_initial_moves(pokemon_name):
    data = get_response_from_api(pokemon_name)
    # filter data by level-learned-at: 1 and mover_learn_method: name: "level-up"
    """later: up to four moves are allocated to the pokemon"""
    move_names = []
    for i in range(len(data)):
        if data['moves'][i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" and data['moves'][i]['version_group_details'][0]['level_learned_at'] == 1:
            move_names.append(data['moves'][i]['move']['name'])
    return move_names
            
def get_hp_stat(pokemon_name):
    # get pokemon hp
    data = get_response_from_api(pokemon_name)
    hp_stat = data['stats'][0]['base_stat']
    return hp_stat
    
def damage():
    return random.randint(1, 10)

def cpu_turn():
    cpu_pokemon_name = session['cpu_pokemon_name']
    cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = get_hp_stat(cpu_pokemon_name), moves = get_initial_moves(cpu_pokemon_name) )

    if request.form['launchBattle']:
        cpu_move = random.choice(cpu_pokemon['moves'])
        cpu_damage = damage()
        string = (f"{cpu_pokemon['name']} used {cpu_move}, causing {cpu_damage} damage!")
        #return string
        cpu_move_damage = []
        cpu_move_damage.append(cpu_pokemon_name)
        cpu_move_damage.append(cpu_move)
        cpu_move_damage.append(cpu_damage)
        return cpu_move_damage



# def cpu_turn(cpu_pokemon, user_pokemon):
#     cpu_move = random.choice(cpu_pokemon['moves'])
#     cpu_damage = damage()
#     # print(" ")
#     # print(f"{cpu_pokemon['name']} used {cpu_move}, causing {cpu_damage} damage!")
#     # print(" ")
#     user_pokemon['hp']-= cpu_damage
#     if user_pokemon['hp'] > 0:
#         print(f"{user_pokemon['name']}'s hp was reduced to {user_pokemon['hp']} ")
#         print(" ")
        
#     else:
#         print(f"{user_pokemon['name']} fainted!")

#     return [cpu_move,user_pokemon['hp']]



def user_turn(cpu_pokemon, user_pokemon):
    user_move = input(f"What will you do? Choose from {user_pokemon['moves']}.  ")
    user_damage = damage()
    print(" ")
    print(f"{user_pokemon['name']} used {user_move}, causing {user_damage} damage!")
    print(" ")
    cpu_pokemon['hp']-= user_damage
    if cpu_pokemon['hp'] > 0:
        print(f"{cpu_pokemon['name']}'s hp was reduced to {cpu_pokemon['hp']} ")
        print(" ")
    else:
        print(f"{cpu_pokemon['name']} fainted!")

    return cpu_pokemon['hp']

# def battle(cpu_pokemon, user_pokemon):
#     # cpu goes first
#     # cpu chooses random move from available moves
#     # each move will have mocked random damage 
#     """later: calculate damage using https://wikimedia.org/api/rest_v1/media/math/render/svg/4445736b8e1e8be597cf7901e4ad0be60b54d1ab"""
#     # if damage occurs, reduce HP of player's pokemon accordingly
#     # player goes next
#     # player chposes random move from avaible moves
#     # if damage occurs, reduce HP of cpu's pokemon accordingly
#     # repeat until hp of either pokemon reaches 0
#     # declare winner

#     while user_pokemon['hp'] >= 0 and cpu_pokemon['hp'] >= 0:
#         cpu_turn(cpu_pokemon, user_pokemon)
#         user_turn(cpu_pokemon, user_pokemon)
#         if user_pokemon['hp'] < 0 or cpu_pokemon['hp'] < 0:  
#             break

"""
Get user input and determine cpu pokemon
"""               
# ask player to choose their pokemon
# user_pokemon_name = input("Now, which Pokemon do you want? The three available Pokemon are Bulbasaur, Charmander, and Squirtle.").lower()

# user_pokemon_name = "charmander" # for running the functions
# cpu_pokemon_name = cpu_pokemon_choice(user_pokemon_name)

"""
later: store user's pokemon in the db
later: display images of pokemon
later: display pokemon stats, type, and randomise available moves when user chooses
"""

"""
Get stats for pokemon
"""
#user_pokemon = dict(name = f"{user_pokemon_name}", hp = get_hp_stat(user_pokemon_name), moves = get_initial_moves(user_pokemon_name) )
#cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = get_hp_stat(cpu_pokemon_name), moves = get_initial_moves(cpu_pokemon_name) )








"""later: introduce xp, level up pokemon, battle again"""