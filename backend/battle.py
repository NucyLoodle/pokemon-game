import requests
import json
from pprint import pprint as pp



"""
Functions to create the initial battle between player and CPU
"""

# get the three starter pokemon from the pokeAPI
"""
later: display images of pokemon
image = data['sprites']['front_default']


id = "1"
api_url = "https://pokeapi.co/api/v2/pokemon/{0}".format(id)
response = requests.get(url=api_url)
data = response.json()


name = data['name']

later: display pokemon stats, type, and randomise available moves"""

# ask player to choose their pokemon
pokemon_name = input("Now, which Pokemon do you want? The three available Pokemon are Bulbasaur, Charmander, and Squirtle.").lower()
# up to four moves are allocated to the player's pokemon randomly
# filter data by level-learned-at: 1 and mover_learn_method: name: "level-up"

api_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
response = requests.get(api_url)
data = response.json()['moves']

def get_initial_moves():
    move_names = []
    for i in range(len(data)):
        if data[i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" and data[i]['version_group_details'][0]['level_learned_at'] == 1:
            move_names.append(data[i]['move']['name'])
    return move_names
            

print(get_initial_moves())



#print(data[1]['version_group_details'][0]['move_learn_method']['name']) 

#pp(data[104]['move']['name']) 
"""
useful queries

pp(data[0]['move']['name']) 
#gets the name of the first move

pp(data[0]['version_group_details'][0]['level_learned_at'])
# gets the level the first move is learned at

pp(data[0]['version_group_details'][1]['move_learn_method']['name'])
# gets the way the move is learned

"""

# store this pokemon in the db
# cpu randomly chooses pokemon from remaining two. 
# up to four moves are allocated to the cpu pokemon randomly
"""later: cpu chooses pokemon with type advantage"""


# cpu goes first
# cpu chooses random move from available moves
# each move will have mocked damage
"""later: calculate damage using https://wikimedia.org/api/rest_v1/media/math/render/svg/4445736b8e1e8be597cf7901e4ad0be60b54d1ab"""
# if damage occurs, reduce HP of player's pokemon accordingly
# player goes next
# player chposes random move from avaible moves
# if damage occurs, reduce HP of cpu's pokemon accordingly
# repeat until hp of either pokemon reaches 0
# declare winner
"""later: introduce xp, level up pokemon, battle again"""
