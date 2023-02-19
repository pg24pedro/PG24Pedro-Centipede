import Segment from "./Segment.js";

export default class Centipede
{
    
    segments = [];
    
    constructor(x,y,noOfSegments)
    {
        this.noOfSegments = noOfSegments;
        this.x = x;
        this.y = y; 
        this.appendSegments(x,y);
    }

    appendSegments(x,y)
    {
        this.x = x;

        for(let i = 0; i < this.noOfSegments; i++)
        {
            if(i == 0)
            {
                this.segments.push(new Segment(x,y));
                this.segments[i].color = "red";
            }
            else
            {
                x += this.segments[i-1].radius*2;
                this.segments.push(new Segment(x,y));
            }
        }
    }

    draw(ctx)
    {
        this.segments.forEach(segment =>{
            segment.draw(ctx);
        });
    }

    drop(segment,height)
    { 
        segment.xAccel *= -1;
        segment.x += segment.xAccel*segment.radius;
        segment.y += segment.radius*2;
        if(segment.y > height - segment.radius*2)
        {
            segment.y = segment.radius + 1;
        }
    }


    
    move(width,height)
    {
        this.segments.forEach(segment=>{
            segment.x += segment.xAccel;
            if(segment.x < segment.radius || segment.x > width-segment.radius + 2){
                
                this.drop(segment,height);
            }
             
        })
    }

    //TODO: Danio al centipede

    
}