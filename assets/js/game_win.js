var Game_Win = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gamewin', './assets/images/game_win.png');
        game.load.audio('audioWin', 'assets/audio/Short_triumphal_fanfare-John_Stracke-815794903.mp3');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gamewin', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(20, 50, "GAGNER !!!", { font: "bold 48px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(20, HauteurJeuxPixel/6 * 4, "Votre SCORE : "+(masterCounter+LargeurJeux * myCountdownSeconds.toFixed()).toString(), { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(LargeurJeuxPixel/6, HauteurJeuxPixel/6 *5 , "cliquez pour recommencer", { font: "bold 12px sans-serif", fill: "#fff", align: "center" });
  
        audio = game.add.audio('audioWin');
        audio.play();
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Menu');

    }

};
