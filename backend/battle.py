import requests
import json
from pprint import pprint as pp
import random



"""
Functions to create the initial battle between player and CPU
"""

# get the three starter pokemon from the pokeAPI
starter_pokemon = ['bulbasaur', 'charmander', 'squirtle']
"""
later: display images of pokemon
later: display pokemon stats, type, and randomise available moves"""

# ask player to choose their pokemon
# user_pokemon_name = input("Now, which Pokemon do you want? The three available Pokemon are Bulbasaur, Charmander, and Squirtle.").lower()

user_pokemon_name = "charmander" # for running the functions
# get response from API
#api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
#response = requests.get(api_url)
#data = response.json()

def get_initial_moves(pokemon_name):
    api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
    response = requests.get(api_url)
    data = response.json()
    # filter data by level-learned-at: 1 and mover_learn_method: name: "level-up"
    move_names = []
    for i in range(len(data)):
        if data['moves'][i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" and data['moves'][i]['version_group_details'][0]['level_learned_at'] == 1:
            move_names.append(data['moves'][i]['move']['name'])
    return move_names
            
# up to four moves are allocated to the player's pokemon
user_pokemon_moves = get_initial_moves(user_pokemon_name)
print(f"The moves that {user_pokemon_name} has are {user_pokemon_moves}")

# get pokemon hp

def get_hp_stat(pokemon_name):
    api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
    response = requests.get(api_url)
    data = response.json()
    hp_stat = data['stats'][0]['base_stat']
    return hp_stat

user_pokemon_hp = get_hp_stat(user_pokemon_name)
print(f"The hp for {user_pokemon_name} is {user_pokemon_hp}")
# store this pokemon in the db

# cpu randomly chooses pokemon from remaining two.
"""later: cpu chooses pokemon with type advantage"""
def cpu_pokemon_choice(user_pokemon_name):
    available_pokemon = [pokemon for pokemon in starter_pokemon if pokemon != user_pokemon_name]
    cpu_pokemon_name = random.choice(available_pokemon)
    return cpu_pokemon_name

cpu_pokemon_name = cpu_pokemon_choice(user_pokemon_name)

# up to four moves are allocated to the cpu pokemon 
cpu_pokemon_moves = get_initial_moves(cpu_pokemon_name)
print(f"The moves for {cpu_pokemon_name} are {cpu_pokemon_moves}")

# get pokemon hp
cpu_pokemon_hp = get_hp_stat(cpu_pokemon_name)
print(f"The hp for {cpu_pokemon_name} is {cpu_pokemon_hp}")



# cpu goes first
# cpu chooses random move from available moves
# each move will have mocked random damage 


"""later: calculate damage using https://wikimedia.org/api/rest_v1/media/math/render/svg/4445736b8e1e8be597cf7901e4ad0be60b54d1ab"""
# if damage occurs, reduce HP of player's pokemon accordingly
# player goes next
# player chposes random move from avaible moves
# if damage occurs, reduce HP of cpu's pokemon accordingly
# repeat until hp of either pokemon reaches 0
# declare winner
"""later: introduce xp, level up pokemon, battle again"""
