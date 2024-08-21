/*
Functions to create the initial battle between player and CPU
*/


// const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGame")
const launchGameForm = document.getElementById("launchGameForm")
const gamePlay = document.getElementById("gamePlay")
launchGame.style.display = "none"
gamePlay.style.display = "none"

function getUserPokemonName() {
  choiceSection.addEventListener('click', (event) => {
    event.preventDefault();
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    userPokemonName = event.target.value
    sessionStorage.setItem("userPokemonName", userPokemonName)
    let pokemonStats = document.getElementById('stats')
    pokemonStats.innerText = 
                `You have chosen ${userPokemonName}. ${userPokemonName}'s hp is ${userPokemonHp}. ${userPokemonName}'s moves are ${userPokemonMoves}.
                
                The cpu has chosen ${cpuPokemonName}.`
            
    choiceSection.style.display = "none";
    launchGame.style.display = "block";  
  })
}

const getPokeData = () =>     
  fetch("/battle")
  .then((response) => response.json()
  ); 

const usePokeData = async () => {
  const data = await getPokeData();
  sessionStorage.setItem("userPokemonName", data[0]['name'])
  sessionStorage.setItem("cpuPokemonName", data[1]['name'])
  sessionStorage.setItem("userPokemonHp", data[0]['hp'])
  sessionStorage.setItem("cpuPokemonHp", data[1]['hp'])
  sessionStorage.setItem("userPokemonMoves", (data[0]['moves'].split(",")))
  sessionStorage.setItem("cpuPokemonMoves", data[1]['moves'].split(","))
}

let userPokemonName = sessionStorage.getItem("userPokemanName")
let userPokemonHp = sessionStorage.getItem("userPokemonHp")
let userPokemonMoves = sessionStorage.getItem("userPokemonMoves").split(",")
let cpuPokemonName = sessionStorage.getItem("cpuPokemonName")
let cpuPokemonHp = sessionStorage.getItem("cpuPokemonHp")
let cpuPokemonMoves = sessionStorage.getItem("cpuPokemonMoves").split(",")

function moveDamage() {
  return Math.floor(Math.random() * 10);
}

function cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName) {
  let cpuMove = cpuPokemonMoves[Math.floor(Math.random() * cpuPokemonMoves.length)]
  let cpuDamage = moveDamage()
  userPokemonHp -= cpuDamage
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
  cpuPokemonHp -= userDamage
  return `${userPokemonName} used ${userMove} causing ${userDamage} damage! 
          ${cpuPokemonName}'s hp was reduced to ${cpuPokemonHp}.`
  
}


getUserPokemonName()
usePokeData()          
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


  })

          
  
          
  // todo: update session storage during game
  // todo: make this loop!
          
  
  



