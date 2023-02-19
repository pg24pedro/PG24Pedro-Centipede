import Player from "./scripts/Player.js";
import BulletController from "./scripts/bulletController.js";
import Enemy from "./scripts/Enemy.js";
import Centipede from "./scripts/Centipede.js";
import Segment from "./scripts/Segment.js";

export const canvas = document.querySelector(".game-canvas");
export const ctx = canvas.getContext("2d");

var bckgImg = document.querySelector(".bckgImg")

const bulletController = new BulletController(canvas);

const player = new Player(bulletController);

const centipede = new Centipede(0,0,10);


player.x = canvas.width/2;
player.y = canvas.height - player.height - 2;


const enemies = [];

function gameLoop()
{   
    
    ctx.fillStyle = ctx.createPattern(bckgImg, "no-repeat");
    ctx.fillRect(0,0,canvas.width, canvas.height);

    bulletController.draw(ctx);
    player.draw(ctx);

    centipede.draw(ctx);
    centipede.move(canvas.width,canvas.height);
    

    enemies.forEach((enemie) => 
    {
        if(bulletController.collideWith(enemie)){
            if(enemie.health <= 0)
            {
                const index = (enemies.indexOf(enemie))
                enemies.splice(enemie,1);
            }
        }
        else
        {
            enemie.draw(ctx);
        }
        
    });
    
}


setInterval(gameLoop, 1000/60);