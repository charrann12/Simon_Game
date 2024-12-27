
// array of colors present in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// an array in which the colors are pushed in sequence
var gamePattern = [];

//an array in which the colors clicked by user are pushed in sequence
var userClickedPattern = [];

//initial game conditions
var started = false;
var level = 0;

//when ever the key is pressed the game is going to start using these lines of code
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//function when user clicks a color, the color should select
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//function which checks that the clicked button by the user equals to the game pattern or not
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else 
    // it displays game over till a key is pressed
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// this is displayed once the user passes the level
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


// when a user clicks the button this animation takes place
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//sound will be played accordingly to the button clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//when user clicked pattern is not equal to game pattern it starts over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}




     
