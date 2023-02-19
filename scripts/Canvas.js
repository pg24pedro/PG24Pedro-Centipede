export default class Canvas
{
    constructor()
    {   
        gameCanvas = document.querySelector('.game-canvas');
        ctx = gameCanvas.getContext("2d");

        cnvWidth = gameCanvas.width;
        cnvHeight = gameCanvas.height;
    }
    

}