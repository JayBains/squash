import "/styles/style.scss";
import "../assets/bounce.mp3";

let home = document.querySelector<HTMLDivElement>(".home");
let button = document.querySelector<HTMLButtonElement>(".home__button");
let container = document.querySelector<HTMLDivElement>(".container");
let game = document.querySelector<HTMLDivElement>(".game");
let scoreCounter =
  document.querySelector<HTMLParagraphElement>(".scoreboard__score");
let highscoreCounter = document.querySelector<HTMLParagraphElement>(
  ".scoreboard__highscore"
);
let ball = document.querySelector<HTMLDivElement>(".game__ball");
let paddle = document.querySelector<HTMLDivElement>(".game__paddle");

if (
  !home ||
  !button ||
  !container ||
  !game ||
  !scoreCounter ||
  !highscoreCounter ||
  !ball ||
  !paddle
) {
  throw new Error("Missing html elements");
}

button.addEventListener("click", () => {
  container.style.display = "flex";
  home.style.display = "none";

  const audio = new Audio("assets/bounce.mp3");
  const prect = paddle.getBoundingClientRect();
  const rect = game.getBoundingClientRect();

  const newX = 150;
  const newY = 20;
  const StartSpd = 5;
  const acceleration = 1.08;
  let x = newX;
  let y = newY;
  let speedX = StartSpd;
  let speedY = StartSpd;
  let paddleX = 0;
  let score = 0;
  let highscore = 0;

  document.addEventListener("mousemove", (event) => {
    let mouseX = event.clientX - rect.left;
    if (mouseX > 0 && mouseX < rect.right - rect.left) {
      paddleX = mouseX - (prect.right - prect.left) / 2;
      paddle.style.left = paddleX + "px";
    }
  });

  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
    let mouseX = event.touches[0].clientX - rect.left;
    if (mouseX > 0 && mouseX < rect.right - rect.left) {
      paddleX = mouseX - (prect.right - prect.left) / 2;
      paddle.style.left = paddleX + "px";
    }
  });

  function animate() {
    if (!ball || !paddle || !scoreCounter) {
      throw new Error("Cannot find ball/paddle or score");
    }
    x += speedX;
    y += speedY;
    console.log(x, y);
    if (x - 5 <= 0 && speedX < 0) {
      speedX = -speedX;
    } else if (x + 25 >= rect.right - rect.left && speedX > 0) {
      speedX = -speedX;
    } else if (y - 5 <= 0 && speedY < 0) {
      speedY = -speedY;
    } else if (y + 30 >= rect.bottom - rect.top && speedY > 0) {
      if (x - 15 < paddleX + prect.right - prect.left && x + 15 > paddleX) {
        audio.play();
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
      throw new Error("Cannot find scores");
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
});
