// const choiceForm = document.getElementById("userPokemonChoice")
// console.log(choiceForm)
// const choiceButtons = document.querySelectorAll("#choosePokemon")
// console.log(choiceButtons)
// const launchGame = document.getElementById("launchGame")
// launchGame.style.display = "none"


// choiceButtons.forEach(function(button){
//     button.addEventListener("click", function() {
//         //choiceForm.style.display = "none"
//         launchGame.style.display = "block"
//     })
// })

const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
})


function getUserChoice() {
     const url = '/battle'
     fetch(url, { 
        method: 'post', 
        // body: formData
    })
     .then(response => response)  
     .then(data => {
        
         console.log(data.text);
         document.getElementById("stats").innerHTML = data
     })
    
}