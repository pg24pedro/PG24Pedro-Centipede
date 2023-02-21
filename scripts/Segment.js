export default class Segment
{
    constructor(x,y)
    {
        this.radius = 7;
        this.x = x + this.radius;
        this.y = y + this.radius;
        this.color = "blue";
        this.xAccel = 1;
        this.health = 1 ;
    }

    draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle = "lightblue";
        ctx.fill();
        ctx.stroke();
    } 
    
    takeDamage(damage)
    {
        this.health -= 1;
    }

}