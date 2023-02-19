import { canvas,ctx } from "../index.js";

export default class Player
{
    constructor(bulletController)
    {
        this.x = 0;
        this.y = 0;
        this.width = 12.5;
        this.height = 12.5;
        this.speed = 5;
        
        this.bulletController = bulletController;

        document.addEventListener("keydown",this.keydown);
        document.addEventListener("keyup",this.keyup);
    }

    draw(ctx)
    {
        this.move();
        var playerImg = document.querySelector('.playerImg');
        ctx.drawImage(playerImg, this.x,this.y, this.height,this.width);
        
        this.shoot();
    }

    shoot()
    {
       if(this.shootPressed){
        console.log("shoot");
        const bulletSpeed = 5;
        const bulletDelay = 15;
        const damage = 1;
        const bulletX = this.x + this.width/2;
        const bulletY = this.y;
        this.bulletController.shoot(bulletX,bulletY,bulletSpeed,damage,bulletDelay);
       }
    }
    move()
    {
        if(this.downPressed && this.y < (canvas.height - (this.height + this.height/2)))
        {
            this.y += this.speed;
        }
        if(this.upPressed && this.y > canvas.height - 50)
        {
            this.y -= this.speed;
        }
        if(this.leftPressed && this.x > 0)
        {
            this.x -= this.speed;
        }
        if(this.rightPressed && this.x < (canvas.width - this.width))
        {
            this.x += this.speed;
        }
    } 

    keydown = (e) => {
        if(e.code === "ArrowUp")
        {
            e.preventDefault();
            this.upPressed = true;
        }
        else if(e.code === "ArrowDown")
        {
            e.preventDefault();
            this.downPressed = true;
        }
        else if(e.code === "ArrowRight")
        {
            this.rightPressed = true;
        }
        else if(e.code === "ArrowLeft")
        {
            this.leftPressed = true;
        }
        else if(e.code === "Space")
        {
            e.preventDefault();
            this.shootPressed = true;
        }
    }

    keyup = (e) =>{

        if(e.code === "ArrowUp")
        {
            this.upPressed = false;
        }
        else if(e.code === "ArrowDown")
        {
            this.downPressed = false;
        }
        else if(e.code === "ArrowRight")
        {
            this.rightPressed = false;
        }
        else if(e.code === "ArrowLeft")
        {
            this.leftPressed = false;
        }
        else if(e.code === "Space")
        {
            this.shootPressed = false;
        }
    }
}