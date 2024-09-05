// clear battle items

sessionStorage.removeItem("userPokemonName")
sessionStorage.removeItem("cpuPokemonName")
sessionStorage.removeItem("userPokemonHp")
sessionStorage.removeItem("cpuPokemonHp")
sessionStorage.removeItem("userPokemonMoves")
sessionStorage.removeItem("cpuPokemonMoves")

const viewParty = document.getElementById("viewParty");
const usersPartyPokemon = document.getElementById("usersPartyPokemon");
const viewPartyButton = document.getElementById("viewPartyButton");
const firstBattleButton = document.getElementById("firstBattleLink");
const mainBattleButton = document.getElementById("mainBattleLink");
const linksSection = document.getElementById('links')
usersPartyPokemon.style.display = "none"
mainBattleButton.style.display = "none"
const releaseText = document.getElementById('text')


const userFlag =
    fetch('/profile/flag')
        .then(r=>r.json())
        .then(data => {
        });
window.onload = async () => {
    let someData = await userFlag;
    if (someData['first_battle'] == 1) {
        firstBattleButton.style.display = "none"
        mainBattleButton.style.display = "flex"
    }
};

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    location.reload()
}



viewParty.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append(e.submitter.name, e.submitter.value);
    const url = '/profile/party';
      fetch(url, {
          method: 'post',
          body: formData
      })
        .then(response => response.text())
        .then(data => {
            let numOfPokemon = data.length;
            for (let i = 0; i < numOfPokemon; i++) {

                div = document.createElement("div")
                div.setAttribute("class","partyPokemonStats")
                usersPartyPokemon.append(div)

                if (numOfPokemon > 1) {
                    nameButton = document.createElement("button")
                    nameButton.setAttribute("value", `${data[i]['pokemon_name']}`)
                    nameButton.setAttribute("class", "popup")
                    nameButton.innerText = data[i]['pokemon_name'].toUpperCase()


                    releaseSpan = document.createElement("span")
                    releaseSpan.setAttribute("class", "popuptext")
                    releaseSpan.setAttribute("id", `${data[i]['pokemon_name']}`)
                    releaseSpan.style.display = "none"

                    releaseForm = document.createElement("form")
                    releaseForm.setAttribute('id', 'releaseForm')
                    releaseForm.setAttribute('method', 'DELETE') // should this be delete
                    releaseForm.setAttribute('action', '/profile/release')
                    releaseSpan.append(releaseForm)

                    releaseButton = document.createElement("button")
                    releaseButton.innerText = `Release ${data[i]['pokemon_name'].toUpperCase()}?`
                    releaseButton.setAttribute('name', 'releaseButton')
                    releaseButton.setAttribute('value', `${data[i]['pokemon_name']}`)
                    //releaseButton.setAttribute('onclick', )

                    nameButton.addEventListener("click", function(){
                        pokemonSpan = document.getElementById(`${data[i]['pokemon_name']}`)

                        if (pokemonSpan.style.display == "none") {
                            pokemonSpan.style.display = "flex"
                        } else {
                            pokemonSpan.style.display = "none"
                        }
                    })

                    releaseForm.addEventListener("submit", function(e) {

                        e.preventDefault()

                        const formData = new FormData(this);
                        formData.append(e.submitter.name, e.submitter.value);
                        const url = '/profile/release';
                            fetch(url, {
                                method: 'DELETE',
                                body: formData // send user choice through to python backend
                            })
                                .then(response => response.text())
                                .then(data => {
                                    on()
                                    releaseText.innerText = data
                                })
                            })
                    div.append(nameButton)
                    nameButton.append(releaseSpan)
                    releaseForm.append(releaseButton)
                } else {
                    namePara = document.createElement('p')
                    namePara.innerText = data[i]['pokemon_name'].toUpperCase()
                    div.append(namePara)
                }








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


            }
            usersPartyPokemon.style.display = "flex"
            viewPartyButton.style.display = "none"
        })
    })


mainBattleButton.addEventListener("click", function(e) {
    e.preventDefault()
    if (sessionStorage.getItem("numOfPokemon") > 5) {
        partyIsBig = document.createElement("p")
        linksSection.append(partyIsBig)
        partyIsBig.innerText =
        `You already have ${sessionStorage.getItem("numOfPokemon")} pokemon in your party.
        Release a pokemon to catch another!`
        mainBattleButton.style.display = "none"
    } else {
        location.href="/battle"
    }
})