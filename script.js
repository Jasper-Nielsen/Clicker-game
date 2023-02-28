"use strict";
window.addEventListener("load", start);

let points = 0;
let lives = 0;

function start() {
  //   console.log("JavaScript kører!");

  // nulstil point og liv
  points = 0;
  lives = 3;

  // Start animationer
  //   + 1point
  document.querySelector("#butter_container").classList.add("falling");

  //   -1 life
  document.querySelector("#cabbage_container").classList.add("falling");

  //   -1point
  document.querySelector("#tomato_container").classList.add("falling");

  //   +1life
  document.querySelector("#hand_container").classList.add("falling");

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
  // fjern event der bringer os herind
  document
    .querySelector("#butter_container")
    .removeEventListener("animationend", butterGone);

  // fjern forsvind-animation
  document.querySelector("#butter_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#butter_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#butter_container").classList.remove("falling");
  document.querySelector("#butter_container").offsetWidth;
  document.querySelector("#butter_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#butter_container")
    .addEventListener("click", clickButter);
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

function changePoints(x){
    if(x==1){
        points++;
    } else {points--;}
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
  console.log("Game Over");

  document.querySelector("#game_over").classList.remove("hidden");
}

function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
}
