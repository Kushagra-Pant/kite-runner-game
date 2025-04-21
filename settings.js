function resetHighscore(){
    localStorage.removeItem("bestScore")
    document.getElementById("reset").style.color = "#009655"
    document.getElementById("reset").style.backgroundColor = "#dda809"
    document.getElementById("reset").innerHTML = "Successfully Reset!"
}