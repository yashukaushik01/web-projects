// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const para = document.querySelector("p");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let count = 0;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define shape constructor
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// define Ball constructor

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

// define ball draw method

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j]) && balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color =
          "rgb(" +
          random(0, 255) +
          "," +
          random(0, 255) +
          "," +
          random(0, 255) +
          ")";
      }
    }
  }
};

// define EvilCircle constructor
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = "white";
  this.size = 10;
}

// define draw method

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

// define checkBounds method

EvilCircle.prototype.checkBounds = function () {
  if (this.x + this.size >= width) {
    this.x += this.size; // in doubt
  }

  if (this.x - this.size <= 0) {
    this.x -= this.size; // in doubt
  }

  if (this.y + this.size >= height) {
    this.y += this.size; // in doubt
  }

  if (this.y - this.size <= 0) {
    this.y -= this.size; // in doubt
  }
};

// define setControls method
EvilCircle.prototype.setControls = function () {
  let _this = this;
  window.onkeydown = function (e) {
    if (e.key === "a") {
      _this.x -= _this.velX;
    } else if (e.key === "d") {
      _this.x += _this.velX;
    } else if (e.key === "w") {
      _this.y -= _this.velY;
    } else if (e.key === "s") {
      _this.y += _this.velY;
    }
  };
};

// define collisionDetetct method

EvilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = `Ball Count: ${count}`;
      }
    }
  }
};

// define array to store balls and populate it

let balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
    size
  );
  balls.push(ball);
  count++;
}
para.textContent += " " + count;
// define loop that keeps drawing the scene constantly
let evilCircle = new EvilCircle(
  Math.floor(random(0, 100)),
  Math.floor(random(0, 100)),
  true
);
evilCircle.setControls();

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    // console.log(count);
    // para.textContent += `${count}`;
  }
  requestAnimationFrame(loop);
}

loop();
