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
let paddleBox: DOMRect;
let gameBox: DOMRect;

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
  gameBox = game.getBoundingClientRect();
  return event;
});

button.addEventListener("click", () => {
  PlayGame();
});

const PlayGame = () => {
  home.style.display = "none";
  container.style.display = "flex";

  paddleBox = paddle.getBoundingClientRect();
  gameBox = game.getBoundingClientRect();

  const AUDIO = new Audio(bounceSound);
  const X_START_POSITION = 150;
  const Y_START_POSITION = 20;
  const START_SPEED = 3;
  const ACCELERATION = 1.02;
  let speedX = Math.round(Math.random()) ? -1 * START_SPEED : START_SPEED;
  let speedY = Math.round(Math.random()) ? -1 * START_SPEED : START_SPEED;
  let ballPositionX = X_START_POSITION;
  let ballPositionY = Y_START_POSITION;
  let paddlePositionX = 0;
  let score = 0;
  let highscore = 0;

  document.addEventListener("mousemove", (event) => {
    let mouseX = event.clientX - gameBox.left;
    if (mouseX > 0 && mouseX < gameBox.right - gameBox.left) {
      paddlePositionX = mouseX - (paddleBox.right - paddleBox.left) / 2;
      paddle.style.left = paddlePositionX + "px";
    }
  });

  document.addEventListener("touchmove", (event) => {
    event.preventDefault();
    let mouseX = event.touches[0].clientX - gameBox.left;
    if (mouseX > 0 && mouseX < gameBox.right - gameBox.left) {
      paddlePositionX = mouseX - (paddleBox.right - paddleBox.left) / 2;
      paddle.style.left = paddlePositionX + "px";
    }
  });

  const Physics = () => {
    if (!ball || !paddle || !scoreCounter) {
      throw new Error("physics() error: Cannot find ball, paddle or score");
    }
    ballPositionX += speedX;
    ballPositionY += speedY;
    if (ballPositionX - 5 <= 0 && speedX < 0) {
      speedX = -speedX;
    } else if (
      ballPositionX + 25 >= gameBox.right - gameBox.left &&
      speedX > 0
    ) {
      speedX = -speedX;
    } else if (ballPositionY - 5 <= 0 && speedY < 0) {
      speedY = -speedY;
    } else if (
      ballPositionY + 25 >= gameBox.bottom - gameBox.top &&
      speedY > 0
    ) {
      if (
        ballPositionX + 15 > paddlePositionX &&
        ballPositionX + 5 < paddlePositionX + paddleBox.right - paddleBox.left
      ) {
        AUDIO.play();
        speedY = -speedY;
        score++;
        scoreCounter.textContent = `Score: ${score}`;
        speedX *= ACCELERATION;
        speedY *= ACCELERATION;
      } else {
        GameOver();
      }
    }
    ball.style.left = ballPositionX + "px";
    ball.style.top = ballPositionY + "px";
  };

  const GameOver = () => {
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
        ballPositionX = X_START_POSITION;
        ballPositionY = Y_START_POSITION;
        speedX = Math.round(Math.random()) ? -1 * START_SPEED : START_SPEED;
        speedY = Math.round(Math.random()) ? -1 * START_SPEED : START_SPEED;
      }, 1000);
    }, 200);
  };

  const AnimationLoop = () => {
    Physics();
    requestAnimationFrame(AnimationLoop);
  };
  requestAnimationFrame(AnimationLoop);
};
