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
def get_user_data():
    return battle.get_user_choice()

def cpu_move():
    return battle.cpu_move()
    
    
    
    

#     #return battle.battle(cpu_pokemon, user_pokemon)
#     return render_template('battle.html', userChoice=user_choice, pokemonHp=pokemon_hp, pokemonMoves=pokemon_moves)





if __name__ == '__main__':
    app.run(debug=True, port=5001)