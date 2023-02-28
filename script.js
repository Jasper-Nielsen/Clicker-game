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
  document.querySelector("#butter_container2").classList.add("falling");
  document.querySelector("#butter_container3").classList.add("falling");

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

  document.querySelector("#butter_container2").classList.add("position7");

  document.querySelector("#butter_container3").classList.add("position5");
  //   -1 life
  document.querySelector("#cabbage_container").classList.add("position4");

  //   -1point
  document.querySelector("#tomato_container").classList.add("position6");

  //   +1life
  document.querySelector("#hand_container").classList.add("position8");
}

function listener() {
  // Registrer click
  document
    .querySelector("#butter_container")
    .addEventListener("click", clickButter);
  document
    .querySelector("#butter_container2")
    .addEventListener("click", clickButter);
  document
    .querySelector("#butter_container3")
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
    .querySelector("#butter_container2")
    .addEventListener("animationiteration", butterRestart);
  document
    .querySelector("#butter_container3")
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
  let butter = this;
  // Forhindr gentagne clicks
  this.removeEventListener("click", clickButter);

  // Stop coin container
  this.classList.add("paused");

  // sæt forsvind-animation på coin
  this.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  this.addEventListener("animationend", butterGone);

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

  butterRestart.call(this);

  // gør det muligt at klikke på coin igen
  this.addEventListener("click", clickButter);
}

function butterRestart() {
  this.classList.remove("falling");
  this.offsetWidth;
  this.classList.add("falling");

  this.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8"
  );

  let pos = Math.floor(Math.random() * 5) + 1;
  this.classList.add("position" + pos);
}

function clickCabbage() {
  let cabbage = this;
  // Forhindr gentagne clicks
  this.removeEventListener("click", clickCabbage);

  // Stop cabbage container
  this.classList.add("paused");

  // sæt forsvind-animation på cabbage
  this.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  this.addEventListener("animationend", cabbageGone);

  decrementLives();
}

function cabbageGone() {
  let cabbage = this;
  // fjern event der bringer os herind
  this.removeEventListener("animationend", cabbageGone);

  // fjern forsvind-animation

  //   overvej om du vil have animation
  this.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  this.classList.remove("paused");

  // genstart falling animation
  butterRestart.call(this);
  // gør det muligt at klikke på bomb igen
  this.addEventListener("click", clickCabbage);
}

function clickHand() {
  let hand = this;
  // Forhindr gentagne clicks
  this.removeEventListener("click", clickHand);

  // Stop heart container
  this.classList.add("paused");

  // sæt forsvind-animation på heart
  this.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: heatGone
  this.addEventListener("animationend", handGone);

  incrementLives();
}

function handGone() {
  let hand = this;
  // fjern event der bringer os herind
  this.removeEventListener("animationend", handGone);

  // fjern forsvind-animation
  this.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  this.classList.remove("paused");

  // genstart falling animation
  butterRestart.call(this);

  // gør det muligt at klikke på heart igen
  this.addEventListener("click", clickHand);

  incrementLives();
}

function clickTomato() {
  let tomato = this;

  this.removeEventListener("click", clickTomato);

  // Stop cabbage container
  this.classList.add("paused");

  // sæt forsvind-animation på cabbage
  this.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: tomatoGone
  this.addEventListener("animationend", tomatoGone);

  //   decrementPoints();
  changePoints(0);
}

function tomatoGone() {
  let tomato = this;
  // fjern event der bringer os herind
  this.removeEventListener("animationend", tomatoGone);

  // fjern forsvind-animation
  this.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  this.classList.remove("paused");

  // genstart falling animation
  butterRestart.call(this);

  // gør det muligt at klikke på tomatoigen
  this.addEventListener("click", clickTomato);
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

  if (points >= 2) {
    levelComplete();
  } else {
    displayPoints();
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
  document.querySelector("#butter_container").classList.remove("falling");
  document.querySelector("#butter_container2").classList.remove("falling");
  document.querySelector("#butter_container3").classList.remove("falling");
  document.querySelector("#tomato_container").classList.remove("falling");
  document.querySelector("#cabbage_container").classList.remove("falling");
  document.querySelector("#hand_container").classList.remove("falling");

  // Fjern click
  document
    .querySelector("#butter_container")
    .removeEventListener("click", clickButter);
  document
    .querySelector("#butter_container2")
    .removeEventListener("click", clickButter);
  document
    .querySelector("#butter_container3")
    .removeEventListener("click", clickButter);
  document
    .querySelector("#tomato_container")
    .removeEventListener("click", clickTomato);
  document
    .querySelector("#cabbage_container")
    .removeEventListener("click", clickCabbage);
  document
    .querySelector("#hand_container")
    .removeEventListener("click", clickHand);
}
