var Menu = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', './assets/images/menu.png');
        game.load.image("button", "./assets/images/button-92x31.png", false);
        game.load.image("playGame-btn", "./assets/images/playGame-btn.png", false);
    },

    create: function () {
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above) 
        
        //game.add.text(20, 50, "Cliquez pour commencer", { font: "bold 48px sans-serif", fill: "#000000", align: "center"});
        


        
        var x1 = LargeurJeuxPixel / 2 - 100 + 10;
        var x2 = LargeurJeuxPixel / 2 + 10;
        var y  = HauteurJeuxPixel / 2 - 100;

        // image de fond
        this.add.button(0, 0, 'menu');

        // bouton start
        var playBtn = game.add.button(LargeurJeuxPixel / 2 , y +  170,'playGame-btn', this.startGame, this);
        playBtn.anchor.setTo(0.5,0.5);

        // selection du niveau
        var Niveau1Btn = game.add.button(x1 , y+ 10, "button", () => {LargeurJeux=3; HauteurJeux=3}, this);
        Niveau1Btn.addChild(new Phaser.Text(this.game, 5, 3, "Niveau 1", { font: "bold 18px sans-serif", fill: '#ffffff' }));

        var Niveau2Btn = game.add.button(x1, y + 50, "button",() => {LargeurJeux=5; HauteurJeux=5}, this);
        Niveau2Btn.addChild(new Phaser.Text(this.game, 5, 3, "Niveau 3", { font: "bold 18px sans-serif", fill: '#ffffff' }));

        var Niveau3Btn = game.add.button(x1, y + 90, "button",() => {LargeurJeux=7; HauteurJeux=7}, this);
        Niveau3Btn.addChild(new Phaser.Text(this.game, 5, 3, "Niveau 5", { font: "bold 18px sans-serif", fill: '#ffffff' }));

        var Niveau4Btn = game.add.button(x2, y + 10, "button", () => {LargeurJeux=4; HauteurJeux=4}, this);
        Niveau4Btn.addChild(new Phaser.Text(this.game, 5, 3, "Niveau 2", { font: "bold 18px sans-serif", fill: '#ffffff' }));

        var Niveau4Btn = game.add.button(x2, y + 50, "button",() => {LargeurJeux=6; HauteurJeux=6}, this);
        Niveau4Btn.addChild(new Phaser.Text(this.game, 5, 3, "Niveau 4", { font: "bold 18px sans-serif", fill: '#ffffff' }));

        var Niveau4Btn = game.add.button(x2, y + 90, "button",() => {LargeurJeux=8; HauteurJeux=8}, this);
        Niveau4Btn.addChild(new Phaser.Text(this.game, 5, 3, "Niveau 6", { font: "bold 18px sans-serif", fill: '#ffffff' }));
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
