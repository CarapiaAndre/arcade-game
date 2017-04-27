//Just to simplify console.log when developing
var log = function(msg) {
  console.log(msg);
};

// Enemies our player must avoid
var Enemy = function(axisY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 10;
    this.y = axisY;
    this.speed = this.randomSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.randomSpeed = function() {
  var minSpeed = 2,
      maxSpeed = 5;
  return Math.floor((Math.random() * maxSpeed) + minSpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxX = 402;

    if(this.x <= maxX) {
        this.x += ((50 * this.speed) * dt);
    }
    else {
      this.x = 10;
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
  this.x = 200;
  this.y = 390;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(xPosition, yPosition) {
  if(xPosition !== undefined) {
    this.x = xPosition;
  }
  if(yPosition !== undefined) {
    this.y = yPosition;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

  function isAxisX() {
    return key === 'right' || key === 'left' ?
      true :
      false;
  }

  function moveX() {
    var xLength = 101;

    key === 'right' ?
      xPosition = player.x + xLength :
      xPosition = player.x - xLength;
  }

  function moveY() {
    var yLength = 83;

    key === 'down' ?
      yPosition = player.y + yLength :
      yPosition = player.y - yLength;
  }

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
