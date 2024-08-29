/*
Functions to create the initial battle between player and CPU
*/

sessionStorage.clear() // clear the storage for reloading page

const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGameSection")
const launchGameForm = document.getElementById("launchGameForm")
const gamePlay = document.getElementById("gamePlay")
const pokemonStats = document.getElementById('stats')
const endBattleSection = document.getElementById('endBattle')
const endBattleForm = document.getElementById('endBattleForm')
launchGame.style.display = "none"
gamePlay.style.display = "none"
pokemonStats.style.display = "none"
endBattleSection.style.display = "none"

let userPokemonName;
let userPokemonHp;
let userPokemonMoves;
let cpuPokemonName;
let cpuPokemonHp;
let cpuPokemonMoves;
let firstBattleCompleted = false;

function handleMovesArray(a) {
  a = a.map(function(x){ return x.toUpperCase(); })
  return a.length == 1 ? a[0] : [ a.slice(0, a.length - 1).join(", "), a[a.length - 1] ].join(" and ")
}

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
            if (data['failure'] == 'You have already caught this pokemon') {
              console.log("oh no")
              return
              //display this message to user
              //remove the pokemon choice
            } else {
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
              pokemonStats.style.display = "block"
              newPara = pokemonStats.appendChild(document.createElement("p"))
              newParaTwo = pokemonStats.appendChild(document.createElement("p"))
              newPara.innerText =            
              `You have chosen ${(data[0]['name'].toUpperCase())}. 
              ${(data[0]['name']).toUpperCase()}'s hp is ${data[0]['hp']}. 
              ${data[0]['name'].toUpperCase()}'s moves are ${handleMovesArray(data[0]['moves'])}.`
  
              newParaTwo.innerText = `The cpu has chosen ${data[1]['name'].toUpperCase()}.`
              choiceSection.style.display = "none";
              launchGame.style.display = "block";

            }

  
          })
  })
}




function moveDamage() {
  return Math.floor(Math.random() * 10);
}

function createButtonsForUser(userPokemonMoves) {
  newPara = document.createElement("p")
  newPara.setAttribute("id", "fade-in-three")
  gamePlay.appendChild(newPara)
  newPara.innerText = "Choose your next move!"

  newPara.scrollIntoView({behavior: "smooth"});
  newForm = gamePlay.appendChild(document.createElement("form"))
  newForm.setAttribute("id", "moveForm")
  newForm.setAttribute("class", "fade-in four")
  newButtonOne = document.createElement("button")
  newButtonOne.setAttribute("value", `${[userPokemonMoves[0]]}`)
  newButtonOne.setAttribute("class", "fade-in four")
  newButtonOne.textContent = `${[userPokemonMoves[0]]}`
  newForm.append(newButtonOne)
  newButtonTwo = document.createElement("button")
  
  newButtonTwo.setAttribute("value", `${[userPokemonMoves[1]]}`)
  newButtonTwo.setAttribute("class", "fade-in four")
  newButtonTwo.textContent = `${[userPokemonMoves[1]]}`
  newForm.append(newButtonTwo)

  
  gamePlay.scrollIntoView({behavior: "smooth", block: "end"});

  newPara.setAttribute("class", "oldPara")
}

function cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName) {
  if (cpuPokemonHp > 0 && userPokemonHp > 0) {
    let cpuMove = cpuPokemonMoves[Math.floor(Math.random() * cpuPokemonMoves.length)]
    let cpuDamage = moveDamage()
    userPokemonHp = sessionStorage.getItem("userPokemonHp") - cpuDamage
    sessionStorage.setItem("userPokemonHp", userPokemonHp)
    if (userPokemonHp > 0) {
      createButtonsForUser(userPokemonMoves)
      return `${cpuPokemonName.toUpperCase()} used ${cpuMove.toUpperCase()} causing ${cpuDamage} damage!

      ${userPokemonName.toUpperCase()}'s hp was reduced to ${userPokemonHp}!` 
    } else {
      console.log(`${userPokemonName.toUpperCase()} fainted`)
      // document.getElementsByClassName('.fade-in four').forEach(form => form.style.display = "none")
      document.querySelectorAll('.oldPara').forEach(para => para.style.display = "none")
      document.querySelectorAll('button').forEach(button => button.style.display = "none") //hide user choice buttons after selection
      firstBattleCompleted = true;
      endBattle()
      return `${cpuPokemonName.toUpperCase()} used ${cpuMove} causing ${cpuDamage} damage! 
      ${userPokemonName.toUpperCase()} fainted!
      ${cpuPokemonName.toUpperCase()} is the winner!`
      
    }
  }  
}

function userTurn(userPokemonName, cpuPokemonHp, userMove, cpuPokemonName) {
  if (userPokemonHp > 0 && cpuPokemonHp > 0) {
    let userDamage = moveDamage()
    cpuPokemonHp = sessionStorage.getItem("cpuPokemonHp") - userDamage
    sessionStorage.setItem("cpuPokemonHp", cpuPokemonHp) 
    if (cpuPokemonHp > 0) {
      return `${userPokemonName.toUpperCase()} used ${userMove.toUpperCase()} causing ${userDamage} damage! 
      ${cpuPokemonName.toUpperCase()}'s hp was reduced to ${cpuPokemonHp}.`
    } else {
      document.querySelectorAll('.oldPara').forEach(para => para.style.display = "none")
      document.querySelectorAll('button').forEach(button => button.style.display = "none") //hide user choice buttons after selection
      firstBattleCompleted = true;
      endBattle()
      return `${userPokemonName.toUpperCase()} used ${userMove} causing ${userDamage} damage! 
      ${cpuPokemonName.toUpperCase()} fainted!
      ${userPokemonName.toUpperCase()} is the winner!` 
    }
  } 
} 

function endBattle() {  
  endBattleSection.style.display = "flex"
  const returnButton = document.getElementById("returnButton")
  returnButton.style.display = "flex"
  // store firstBattleCompleted flag in session storage and db
  
  endBattleForm.addEventListener("submit", function(e) {
    e.preventDefault()

    console.log("button clicked")
    const formData = new FormData(this); 
    formData.append(e.submitter.name, e.submitter.value);
    const url = '/battle/end';
      fetch(url, { 
          method: 'post', 
          body: formData // send user choice through to python backend
      })
          .then(response => response.text()) 
          .then(data => {
            if (data == "battleDone") {
              sessionStorage.setItem('firstBattleCompleted', 'true')
            }
          })
    location.href = '/profile'
  })

  //in profle, check this and display option to first battle or not
  //load this as a sessionstorage when user logs in

}

/* Run the Game */          

getUserPokemonName()

launchGameForm.addEventListener("submit", function(e) {
  e.preventDefault();
  launchGameForm.style.display = "none"; // hides launch battle button
  if (userPokemonHp > 0 && cpuPokemonHp > 0) {
    const newPara = gamePlay.appendChild(document.createElement("p"))
    newPara.innerText += cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName)
    gamePlay.style.display = "block"
    //createButtonsForUser(userPokemonMoves)
    } else {
    console.log("end")
    }   
  })


gamePlay.addEventListener('click', (event) => {
  event.preventDefault()
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  if (userPokemonHp > 0 && cpuPokemonHp > 0) {
    const userMove = event.target.value
    newPara = gamePlay.appendChild(document.createElement("p"))
    newPara.setAttribute("class", "newPara")
    newPara.setAttribute("class", "fade-in one")
    newPara.innerText +=userTurn(userPokemonName, cpuPokemonHp, userMove, cpuPokemonName)
    newPara.scrollIntoView({behavior: "smooth"});
    const oldButtons = gamePlay.querySelectorAll('button')
    const oldPara = document.querySelectorAll('.oldPara')
    oldButtons.forEach(button => button.style.display = "none") //hide user choice buttons after selection
    oldPara.forEach(para => para.style.display = "none")
  }

if (sessionStorage.getItem("cpuPokemonHp")> 0) {
  console.log(sessionStorage.getItem("cpuPokemonHp"))
  para = gamePlay.appendChild(document.createElement("p"))
  para.setAttribute("class", "fade-in two")
  para.innerText = cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp, userPokemonName)
  }
})    
      






