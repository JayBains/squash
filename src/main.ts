import "/styles/style.scss";

let game = document.getElementById("gameContainer") as HTMLElement;
let scoreCounter = document.getElementById("score") as HTMLElement;
let highscoreCounter = document.getElementById("highscore") as HTMLElement;
let ball = document.getElementById("ball") as HTMLElement;
let paddle = document.getElementById("paddle") as HTMLElement;

const gameW = game.offsetWidth;
const gameH = game.offsetHeight;
const ballW = ball.offsetWidth;
const ballH = ball.offsetHeight;
const paddleW = paddle.offsetWidth;

let ballX = 100;
let ballY = 100;
let speedX = 5;
let speedY = 5;
let paddleX = 0;
let score = 0;
let highscore = 0;

document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX - game.offsetLeft;
  if (mouseX > 0 && mouseX < gameW) {
    paddleX = mouseX - paddleW / 2;
    paddle.style.left = paddleX + "px";
  }
});

function ballMovement() {
  ballX += speedX;
  ballY += speedY;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function wallCollision() {
  if (ballX + speedX < 0 || ballX + speedX > gameW - ballW) {
    speedX = -speedX;
  } else if (ballY + speedY < 0) {
    speedY = -speedY;
  }
}

function paddleCollision() {
  if (ballY + speedY > gameH - ballH) {
    if (ballX < paddleX + paddleW && ballX > paddleX) {
      speedY = -speedY;
      paddleHit();
    }
  }
}

function paddleHit() {
  score++;
  scoreCounter.textContent = "Score: " + score;
  speedX = speedX * 1.05;
  speedY = speedY * 1.05;
}

function run() {
  wallCollision();
  paddleCollision();
  ballMovement();
}

setInterval(run, 1);
