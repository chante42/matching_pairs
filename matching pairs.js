// mods by Patrick OReilly 
// twitter: @pato_reilly

var game = new Phaser.Game(1010, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('matching', 'phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'phaser_tiles.png');//, 100, 100, -1, 1, 1);    
}

var timeCheck = 0;
var flipFlag = false;

var startList = new Array();
var squareList = new Array();

var masterCounter = 0;
var squareCounter = 0;
var square1Num;
var square2Num;
var savedSquareX1;
var savedSquareY1;
var savedSquareX2;
var savedSquareY2;

var map;
var tileset;
var layer;

var marker;
var currentTile;
var currentTilePosition;

var tileBack = 63;
var NbCaseRemplie = 26*2;
var LargeurJeux = 8;

var timesUp = '+';
var youWin = '+';

var myCountdownSeconds;


function create() {

        map = game.add.tilemap('matching');

        map.addTilesetImage('Desert', 'tiles');

        //tileset = game.add.tileset('tiles');
    
        layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

        //layer.resizeWorld();

        marker = game.add.graphics();
        marker.lineStyle(2, 0xFF0000, 1);
        marker.drawRect(0, 0, 100, 100);
    
    randomizeTiles();
    //debug
    //flipOverAll();

}

function update() {
    
    countDownTimer();
    
    if (layer.getTileX(game.input.activePointer.worldX) <= LargeurJeux - 1) // to prevent the marker from going out of bounds
    {
        marker.x = layer.getTileX(game.input.activePointer.worldX) * 100;
        marker.y = layer.getTileY(game.input.activePointer.worldY) * 100;
    }

    if (flipFlag == true) 
    {
        if (game.time.totalElapsedSeconds() - timeCheck > 0.5)
        {
            flipBack();
        }
    }
    else
    {
        processClick();
        
    }
}
   
   
function countDownTimer() {
  
    var timeLimit = 120;
  
    mySeconds = game.time.totalElapsedSeconds();
    myCountdownSeconds = timeLimit - mySeconds;
    
    if (myCountdownSeconds <= 0) 
        {
        // time is up
        timesUp = 'Time is up!'; 
        myCountdownSeconds = 0;

    }
}

function processClick() {
   
    currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
    currentTilePosition = ((layer.getTileY(game.input.activePointer.worldY)+1)*LargeurJeux)-(LargeurJeux-(layer.getTileX(game.input.activePointer.worldX)+1));
        
    if (game.input.mousePointer.isDown)
        {
        // check to make sure the tile is not already flipped
        if (currentTile.index == tileBack)
        {
            // get the corresponding item out of squareList
                currentNum = squareList[currentTilePosition-1];
                flipOver();
                squareCounter++;
            // is the second tile of pair flipped?
            if  (squareCounter == 2) 
            {
                // reset squareCounter
                squareCounter = 0;
                square2Num = currentNum;
                // check for match
                if (square1Num != square2Num && square1Num %(LargeurJeux*LargeurJeux/2) == square2Num %(LargeurJeux*LargeurJeux/2) )
                {
                    masterCounter++;    
                    
                    if (masterCounter == (LargeurJeux*LargeurJeux/2) ) {
                        // go "win"
                        youWin = 'Got them all!';
                    }                       
                }
                else
                {
                    savedSquareX2 = layer.getTileX(marker.x);
                    savedSquareY2 = layer.getTileY(marker.y);
                        flipFlag = true;
                        timeCheck = game.time.totalElapsedSeconds();
                }   
            }   
            else
            {
                savedSquareX1 = layer.getTileX(marker.x);
                savedSquareY1 = layer.getTileY(marker.y);
                    square1Num = currentNum;
            }           
        }           
    }    
}
 
function flipOver() {
 
    map.putTile(currentNum, layer.getTileX(marker.x), layer.getTileY(marker.y));
}
 
function flipOverAll() {
    for (i= 0; i< 64; i++) {
        y= Math.trunc(i/LargeurJeux);
        x= i - y * LargeurJeux;

        map.putTile(squareList[i], x , y );    
        console.log(i + ":x="+x+"y="+y);
    }
    

}

function flipBack() {
        
    flipFlag = false;
    
    map.putTile(tileBack, savedSquareX1, savedSquareY1);
    map.putTile(tileBack, savedSquareX2, savedSquareY2);
 
}
 
function randomizeTiles() {

    //  remplissage des cartes que l'on peux 
    // 
    for (num = 1; num <= NbCaseRemplie / 2 ; num++) {
        startList.push(num);
    }
    for (num = (LargeurJeux*LargeurJeux/2)+1; num <= (LargeurJeux*LargeurJeux/2)+NbCaseRemplie / 2 ; num++) {
        startList.push(num);
    }

    //
    // s'il reste des trous tirage aléatoire en mettaunt une carte de chaque 32=>x>0 et 64=>x>32
    nbItem = startList.length;
    a=0;
    for (i = nbItem; i<= (LargeurJeux*LargeurJeux); i++ ) {
        var random = game.rnd.integerInRange(1,nbItem/2);

        // permet que ce ne soit pas toujours la premiere partie de l image en premeier
        a++;
        startList.push(random+ (a % 2) *(LargeurJeux*LargeurJeux/2));
        a++;
        startList.push(random+ (a % 2) *(LargeurJeux*LargeurJeux/2));
    }

    // for debugging
    myString1 = startList.toString();
  
    // randomize squareList
    for (i = 1; i <=(LargeurJeux*LargeurJeux); i++) {
        var randomPosition = game.rnd.integerInRange(0,startList.length - 1);

        var thisNumber = startList[ randomPosition ];

        squareList.push(thisNumber);
        var a = startList.indexOf(thisNumber);

        startList.splice( a, 1);
    }
    
    // for debugging
    myString2 = squareList.toString();
    console.log('squareList'+squareList.toString());
    console.log('startList'+startList.toString());
  
    for (col = 0; col < LargeurJeux; col++) {
        for (row = 0; row < LargeurJeux; row++) {
            map.putTile(tileBack, col, row);
        }
    }
}

function getHiddenTile() {
        
    thisTile = squareList[currentTilePosition-1];
    return thisTile;
}

function render() {

    game.debug.text('LargeurJeux : '+LargeurJeux, 820, 40, 'rgb(255,0,0)');
    game.debug.text(timesUp, 820, 208, 'rgb(0,255,0)');
    game.debug.text(youWin, 820, 240, 'rgb(0,255,0)');

    game.debug.text('Time: ' + myCountdownSeconds, 820, 15, 'rgb(0,255,0)');

    //game.debug.text('squareCounter: ' + squareCounter, 620, 272, 'rgb(0,0,255)');
    game.debug.text('Matched Pairs: ' + masterCounter, 820, 304, 'rgb(0,0,255)');

    //game.debug.text('startList: ' + myString1, 820, 208, 'rgb(255,0,0)');
    //game.debug.text('squareList: ' + myString2, 820, 240, 'rgb(255,0,0)');


    //game.debug.text('Tile: ' + map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)).index, 620, 48, 'rgb(255,0,0)');

    game.debug.text('LayerX: ' + layer.getTileX(marker.x), 820, 80, 'rgb(255,0,0)');
    game.debug.text('LayerY: ' + layer.getTileY(marker.y), 820, 112, 'rgb(255,0,0)');

    game.debug.text('Tile Position: ' + currentTilePosition, 820, 144, 'rgb(255,0,0)');
    game.debug.text('Hidden Tile: ' + getHiddenTile(), 820, 176, 'rgb(255,0,0)');
}
