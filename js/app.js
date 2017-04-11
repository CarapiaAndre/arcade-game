//Just to simplify console.log when developing
var log = function(msg) {
  console.log(msg);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 200;
  this.y = 390;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

  var xLen = 101,
      yLen = 83;

  if(key != undefined){
    if(isX()){
      moveX();
    }
    else{
      moveY();
    }
  }

  function isX(){
    return key === 'right' || key === 'left' ?
      true :
      false;
  }

  function moveX(){
    if(player.x > minX && player.x < maxX){
      key === 'right' ?
        player.x += xLen :
        player.x += -xLen;
    }
  }

  function moveY(){
    key === 'down' ?
      player.y += yLen :
      player.y += -yLen;
  }

  // function isOnLimit(axisX){
  //   //minX = -2 | maxX = 402
  //   //minY = 390 | maxY = -25
  //
  //   var maxX = 402,
  //       minX = -2,
  //       maxY = 390,
  //       minY = -25;
  //
  //   if(axisX === true){
  //       var newPos = key === 'right' ?
  //         player.x += xLen :
  //         player.x += -xLen;
  //
  //       return newPos > minX && newPos < maxX ?
  //
  //
  //   }
  //   positionX = player.x + xLen
  // }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
