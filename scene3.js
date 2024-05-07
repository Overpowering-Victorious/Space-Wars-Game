class scene3 extends Phaser.Scene
{
    constructor()
    {
        super("endgame");
    }

    create()
    {
        this.add.text(config.width/2,config.height/2,"Game Over !!",{ fontSize: '40px', align: 'center', fill: '#fff' });
        this.gameover=this.sound.add("gameover");
        this.gameover.play();
        this.input.on('pointerdown', () => {
            this.gameover.stop();
            lf=3;
            this.scene.start("bootgame");
        }, this);
    }
}