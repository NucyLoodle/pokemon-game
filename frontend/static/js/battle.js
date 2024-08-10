function handleResponse(response) {
    return;
    }

const buttons = document.querySelector(".pokemon-choice-buttons");
let pokemonDict = {};
function choosePokemon() {
    buttons.addEventListener('click', event => {
        const {target} = event; //extracts target from the event info
        const {value} = target; //extract the value property from the target ie the number clicked!
        pokemonDict["name"] = value
        console.log(pokemonDict)
        if (!target.matches('button')) { //check the user clicked a button
        
            return;
        } else {
            let apiUrl = "http://127.0.0.1:5001/battle/";
            axios
                .get(apiUrl, pokemonDict)
                .then(handleResponse)
                .catch((err) => console.log(err));
        }
        }
    )}
    
    


choosePokemon()

// select buttons



// buttons.addEventListener('click', event => {
//     console.log("clicked")
//     const {target} = event; //extracts target from the event info
//     const {value} = target; //extract the value property from the target ie the number clicked!
//     choosePokemon(value)
// })