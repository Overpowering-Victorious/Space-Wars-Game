class scene1 extends Phaser.Scene
{
    constructor()
    {
        super("bootgame");
    }

    preload()
    {
        const imagePaths = [
            "assets/SpaceBackground1.png",
            "assets/SpaceBackground2.png",
            "assets/SpaceBackground3.png",
            "assets/SpaceBackground4.png",
            "assets/SpaceBackground5.png",
        ];

        const randomImagePath = Phaser.Math.RND.pick(imagePaths);

        this.load.image("home", "assets/home.png");
        this.load.image("background", randomImagePath);
        this.load.spritesheet("ship", "assets/sps/ship.png", {frameWidth:16,frameHeight:16});
        this.load.spritesheet("ship2", "assets/sps/ship2.png", {frameWidth:32,frameHeight:16});
        this.load.spritesheet("ship3", "assets/sps/ship3.png", {frameWidth:32,frameHeight:32});
        this.load.spritesheet("explosion", "assets/sps/explosion.png", {frameWidth:16,frameHeight:16});
        this.load.spritesheet("player","assets/sps/player.png", {frameWidth:16,frameHeight:24});
        this.load.spritesheet("beam", "assets/sps/beam.png", {frameWidth:16,frameHeight:16});
        this.load.spritesheet("power-up", "assets/sps/power-up.png", {frameWidth:16,frameHeight:16});
        this.load.spritesheet("life", "assets/sps/life.png", {frameWidth:32,frameHeight:11});
        this.load.bitmapFont("font","assets/font/font.png","assets/font/font.xml");
        this.load.audio("lasergun",["assets/audio/lasergun.ogg","assets/audio/lasergun.mp3"]);
        this.load.audio("explosionSound",["assets/audio/explosion.ogg","assets/audio/explosion.mp3"]);
        this.load.audio("gameover",["assets/audio/gameover.ogg","assets/audio/gameover.mp3"]);
        this.load.audio("hurt",["assets/audio/hurt.ogg","assets/audio/hurt.mp3"]);
        this.load.audio("ingame",["assets/audio/ingame.ogg","assets/audio/ingame.mp3"]);
        this.load.audio("startgame",["assets/audio/startgame.ogg","assets/audio/startgame.mp3"]);
        this.load.audio("victory",["assets/audio/victory.ogg","assets/audio/victory.mp3"]);
        this.load.audio("thrusters",["assets/audio/thrusters.ogg","assets/audio/thrusters.mp3"]);

    }

    create()
    {
        this.home=this.add.tileSprite(0,0,config.width,config.height,"home");
        this.home.setOrigin(0,0);
        this.home.setScale(2.5);
        this.startgame=this.sound.add("startgame");
        this.startgame.play();

        this.add.text(config.width/2-290,config.height/2-150,"SpaceWars!!",{ 
        fontSize: '90px',
        fontStyle: 'bold',
        color: 'blue',
        align: 'center' });

        this.add.text(config.width/2+150,config.height/2,"version 1.8.1",{ fontSize: '15px', align: 'center'});
        this.add.text(config.width/2-170,config.height/2+100,"Click to Start",{ fontSize: '40px', align: 'center'});
        this.input.on('pointerdown', function () {
            this.startgame.stop();
            this.scene.start("playgame");
        }, this);

        this.add.text(config.width-175,config.height-20,"\u00A9 Abhibhav Om Tyagi", { fontSize: '15px', color: 'yellow',});

        this.anims.create({
            key: "anim_ship1",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "anim_ship2",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "anim_ship3",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete:true
        });

        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: "fire",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 100,
            repeat: -1,
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up",{
                start:0,
                end:1
            }),
            frameRate: 15,
            repeat: -1,
        });
        
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up",{
                start:2,
                end:3
            }),
            frameRate: 15,
            repeat: -1,
        });

        // this.anims.create({
        //     key: "hurt_anim"+lf,
        //     frames: this.anims.generateFrameNumbers("life", hurt_no[lf - 1]),
        //     frameRate: 15,
        //     repeat: 0,
        // });

        this.anims.create({
            key: "hurt_anim"+2,
            frames: this.anims.generateFrameNumbers("life", hurt_no[2]),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: "hurt_anim"+1,
            frames: this.anims.generateFrameNumbers("life", hurt_no[1]),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: "hurt_anim"+0,
            frames: this.anims.generateFrameNumbers("life", hurt_no[0]),
            frameRate: 15,
            repeat: 0,
        });
    }

    update(){
        this.home.tilePositionY-=0.3;
    }
}