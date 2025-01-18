import "/styles/style.scss";

let game = document.getElementById("gameContainer") as HTMLElement;
let scoreCounter = document.getElementById("score") as HTMLElement;
let highscoreCounter = document.getElementById("highscore") as HTMLElement;
let ball = document.getElementById("ball") as HTMLElement;
let paddle = document.getElementById("paddle") as HTMLElement;

let paddleX = 0;
let ballX = 100;
let ballY = 0;
let speedX = -2;
let speedY = 0.2;

document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX - game.offsetLeft;
  if (mouseX > 0 && mouseX < game.offsetWidth) {
    paddleX = mouseX - paddle.offsetWidth / 2;
    paddle.style.left = paddleX + "px";
  }
});

function ballMovement() {
  ballX += speedX;
  ballY += speedY;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function collisionDetection() {
  if (
    ballX + speedX < 0 ||
    ballX + speedX > game.offsetWidth - ball.offsetWidth
  ) {
    speedX = -speedX;
  }
}

function run() {
  ballMovement();
  collisionDetection();
  requestAnimationFrame(run);
}

run();
