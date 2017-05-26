"use strict";

//Just to simplify console.log when developing
var log = function(msg) {
  console.log(msg);
};

//Main properties config for player and enemy
var appConfig = {
 playerInitialPosX : 200,
 playerInitialPosY : 390,
 playerWidth: 75,
 playerHeight: 80,

 enemyInitialPosX: 10,
 enemyWidth: 75,
 enemyHeight: 80,
 enemyMinSpeed: 2,
 enemyMaxSpeed: 5
};

// Enemies our player must avoid
var Enemy = function(axisY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = appConfig.enemyInitialPosX;
    this.y = axisY;

    //Width and Height is necessery for checkCollisions() function.
    this.width = appConfig.enemyWidth;
    this.height = appConfig.enemyHeight;

    this.speed = this.randomSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//Give the enemy a random speed, to make things more unpredictable
Enemy.prototype.randomSpeed = function() {
  return Math.floor((Math.random() * appConfig.enemyMaxSpeed) + appConfig.enemyMinSpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Variable to define Max limit of Axis X
    var maxX = 500;

    //Check if the enemy is on the limit
    if(this.x <= maxX) {
        this.x += ((50 * this.speed) * dt);
    }
    else {
      this.x = -100;
      this.speed = this.randomSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

  this.x = appConfig.playerInitialPosX;
  this.y = appConfig.playerInitialPosY;

  //Width and Height is necessery for checkCollisions() function.
  this.width = appConfig.playerWidth;
  this.height = appConfig.playerHeight;

  //Points for scoreboard (:
  this.victories = 0;
  this.deaths = 0;

  this.sprite = 'images/char-boy.png';
};


//Write player score from victories and deaths properties
Player.prototype.scoreboard = function() {
  ctx.font = "18px Arial";

  //Overwrite the old scoreboard
  ctx.fillStyle = "white";
  ctx.fillRect(10,590,476,18);

  //Write the scoreboard
  ctx.fillStyle = "black";
  ctx.fillText("Victories: " + this.victories + "",10,606);
  ctx.fillText("Deaths: " + this.deaths + "",406,606);
};

//Update player position and check if has collision or victory position
//parameters: xPosition, a new player position of Axis X;
// yPosition, a new player position of Axis Y;
Player.prototype.update = function(xPosition, yPosition) {

  //Position of axisY that define river line to win
  var winPosition = 0;

  if(this.detectCollision()) {
    this.win(false);
  }

  if(xPosition !== undefined) {
    this.x = xPosition;
  }
  if(yPosition !== undefined) {
    this.y = yPosition;
    if(yPosition < winPosition) {
      this.win(true);
    }
  }
};

//Detect if the player has collided with any enemy
Player.prototype.detectCollision = function() {
  var crashed = false;

 allEnemies.forEach(function(enemy) {
   if(player.x < enemy.x + enemy.width &&
     player.x + player.width > enemy.x &&
     player.y < enemy.y + enemy.height &&
     player.height + player.y > enemy.y) {
       crashed = true;
   }
 });

 return crashed;
};

//Define the end of round, moving the player for the initialPosition and call player.scoreboard()
//Parameter: boolWin, a boolean to define whether the player won or lost.
Player.prototype.win = function(boolWin) {

  //Starting position of Axis Y in the map
  var initialPosition = 390;

  if(boolWin === true) {
    this.victories += 1;
  }
  else {
    this.deaths += 1;
  }

  this.scoreboard();

  this.y = initialPosition;
};

//Redraw the player image in the new position.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Sets the player moviment from a pressed key
//parameters: key, pressed key from a listener.
Player.prototype.handleInput = function(key) {

  var xPosition,
      yPosition;

  if(key !== undefined) {
    if(isAxisX()) {
      moveX();
    }
    else {
      moveY();
    }

    if(isOnLimit()) {
      player.update(xPosition, yPosition);
    }
  }

  //Check if the key is axis X or axis Y
  function isAxisX() {
    return key === 'right' || key === 'left' ?
      true :
      false;
  }

  //Check if is right or left and update the x property of player.
  function moveX() {

    //lenght of the moviment
    var xLength = 101;

    xPosition = (key === 'right') ?
      player.x + xLength :
      player.x - xLength;
  }

  //Check if is up or down and update the y property of player.
  function moveY() {

    //lenght of the moviment
    var yLength = 83;

    yPosition = (key === 'down') ?
      player.y + yLength :
      player.y - yLength;
  }

  //Check if the moviment is on limit of map.
  function isOnLimit() {
    var maxX = 402,
        minX = -2,
        maxY = 390,
        minY = -25,
        onLimit = false;

    if(xPosition !== undefined) {
      if(xPosition >= minX && xPosition <= maxX) {
        onLimit = true;
      }
    }
    if(yPosition !== undefined) {
      if (yPosition >= minY && yPosition <= maxY) {
          onLimit = true;
      }
    }

    return onLimit;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(60), new Enemy(143), new Enemy(226)];

// Place the player object in a variable called player
var player = new Player();

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
