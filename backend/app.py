from flask import Flask, render_template

app = Flask(__name__ ,
            static_url_path='',
            static_folder='../frontend/static',
            template_folder='../frontend/templates')

@app.route("/")
def main():
    return render_template('index.html')
    
@app.route("/battle/", methods=['GET', 'POST'])
def battle_page():
    return render_template('battle.html')


if __name__ == '__main__':
    app.run(debug=True, port=5001)