var game;
var LargeurJeux = 3;
//var HauteurJeux = LargeurJeux;
var HauteurJeux = 3;
var HauteurCase = 100;

var HauteurJeuxPixel = HauteurJeux * HauteurCase;
var LargeurJeuxPixel = LargeurJeux *HauteurCase +210 ;

// Create a new game instance 600px wide and 450px tall:
game = new Phaser.Game(LargeurJeuxPixel, HauteurJeuxPixel, Phaser.CANVAS, 'phaser-example');

function UrlParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.add('Game_Win', Game_Win);

game.state.start('Menu');