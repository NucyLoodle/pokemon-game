from flask import Flask, render_template, request
import battle

app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')

@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle/")
def battle_page():
    return render_template('battle.html')

@app.route("/battle/", methods=['GET', 'POST'])
def get_user_choice():
    user_pokemon_name = request.form['userPokemonChoice']
    print(f"the user has chosen {user_pokemon_name}")

    cpu_pokemon_name = battle.cpu_pokemon_choice(user_pokemon_name)
    user_pokemon = dict(name = f"{user_pokemon_name}", hp = battle.get_hp_stat(user_pokemon_name), moves = battle.get_initial_moves(user_pokemon_name) )
    cpu_pokemon = dict(name = f"{cpu_pokemon_name}", hp = battle.get_hp_stat(cpu_pokemon_name), moves = battle.get_initial_moves(cpu_pokemon_name) )
    
    data = user_pokemon_name
    #return battle.battle(cpu_pokemon, user_pokemon)
    return render_template('battle.html', dataToRender=data)

#def display_info():



if __name__ == '__main__':
    app.run(debug=True, port=5001)