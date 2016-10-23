// mods by Patrick OReilly 
// twitter: @pato_reilly

var tileBack = 63;
var tileBlack = 32;
var NbCaseRemplie = 26*2;
var NbCase = 64;
var LargeurJeux = 2;
var HauteurJeux = LargeurJeux;


var game = new Phaser.Game(LargeurJeux *100 +210 , LargeurJeux * 100, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });


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


var timesUp = '+';
var youWin = '+';

var myCountdownSeconds;

//
//  preload
//
function preload() {

    game.load.tilemap('matching', 'phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.image('tiles', 'phaser_tiles.png');
    game.load.image('fondScore', 'fondScore.png');
}


//
//  create
//
function create() {

    map = game.add.tilemap('matching');


    map.addTilesetImage('Desert', 'tiles');

    //tileset = game.add.tileset('tiles');

    layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

    //layer.resizeWorld();

    marker = game.add.graphics();
    marker.lineStyle(2, 0xFF0000, 1);
    marker.drawRect(0, 0, 100, 100);
    marker.x = 0;
    marker.y = 0;

    randomizeTiles();

    this.leftKey   = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey  = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.downKey   = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.upKey     = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.spaceKey  = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, 
        Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
    
    fondScore = game.add.tileSprite(LargeurJeux* 100, 0, 210 , 800,'fondScore');
    //debug
    //flipOverAll();
}

function update() {
    
    countDownTimer();
 
    if (this.leftKey.isDown)
    {
        marker.x -= 100;
        if (marker.x < 0) 
            { marker.x=0;}
    }
    else if (this.rightKey.isDown)
    {
        marker.x += 100;
        if (marker.x > (LargeurJeux - 1) * 100)
            { marker.x=(LargeurJeux - 1)*100;}
    }

    if (this.upKey.isDown)
    {
        marker.y -= 100;
        if (marker.y < 0) 
            { marker.y=0;}
    }
    else if (this.downKey.isDown)
    {
        marker.y += 100;
        if (marker.y > (HauteurJeux -1) *  100) 
            { marker.y=(HauteurJeux - 1) *100;}
        console.log("DOWN X:"+marker.x+" Y:"+marker.y);
    }

    
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
        
    if (game.input.mousePointer.isDown ){
        // check to make sure the tile is not already flipped
        if (currentTile != null && currentTile.index == tileBack)
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
                if (square1Num != square2Num && square1Num %(32) == square2Num %(32) )
                {
                    masterCounter++;    
                    
                    if (masterCounter == Math.trunc(LargeurJeux*HauteurJeux/2) ) {
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
     //
    // s'il reste des trous tirage aléatoire en mettaunt une carte de chaque 32=>x>0 et 64=>x>32
    nbItem = startList.length;
    console.log('nbItem:'+nbItem+" max for  "+HauteurJeux*LargeurJeux);
    

    for (i = 1; i<= (LargeurJeux*HauteurJeux)/2;i++ ) {
        var random;

        random = i;
        if (i > NbCaseRemplie/2) {
            random = game.rnd.integerInRange(1,NbCaseRemplie/2);
        }
        // permet que ce ne soit pas toujours la premiere partie de l image en premeier
        startList.push(random);
        startList.push(random+ 32);
    }
    console.log('startList'+startList.toString());

    // for debugging
    myString1 = startList.toString();
  
    // randomize squareList
    for (i = 1; i <=(LargeurJeux*HauteurJeux); i++) {
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
  
    for (col = 0; col < HauteurJeux; col++) {
        for (row = 0; row < LargeurJeux ; row++) {
            map.putTile(tileBack, col, row);
        }
    }

    // met les autres carreaux ('tiles') en noirs.
    for (col = LargeurJeux ; col < NbCase / 2 ; col++) {
        for (row = 0 ; row < NbCase / 2 ; row++) {
            map.putTile(tileBlack, col, row);
        }
    }

}

function getHiddenTile() {
    thisTile = squareList[currentTilePosition-1];
    return thisTile;
}

function render() {

var posx = LargeurJeux *100 +20;
    //game.debug.text('LargeurJeux : '+LargeurJeux, posx, 40, 'rgb(255,0,0)');
    game.debug.text(timesUp, posx, 75, 'rgb(0,255,0)');
    game.debug.text(youWin, posx, 100, 'rgb(0,255,0)');

    game.debug.text('Temps: ' + myCountdownSeconds, posx, 15, 'rgb(0,255,0)');

    //game.debug.text('squareCounter: ' + squareCounter, 620, 272, 'rgb(0,0,255)');
    game.debug.text('Paires Trouvées: ' + masterCounter, posx, 40, 'rgb(0,0,255)');

    //game.debug.text('startList: ' + myString1, posx, 208, 'rgb(255,0,0)');
    //game.debug.text('squareList: ' + myString2, posx, 240, 'rgb(255,0,0)');


    //game.debug.text('Tile: ' + map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)).index, 620, 48, 'rgb(255,0,0)');

    //game.debug.text('LayerX: ' + layer.getTileX(marker.x), posx, 80, 'rgb(255,0,0)');
    //game.debug.text('LayerY: ' + layer.getTileY(marker.y), posx, 112, 'rgb(255,0,0)');

    //game.debug.text('Tile Position: ' + currentTilePosition, posx, 144, 'rgb(255,0,0)');
    //game.debug.text('Hidden Tile: ' + getHiddenTile(), posx, 176, 'rgb(255,0,0)');
}
