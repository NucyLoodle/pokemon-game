/*
Functions to create the initial battle between player and CPU
*/

// let userPokemonName = "";



function getInitialMoves(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    fetch(apiUrl)
        .then(response => response.json())
        .then (data => {
            let dataLength = Object.keys(data).length;
            let moveNames = []

            for (let i = 0; i < dataLength; i++) {
                if (data['moves'][i]['version_group_details'][0]['move_learn_method']['name'] == "level-up" && data['moves'][i]['version_group_details'][0]['level_learned_at'] == 1) {
                    moveNames.push(data['moves'][i]['move']['name'])
                }        
            }
            console.log(moveNames)
        })   
}

function getPokemon() {
    
    const userChoiceForm = document.getElementById('userPokemonChoice')
    userChoiceForm.addEventListener('click', function(e) {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    let userPokemonName = e.target.id

    return userPokemonName
    }) 
       
}

getPokemon()
// console.log(userPokemonName)
// getResponseFromApi('ditto')