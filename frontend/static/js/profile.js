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
                }
            viewPartyButton.style.display = "none"
            


        })
    })   




