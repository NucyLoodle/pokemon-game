const choiceForm = document.getElementById("userPokemonChoice")
console.log(choiceForm)
const choiceButtons = document.querySelectorAll(".choiceMade")

choiceButtons.forEach(function(button){
    button.addEventListener("click", function() {
        choiceForm.style.display = "none"
        
    })
})
