var game;
var LargeurJeux = 8;
//var HauteurJeux = LargeurJeux;
var HauteurJeux = 8;

// Create a new game instance 600px wide and 450px tall:
game = new Phaser.Game(LargeurJeux *100 +210 , HauteurJeux * 100, Phaser.CANVAS, 'phaser-example');


// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.add('Game_Win', Game_Win);

game.state.start('Menu');