const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGame")
const launchGameForm = document.getElementById("launchGameForm")
launchGame.style.display = "none"

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Create a form with user input.
    const formData = new FormData(this); 
    // Add the name and value of the pressed button to the form.
    formData.append(e.submitter.name, e.submitter.value); 
    // Send a fetch request of type POST.
    const url = '/battle';
    fetch(url, { 
        method: 'post', 
        body: formData
    })
        .then(response => response.json()) // Read the response as json.
        .then(data => {
            console.log(data);
            pokemonStats = document.getElementById('stats')
            user_pokemon = data[0]['name']
            // pokemonName = data['name']
            // pokemonMoves = data['moves'].join(', ')
            pokemonStats.innerText = 
                `You have chosen ${data[0]['name']}. ${data[0]['name']}'s hp is ${data[0]['hp']}. ${data[0]['name']}'s moves are ${data[0]['moves'].join(', ')}.
                The cpu has chosen ${data[1]['name']}. ${data[1]['name']}'s hp is ${data[1]['hp']}. ${data[1]['name']}'s moves are ${data[1]['moves'].join(', ')}.`
        });

    choiceSection.style.display = "none"
    launchGame.style.display = "block"

});

launchGameForm.addEventListener('submit', function(e) {
    
    launchGame.style.display = "none"
    e.preventDefault();

    // Create a form with user input.
    const cpuFormData = new FormData(this); 
    // Add the name and value of the pressed button to the form.
    cpuFormData.append(e.submitter.name, e.submitter.value); 
    // Send a fetch request of type POST.
    const url = '/battle/launch';
    fetch(url, { 
        method: 'post', 
        body: cpuFormData
    })
        .then(response => response.json()) // Read the response as json.
        .then(data => {
            console.log(data)
            new_para = gamePlay.appendChild(document.createElement("p"))
            
        });
})




// const choiceSection = document.getElementById("userPokemonChoice")
// console.log(choiceSection)
// const choiceButtons = document.querySelectorAll("#choosePokemon")
// console.log(choiceButtons)
// const launchGame = document.getElementById("launchGame")
// launchGame.style.display = "none"


// choiceButtons.forEach(function(button){
//     button.addEventListener("click", function() {
//         //choiceSection.style.display = "none"
//         launchGame.style.display = "block"
//     })
// })