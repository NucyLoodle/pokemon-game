const userFlag = 
    fetch('/battle/party')
        .then(r=>r.json())
        .then(data => {
    // return data;
    
    let numOfPokemon = data.length;
        for (let i = 0; i < numOfPokemon; i++) {
            div = document.createElement("div")
            div.setAttribute("class","partyPokemonStats")
            usersPartyPokemon.append(div)

            namePara = document.createElement("p")
            div.append(namePara)
            namePara.innerText = data[i]['pokemon_name'].toUpperCase()

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

});
window.onload = async () => {
    let someData = await userFlag;
};