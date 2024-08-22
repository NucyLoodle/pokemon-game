/*
Functions to create the initial battle between player and CPU
*/

sessionStorage.clear() // clear the storage for reloading page

const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGameSection")
const launchGameForm = document.getElementById("launchGameForm")
const gamePlay = document.getElementById("gamePlay")
launchGame.style.display = "none"
gamePlay.style.display = "none"


let userPokemonName
let userPokemonHp
let userPokemonMoves
let cpuPokemonName
let cpuPokemonHp
let cpuPokemonMoves



function getUserPokemonName() { // ask user to choose between three pokemon
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this); 
    formData.append(e.submitter.name, e.submitter.value);
    const url = '/battle';
      fetch(url, { 
          method: 'post', 
          body: formData // send user choice through to python backend
      })
          .then(response => response.json()) 
          .then(data => {
            console.log(data);
            sessionStorage.setItem("userPokemonName", data[0]['name'])
            sessionStorage.setItem("cpuPokemonName", data[1]['name'])
            sessionStorage.setItem("userPokemonHp", data[0]['hp'])
            sessionStorage.setItem("cpuPokemonHp", data[1]['hp'])
            sessionStorage.setItem("userPokemonMoves", data[0]['moves'])
            sessionStorage.setItem("cpuPokemonMoves", data[1]['moves'])
            
            userPokemonName = sessionStorage.getItem("userPokemonName")
            userPokemonHp = sessionStorage.getItem("userPokemonHp")
            userPokemonMoves = (sessionStorage.getItem("userPokemonMoves")).split(",")
            cpuPokemonName = sessionStorage.getItem("cpuPokemonName")
            cpuPokemonHp = sessionStorage.getItem("cpuPokemonHp")
            cpuPokemonMoves = (sessionStorage.getItem("cpuPokemonMoves")).split(",")
            
            pokemonStats = document.getElementById('stats')
            pokemonStats.innerText = 
            `You have chosen ${data[0]['name']}. ${data[0]['name']}'s hp is ${data[0]['hp']}. ${data[0]['name']}'s moves are ${data[0]['moves']}.
  
            The cpu has chosen ${data[1]['name']}.`
        
            choiceSection.style.display = "none";
            launchGame.style.display = "block";
          })
  })
}



function moveDamage() {
  return Math.floor(Math.random() * 10);
}

function cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName) {
  let cpuMove = cpuPokemonMoves[Math.floor(Math.random() * cpuPokemonMoves.length)]
  let cpuDamage = moveDamage()
  
  
  userPokemonHp = sessionStorage.getItem("userPokemonHp") - cpuDamage
  
  sessionStorage.setItem("userPokemonHp", userPokemonHp)

  return `${cpuPokemonName} used ${cpuMove} causing ${cpuDamage} damage!
          ${userPokemonName}'s hp was reduced to ${userPokemonHp}!`
}

function createButtonsForUser(userPokemonMoves) {
  //newSection = document.getElementById("moveSection")
  newPara = gamePlay.appendChild(document.createElement("p"))
  newPara.innerText = "Choose your next move!"
  newButtonOne = document.createElement("button")
  newButtonOne.setAttribute("value", `${[userPokemonMoves[0]]}`)
  newButtonOne.textContent = `${[userPokemonMoves[0]]}`
  newPara.after(newButtonOne)
  newButtonTwo = document.createElement("button")
  newButtonTwo.setAttribute("value", `${[userPokemonMoves[1]]}`)
  newButtonTwo.textContent = `${[userPokemonMoves[1]]}`
  newPara.after(newButtonTwo)
  newPara.setAttribute("id", "oldPara")
}

function userTurn(userPokemonName, cpuPokemonHp, userMove, cpuPokemonName) {
  let userDamage = moveDamage()
  

  cpuPokemonHp = sessionStorage.getItem("cpuPokemonHp") - userDamage
  sessionStorage.setItem("cpuPokemonHp", cpuPokemonHp)

  return `${userPokemonName} used ${userMove} causing ${userDamage} damage! 
          ${cpuPokemonName}'s hp was reduced to ${cpuPokemonHp}.`
  
}         
// // //   // todo: update session storage during game
// // //   // todo: make this loop!


/* Run the Game */          

getUserPokemonName()



launchGameForm.addEventListener("submit", function(e) {
  e.preventDefault();
  launchGameForm.style.display = "none"; // hides launch battle button
  const newPara = gamePlay.appendChild(document.createElement("p"))
  newPara.innerText += cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName)
  gamePlay.style.display = "block"
  createButtonsForUser(userPokemonMoves)       
  })

gamePlay.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  const userMove = event.target.value
  newPara = gamePlay.appendChild(document.createElement("p"))
  newPara.setAttribute("id", "newPara")
  newPara.innerText +=userTurn(userPokemonName, cpuPokemonHp, userMove, cpuPokemonName)
  const oldButtons = gamePlay.querySelectorAll('button')
  const OldPara = document.getElementById('oldPara') 
  oldButtons.forEach(button => button.style.display = "none") //hide user choice buttons after selection
  OldPara.style.display = "none"
  gamePlay.appendChild(document.createElement("p")).innerText = cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName)
  createButtonsForUser(userPokemonMoves)
})



