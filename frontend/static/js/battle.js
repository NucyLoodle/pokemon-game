function handleMovesArray(a) {
    a = a.map(function(x){ return x.toUpperCase(); })
    return a.length == 1 ? a[0] : [ a.slice(0, a.length - 1).join(", "), a[a.length - 1] ].join(" and ")
  }


const cpuDetails = 
    fetch('/battle/cpu')
        .then(r=>r.json())
        .then(data => {
            const cpuSection = document.getElementById("wildPokemon")
            cpuPara = document.createElement("p")
            cpuPara.innerText = `A wild ${data['name']} appeared!`
            cpuSection.append(cpuPara)

            sessionStorage.setItem("cpuPokemonName", data['name'])
            sessionStorage.setItem("cpuPokemonHp", data['hp'])
            sessionStorage.setItem("cpuPokemonMoves", data['moves'])
    // return data;
    console.log(data)
    })

const userFlag = 
    fetch('/battle/party')
        .then(r=>r.json())
        .then(data => {
    // return data;
    // console.log(data)
    
    let numOfPokemon = data.length;
        for (let i = 0; i < numOfPokemon; i++) {
            div = document.createElement("div")
            div.setAttribute("class","partyPokemonStats")
            usersPartyPokemon.append(div)
            
            // change name to be a button
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
    let someData = await userFlag;

};


