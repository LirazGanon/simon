const currentGame = []; // An Array that hold the random game numbers
let width = screen.width;
let record = localStorage.getItem("1");
if (record) {
  $("h2").text("HIGH SCORE: level " + record);
}

//mobile responsive
if (width > 700) {
  document.addEventListener("keypress", addNewValue, {
    once: true,
  });
} else {
  $("h1").text("Touch here to start");
  document.querySelector("h1").addEventListener("click", addNewValue, {
    once: true,
  });
}

// add new random number to currentGame
function addNewValue() {
  const randomStartNumber = Math.floor(Math.random() * 4);
  currentGame.push(randomStartNumber);
  $("h1").text("Level " + currentGame.length);
  fades(randomStartNumber, true);
  clientTurnClicks();
}

// get cilck value from the user and check if it match to the numbers in the arry "currentGame"
function clientTurnClicks() {
  let ClickCounter = 0;
  $(".btn").on("click", function buttonClickHandler(event) {
    const clientClickBtn = event.target.id;
    if (clientClickBtn == currentGame[ClickCounter]) {
      fades(clientClickBtn, false);
      ClickCounter = ClickCounter + 1;
      if (ClickCounter >= currentGame.length) {
        $(".btn").off("click");
        setTimeout(function() {
          showGamePattern(currentGame.length);
        }, 200);
      }
    } else { //if wrong Game Over
      const soundGameOver = new Audio("sounds/game-over.mp3");
      soundGameOver.play();
      $("body").addClass("game-over");
      record = currentGame.length - 1;
      localStorage.setItem("1", record);
      setTimeout(function() {
        alert("Game Over");
        location.reload();
      }, 1000);
    }
  });
}

//run all the the value in the "currentGame" array
function showGamePattern(loopCounter) {
  $("h1").text("Level " + (currentGame.length + 1));
  if (loopCounter > 0) {
    setTimeout(function() {
      const x = currentGame.length - loopCounter;
      fades(currentGame[x], true);
      showGamePattern(loopCounter - 1);
    }, 900);
  } else {
    setTimeout(addNewValue, 900);
  }
}

//fade or flash the button
function fades(divId, shouldFade) {
  const soundColorUser = new Audio("sounds/" + divId + ".mp3");
  soundColorUser.play();
  if (shouldFade) {
    $("#" + divId)
      .fadeOut(120)
      .fadeIn(120);
  } else {
    $("#" + divId).addClass("pressed");
    setTimeout(function() {
      $("#" + divId).removeClass("pressed");
    }, 120);
  }
}
