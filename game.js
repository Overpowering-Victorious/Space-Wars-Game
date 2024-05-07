
var config={
    width: 2.5*256,
    height: 2.5*272,
    backgroundColor: 0x000000,
    scene:[scene1,scene2,scene3],
    pixelArt: true,
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    }
}

var highscore=0,lf=3;

const hurt_no=[{start:4,end:6},{start:2,end:4},{start:0,end:2}];

var gameSettings = {
    playerSpeed:300,
}

window.onload=function()
{
    var game=new Phaser.Game(config);

     var screenWidth = window.innerWidth;
     var screenHeight = window.innerHeight;
     var canvasWidth = config.width;
     var canvasHeight = config.height;
     var centerX = (screenWidth - canvasWidth) / 2;
     var centerY = (screenHeight - canvasHeight) / 2;

     var canvasElement = document.querySelector('canvas');
     canvasElement.style.position = 'absolute';
     canvasElement.style.left = centerX + 'px';
     canvasElement.style.top = centerY + 'px';
}