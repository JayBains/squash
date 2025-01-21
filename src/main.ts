import "/styles/style.scss";

let game = document.querySelector<HTMLDivElement>("#gameContainer");
let scoreCounter = document.querySelector<HTMLParagraphElement>("#score");
let highscoreCounter =
  document.querySelector<HTMLParagraphElement>("#highscore");
let ball = document.querySelector<HTMLDivElement>("#ball");
let paddle = document.querySelector<HTMLDivElement>("#paddle");

if (!game || !scoreCounter || !highscoreCounter || !ball || !paddle) {
  throw new Error("missing html elements");
}

const paddleW = paddle.offsetWidth;
const rect = game.getBoundingClientRect();

const newX = 150;
const newY = 20;
const StartSpd = 5;
let x = newX;
let y = newY;
let speedX = 5;
let speedY = 5;
const acceleration = 1.1;
let paddleX = 0;
let score = 0;
let highscore = 0;

document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX - rect.left;
  if (mouseX > 0 && mouseX < rect.right - rect.left) {
    paddleX = mouseX - paddleW / 2;
    paddle.style.left = paddleX + "px";
  }
});

document.addEventListener("touchmove", (event) => {
  event.preventDefault();
  let mouseX = event.touches[0].clientX - rect.left;
  if (mouseX > 0 && mouseX < rect.right - rect.left) {
    paddleX = mouseX - paddleW / 2;
    paddle.style.left = paddleX + "px";
  }
});

function animate() {
  if (!ball || !paddle || !scoreCounter) {
    throw new Error("Cannot find ball/paddle");
  }
  x += speedX;
  y += speedY;
  console.log(x, y);
  if (x <= 1 && speedX < 0) {
    speedX = -speedX;
  } else if (x >= rect.right - rect.left - 25 && speedX > 0) {
    speedX = -speedX;
  } else if (y <= 0 && speedY < 0) {
    speedY = -speedY;
  } else if (y + 25 >= rect.bottom - rect.top && speedY > 0) {
    if (x < paddleX + paddleW && x > paddleX) {
      speedY = -speedY;
      score++;
      scoreCounter.textContent = `Score: ${score}`;
      speedX *= acceleration;
      speedY *= acceleration;
    } else {
      respawn();
    }
  }
  ball.style.left = x + "px";
  ball.style.top = y + "px";
}
setInterval(animate, 10);

function respawn() {
  if (!highscoreCounter || !scoreCounter) {
    throw new Error("Cannot find HS/S");
  }
  if (score > highscore) {
    highscore = score;
    highscoreCounter.textContent = `Highscore: ${highscore}`;
    console.log(`New high score! You got: ${highscore}!`);
    alert(`New high score! You got: ${highscore}!`);
  } else {
    console.log(`Nice try. You scored: ${score}.`);
  }
  score = 0;
  scoreCounter.textContent = `Score: ${score}`;
  x = newX;
  y = newY;
  speedX = StartSpd;
  speedY = StartSpd;
}
