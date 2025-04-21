playerInfo = localStorage.getItem("playerShopInfo") || "TFFFFF;FFF"  

colors = ["blue", "red", "green", "yellow", "orange", "pink"]
speeds = [2, 3, 4]

colorDiv = document.getElementById("colors")
for(i in colors){
    item = document.createElement("item") 
    img = document.createElement("img")
    img.src = "shop-images/kite-" + colors[i] + ".png"
    item.textContent = colors[i].charAt(0).toUpperCase() + colors[i].slice(1).toLowerCase()
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    item.appendChild(img)
    colorDiv.appendChild(item)
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    button = document.createElement("button")
    
    text = document.createElement("span")

    if(playerInfo.split(";")[0].charAt(i) == "F"){
        coinimg = document.createElement("img")
        coinimg.src = "coin.png"
        coinimg.classList = "coin"
    
        text.textContent = " 200"
        text.style.fontSize = "18px"
    
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
    } else {
        text.textContent = "Select"
        button.classList = "bought"
        button.appendChild(text)
        item.appendChild(button)
    }
}

speedDiv = document.getElementById("speeds")
for(i in speeds){
    item = document.createElement("item") 
    img = document.createElement("img")
    img.src = "shop-images/speed-" + speeds[i] + ".png"
    item.textContent = "x" + speeds[i] + " Speed"
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    item.appendChild(img)
    speedDiv.appendChild(item)
    item.appendChild(document.createElement("br"))
    item.appendChild(document.createElement("br"))
    button = document.createElement("button")
    
    text = document.createElement("span")

    if(playerInfo.split(";")[1].charAt(i) == "F"){
        coinimg = document.createElement("img")
        coinimg.src = "coin.png"
        coinimg.classList = "coin"
    
        text.textContent = " " + Math.round(0.5 * speeds[i] ** 2) * 100
        text.style.fontSize = "18px"
    
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
    } else {
        text.textContent = "Select"
        button.classList = "bought"
        button.appendChild(text)
        item.appendChild(button)
    }
}

function purchaseItem(item) {
    switch(item.split(";")[0]){
        case "color":
            color = item.split(";")[1]
            
            break
        case "speed":
            speed = item.split(";")[1]

            break
    }
}