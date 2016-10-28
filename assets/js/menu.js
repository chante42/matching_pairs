var Menu = {
    NiveauBtn : new Array(),
    AideEcran : "",

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', './assets/images/menu.png');
        game.load.image('aide', './assets/images/aide.png');
        game.load.spritesheet("button", "./assets/images/button-92x31.png", 92,31);
        game.load.image("playGame-btn", "./assets/images/playGame-btn.png");
    },

//
    // 
    //
    click: function (button){

        LargeurJeux=button.my;
        HauteurJeux=LargeurJeux;

        // remet en mode normal les boutons
        for( var i = 0; i< this.NiveauBtn.length; i++){
            this.NiveauBtn[i].tint = 0xffffff;
        }

        // selection le bouton
        button.tint = 0x0000ff;      
        
    },
    //
    // aide
    //
    aide: function () {
        AideEcran.visible = true;
        console.log("aide");
    },
    //
    // aideFin
    //
    aideFin: function () {
        AideEcran.visible = false;
        console.log("aideFin");
    },
    //
    //
    //
    create: function () {
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above) 
        var x1 = LargeurJeuxPixel / 2 - 100 + 10;
        var x2 = LargeurJeuxPixel / 2 + 10;
        var ratio = HauteurJeuxPixel / (9 *100)+0.8;
        var y  = HauteurJeuxPixel / 2 - 100 * ratio;
           

        // image de fond
        this.add.button(0, 0, 'menu');

        // bouton start
        var playBtn = game.add.button(LargeurJeuxPixel / 2 , y +  170 * ratio,'playGame-btn', this.startGame, this);
        playBtn.anchor.setTo(0.5,0.5);

        // bouton règle du jeux
        var helpBtn = game.add.button(10 * ratio, y +  160 * ratio,"button", this.aide, this);
        helpBtn.tint = 0x00ff00;
        helpBtn.addChild(new Phaser.Text(this.game, 5, 6, "Règles du jeux", { font: "bold 12px sans-serif", fill: '#ffffff' }));

        // selection du niveau
        this.NiveauBtn[0] = game.add.button(x1 , y+ 10 * ratio, "button", this.click, this);
        this.NiveauBtn[0].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 1", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[0].my= 2;

        this.NiveauBtn[1] = game.add.button(x1, y + 45 * ratio, "button", this.click, this);
        this.NiveauBtn[1].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 3", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[1].my= 4;

        this.NiveauBtn[2] = game.add.button(x1, y + 80 * ratio, "button", this.click, this);
        this.NiveauBtn[2].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 5", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[2].my= 6;

        this.NiveauBtn[3] = game.add.button((x1 + x2) /2 , y + 115 * ratio, "button", this.click, this);
        this.NiveauBtn[3].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 7", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[3].my= 8;

        this.NiveauBtn[4] = game.add.button(x2, y + 10 * ratio, "button", this.click, this);
        this.NiveauBtn[4].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 2", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[4].my= 3;

        this.NiveauBtn[5] = game.add.button(x2, y + 45 * ratio, "button", this.click, this);
        this.NiveauBtn[5].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 4", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[5].my= 5;

        this.NiveauBtn[6] = game.add.button(x2, y + 80 * ratio, "button", this.click, this);
        this.NiveauBtn[6].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 6", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[6].my= 7;

        // Active le bon bouton
        var buttonIndice = [0,0,0,4,1,5,2,6,3,7];
        this.click(this.NiveauBtn[buttonIndice[LargeurJeux]]);

        // creation de l'ecran d'aide
        AideEcran = game.add.button(0,0, "aide", this.aideFin, this);
        AideEcran.addChild(new Phaser.Text(this.game, 10, 2, "L'objectif est de trouver des paires de lettre, ",  { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 24, "qui sont representé par des lettre Alpha,",  { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 46, "scribe ou manuscrite.", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 68, "Pour cela, il faut cliquer avec la souris sur le ", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 90, "dos de la carte,pour faire apparaitre la lettre. ", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 112, "Quand 2 lettre sont retournés, si elle forme une", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 134, "paire elle reste dans cet état.", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 156, "1 point est ajouté au score.", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.addChild(new Phaser.Text(this.game, 10, 178, "Sinon les 2 cartes reviennes en position initialle.", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        AideEcran.visible = false;


    },

    
    //
    //
    //
    startGame: function () {
        HauteurJeuxPixel = HauteurJeux * HauteurCase;
        LargeurJeuxPixel = LargeurJeux *HauteurCase +210 ;

        // redimensionne la taile du jeux en fonction du Niveau a créer
        game.scale.setGameSize(LargeurJeuxPixel, HauteurJeuxPixel);
        console.log("Largeur :"+LargeurJeux+" Hauteur : "+HauteurJeux);

        // Change the state to the actual game.
        this.state.start('Game');

    }

};
