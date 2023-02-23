import Player from "./scripts/Player.js";
import BulletController from "./scripts/bulletController.js";
import Enemy from "./scripts/Enemy.js";
import Centipede from "./scripts/Centipede.js";
import Segment from "./scripts/Segment.js";
import Mushroom from "./scripts/Mushroom.js";

//Declaring variables used throughout the game
export const canvas = document.querySelector(".game-canvas");
export const ctx = canvas.getContext("2d");

var bckgImg = document.querySelector(".bckgImg")

const bulletController = new BulletController(canvas);

const player = new Player(bulletController);
var centipede = new Centipede(0,0,10);


player.x = canvas.width/2;
player.y = canvas.height - player.height - 2;

var startGame =  false;

const playBtnWidth = 50;
const playBtnHeight = 30;
var playerScore = 0;

//Arrays of enemies and mushrooms
var enemies = [centipede];
const mushrooms = [
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY()),
    new Mushroom(randX(),randY())
];


export default function gameLoop()
{
    //First draw start screen
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(canvas.width/2 - playBtnWidth/2,canvas.height/2 -playBtnHeight/2,playBtnWidth,playBtnHeight);
    ctx.fillStyle="red";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.font = "20px pixeboy";
    ctx.fillText("Play!",canvas.width/2 - playBtnWidth/2 + 5,canvas.height/2 -playBtnHeight/2 + 20)
    ctx.font = "10px pixeboy";
    ctx.fillText("Click to play! Use arrow keys to move and Spacebar to shoot",canvas.width/2 - 120,canvas.height/2 -playBtnHeight/2 + 50)
    ctx.fillText("Kill all centipedes to win!",canvas.width/2 - 120,canvas.height/2 -playBtnHeight/2 + 60)
    ctx.fillText("Loose if the centepede gets to close.",canvas.width/2 - 120,canvas.height/2 -playBtnHeight/2 + 70)
    ctx.fill();

    canvas.addEventListener('click',function(e){ startGame = true;})

    //If the player clicks on the canvas, the game starts
    if(startGame)
    {
        //Clear screen start
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //Load bkg image
        ctx.fillStyle = ctx.createPattern(bckgImg, "no-repeat");
        ctx.fillRect(0,0,canvas.width, canvas.height);

        //draw player and bullet controller
        bulletController.draw(ctx);
        player.draw(ctx);

        //Randomly draw mushrooms on the screen
        mushrooms.forEach((mushroom) =>{
            mushroom.draw(ctx);        
        })
        
        let direction = 1;

        //For each centipide, check if any of the segments is being hit
        enemies.forEach((centipede) => 
        {
            centipede.draw(ctx);
            centipede.move(canvas.width,canvas.height,direction);

            centipede.segments.forEach((segment)=>{  
                //checks for bullet colition
                if(bulletController.collideWith(segment)){
                    if(segment.health <= 0)
                    {
                        //If the segments health is less than 0, then create a new centipide moving in the 
                        //opposite direction.
                        playerScore += 10;
                        const index = (centipede.segments.indexOf(segment))
                        centipede.segments.splice(segment,index);
                        if(centipede.segments.length > 1)
                        {
                            enemies.push(new Centipede(segment.x - segment.radius, segment.y + segment.radius, index));
                            direction *= -1;
                            
                        }
                        else
                        {
                            //Delete enemy if it has no more segments to shoot at   
                            enemies.splice(index,1);
                        }
                    }
                }

                else if(segment.y > canvas.height - 50)
                {
                    startGame = false;
                }

                else
                {
                    segment.draw(ctx);
                }
            });
        });

        //If there are no more segments alive, finish game and create a new centipede for the player to play again. 
        if(enemies.length == 0)
        {
            startGame = false;
        }

        if(!startGame)
        {
            enemies = [];
            centipede = new Centipede(0,0,10);
            enemies.push(centipede);
        }
        

        
    }
    
    
}

//Time handler
setInterval(gameLoop, 1000/60);

//Function for the collapsible info sections (About centipede, about author)
var coll = document.getElementsByClassName("collapsible");
for (var i=0;i<coll.length;i++)
{
    coll[i].addEventListener("click",function(){
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if(content.style.maxHeight)
        {
            content.style.maxHeight = null;
        }
        else
        {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

//Music playing/pausing and stopping.
var audio,playbtn;
function initAudioPlayer()
{
    audio = new Audio();
    audio.src = "./assets/Audio/ost.wav";
    audio.loop = true;
    audio.autoplay = true;

    var playbtn = document.getElementsByClassName("playpausebtn");
    var mutebtn = document.getElementsByClassName("mutebtn");

    playbtn[0].addEventListener("click",playPause);
    mutebtn[0].addEventListener("click",mute);

    function playPause()
    {
        if(audio.paused)
        {
            audio.play();
        }
        else
        {
            audio.pause();
        }
    }

    function mute()
    {
       if(audio.muted)
       {
            audio.muted = false;
       } 
       else
       {
            audio.muted = true;
       }
    }
}

//Play music at page loading.
window.addEventListener("load",initAudioPlayer);

//Random coortindate generator
function randX()
{
    return Math.floor(Math.random() * canvas.width);
}

function randY()
{
    return Math.floor(Math.random() * canvas.height);
}

