"use strict";
window.addEventListener("load", start);

let points = 0;
let lives = 0;

function start() {
  // nulstil point og liv
  points = 0;
  lives = 3;

  animationStart();
  startPosition();
  listener();
}

function animationStart() {
  // Start animationer
  //   + 1point
  document.querySelector("#butter_container").classList.add("falling");

  //   -1 life
  document.querySelector("#cabbage_container").classList.add("falling");

  //   -1point
  document.querySelector("#tomato_container").classList.add("falling");

  //   +1life
  document.querySelector("#hand_container").classList.add("falling");
}

function startPosition() {
  //sets animation with start position via class adding

  document.querySelector("#butter_container").classList.add("position1");

  //   -1 life
  document.querySelector("#cabbage_container").classList.add("position2");

  //   -1point
  document.querySelector("#tomato_container").classList.add("position3");

  //   +1life
  document.querySelector("#hand_container").classList.add("position4");
}

function listener() {
  // Registrer click
  document
    .querySelector("#butter_container")
    .addEventListener("click", clickButter);
  document
    .querySelector("#tomato_container")
    .addEventListener("click", clickTomato);
  document
    .querySelector("#cabbage_container")
    .addEventListener("click", clickCabbage);
  document
    .querySelector("#hand_container")
    .addEventListener("click", clickHand);

  //gives new position upon ended falling animation-iteration
  document
    .querySelector("#butter_container")
    .addEventListener("animationiteration", butterRestart);
  document
    .querySelector("#tomato_container")
    .addEventListener("animationiteration", butterRestart);
  document
    .querySelector("#cabbage_container")
    .addEventListener("animationiteration", butterRestart);
  document
    .querySelector("#hand_container")
    .addEventListener("animationiteration", butterRestart);
}

function clickButter() {
  // Forhindr gentagne clicks
  document
    .querySelector("#butter_container")
    .removeEventListener("click", clickButter);

  // Stop coin container
  document.querySelector("#butter_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#butter_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  document
    .querySelector("#butter_container")
    .addEventListener("animationend", butterGone);

  // Giv point
  //   incrementPoints();
  changePoints(1);
}

function butterGone() {
  let butter = this; //document.querySelector("#butter_container");

  // fjern event der bringer os herind

  this.removeEventListener("animationend", butterGone);

  // fjern forsvind-animation
  this.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  this.classList.remove("paused");

  // genstart falling animation
  this.classList.remove("falling");
  this.offsetWidth;
  this.classList.add("falling");

  butterRestart.call(this);

  // gør det muligt at klikke på coin igen
  this.addEventListener("click", clickButter);
}

function butterRestart() {
  this.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  let pos = Math.floor(Math.random() * 5) + 1;
  this.classList.add("position" + pos);
}
function clickCabbage() {
  // Forhindr gentagne clicks
  document
    .querySelector("#cabbage_container")
    .removeEventListener("click", clickCabbage);

  // Stop cabbage container
  document.querySelector("#cabbage_container").classList.add("paused");

  // sæt forsvind-animation på cabbage
  document.querySelector("#cabbage_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  document
    .querySelector("#cabbage_container")
    .addEventListener("animationend", cabbageGone);

  decrementLives();
}

function cabbageGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#cabbage_container")
    .removeEventListener("animationend", cabbageGone);

  // fjern forsvind-animation

  //   overvej om du vil have animation
  document.querySelector("#cabbage_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#cabbage_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#cabbage_container").classList.remove("falling");
  document.querySelector("#cabbage_container").offsetWidth;
  document.querySelector("#cabbage_container").classList.add("falling");

  // gør det muligt at klikke på bomb igen
  document
    .querySelector("#cabbage_container")
    .addEventListener("click", clickCabbage);
}

function clickHand() {
  // Forhindr gentagne clicks
  document
    .querySelector("#hand_container")
    .removeEventListener("click", clickHand);

  // Stop heart container
  document.querySelector("#hand_container").classList.add("paused");

  // sæt forsvind-animation på heart
  document.querySelector("#hand_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: heatGone
  document
    .querySelector("#hand_container")
    .addEventListener("animationend", handGone);

  incrementLives();
}

function handGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#hand_container")
    .removeEventListener("animationend", handGone);

  // fjern forsvind-animation
  document.querySelector("#hand_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#hand_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#hand_container").classList.remove("falling");
  document.querySelector("#hand_container").offsetWidth;
  document.querySelector("#hand_container").classList.add("falling");

  // gør det muligt at klikke på heart igen
  document
    .querySelector("#hand_container")
    .addEventListener("click", clickHand);

  incrementLives();
}

function clickTomato() {
  document
    .querySelector("#tomato_container")
    .removeEventListener("click", clickTomato);

  // Stop cabbage container
  document.querySelector("#tomato_container").classList.add("paused");

  // sæt forsvind-animation på cabbage
  document.querySelector("#tomato_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: tomatoGone
  document
    .querySelector("#tomato_container")
    .addEventListener("animationend", tomatoGone);

  //   decrementPoints();
  changePoints(0);
}

function tomatoGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#tomato_container")
    .removeEventListener("animationend", tomatoGone);

  // fjern forsvind-animation
  document.querySelector("#tomato_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#tomato_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#tomato_container").classList.remove("falling");
  document.querySelector("#tomato_container").offsetWidth;
  document.querySelector("#tomato_container").classList.add("falling");

  // gør det muligt at klikke på tomatoigen
  document
    .querySelector("#tomato_container")
    .addEventListener("click", clickTomato);
}

// function incrementPoints() {
//   points++;

//   displayPoints();
//   if (points >= 10) {
//     levelComplete();
//   }
// }

// function decrementPoints() {
//   points--;

//   displayPoints();
//   //   if (points >= 10) {
//   //     levelComplete();
//   //   }
// }

function changePoints(x) {
  if (x == 1) {
    points++;
  } else {
    points--;
  }
  displayPoints();

  if (points >= 10) {
    levelComplete();
  }
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#point_count").textContent = points;
}

function decrementLives() {
  if (lives <= 0) {
    gameOver();
  } else {
    showDecrementedLives();
  }
  lives--;
}

function incrementLives() {
  console.log(`${lives}`);
  lives++;

  if (lives > 3) {
    lives = 3;
  } else {
    showIncrementedLives();
  }
}

function showDecrementedLives() {
  document.querySelector(`#life${lives}`).classList.remove("happy_Smiley");
  document.querySelector(`#life${lives}`).classList.add("broken_Smiley");
}

function showIncrementedLives() {
  document.querySelector(`#life${lives}`).classList.remove("broken_Smiley");
  document.querySelector(`#life${lives}`).classList.add("happy_Smiley");
}

function gameOver() {
  document.querySelector("#game_over").classList.remove("hidden");
  stop();
}

function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  stop();
}

function stop() {
  // Stop animationer
  document.querySelector("#coin1_container").classList.remove("falling");
  document.querySelector("#coin2_container").classList.remove("falling");
  document.querySelector("#coin3_container").classList.remove("falling");
  document.querySelector("#bomb_container").classList.remove("falling");
  document.querySelector("#heart_container").classList.remove("falling");

  // Fjern click
  document
    .querySelector("#coin1_container")
    .removeEventListener("click", clickCoin);
  document
    .querySelector("#coin2_container")
    .removeEventListener("click", clickCoin2);
  document
    .querySelector("#coin3_container")
    .removeEventListener("click", clickCoin3);
  document
    .querySelector("#bomb_container")
    .removeEventListener("click", clickBomb);
  document
    .querySelector("#heart_container")
    .removeEventListener("click", clickHeart);
}
