/*
Functions to create the initial battle between player and CPU
*/


const form = document.getElementById('form')
const choiceSection = document.getElementById("userPokemonChoice")
const launchGame = document.getElementById("launchGame")
const launchGameForm = document.getElementById("launchGameForm")
const gamePlay = document.getElementById("gamePlay")
launchGame.style.display = "none"

function moveDamage() {
  return Math.floor(Math.random() * 10);
}

function cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp) {
  let cpuMove = cpuPokemonMoves[Math.floor(Math.random() * cpuPokemonMoves.length)]
  // console.log(cpuMove)
  let cpuDamage = moveDamage()
  // console.log(cpuDamage)
  userPokemonHp -= cpuDamage

  // console.log(userPokemonHp)
  return `${cpuPokemonName} used ${cpuMove} causing ${cpuDamage} damage!`
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
        let userPokemonMoves = data[0]['moves'].join(', ')
        let cpuPokemonMoves = data[1]['moves']
        // console.log(cpuPokemonMoves)
        
        pokemonStats.innerText = 
            `You have chosen ${data[0]['name']}. ${data[0]['name']}'s hp is ${data[0]['hp']}. ${data[0]['name']}'s moves are ${data[0]['moves'].join(', ')}.
            The cpu has chosen ${data[1]['name']}.`
        // console.log(cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp))
        launchGame.style.display = "block"
        //launchGame.innerText += cpuTurn(cpuPokemonName, cpuPokemonMoves, userPokemonHp)
      });

});

