import "/styles/style.scss";
import bounceSound from "../assets/bounce.mp3";

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

let prect: DOMRect;
let rect: DOMRect;

window.addEventListener("resize", (event) => {
  prect = paddle.getBoundingClientRect();
  rect = game.getBoundingClientRect();
  return event;
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const run = () => {
  home.style.display = "none";
  container.style.display = "flex";

  const audio = new Audio(bounceSound);
  prect = paddle.getBoundingClientRect();
  rect = game.getBoundingClientRect();

  const newX = 150;
  const newY = 20;
  const StartSpd = 5;
  const acceleration = 1.02;
  let x = newX;
  let y = newY;
  let speedX = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
  let speedY = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
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
    } else if (y + 25 >= rect.bottom - rect.top && speedY > 0) {
      if (x + 15 > paddleX && x + 5 < paddleX + prect.right - prect.left) {
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
    if (!highscoreCounter || !scoreCounter || !ball) {
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
    scoreCounter.textContent = `Score: ${score}`;
    speedX = 0;
    speedY = 0;
    sleep(1000).then(() => {
      x = newX;
      y = newY;
      speedX = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
      speedY = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
    });
  }
};

button.addEventListener("click", () => {
  run();
});
