var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/game_over.png');
        game.load.audio('audioLoose', 'assets/audio/Sad_Trombone_2.mp3');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(20, HauteurJeuxPixel/6, "PERDU ...", { font: "bold 48px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(20, HauteurJeuxPixel/6 * 4, "Vous SCORE  : "+masterCounter+" (paires)", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(LargeurJeuxPixel/6, HauteurJeuxPixel/6 *5 , "cliquez pour recommencer", { font: "bold 12px sans-serif", fill: "#fff", align: "center" });

        audio = game.add.audio('audioLoose');
        audio.play();
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Menu');

    }

};
