const userPartySection = document.getElementById("userPokemonChoice")
const cpuSection = document.getElementById("wildPokemon")
const launchGame = document.getElementById("launchGameSection")
const launchGameForm = document.getElementById("launchGameForm")
const gamePlay = document.getElementById("gamePlay")
const endBattleSection = document.getElementById('endBattle')
const endBattleForm = document.getElementById('endBattleForm')
const endBattleButton = document.getElementById('returnButton')
const catchPokemonButton = document.getElementById('catchPokemon')
const catchPokemonForm = document.getElementById('catchPokemonForm')

userPartySection.style.display = "none"
launchGame.style.display = "none"
gamePlay.style.display = "none"
endBattleSection.style.display = "none"
catchPokemonButton.style.display = "none"

let userPokemonName;
let userPokemonHp;
let userPokemonMoves;
let cpuPokemonName;
let cpuPokemonHp;
let cpuPokemonMoves;


function handleMovesArray(a) {
    a = a.map(function(x){ return x.toUpperCase(); })
    return a.length == 1 ? a[0] : [ a.slice(0, a.length - 1).join(", "), a[a.length - 1] ].join(" and ")
  }

const cpuDetails = 
    fetch('/battle/cpu')
        .then(r=>r.json())
        .then(data => {
            console.log(data)
            
            cpuPara = document.createElement("p")
            cpuPara.innerText = `A wild ${data['name'].toUpperCase()} appeared!`
            cpuSection.append(cpuPara)
            spriteImg = document.createElement("img")
            spriteImg.setAttribute("src", `${data["sprite"]}`)
            cpuSection.append(spriteImg)

            if (data['moves'].length == 0) {
                fleePara = document.createElement("p")
                fleePara.innerText = `Oh no! The wild ${data['name'].toUpperCase()} fled!`
                cpuSection.append(fleePara)
                reloadButton = document.createElement("button")
                reloadButton.setAttribute("onClick", "window.location.reload()")
                reloadButton.textContent = "Reload battle"
                cpuSection.append(reloadButton)

            } else {
                sessionStorage.setItem("cpuPokemonName", data['name'])
                sessionStorage.setItem("cpuPokemonHp", data['hp'])
                sessionStorage.setItem("cpuPokemonMoves", data['moves'])

                viewPartyForm = cpuSection.appendChild(document.createElement("form"))
                viewPartyForm.setAttribute("id", "viewParty")
                
                button = document.createElement("button")
                // newButtonOne.setAttribute("value", `${[userPokemonMoves[0]]}`)
                // newButtonOne.setAttribute("class", "fade-in four")
                button.textContent = `View Party`
                viewPartyForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    userPartySection.style.display = "flex"
                })    
                viewPartyForm.append(button)   
            }
    })

const userParty = 
    fetch('/battle/party')
        .then(r=>r.json())
        .then(data => {    
    let numOfPokemon = data.length;
    sessionStorage.setItem("numOfPokemon", `${numOfPokemon}`)
        for (let i = 0; i < numOfPokemon; i++) {
            div = document.createElement("div")
            div.setAttribute("class","partyPokemonStats")
            usersPartyPokemon.append(div)

            nameButton = document.createElement("button")
            nameButton.setAttribute("value", `${data[i]['pokemon_name']}`)
            
            nameButton.addEventListener("click", function(){
                //console.log(data)
                user_choice = this.value
                if (data[i]['pokemon_name'] == user_choice) {
                    sessionStorage.setItem("userPokemonName", data[i]['pokemon_name'])
                    sessionStorage.setItem("userPokemonHp", data[i]['hp'])
                    sessionStorage.setItem("userPokemonMoves", moves_list)
                }
                userPartySection.style.display = "none"
                viewPartyForm.style.display = "none"
                userPara = document.createElement("p")
                userPara.innerText= `You have chosen ${user_choice.toUpperCase()}`
                cpuSection.append(userPara)
                spriteImg = document.createElement("img")
                spriteImg.setAttribute("src", `${data[i]["pokemon_sprite"]}`)
                cpuSection.append(spriteImg)
                launchGame.style.display = "flex"
                userPokemonName = sessionStorage.getItem("userPokemonName")
                userPokemonHp = sessionStorage.getItem("userPokemonHp")
                userPokemonMoves = (sessionStorage.getItem("userPokemonMoves")).split(",")
                cpuPokemonName = sessionStorage.getItem("cpuPokemonName")
                cpuPokemonHp = sessionStorage.getItem("cpuPokemonHp")
                cpuPokemonMoves = (sessionStorage.getItem("cpuPokemonMoves")).split(",")

            });

            div.append(nameButton)
            nameButton.innerText = data[i]['pokemon_name'].toUpperCase()

            spriteImg = document.createElement("img")
            spriteImg.setAttribute("src", `${data[i]["pokemon_sprite"]}`)
            div.append(spriteImg)
            
            typePara = document.createElement("p")
            div.append(typePara)
            typePara.innerText = "Type: " + data[i]['pokemon_type']

            levelPara = document.createElement("p")
            div.append(levelPara)
            levelPara.innerText = "Level: " + data[i]['level']

            expPara = document.createElement("p")
            div.append(expPara)
            expPara.innerText = "XP: " + data[i]['exp']

            hpPara = document.createElement("p")
            div.append(hpPara)
            hpPara.innerText = "HP: " + data[i]['hp']
            

            const moves_list = []
            if (data[i]['move_1'] != "null") {
                moves_list.push(data[i]['move_1'])
            }
            if (data[i]['move_2'] != "null") {
                moves_list.push(data[i]['move_2'])
            }
            if (data[i]['move_3'] != "null") {
                moves_list.push(data[i]['move_3'])
            }
            if (data[i]['move_4'] != "null") {
                moves_list.push(data[i]['move_4'])
            }

            movesPara = document.createElement("p")
            div.append(movesPara)
            movesPara.innerText = "Moves: " + `${handleMovesArray(moves_list)}`  
        }
});
window.onload = async () => {
    let cpuStats = await cpuDetails;
    let someData = await userParty;
};

function createButtonsForUser(userPokemonMoves) {
    console.log(userPokemonMoves)
    console.log(userPokemonMoves.length)

    newPara = document.createElement("p")
    newPara.setAttribute("id", "fade-in-three")
    gamePlay.appendChild(newPara)
    newPara.innerText = "Choose your next move!"
  
    newPara.scrollIntoView({behavior: "smooth"});
    newForm = gamePlay.appendChild(document.createElement("form"))
    newForm.setAttribute("id", "moveForm")
    newForm.setAttribute("class", "fade-in four")

    for (let i = 0; i < userPokemonMoves.length; i++) {
        newButton = document.createElement("button")
        newButton.setAttribute("value", `${[userPokemonMoves[i]]}`)
        newButton.setAttribute("class", "fade-in four")
        newButton.textContent = `${[userPokemonMoves[i]]}`
        newForm.append(newButton)
    }

    // newButtonOne = document.createElement("button")
    // newButtonOne.setAttribute("value", `${[userPokemonMoves[0]]}`)
    // newButtonOne.setAttribute("class", "fade-in four")
    // newButtonOne.textContent = `${[userPokemonMoves[0]]}`
    // newForm.append(newButtonOne)
    // newButtonTwo = document.createElement("button")
    // newButtonTwo.setAttribute("value", `${[userPokemonMoves[1]]}`)
    // newButtonTwo.setAttribute("class", "fade-in four")
    // newButtonTwo.textContent = `${[userPokemonMoves[1]]}`
    // newForm.append(newButtonTwo)
  
    
    gamePlay.scrollIntoView({behavior: "smooth", block: "end"});
  
    newPara.setAttribute("class", "oldPara")
}

function moveDamage() {
    return Math.floor(Math.random() * 10);
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


function endBattle(cpuPokemonHp, userPokemonHp) {  
    endBattleSection.style.display = "flex"
    const returnButton = document.getElementById("returnButton")
    returnButton.style.display = "flex"
    // store firstBattleCompleted flag in session storage and db
    console.log("battle over")

    // if user loses battle, show return to profile button
    if (sessionStorage.getItem("userPokemonHp") <= 0){
        console.log("cpu has won")
        endBattleButton.addEventListener("click", function() {
            location.href = '/profile'
        })
    } 

    if (sessionStorage.getItem("cpuPokemonHp") <= 0) {
        // if user wins battle, show option to catch opponent pokemon
        console.log("user has won")

        endBattleButton.addEventListener("click", function() {
            location.href = '/profile'
        })
        
                // if num of pokemon in party less than 6
        if (sessionStorage.getItem("numOfPokemon") < 6) {
            catchPokemonButton.style.display = "flex"
            catchPokemonButton.setAttribute("name", "pokemonCaught")
            catchPokemonButton.setAttribute("value", `${cpuPokemonName}`)
            catchPokemonButton.textContent = `Catch ${cpuPokemonName}?`
            
            catchPokemonForm.addEventListener("submit", function(e) { 
                e.preventDefault()           
                //location.href = '/battle/end';
                const formData = new FormData(this); 
                formData.append(e.submitter.name, e.submitter.value);
                const url = '/battle/end';
                    fetch(url, { 
                        method: 'post', 
                        body: formData // send user choice through to python backend
                    })
                        .then(response => response.text()) 
                        .then(data => {
                        
                        caughtPara = document.createElement("p")
                        endBattleSection.append(caughtPara)
                        caughtPara.innerText = `${cpuPokemonName} has been caught!`
                        catchPokemonForm.style.display = "none"

                        })

                })
        }


           
        }

    }

    
    


    // endBattleForm.addEventListener("submit", function(e) {
    //   e.preventDefault()
  
    //   console.log("button clicked")
    //   const formData = new FormData(this); 
    //   formData.append(e.submitter.name, e.submitter.value);
    //   const url = '/first-battle/end';
    //     fetch(url, { 
    //         method: 'post', 
    //         body: formData // send user choice through to python backend
    //     })
    //         .then(response => response.text()) 
    //         .then(data => {
    //           location.href = '/profile'
    //         })
      
    // })


/* Run the Game */

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