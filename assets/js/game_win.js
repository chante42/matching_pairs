var Game_Win = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gamewin', './assets/images/game_win.png');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gamewin', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(20, 50, "GAGNER !!!", { font: "bold 48px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(350, 348, myCountdownSeconds.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');

    }

};
