# SQUASH

Welcome to Squash!

This is a single player arcade game inspired by Atari's 1972 Pong, written in HTML, SCSS and TS using BEM methodology.

The aim of the game is to score as high as you can, which you can access from this link:
https://jaybains.github.io/squash/

Please enjoy and thank you for playing!

## Issues

- Ball is slow on small screen sizes.
- Small screens display a square game container, making ball trajectory obvious
- Ball speed increases exponentially.
- High scores do not save

## Checklist

### HTML/CSS

- [x] Score counter
- [x] Highscore counter
- [x] Game container
- [x] Ball
- [x] Paddle
- [x] Retro aesthetic
- [x] Start menu
  - [x] About page

### TS

- [x] Game loop
  - [x] Paddle
    - [x] Movement
      - [x] Mouse input
      - [x] Touch input
  - [x] Ball
    - [x] Movement
      - [x] Speed increase over time
  - [x] Collision
    - [x] Left wall
      - [x] Ball changes trajectory
    - [x] Right wall
      - [x] Ball changes trajectory
    - [x] Top wall
      - [x] Ball changes trajectory
    - [x] Paddle
      - [x] Ball changes trajectory
      - [x] Score ++
      - [x] Audio
    - [x] Bottom wall
      - [x] Highscore check
      - [x] Reset game
