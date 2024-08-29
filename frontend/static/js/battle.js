const userFlag = 
    fetch('/battle/party')
        .then(r=>r.json())
        .then(data => {
    return data;
});
window.onload = async () => {
    let someData = await userFlag;
    console.log(someData)
};