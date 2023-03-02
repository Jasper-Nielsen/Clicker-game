"use strict";
window.addEventListener("load", lobby);

let points = 0;
let lives = 0;

function lobby() {
  points = 0;
  lives = 3;

  //starts game
  document.querySelector("#button_start").addEventListener("click", start);

  //opens story
  document.querySelector("#story_button").addEventListener("click", story);

  //c opens instructions
  document
    .querySelector("#instructions_button")
    .addEventListener("click", instructions);

  //closes down instructions page
  document.querySelector("#instructions").classList.add("hidden");

  // hides instructions so we can return to play screen
  document.querySelector("#story").classList.add("hidden");

  showStartScreen();
  //resets timer and starts it
  startTimer();

  //resets lives and points
  reset();
}
//makes possible restart
function showStartScreen() {
  //makes only startscreen visible
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#start").classList.remove("hidden");
}
function instructions() {
  console.log("instruction clicked");
  document.querySelector("#instructions").classList.remove("hidden");
  document.querySelector("#back_button2").addEventListener("click", lobby);
}

function story() {
  console.log("story pushed");
  // document.querySelector("#start").classList.add("hidden");
  document.querySelector("#story").classList.remove("hidden");
  document.querySelector("#back_button").addEventListener("click", lobby);
}

function start() {
  //stops sound effect from end screens
  document.querySelector("#sound_game_over").pause();
  document.querySelector("#sound_level_complete").pause();

  //plays background music
  document.querySelector("#sound_background_music").play();

  //removes start screen
  document.querySelector("#start").classList.add("hidden");

  //   showStartScreen();
  animationStart();
  startPosition();
  listener();
}

function reset() {
  resetPoints();
  resetLives();
}

function resetPoints() {
  points = 0;
  displayPoints();
}

function resetLives() {
  lives = 3;
  document.querySelector("#life1").classList.remove("broken_Smiley");
  document.querySelector("#life2").classList.remove("broken_Smiley");
  document.querySelector("#life3").classList.remove("broken_Smiley");

  document.querySelector("#life1").classList.add("happy_Smiley");
  document.querySelector("#life2").classList.add("happy_Smiley");
  document.querySelector("#life3").classList.add("happy_Smiley");
}

function startTimer() {
  //resets timer via classList
  document.querySelector("#time_sprite").classList.remove("shrink");
  document.querySelector("#time_sprite").offsetWidth;
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
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
  butter.removeEventListener("click", clickButter);

  // Stop coin container
  butter.classList.add("paused");

  // sæt forsvind-animation på coin
  butter.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  butter.addEventListener("animationend", butterGone);

  // Giv point
  //   incrementPoints();
  changePoints(1);

  //music currentTime=0 enables to finish sound before clicking on next object
  document.querySelector("#sound_butter").currentTime = 0;
  document.querySelector("#sound_butter").play();
}

function butterGone() {
  let butter = this; //document.querySelector("#butter_container");

  // fjern event der bringer os herind

  butter.removeEventListener("animationend", butterGone);

  // fjern forsvind-animation
  butter.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  butter.classList.remove("paused");

  // genstart falling animation

  butterRestart.call(this);

  // gør det muligt at klikke på coin igen
  butter.addEventListener("click", clickButter);
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
    "position6"
  );

  let pos = Math.floor(Math.random() * 6) + 1;
  this.classList.add("position" + pos);
}

function clickCabbage() {
  let cabbage = this;
  // Forhindr gentagne clicks
  cabbage.removeEventListener("click", clickCabbage);

  // Stop cabbage container
  cabbage.classList.add("paused");

  // sæt forsvind-animation på cabbage
  cabbage.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  cabbage.addEventListener("animationend", cabbageGone);

  document.querySelector("#sound_cabbage").currentTime = 0;
  document.querySelector("#sound_cabbage").play();
  decrementLives();
}

function cabbageGone() {
  let cabbage = this;
  // fjern event der bringer os herind
  cabbage.removeEventListener("animationend", cabbageGone);

  // fjern forsvind-animation

  //   overvej om du vil have animation
  cabbage.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  cabbage.classList.remove("paused");

  // genstart falling animation
  butterRestart.call(this);
  // gør det muligt at klikke på bomb igen
  cabbage.addEventListener("click", clickCabbage);
}

function clickHand() {
  let hand = this;
  // Forhindr gentagne clicks
  hand.removeEventListener("click", clickHand);

  // Stop heart container
  hand.classList.add("paused");

  // sæt forsvind-animation på heart
  hand.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: heatGone
  hand.addEventListener("animationend", handGone);

  document.querySelector("#sound_hand_slap").currentTime = 0;
  document.querySelector("#sound_hand_slap").play();
  incrementLives();
}

function handGone() {
  let hand = this;
  // fjern event der bringer os herind
  hand.removeEventListener("animationend", handGone);

  // fjern forsvind-animation
  hand.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  hand.classList.remove("paused");

  // genstart falling animation
  butterRestart.call(this);

  // gør det muligt at klikke på heart igen
  hand.addEventListener("click", clickHand);

  incrementLives();
}

function clickTomato() {
  let tomato = this;

  tomato.removeEventListener("click", clickTomato);

  // Stop cabbage container
  tomato.classList.add("paused");

  // sæt forsvind-animation på cabbage
  tomato.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: tomatoGone
  tomato.addEventListener("animationend", tomatoGone);

  document.querySelector("#sound_tomato").currentTime = 0;
  document.querySelector("#sound_tomato").play();
  //   decrementPoints();
  changePoints(0);
}

function tomatoGone() {
  let tomato = this;
  // fjern event der bringer os herind
  tomato.removeEventListener("animationend", tomatoGone);

  // fjern forsvind-animation
  tomato.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  tomato.classList.remove("paused");

  // genstart falling animation
  butterRestart.call(this);

  // gør det muligt at klikke på tomatoigen
  tomato.addEventListener("click", clickTomato);
}

function changePoints(x) {
  if (x == 1) {
    points++;
  } else {
    points--;
  }

  displayPoints();

  // if (points >= 4) {
  //   levelComplete();
  // } else {
  //   displayPoints();
  // }
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#point_count").textContent = points;
}

function decrementLives() {
  if (lives <= 1) {
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
  document.querySelector(`#life${lives}`).classList.remove("happy_Smiley");

  document.querySelector(`#life${lives}`).classList.add("broken_Smiley");
}

function showIncrementedLives() {
  document.querySelector(`#life${lives}`).classList.remove("broken_Smiley");
  document.querySelector(`#life${lives}`).classList.add("happy_Smiley");
}

function gameOver() {
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#replay_button").addEventListener("click", lobby);
  document.querySelector("#sound_game_over").play();

  stop();
}

function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#replay_button2").addEventListener("click", lobby);

  document.querySelector("#sound_level_complete").play();
  stop();
}

function stop() {
  
  //hides game thereby making it unclickable
  document.querySelector("#game").classList.add("hidden");
  //pauses background music
  document.querySelector("#sound_background_music").pause();


  
}
