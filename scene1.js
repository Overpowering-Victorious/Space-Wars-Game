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
        console.log(randomImagePath);

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
        this.load.spritesheet("gainLife", "assets/sps/life.png", {frameWidth:11,frameHeight:11});
        this.load.spritesheet("laser", "assets/sps/laser.png", {frameWidth:16,frameHeight:13});
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

        this.add.text(config.width/2+150,config.height/2,"version 1.8.1",{ fontSize: '15px', align: 'center', color: '#f0f0f0'});
        let play=this.add.text(config.width/2-75,config.height/2+100,"Play",{ 
            fontSize: '60px', 
            align: 'center', 
            fontStyle: 'bold',
            color: '#32cd32'
        }).setInteractive();

        play.on('pointerdown', () => {
            this.startgame.stop();
            this.scene.start("playgame");
        });

        play.on('pointerover', () => {
            play.setStyle({ fill: '#ffff00' });
            play.setScale(1.2);
            play.x-=10;
            this.input.setDefaultCursor('pointer');
        });

        play.on('pointerout', () => {
            play.setStyle({ fill: '#32cd32' });
            play.setScale(1);
            play.x+=10;
            this.input.setDefaultCursor('default');
        });

        let instructionsText = this.add.text(config.width / 2-75, config.height / 2 + 200, "Instructions", {
            fontSize: '20px',
            color: '#ff6f61',
            align: 'center',
            fontStyle: 'bold'
        }).setInteractive();

        instructionsText.on('pointerdown', () => {
            this.showInstructionsPopup();
        });

        instructionsText.on('pointerover', () => {
            instructionsText.setStyle({ fill: '#ffff00' });
            instructionsText.setScale(1.2);
            instructionsText.x-=10;
            this.input.setDefaultCursor('pointer');
        });

        instructionsText.on('pointerout', () => {
            instructionsText.setStyle({ fill: '#ff6f61' });
            instructionsText.setScale(1);
            instructionsText.x+=10;
            this.input.setDefaultCursor('default');
        });

        this.add.text(config.width-175,config.height-20,"\u00A9 Abhibhav Om Tyagi", { fontSize: '15px', color: 'white',});

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

        this.anims.create({
            key: "laser",
            frames: this.anims.generateFrameNumbers("laser",{
                start:0,
                end:1
            }),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: "gainLife",
            frames: this.anims.generateFrameNumbers("gainLife",{
                start:12,
                end:13
            }),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: "hurt_anim"+lf,
            frames: this.anims.generateFrameNumbers("life", hurt_no[lf - 1]),
            frameRate: 1,
            repeat: 0,
        });

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

    showInstructionsPopup() {
        let popupBackground = this.add.graphics();
        popupBackground.fillStyle(0x000000, 0.7);
        popupBackground.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        let popup = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);

        let popupBox = this.add.graphics();
        popupBox.fillStyle(0xffffff, 1);
        popupBox.fillRoundedRect(-200, -150, 400, 350, 15);
        popupBox.lineStyle(2, 0x000000, 1);
        popupBox.strokeRoundedRect(-200, -150, 400, 350, 15);
        popup.add(popupBox);

        let instructions = "Instructions:\n\n1. Use arrow keys to move.\n\n2. Press space to shoot.\n\n3. Avoid enemies and collect power-ups.\n\n4. Survive as long as you can!\n\n5. Charger Plug-in is recommended (it might affect the game speed)";
        let instructionsText = this.add.text(0, 0, instructions, {
            fontSize: '20px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 350, useAdvancedWrap: true }
        });
        instructionsText.setOrigin(0.5);
        popup.add(instructionsText);

        let closeButton = this.add.text(0, 180, "Close", {
            fontSize: '24px',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setInteractive();
        closeButton.setOrigin(0.5);
        popup.add(closeButton);

        closeButton.on('pointerdown', () => {
            popupBackground.destroy();
            popup.destroy();
        });

        this.add.existing(popup);
    }
}