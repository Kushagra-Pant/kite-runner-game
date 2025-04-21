if(!localStorage.getItem("playerShopInfo")){
    localStorage.setItem("playerShopInfo", "TFFFFFFF;TFFF")
}
playerInfo = localStorage.getItem("playerShopInfo")

colors = ["blue", "red", "green", "yellow", "orange", "pink", "white", "black"]
speeds = [1, 2, 3, 4]

document.getElementById("coinText").innerHTML = "Coins: " + localStorage.getItem("coins")

colorDiv = document.getElementById("colors")
for(let i in colors){
    item = document.createElement("item") 
    img = document.createElement("img")
    img.src = "shop-images/kite-" + colors[i] + ".png"
    img.style.width = "6vw"
    item.textContent = colors[i].charAt(0).toUpperCase() + colors[i].slice(1)
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    item.appendChild(img)
    colorDiv.appendChild(item)
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    button = document.createElement("button")
    button.id = "color;" + colors[i]
    item.id = "item;" + button.id

    text = document.createElement("span")

    if(playerInfo.split(";")[0].charAt(i) == "F"){
        coinimg = document.createElement("img")
        coinimg.src = "coin.png"
        coinimg.classList = "coin"
    
        text.textContent = " " + 200 * Math.round(0.5 + 0.17 * i) 
        text.style.fontSize = "18px"
        text.id = button.id + ";cost"
    
        priceContainer = document.createElement("span")
        priceContainer.style.display = "inline-flex"
        priceContainer.style.alignItems = "center"
        priceContainer.appendChild(coinimg)
        priceContainer.appendChild(text)
    
        button.classList = "purchaseButton"
        button.appendChild(priceContainer)
        item.appendChild(button)
        button.addEventListener('click', function() {
            purchaseItem('color;' + colors[i]);
        });
    } else if(localStorage.getItem("kiteColor") != colors[i]) {
        text.textContent = "Select"
        button.appendChild(text)
        item.appendChild(button)
        button.addEventListener('click', function() {
            selectItem('color;' + colors[i]);
        });
    } else {
        text.textContent = "Selected"
        button.appendChild(text)
        item.appendChild(button)
        item.classList.add("selected")
    }
}

speedDiv = document.getElementById("speeds")
for(let i in speeds){
    item = document.createElement("item") 
    img = document.createElement("img")
    img.src = "shop-images/speed-" + speeds[i] + ".png"
    img.style.width = "6vw"
    item.textContent = "x" + speeds[i] + " Speed"
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    item.appendChild(img)
    speedDiv.appendChild(item)
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    button = document.createElement("button")
    button.id = "speed;" + speeds[i]
    item.id = "item;" + button.id
    
    text = document.createElement("span")

    if(playerInfo.split(";")[1].charAt(i) == "F"){
        coinimg = document.createElement("img")
        coinimg.src = "coin.png"
        coinimg.classList = "coin"
    
        text.textContent = " " + Math.round(0.5 * speeds[i] ** 2) * 100
        text.style.fontSize = "18px"
        text.id = button.id + ";cost"
    
        priceContainer = document.createElement("span")
        priceContainer.style.display = "inline-flex"
        priceContainer.style.alignItems = "center"
        priceContainer.appendChild(coinimg)
        priceContainer.appendChild(text)
    
        button.classList = "purchaseButton"
        button.appendChild(priceContainer)
        item.appendChild(button)
        button.addEventListener('click', function() {
            purchaseItem('speed;' + speeds[i]);
        });
    } else if(parseInt(localStorage.getItem("kiteSpeed")) != speeds[i]) {
        text.textContent = "Select"
        button.appendChild(text)
        item.appendChild(button)
        button.addEventListener('click', function() {
            selectItem('speed;' + speeds[i]);
        });
    } else {
        text.textContent = "Selected"
        button.appendChild(text)
        item.appendChild(button)
        item.classList.add("selected")
    }
}

function removeAllEventListeners(button) {
    const newButton = button.cloneNode(true); 
    button.parentNode.replaceChild(newButton, button);
    return newButton; 
}

function purchaseItem(item) {
    console.log(item)
    button = document.getElementById(item)
    console.log((document.getElementById(item + ";cost").innerHTML))
    let cost = parseInt(document.getElementById(item + ";cost").innerHTML)
    if(parseInt(localStorage.getItem("coins")) < cost){
        alert("Not enough coins!")
        return
    }
    button.className = ""
    button.innerHTML = "Select"
    button = removeAllEventListeners(button)
    button.addEventListener('click', function() {
        selectItem(item)
    })
    let info = localStorage.getItem("playerShopInfo").split(";");
    switch(item.split(";")[0]){
        case "color":
            targetStr = info[0]; 
            indexToChange = colors.indexOf(item.split(";")[1]);
            targetStr = targetStr.substring(0, indexToChange) + "T" + targetStr.substring(indexToChange + 1);
            info[0] = targetStr;
            break
        case "speed":
            targetStr = info[1]; 
            indexToChange = speeds.indexOf(item.split(";")[1]);
            targetStr = targetStr.substring(0, indexToChange) + "T" + targetStr.substring(indexToChange + 1);
            info[1] = targetStr;
            break
    }
    console.log(info)
    localStorage.setItem("coins", parseInt(localStorage.getItem("coins")) - cost)
    document.getElementById("coinText").innerHTML = "Coins: " + localStorage.getItem("coins")
    localStorage.setItem("playerShopInfo", info.join(";"));
}

function selectItem(item){
    console.log("selected")
    console.log(item)
    switch(item.split(";")[0]){
        case 'color':
            currentlySelected = document.getElementsByClassName("selected")[0]
            break
        case 'speed':
            currentlySelected = document.getElementsByClassName("selected")[1]
            break
    }
    currentlySelected.className = ""
    buttonSelected = document.getElementById(currentlySelected.id.split(";")[1] + ";" + currentlySelected.id.split(";")[2])
    buttonSelected.innerHTML = "Select"
    buttonSelected = removeAllEventListeners(buttonSelected)
    let id = buttonSelected.id;
    buttonSelected.addEventListener('click', function() {
        selectItem(id)
    })
    
    button = document.getElementById(item)
    button.className = ""
    button.innerHTML = "Selected"
    button = removeAllEventListeners(button)
    document.getElementById("item;" + item).className = "selected"

    localStorage.setItem("kite" + item.split(";")[0].charAt(0).toUpperCase() + item.split(";")[0].slice(1), item.split(";")[1])
}