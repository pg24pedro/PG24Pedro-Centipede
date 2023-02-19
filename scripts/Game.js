var gameCanvas = document.querySelector('.game-canvas');
var ctx = gameCanvas.getContext("2d");

var playerImg = document.querySelector('.playerImg');

var cnvWidth = gameCanvas.width;
var cnvHeight = gameCanvas.height;

let x = cnvWidth/2;
let y = cnvHeight-30;

var playerHeight = 15;
var playerWidth = 15;

let playerX = (cnvWidth - playerWidth)/2;
let playerY = cnvHeight - playerHeight;

let playerAccel = 5;

let dx = 2;
let dy = -2;

const bulletHeight = 7.5;
const bulletWidth = 2;

const bullAccelY = 3;
let bulletY = gameCanvas.height - (playerHeight + bulletHeight);

const ballRadius= 10;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer()
{
    ctx.drawImage(playerImg, playerX,playerY, playerHeight,playerWidth)
}



export function drawBullet()
{
    ctx.beginPath();
    ctx.rect(playerX + playerWidth/2, playerY - bulletHeight, bulletWidth, bulletHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath(); 
}

//MAIN DRAW FUNCTION
function draw()
{
    ctx.clearRect(0, 0, cnvWidth, cnvHeight);
    drawBall(); 
    drawPlayer();
    checkMovement();
    
    x+=dx;
    y+=dy;
    
    checkColition();
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e)
{
    if(e.key === "Right" || e.key === "ArrowRight")
    {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft")
    {
        leftPressed = true;
    }
    else if(e.key === "Up" || e.key === "ArrowUp")
    {
        e.preventDefault();
        upPressed = true;
    }
    else if(e.key === "Down" || e.key === "ArrowDown")
    {
        e.preventDefault();
        downPressed = true;
    }

    else if(e.key === " " || e.key === "Space" || e.key === 32)
    {
        e.preventDefault();
        spacePressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.key === "Right" || e.key === "ArrowRight")
    {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft")
    {
        leftPressed = false;
    }
    else if(e.key === "Up" || e.key === "ArrowUp")
    {
        upPressed = false;
    }
    else if(e.key === "Down" || e.key === "ArrowDown")
    {
        downPressed = false;
    }
    else if(e.key === " " || e.key === "Space" || e.key === 32)
    {
        spacePressed = false;
    }
}

export function checkMovement()
{
    if(rightPressed)
    {
        playerX = Math.min(playerX + 7, cnvWidth - playerWidth);
    }
    else if(leftPressed)
    {
        playerX = Math.max(playerX - 7, 0);
    }

    else if(upPressed && playerY > cnvHeight - 40)
    {
        playerY -= playerAccel;
    }

    else if(downPressed && playerY < cnvHeight - playerHeight)
    {
        playerY += playerAccel;
    }


    else if(spacePressed)
    {
        drawBullet();
        while(bulletY > 0)
        {
            bulletY -= bullAccelY;
        }  
    }
    else if(!spacePressed)
    {
        bulletY = gameCanvas.height - playerY - bulletHeight;
    } 
}


function checkColition()
{
    if(x + dx > gameCanvas.width - ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }

    if(y + dy > gameCanvas.height - ballRadius || y + dy < ballRadius)
    {
        dy = -dy;
    }
}

setInterval(draw,14);
