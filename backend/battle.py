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
    """later: up to four moves are allocated to the pokemon"""
    move_names = []
    for i in range(len(data)):
        if data['moves'][i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" and data['moves'][i]['version_group_details'][0]['level_learned_at'] == 1:
            move_names.append(data['moves'][i]['move']['name'])
    return move_names
            
def get_hp_stat(pokemon_name):
    # get pokemon hp
    api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
    response = requests.get(api_url)
    data = response.json()
    hp_stat = data['stats'][0]['base_stat']
    return hp_stat

def cpu_pokemon_choice(user_pokemon_name):
    # cpu randomly chooses pokemon from remaining two.
    """later: cpu chooses pokemon with type advantage"""
    available_pokemon = [pokemon for pokemon in starter_pokemon if pokemon != user_pokemon_name]
    cpu_pokemon_name = random.choice(available_pokemon)
    return cpu_pokemon_name

cpu_pokemon_name = cpu_pokemon_choice(user_pokemon_name)



"""later: store user's pokemon in the db"""

user_pokemon = dict(name = f"{user_pokemon_name}", hp = get_hp_stat(user_pokemon_name), moves = get_initial_moves(user_pokemon_name) )
cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = get_hp_stat(cpu_pokemon_name), moves = get_initial_moves(cpu_pokemon_name) )

def damage():
    return random.randint(1, 10)

print(cpu_pokemon['moves'])

def battle():

    # cpu goes first
    # cpu chooses random move from available moves
    # each move will have mocked random damage 
    """later: calculate damage using https://wikimedia.org/api/rest_v1/media/math/render/svg/4445736b8e1e8be597cf7901e4ad0be60b54d1ab"""
    # if damage occurs, reduce HP of player's pokemon accordingly
    # player goes next
    # player chposes random move from avaible moves
    # if damage occurs, reduce HP of cpu's pokemon accordingly
    # repeat until hp of either pokemon reaches 0

    #while user_pokemon['hp'] >= 0 and cpu_pokemon['hp'] >= 0:
    
    while user_pokemon['hp'] >= 0 and cpu_pokemon['hp'] >= 0:
        
        if user_pokemon['hp'] >= 0 and cpu_pokemon['hp'] >= 0:  
            cpu_move = random.choice(cpu_pokemon['moves'])
            cpu_damage = damage()
            print(f"{cpu_pokemon['name']} used {cpu_move}, causing {cpu_damage} damage!")
            user_pokemon['hp']-= cpu_damage
            if user_pokemon['hp'] > 0:
                print(f"{user_pokemon['name']}'s hp was reduced to {user_pokemon['hp']} ")
            else:
                print(f"{user_pokemon['name']} fainted!")

        if user_pokemon['hp'] >= 0 and cpu_pokemon['hp'] >= 0:
            user_move = random.choice(user_pokemon['moves'])
            user_damage = damage()
            print(f"{user_pokemon['name']} used {user_move}, causing {user_damage} damage!")
            cpu_pokemon['hp']-= user_damage
            if cpu_pokemon['hp'] > 0:
                print(f"{cpu_pokemon['name']}'s hp was reduced to {cpu_pokemon['hp']} ")
            else:
                print(f"{cpu_pokemon['name']} fainted!")
            

        
        
    

        

battle()






# declare winner
"""later: introduce xp, level up pokemon, battle again"""
