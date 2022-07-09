const currentGame = []; // An Array that hold the random game numbers

// wait for user to press any key and than start the function "addNewValue"
document.addEventListener("keypress", addNewValue, {
  once: true,
});

// add new random number to the array, flash the match element and than run function "clientTurnClicks"
function addNewValue() {
  const randomStartNumber = Math.floor(Math.random() * 4);
  currentGame.push(randomStartNumber);
  fades(randomStartNumber, true);
  clientTurnClicks();
}

// get cilck value from the user and check if it match to the numbers in the arry "currentGame"
function clientTurnClicks() {
  let ClickCounter = 0; //currnt turn counter
  $(".btn").on("click", function buttonClickHandler(event) {
    const clientClickBtn = event.target.id; //get the user's pressed element id
    if (clientClickBtn == currentGame[ClickCounter]) {
      //if the user's click is correct
      fades(clientClickBtn, false);
      ClickCounter = ClickCounter + 1; // increase the counter so we can check the next array value
      if (ClickCounter >= currentGame.length) {
        // compare the user's click vs the array length
        $(".btn").off("click"); // block listen to user clicks
        showGamePattern(ClickCounter); //**run the "showGamePattern" patten with the value of the current level
      } // else do nothing => wait for the next user click
    } else {
      //if the user click value is wrong end the game
      alert("Game Over");
      location.reload();
    }
  });
}

//run all the the value in the "currentGame" array
function showGamePattern(ClickCounter) {
  //use the current level as input
  if (ClickCounter > 0) {
    //** as long as the counter grater then 0 run the next value */
    setTimeout(function () {
      const x = currentGame.length - ClickCounter;
      fades(currentGame[x], true);
      showGamePattern(ClickCounter - 1);
    }, 1000);
  } else {
    //if the counter is 0 run the function that add new number to the array
    setTimeout(addNewValue, 1000);
  }
}

function fades(divId, shouldFade) {
  const soundColorUser = new Audio("sounds/" + divId + ".mp3");
  soundColorUser.play();

  if (shouldFade) {
    $("#" + divId)
      .fadeOut(120)
      .fadeIn(120);
  } else {
    $("#" + divId).addClass("pressed");
    setTimeout(function () {
      $("#" + divId).removeClass("pressed");
    }, 120);
  }
 
}
