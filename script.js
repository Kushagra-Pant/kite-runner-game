const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

if(!localStorage.getItem("kiteColor")){
  localStorage.setItem("kiteColor", "blue")
}

if(!localStorage.getItem("kiteSpeed")){
  localStorage.setItem("kiteSpeed", 1)
}

const kite = {
  x: 150,
  y: 300,
  width: 40,
  height: 40,
  color: localStorage.getItem("kiteColor"),
  speed: parseInt(localStorage.getItem("kiteSpeed")) * 3,
  visible: true
};

const enemyKite = {
  x: 500,
  y: 200,
  width: 40,
  height: 40,
  color: 'red',
  speed: 0,
  visible: true
};

let windspeed = {
    x: -1,
    y: -1
}

let gameOver = false;
let respawning = false;

const keys = {};

let bestScore = parseInt(localStorage.getItem("bestScore")) || 0;
document.getElementById("score").innerHTML = "Score: 0 (" + bestScore + ")";

let coins = parseInt(localStorage.getItem("coins")) || 0;
document.getElementById("coinText").innerHTML = "Coins: " + coins;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowUp') keys.up = true;
  if (e.key === 'ArrowDown') keys.down = true;
  
  if (e.key === 'a') keys.left = true;
  if (e.key === 'd') keys.right = true;
  if (e.key === 'w') keys.up = true;
  if (e.key === 's') keys.down = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowUp') keys.up = false;
  if (e.key === 'ArrowDown') keys.down = false;
  
  if (e.key === 'a') keys.left = false;
  if (e.key === 'd') keys.right = false;
  if (e.key === 'w') keys.up = false;
  if (e.key === 's') keys.down = false;
});

function update() {
  if (gameOver) return;

  kite.x += windspeed.x;
  kite.y -= windspeed.y;
  if (keys.left) kite.x -= kite.speed;
  if (keys.right) kite.x += kite.speed;
  if (keys.up) kite.y -= kite.speed;
  if (keys.down) kite.y += kite.speed;

  if (kite.x <= 0 || kite.x + kite.width >= canvas.width || kite.y + kite.height >= canvas.height) {
    kite.visible = false;
    endGame();
    return;
  }
  
  kite.x = Math.max(0, Math.min(canvas.width - kite.width, kite.x));
  kite.y = Math.max(0, Math.min(canvas.height - kite.height, kite.y));

  enemyKite.x += enemyKite.speed + windspeed.x;
  enemyKite.y -= windspeed.y;
  enemyKite.x = Math.max(0, Math.min(canvas.width - enemyKite.width, enemyKite.x));
  enemyKite.y = Math.max(0, Math.min(canvas.height - enemyKite.height, enemyKite.y));

  checkCollision();
}

function drawKite(k) {
  if (!k.visible) return;
  ctx.fillStyle = k.color;
  ctx.beginPath();
  ctx.moveTo(k.x + k.width / 2, k.y);
  ctx.lineTo(k.x + k.width, k.y + k.height / 2);
  ctx.lineTo(k.x + k.width / 2, k.y + k.height);
  ctx.lineTo(k.x, k.y + k.height / 2);
  ctx.closePath();
  ctx.fill();
}

function drawString() {
  if (!kite.visible) return;
  const kiteBottomX = kite.x + kite.width / 2;
  const kiteBottomY = kite.y + kite.height;

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, canvas.height);
  ctx.lineTo(kiteBottomX, kiteBottomY);
  ctx.stroke();
}

function drawEnemyString() {
  if (!enemyKite.visible) return;
  const enemyBottomX = enemyKite.x + enemyKite.width / 2;
  const enemyBottomY = enemyKite.y + enemyKite.height;

  ctx.strokeStyle = 'darkred';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width - 100, canvas.height);
  ctx.lineTo(enemyBottomX, enemyBottomY);
  ctx.stroke();
}

function spawnEnemyKite() {
  enemyKite.x = canvas.width;
  enemyKite.y = 200 + Math.random() * 100;
  enemyKite.visible = true;
  respawning = false;
}

function calcPoints(x, y){
  points = 100 * Math.sqrt(x / 800) * Math.sqrt((600 - y) / 600)
  document.getElementById("points").innerHTML = "+" + Math.round(points)
  p = getPoints() 
  p.current += Math.round(points) 
  if (p.current > p.best) {
    p.best = p.current
    localStorage.setItem("bestScore", p.best)
  }
  document.getElementById("score").innerHTML = "Score: " + p.current + " (" + p.best + ")"
  return points
}

function getPoints(){
  l = document.getElementById("score").innerHTML.split("(")
  l[0] = parseInt(l[0].split(": ")[1])
  l[1] = parseInt(l[1].split(")")[0])
  return {current: l[0], best: l[1]}
}

function endGame(){
  gameOver = true;
  coinsAdded = getPoints().current
  document.getElementById("points").innerHTML = "Game Over!"
  document.getElementById("points").style.color = "red"
  coins += coinsAdded
  localStorage.setItem("coins", coins)
  document.getElementById("coinText").innerHTML = "Coins: " + coins
}

function checkCollision() {
  const myStringStart = { x: 100, y: canvas.height };
  const myStringEnd = { x: kite.x + kite.width / 2, y: kite.y + kite.height };

  const enemyStringStart = { x: canvas.width - 100, y: canvas.height };
  const enemyStringEnd = { x: enemyKite.x + enemyKite.width / 2, y: enemyKite.y + enemyKite.height };

  // If player kite touches enemy's string
  if (enemyKite.visible && lineIntersectsRect(enemyStringStart, enemyStringEnd, kite)) {
    console.log("Enemy kite cut at:", kite.x + kite.width / 2, kite.y + kite.height);
    console.log("Points:", calcPoints(kite.x + kite.width / 2, kite.y + kite.height));
    enemyKite.visible = false;
    if (!respawning && !gameOver) {
      respawning = true;
      setTimeout(spawnEnemyKite, 3000); // spawn new one in 3s
    }
  }

  // If enemy kite touches player string
  if (kite.visible && enemyKite.visible && lineIntersectsRect(myStringStart, myStringEnd, enemyKite)) {
    console.log("Both kites cut at:", enemyKite.x + enemyKite.width / 2, enemyKite.y + enemyKite.height);
    kite.visible = false;
    enemyKite.visible = false;
    endGame();
  }
}

function lineIntersectsRect(p1, p2, rect) {
  const lines = [
    // Top
    { a: { x: rect.x, y: rect.y }, b: { x: rect.x + rect.width, y: rect.y } },
    // Right
    { a: { x: rect.x + rect.width, y: rect.y }, b: { x: rect.x + rect.width, y: rect.y + rect.height } },
    // Bottom
    { a: { x: rect.x + rect.width, y: rect.y + rect.height }, b: { x: rect.x, y: rect.y + rect.height } },
    // Left
    { a: { x: rect.x, y: rect.y + rect.height }, b: { x: rect.x, y: rect.y } }
  ];

  return lines.some(line => doLinesIntersect(p1, p2, line.a, line.b));
}

function doLinesIntersect(p1, p2, p3, p4) {
  const det = (p2.x - p1.x) * (p4.y - p3.y) - (p4.x - p3.x) * (p2.y - p1.y);
  if (det === 0) return false;

  const lambda = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det;
  const gamma = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det;

  return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawString();
  drawEnemyString();
  drawKite(kite);
  drawKite(enemyKite);
  requestAnimationFrame(gameLoop);
}

gameLoop();

function restart(){
  kite.x = 150;
  kite.y = 100;
  kite.visible = true;

  enemyKite.x = 500;
  enemyKite.y = 200;
  enemyKite.visible = true;

  windspeed = { x: -1, y: -1 };

  gameOver = false;
  respawning = false;

  document.getElementById("points").innerHTML = "";
  document.getElementById("points").style.color = "black";
  document.getElementById("score").innerHTML = "Score: 0 (" + bestScore + ")";
}

function redirect(location){
  window.location.href = location + ".html";
}