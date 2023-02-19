import Bullet from "./Bullet.js";

export default class BulletController{

    bullets = [];
    bulletDelay = 0;

    constructor(canvas)
    {
        this.canvas;
    }
    shoot(x,y,speed,damage,delay){
        if(this.bulletDelay <= 0)
        {
            this.bullets.push(new Bullet(x,y,speed,damage));
            this.bulletDelay = delay;
        }

        this.bulletDelay--;
    }
    draw(ctx)
    {
        //console.log(this.bullets.length);
        this.bullets.forEach((bullet) => {
            if(this.isBulletOfScreen(bullet)){
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index,1);
            }
            bullet.draw(ctx);
        });
    }

    collideWith(sprite){
       return this.bullets.some(bullet =>{
            if(bullet.collideWith(sprite)){
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                return true;
            }
            return false;
       }) 
    }

    isBulletOfScreen(bullet)
    {
        return bullet.y <= -bullet.height;
    }
}