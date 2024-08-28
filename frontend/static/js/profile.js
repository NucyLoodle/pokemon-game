const viewParty = document.getElementById("viewParty");
const usersPartyPokemon = document.getElementById("usersPartyPokemon");



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

            let numOfDivs = data.length;
            for (let i = 0; i < numOfDivs; i++) {  
                div = document.createElement("div")
                div.setAttribute("class","partyPokemonStats")
                usersPartyPokemon.append(div)
              } 


        })
    })   




