//caracter principal del juego
function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.08;

  // guardar posición original (suelo)
  this.y0 = this.game.canvas.height * 0.63;
  this.y = this.y0;

  this.x0 = this.game.canvas.width * 0.47;
  this.x = this.x0

  this.img = new Image();
  this.img.src = 'img/frames.png';


  // número de imágenes diferentes
  this.img.frames = 2;
  this.img.frameIndex = 0;

  this.img.framesY = 2;
  this.img.frameYIndex = 0;



  // medidas de la imagen a representar en el canvas
  this.w = 106;
  this.h = 141;

  this.vy = 1;


  // this.bullets = [];

  this.setListeners();

  this.audio = new Audio();
  this.audio.src = "img/jump.mp3"
}

Player.prototype.draw = function() {
  console.log(this.img.frameYIndex, this.img.framesY, this.img.height)
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    this.img.frameYIndex * Math.floor(this.img.height / this.img.framesY),
    Math.floor(this.img.width / this.img.frames),
    Math.floor(this.img.height / this.img.framesY),
    this.x,
    this.y,
    this.w,
    this.h
  );


  //this.animateImg();
 // console.log(this.Player)
  }

Player.prototype._moveBeyonce = function() {

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 39:
                this._moveRight();
                this.img.frameYIndex = 0;
                break;
            case 37:
                this._moveLeft();
                this.img.frameYIndex = 1;
                break;
            // case 38:
            //     this._moveUp()
            //     break;

        }

        this.img.frameIndex += 1;
        if (this.img.frameIndex > 1) this.img.frameIndex = 0;
    }.bind(this)
}


Player.prototype._moveLeft = function() {
  if (this.x > 30) {
    this.x -= 40
  }
  
}

Player.prototype._moveRight = function() {
  if ((this.x + this.w) < Game.w - 30) {
  this.x += 40
  }
 
}

// Player.prototype._moveUp = function () {
//   this.y -= 30
// }

Player.prototype.move = function() {
  
  

  // Aumenta la velocidad en el eje y.
  var gravity = 0.3;

 // solo salta cuando el personaje está en el suelo
  if (this.y >= this.y0) {
    this.vy = 0.5;
    this.y = this.y0;
    
  } else {
    this.vy += gravity;
    this.y += this.vy;
  }
}

Player.prototype.setListeners = function() {
  document.onkeyup = function(event) {
    if (event.keyCode === this.game.keys.TOP_KEY && this.y == this.y0) {
      this.y -= 5;
      this.vy -= 15;
      this.audio.play();

    } else if (event.keyCode == this.game.keys.SPACE) {
      this.move();
    }
  }.bind(this);
};


//   this.animateImg();

//   this.bullets = this.bullets.filter(function(bullet) {
//     return bullet.x < this.game.canvas.width;
//   }.bind(this));

//   this.bullets.forEach(function(bullet) {
//     bullet.draw();
//     bullet.move();
//   });
// };




// Player.prototype.shoot = function() {
//   var bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2);

//   this.bullets.push(bullet);
// };




Player.prototype.animateImg = function() {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 4 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 1) this.img.frameIndex = 0;
  }
};

