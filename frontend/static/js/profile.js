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
usersPartyPokemon.style.display = "none"
mainBattleButton.style.display = "none"


const userFlag = 
    fetch('/profile/flag')
        .then(r=>r.json())
        .then(data => {
    return data;
});
window.onload = async () => {
    let someData = await userFlag;
    if (someData['first_battle'] == 1) {
        firstBattleButton.style.display = "none"
        mainBattleButton.style.display = "flex"
    }
};


function showPopup() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}


viewParty.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this); 
    formData.append(e.submitter.name, e.submitter.value);
    const url = '/profile/party';
      fetch(url, { 
          method: 'post', 
          body: formData // send user choice through to python backend
      })
        .then(response => response.json()) 
        .then(data => {
            console.log(data)
            console.log(data.length)
            console.log(data[0])

            let numOfPokemon = data.length;
            for (let i = 0; i < numOfPokemon; i++) {
 
                div = document.createElement("div")
                div.setAttribute("class","partyPokemonStats")
                usersPartyPokemon.append(div)

                // namePara = document.createElement("p")
                // div.append(namePara)
                // namePara.innerText = data[i]['pokemon_name'].toUpperCase()

                nameButton = document.createElement("button")
                nameButton.setAttribute("value", `${data[i]['pokemon_name']}`)
                nameButton.setAttribute("onclick", "showPopup()")
                nameButton.setAttribute("class", "popup")
                div.append(nameButton)
                nameButton.innerText = data[i]['pokemon_name'].toUpperCase()


                releaseSpan = document.createElement("span")
                releaseSpan.setAttribute("class", "popuptext")
                releaseSpan.setAttribute("id", "myPopup")
                nameButton.append(releaseSpan)

                releaseButton = document.createElement("button")
                releaseButton.innerText = `Release ${data[i]['pokemon_name'].toUpperCase()}?`
                releaseSpan.append(releaseButton)



                // nameButton.addEventListener("click", function(){
                //     // create popup when clicked

                // })
                

                
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
