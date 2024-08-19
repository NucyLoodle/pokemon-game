/*
Functions to create the initial battle between player and CPU
*/

// let userPokemonName = "";

function getResponseFromApi(pokemonName) {
    apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    fetch(apiUrl)
        .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

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