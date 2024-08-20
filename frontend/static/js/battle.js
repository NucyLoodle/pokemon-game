/*
Functions to create the initial battle between player and CPU
*/


const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGame")
const launchGameForm = document.getElementById("launchGameForm")
const gamePlay = document.getElementById("gamePlay")
launchGame.style.display = "none"
gamePlay.style.display = "none"

function moveDamage() {
  return Math.floor(Math.random() * 10);
}

function cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp) {
  let cpuMove = cpuPokemonMoves[Math.floor(Math.random() * cpuPokemonMoves.length)]
  let cpuDamage = moveDamage()
  userPokemonHp -= cpuDamage
  return `${cpuPokemonName} used ${cpuMove} causing ${cpuDamage} damage!`
}

function createButtonsForUser(userPokemonMoves) {
  newSection = document.getElementById("moveSection")
  newPara = newSection.appendChild(document.createElement("p"))
  newPara.innerText = "Choose your next move!"
  newButtonOne = document.createElement("button")
  newButtonOne.setAttribute("value", `${[userPokemonMoves[0]]}`)
  newButtonOne.textContent = `${[userPokemonMoves[0]]}`
  newPara.after(newButtonOne)
  
  newButtonTwo = document.createElement("button")
  newButtonTwo.setAttribute("value", `${[userPokemonMoves[1]]}`)
  newButtonTwo.textContent = `${[userPokemonMoves[1]]}`
  newPara.after(newButtonTwo)

}

function userTurn(userPokemonName, cpuPokemonHp, userMove) {
  let userDamage = moveDamage()
  cpuPokemonHp -= userDamage
  return `${userPokemonName} used ${userMove} causing ${userDamage} damage!`
  
}


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
        let pokemonStats = document.getElementById('stats')
        const userPokemonName = data[0]['name']
        const cpuPokemonName = data[1]['name']
        let userPokemonHp = data[0]['hp']
        let cpuPokemonHp = data[1]['hp']
        let userPokemonMoves = data[0]['moves']
        let cpuPokemonMoves = data[1]['moves']
        // console.log(cpuPokemonMoves)
        
        pokemonStats.innerText = 
            `You have chosen ${data[0]['name']}. ${data[0]['name']}'s hp is ${data[0]['hp']}. ${data[0]['name']}'s moves are ${data[0]['moves'].join(', ')}.
            The cpu has chosen ${data[1]['name']}.`
        // console.log(cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp))
        form.style.display = "none";
        launchGame.style.display = "block";
        
        launchGameForm.addEventListener("submit", function(e) {
          e.preventDefault();
          launchGameForm.style.display = "none"; // hides launch battle button


          newSection = document.createElement("section")
          newSection.setAttribute("id", "moveSection")
          gamePlay.after(newSection)
           
          const newPara = newSection.appendChild(document.createElement("p"))
          newPara.innerText += cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp)
          gamePlay.style.display = "block"
          createButtonsForUser(userPokemonMoves)
        })

        gamePlay.addEventListener('click', (event) => {
          const isButton = event.target.nodeName === 'BUTTON';
          if (!isButton) {
            return;
          }
          const userMove = event.target.value

          //console.log(event.target.value);
          newPara = gamePlay.appendChild(document.createElement("p"))
          newPara.innerText +=userTurn(userPokemonName, cpuPokemonHp, userMove)
          const oldButtons = gamePlay.querySelectorAll('button')
          const OldPara = gamePlay.querySelectorAll('p')
          oldButtons.forEach(button => button.style.display = "none") //hide user choice buttons after selection
          OldPara.forEach(p => p.style.display = "none")
        })
        



      });

});

