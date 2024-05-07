class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x=scene.player.x;
        var y=scene.player.y;

        super(scene,x,y,"beam");
        this.setScale(2);
        scene.add.existing(this);
        // this.play("fire");
        scene.physics.world.enableBody(this);
        this.body.velocity.y=(-1.5*gameSettings.playerSpeed);
        scene.projectiles.add(this);
    }

    update()
    {
        if(this.y<0)
            this.destroy();
    }
}