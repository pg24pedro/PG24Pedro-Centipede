export const canvas = document.querySelector(".game-canvas");
export const ctx = canvas.getContext("2d");

export default class Mushroom
{
    constructor(x,y,noOfMushrooms)
    {
        this.x = x;
        this.y = y;
        this.width = 12.5;
        this.height = 12.5;            
    }


    draw(ctx)
    {
        var playerImg = document.querySelector('.mushImg');
        ctx.drawImage(playerImg, this.x,this.y,this.height,this.width);
         
    }

    collideWith(sprite)
    {
        if(this.x < sprite.x + sprite.radius &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.radius &&
            this.y + this.height > sprite.y)
            {
                return true;
            }
        return false;
    }

}

