const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGame")
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
        .then(response => response.text()) // Read the response as text.
        .then(data => {
            console.log(data);
            document.getElementById('stats').innerText = data
        });

    choiceSection.style.display = "none"
    launchGame.style.display = "block"

});


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