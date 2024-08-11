const choiceForm = document.getElementById("userPokemonChoice")
console.log(choiceForm)
const choiceButtons = document.querySelectorAll("#choosePokemon")
console.log(choiceButtons)
const launchGame = document.getElementById("launchGame")
launchGame.style.display = "none"


choiceButtons.forEach(function(button){
    button.addEventListener("click", function() {
        //choiceForm.style.display = "none"
        launchGame.style.display = "block"
    })
})









// launchGame.addEventListener("click", function() {
//         //choiceForm.style.display = "none"
//         choiceForm.remove()
//         launchGame.style.display = "block"

        
//     })
