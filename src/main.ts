import "/styles/style.scss";

let game = document.getElementById("gameContainer") as HTMLElement;
let scoreCounter = document.getElementById("score") as HTMLElement;
let highscoreCounter = document.getElementById("highscore") as HTMLElement;
let ball = document.getElementById("ball") as HTMLElement;
let paddle = document.getElementById("paddle") as HTMLElement;

let paddleX = 0;

document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX - game.offsetLeft;
  if (mouseX > 0 && mouseX < game.offsetWidth) {
    paddleX = mouseX;
    paddle.style.left = paddleX + "px";
  }
});
