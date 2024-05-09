class scene2 extends Phaser.Scene
{
    constructor()
    {
        super("playgame");
    }

    create()
    {
        this.background=this.add.tileSprite(0,0,config.width,config.height,"background");
        this.background.setOrigin(0,0);
        this.background.setScale(2.5);

        this.ship1=this.add.sprite(Phaser.Math.Between(20,config.width-20),-1000,"ship");
        this.ship2=this.add.sprite(Phaser.Math.Between(20,config.width-20),-1000,"ship2");
        this.ship3=this.add.sprite(Phaser.Math.Between(20,config.width-20),-1000,"ship3");
        this.player=this.physics.add.sprite(config.width/2 ,config.height/2 +250, "player");
        this.red=this.physics.add.sprite(Phaser.Math.Between(20,config.width-20),-1000, "power-up");
        this.gray=this.physics.add.sprite(Phaser.Math.Between(20,config.width-20),-1000, "power-up");

        
        
        this.cursorKeys=this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.ship1.setScale(2);
        this.ship2.setScale(2);
        this.ship3.setScale(2);
        this.player.setScale(2);

        this.ship1.play("anim_ship1");
        this.ship2.play("anim_ship2");
        this.ship3.play("anim_ship3");
        this.player.play("thrust");

        this.projectiles = this.add.group();
        this.enemy=this.physics.add.group();
        this.power=this.physics.add.group();

        this.power.add(this.red);
        this.power.add(this.gray);

        this.enemy.add(this.ship1);
        this.enemy.add(this.ship2);
        this.enemy.add(this.ship3);

        this.physics.add.overlap(this.player, this.enemy, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemy, this.hitEnemy, null, this);

        this.score=0;
        this.lastscore=0;
        this.scorelabel=this.add.bitmapText(10,10,"font","SCORE: 0000000",30);
        this.highscorelabel=this.add.bitmapText(425,10,"font","HIGHSCORE: "+this.zeroPad(highscore,7),30);
        this.life=this.add.sprite(50,55,"life");
        this.life.setScale(3);

        this.lasergun=this.sound.add("lasergun");
        this.explosionSound=this.sound.add("explosionSound");
        this.ingame=this.sound.add("ingame");
        this.ingame.play();
        this.hurt=this.sound.add("hurt");
    }

    update(){
        this.background.tilePositionY-=0.3;
        this.moveShip(this.ship1,0);
        this.moveShip(this.ship2,1);
        this.moveShip(this.ship3,2);
        this.movePlayerManager();
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
        }
        for(var i=0; i<this.projectiles.getChildren().length; i++)
        {
            var beam=this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    moveShip(ship,id)
    {
        if(pauseShip)
            return;
        ship.y+=gameSettings.shipSpeed[id];
        if(ship.y>config.height)
            this.resetShip(ship);
    }

    resetShip(ship)
    {
        ship.y=-200;
        var rand=Phaser.Math.Between(20,config.width-20);
        ship.x=rand;
    }

    resetPlayer()
    {
        var x = config.width/2;
        var y = config.height;
        this.player.enableBody(true, x, y, true, true);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player.alpha=0.5;

        var tween=this.tweens.add({
            targets: this.player,
            y: config.height/2 +250,
            ease: "Power1",
            duration: 1000,
            repeat: 0,
            onComplete: function(){
                this.player.alpha=1;
            },
            callbackScope: this
        });
    }

    hurtPlayer(player,ship)
    {
        if(this.player.alpha < 1){
            return;
        }
        var exp1=new Explosion(this,ship.x,ship.y);
        this.explosionSound.play();
        this.resetShip(ship);

        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var exp2=new Explosion(this,player.x,player.y);
        this.hurt.play();
        player.disableBody(true, true);
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });
        lf--;
        if(lf>=0)
            this.life.play("hurt_anim"+lf);
        if(lf==0)
        {
            this.scene.start("endgame");
            this.ingame.stop();
        }
    }

    hitEnemy(projectiles,ship)
    {
        var explosion=new Explosion(this,ship.x,ship.y);
        this.explosionSound.play();
        projectiles.destroy();
        this.resetShip(ship);
        if(ship==this.ship1)
            this.score+=1;
        else if(ship==this.ship2)
            this.score+=2;
        else
            this.score+=3;
        highscore=Math.max(highscore,this.score);
        var fscore=this.zeroPad(this.score,7);
        var fhighscore=this.zeroPad(highscore,7);
        this.scorelabel.text="SCORE: "+fscore;
        this.highscorelabel.text="HIGHSCORE: "+fhighscore;
        if(this.score%20<3 && this.score>17+this.lastscore)
        {
            this.lastscore=this.score;
            this.ingame.stop();
            pauseShip=true;
            this.enemy.getChildren().forEach(ship => {
                var explosion1=new Explosion(this,ship.x,ship.y);
                this.explosionSound.play();
                this.resetShip(ship);
            });
            this.thrusters=this.sound.add("thrusters");
            this.thrusters.play();
            this.tweens.add({
                targets: this.background,
                tilePositionY: this.background.tilePositionY-500,
                ease: 'Linear',
                duration: 2500,
                onComplete: function () {
                    this.thrusters.stop();
                    this.victory=this.sound.add("victory");
                    this.victory.play();
                    this.tweens.add({
                        targets: this.background,
                        tilePositionY: this.background.tilePositionY-100,
                        ease: 'Linear',
                        duration: 2500,
                        onComplete: function () {
                            pauseShip = false;
                            this.increaseValues(gameSettings);
                            this.ingame.play();
                        },
                        callbackScope: this
                    });
                },
                callbackScope: this
            });
        }
    }

    zeroPad(num,size)
    {
        var snum=String(num);
        while(snum.length< (size || 2)){
            snum="0"+snum;
        }
        return snum;
    }

    shootBeam()
    {
        var beam=new Beam(this);
        this.lasergun.play();
    }

    movePlayerManager()
    {
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityY(0);
        }
    }

    increaseValues(obj) {
        for (let prop in obj) {
            if (typeof obj[prop] === 'number' && obj[prop]<500) {
                obj[prop] += 20;
            } else if (Array.isArray(obj[prop])) {
                obj[prop] = obj[prop].map(value => value +0.5);
            }
        }
    }
}
