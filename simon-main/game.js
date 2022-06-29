gamePattern = [];
userClickedPattern = [];

var randomNumber;
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColours[randomNumber];
var level = 1;
var r = 0;

$(document).on("keypress", nextSequence);

var userChosenColour;
var i = 0;

$(".btn").click(function handler(event) {
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  var soundColorUser = new Audio("sounds/" + userChosenColour + ".mp3");
  soundColorUser.play();
  $("#" + event.target.id).addClass("pressed");
  setTimeout(function () {
    $("#" + event.target.id).removeClass("pressed");
  }, 120);

  if (userChosenColour == gamePattern[userClickedPattern.length - 1]) {
    console.log("i=" + i);
    console.log("userChosenColour=" + userChosenColour);
    console.log("gamePattern[i]=" + gamePattern[i]);
    if (userClickedPattern.length === level) {
      console.log(gamePattern.length === level);
      level = level + 1;
      $("#level-title").text("Level " + level);
      r = 0;
      showGamePattern();
      // i = 0;
      userClickedPattern = [];
      // } else {
      //   i++;
      // }
    }
  } else {
    $("#level-title").text("Game Over");
    $("body").addClass("game-over");
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    setTimeout(function () {
      $("body").removeClass("game-over");
      alert("You Have Reached Level " + level);
    }, 250);
    setTimeout(function () {
      location.reload();
    }, 1000);
  }
  return userChosenColour;
});

// $(document).ready(function() {
//   const audio = new Audio("sounds/"+randomChosenColour+".mp3");
//   audio.play();
//   });

function nextSequence() {
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  const audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  $("#" + randomChosenColour)
    .fadeOut(120)
    .fadeIn(120);
  gamePattern.push(buttonColours[randomNumber]);
  return randomNumber;
}

function showGamePattern() {
  //  create a loop function
  setTimeout(function () {
    const replay = new Audio("sounds/" + gamePattern[r] + ".mp3");
    replay.play();
    console.log(r);
    console.log(level);
    $("#" + gamePattern[r])
      .fadeOut(120)
      .fadeIn(120);
    r++;
    if (r < level - 1) {
      showGamePattern();
    } else {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }, 1000);
}
