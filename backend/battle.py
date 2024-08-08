"""
Functions to create the initial battle between player and CPU
"""

# get three pokemon from the pokeAPI
"""later: display pokemon stats, type, and randomise available moves"""
# ask player to choose their pokemon
# up to four moves are allocated to the player's pokemon randomly
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
