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
            // user_pokemon = data[0]['name']
            // pokemonName = data['name']
            // pokemonMoves = data['moves'].join(', ')
            pokemonStats.innerText = 
                `You have chosen ${data[0]['name']}. ${data[0]['name']}'s hp is ${data[0]['hp']}. ${data[0]['name']}'s moves are ${data[0]['moves'].join(', ')}.
                The cpu has chosen ${data[1]['name']}.`
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
            console.log(data[0]['moves'])
            new_para = gamePlay.appendChild(document.createElement("p"))
            new_para.innerText = `${data[1]['name']} used ${data[1]['move']} causing ${data[1]['damage']} damage.
            ${data[0]['name']}'s hp was reduced to ${data[0]['hp']}.
            Choose your next move!`

            new_form = gamePlay.appendChild(document.createElement("form"))
            new_form.setAttribute("method", "POST")
            new_form.setAttribute("action", "/battle/launch/turn")
            new_form.setAttribute("id", "battleForm")
            new_button_1 = new_form.appendChild(document.createElement("button"))
            new_button_1.setAttribute("type", "submit")
            new_button_1.setAttribute("name", "chooseMove")
            new_button_1.setAttribute("value", `${data[0]['moves'][0]}`)
            new_button_1.textContent = `${data[0]['moves'][0]}`

            new_button_2 = new_form.appendChild(document.createElement("button"))
            new_button_2.setAttribute("type", "submit")
            new_button_2.setAttribute("name", "chooseMove")
            new_button_2.setAttribute("value", `${data[0]['moves'][1]}`)
            new_button_2.textContent = `${data[0]['moves'][1]}`

            
        });
})

new_form = document.getElementById("battleForm")
console.log(new_form)
new_form.addEventListener('submit', function(e) {

    e.preventDefault();
    console.log("hey")
    

    // // Create a form with user input.
    // const userFormData = new FormData(this); 
    // // Add the name and value of the pressed button to the form.
    // userFormData.append(e.submitter.name, e.submitter.value); 
    // console.log(e.submitter.name)
    // console.log(e.submitter.value)
    // // Send a fetch request of type POST.
    // const url = '/battle/launch';
    // fetch(url, { 
    //     method: 'post', 
    //     body: userFormData
    // })
    //     .then(response => response.json()) // Read the response as json.
    //     .then(data => {
    //         console.log(data)
    //         // console.log(data[0]['moves'])

    //         // new_para = new_form.appendChild(document.createElement("p"))

    //         // new_para.innerText = `${data[0]['name']} used ${data[0]['move']} causing ${data[0]['damage']} damage.
    //         // ${data[1]['name']}'s hp was reduced to ${data[1]['hp']}.
            


    //     });
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