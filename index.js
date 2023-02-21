import Player from "./scripts/Player.js";
import BulletController from "./scripts/bulletController.js";
import Enemy from "./scripts/Enemy.js";
import Centipede from "./scripts/Centipede.js";
import Segment from "./scripts/Segment.js";
import Mushroom from "./scripts/Mushroom.js";

export const canvas = document.querySelector(".game-canvas");
export const ctx = canvas.getContext("2d");

var bckgImg = document.querySelector(".bckgImg")

const bulletController = new BulletController(canvas);

const player = new Player(bulletController);
const centipede = new Centipede(0,0,10);


player.x = canvas.width/2;
player.y = canvas.height - player.height - 2;


const enemies = [centipede];
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



function gameLoop()
{   

    ctx.fillStyle = ctx.createPattern(bckgImg, "no-repeat");
    ctx.fillRect(0,0,canvas.width, canvas.height);

    bulletController.draw(ctx);
    player.draw(ctx);

    mushrooms.forEach((mushroom) =>{
        mushroom.draw(ctx);        
    })
    
    let direction = 1;

    enemies.forEach((centipede) => 
    {
        centipede.draw(ctx);
        centipede.move(canvas.width,canvas.height,direction);

        centipede.segments.forEach((segment)=>{  
            if(bulletController.collideWith(segment)){
                if(segment.health <= 0)
                {
                    const index = (centipede.segments.indexOf(segment))
                    centipede.segments.splice(segment,index);
                    if(centipede.segments.length > 1)
                    {
                        enemies.push(new Centipede(segment.x - segment.radius, segment.y + segment.radius, index));
                        direction *= -1;
                    }
                    else
                    {
                        enemies.splice(index,1);
                    }

                }
            }
            else
            {
                segment.draw(ctx);
            }
        });
    });
    
}

setInterval(gameLoop, 1000/60);

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
window.addEventListener("load",initAudioPlayer);

function randX()
{
    return Math.floor(Math.random() * canvas.width);
}

function randY()
{
    return Math.floor(Math.random() * canvas.height);
}
