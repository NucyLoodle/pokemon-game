sessionStorage.clear() // clear all storage if accessing after battles

const viewParty = document.getElementById("viewParty");
const usersPartyPokemon = document.getElementById("usersPartyPokemon");
const viewPartyButton = document.getElementById("viewPartyButton");


viewParty.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this); 
    formData.append(e.submitter.name, e.submitter.value);
    const url = '/profile';
      fetch(url, { 
          method: 'post', 
          body: formData // send user choice through to python backend
      })
        .then(response => response.json()) 
        .then(data => {
            console.log(data)
            console.log(data.length)
            console.log(data[0])

            let numOfPokemon = data.length;
            for (let i = 0; i < numOfPokemon; i++) {
 
                div = document.createElement("div")
                div.setAttribute("class","partyPokemonStats")
                usersPartyPokemon.append(div)

                namePara = document.createElement("p")
                div.append(namePara)
                namePara.innerText = data[i]['pokemon_name'].toUpperCase()

                spriteImg = document.createElement("img")
                spriteImg.setAttribute("src", `${data[i]["pokemon_sprite"]}`)
                div.append(spriteImg)

                
                typePara = document.createElement("p")
                div.append(typePara)
                typePara.innerText = "Type: " + data[i]['pokemon_type']

                levelPara = document.createElement("p")
                div.append(levelPara)
                levelPara.innerText = "Level: " + data[i]['level']

                expPara = document.createElement("p")
                div.append(expPara)
                expPara.innerText = "XP: " + data[i]['exp']

                hpPara = document.createElement("p")
                div.append(hpPara)
                hpPara.innerText = "HP: " + data[i]['hp']


            }
            viewPartyButton.style.display = "none"
        })
    })   




    // (2) [{…}, {…}]
    // 0
    // : 
    // {exp: 64, hp: 45, level: 1, pokemon_name: 'bulbasaur', pokemon_type: 'grass', …}
    // 1
    // : 
    // {exp: 62, hp: 39, level: 1, pokemon_name: 'charmander', pokemon_type: 'fire', …}
    // length
    // : 
    // 2