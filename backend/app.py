from flask import Flask, render_template, request, jsonify, after_this_request
from flask_cors import CORS
import battle

app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')

# CORS(app)

@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle")
def battle_page():
    return render_template('battle.html')

@app.route("/battle", methods=['POST'])
def get_user_choice():
    user_pokemon_name = request.form['userPokemonChoice']
    user_pokemon = dict(name = f"{user_pokemon_name}", hp = battle.get_hp_stat(user_pokemon_name), moves = battle.get_initial_moves(user_pokemon_name) )
    user_choice = f"You have chosen {user_pokemon_name.capitalize()}."
    pokemon_hp = f"{user_pokemon_name.capitalize()}'s hp is {user_pokemon['hp']}."
    pokemon_moves = f"{user_pokemon_name.capitalize()}'s moves are {', '.join(user_pokemon['moves'])}."

    string = f"{user_choice} {pokemon_hp} {pokemon_moves}"
    return string
   




# def get_user_choice():
#     user_pokemon_name = request.form['userPokemonChoice']
#     #print(f"the user has chosen {user_pokemon_name}")

#     cpu_pokemon_name = battle.cpu_pokemon_choice(user_pokemon_name)
#     
#     cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = battle.get_hp_stat(cpu_pokemon_name), moves = battle.get_initial_moves(cpu_pokemon_name) )
    
#     user_choice = f"You have chosen {user_pokemon_name.capitalize()}."
#     

#     #return battle.battle(cpu_pokemon, user_pokemon)
#     return render_template('battle.html', userChoice=user_choice, pokemonHp=pokemon_hp, pokemonMoves=pokemon_moves)

#def take_turns():



if __name__ == '__main__':
    app.run(debug=True, port=5001)