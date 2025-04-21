function confirmReset(element){
    document.getElementById(element).style.color = "#009655"
    document.getElementById(element).style.backgroundColor = "#dda809"
    document.getElementById(element).innerHTML = "Successfully Reset!"
}

function resetHighscore(){
    localStorage.removeItem("bestScore")
    confirmReset("resetHigh")
}

function resetAll(){
    localStorage.removeItem("bestScore")
    localStorage.removeItem("coins")
    localStorage.removeItem("playerShopInfo")
    localStorage.removeItem("kiteColor")
    localStorage.removeItem("kiteSpeed")
    confirmReset("resetAll")
}