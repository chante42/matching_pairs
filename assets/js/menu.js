var Menu = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above) 
        this.add.button(0, 0, 'menu', this.startGame, this);
        game.add.text(20, 50, "Cliquez pour commencer", { font: "bold 48px sans-serif", fill: "#000000", align: "center"});
    },

    //
    // 
    //
    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};
