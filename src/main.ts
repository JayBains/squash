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
let prect: DOMRect;
let rect: DOMRect;

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
  throw new Error("HTML error: Missing elements");
}

window.addEventListener("resize", (event) => {
  rect = game.getBoundingClientRect();
  return event;
});

button.addEventListener("click", () => {
  run();
});

const run = () => {
  home.style.display = "none";
  container.style.display = "flex";

  prect = paddle.getBoundingClientRect();
  rect = game.getBoundingClientRect();

  const audio = new Audio(bounceSound);
  const newX = 150;
  const newY = 20;
  const StartSpd = 3;
  const acceleration = 1.02;
  let speedX = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
  let speedY = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
  let ballX = newX;
  let ballY = newY;
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

  function physics() {
    if (!ball || !paddle || !scoreCounter) {
      throw new Error("physics() error: Cannot find ball, paddle or score");
    }
    ballX += speedX;
    ballY += speedY;
    if (ballX - 5 <= 0 && speedX < 0) {
      speedX = -speedX;
    } else if (ballX + 25 >= rect.right - rect.left && speedX > 0) {
      speedX = -speedX;
    } else if (ballY - 5 <= 0 && speedY < 0) {
      speedY = -speedY;
    } else if (ballY + 25 >= rect.bottom - rect.top && speedY > 0) {
      if (
        ballX + 15 > paddleX &&
        ballX + 5 < paddleX + prect.right - prect.left
      ) {
        audio.play();
        speedY = -speedY;
        score++;
        scoreCounter.textContent = `Score: ${score}`;
        speedX *= acceleration;
        speedY *= acceleration;
      } else {
        gameOver();
      }
    }
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
  }

  function gameOver() {
    if (!highscoreCounter || !scoreCounter || !ball) {
      throw new Error("gameOver() error: cannot find scores or ball");
    }
    speedX = 0;
    speedY = 0;
    ball.style.backgroundColor = "red";
    setTimeout(() => {
      if (score > highscore) {
        highscore = score;
        highscoreCounter.textContent = `Highscore: ${highscore}`;
        alert(`New high score! You got: ${highscore}!`);
      }
      setTimeout(() => {
        ball.style.backgroundColor = "white";
        score = 0;
        scoreCounter.textContent = `Score: ${score}`;
        ballX = newX;
        ballY = newY;
        speedX = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
        speedY = Math.round(Math.random()) ? -1 * StartSpd : StartSpd;
      }, 1000);
    }, 200);
  }

  function gameLoop() {
    physics();
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
};
