from flask import Flask, render_template, request, session
from flask_session import Session
import battle

app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')

# CORS(app)
app.secret_key = 'BAD_SECRET_KEY'

@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle")
def battle_page():
    return render_template('battle.html') 

@app.route("/battle", methods=['POST', 'GET'])
def get_user_pokemon():
    # user_pokemon_name = request.form['userPokemonChoice']
    # session['pokemon_name'] = user_pokemon_name
    # print(session['pokemon_name'])
    return battle.get_user_choice()


@app.route("/battle/launch", methods=['GET', 'POST'])
def cpu_pokemon():
    launch_battle_button = request.form['launchBattle']
    print(launch_battle_button)

    # if session['pokemon_name']:
    #return launch_battle_button
    return battle.cpu_pokemon_choice(session['pokemon_name'])
    #     return f"hello {session['pokemon_name']}"
    
    
    

#     #return battle.battle(cpu_pokemon, user_pokemon)
#     return render_template('battle.html', userChoice=user_choice, pokemonHp=pokemon_hp, pokemonMoves=pokemon_moves)





if __name__ == '__main__':
    app.run(debug=True, port=5001)