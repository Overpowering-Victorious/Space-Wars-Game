class Laser extends Phaser.GameObjects.Sprite{
    constructor(ship, speed, scene){
        var x=ship.x;
        var y=ship.y;

        super(scene,x,y,"laser");
        this.setScale(2);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        let direction = new Phaser.Math.Vector2(scene.player.x - x, scene.player.y - y);
        direction = direction.normalize();
        this.body.setVelocity(direction.x * speed, direction.y * speed);
        scene.laser_beams.add(this);
    }

    update()
    {
        if (this.y < 0 || this.x < 0 || this.y > this.scene.sys.canvas.height || this.x > this.scene.sys.canvas.width) {
            this.destroy();
        }
    }
}