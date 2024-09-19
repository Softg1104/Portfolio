var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var speed = 800;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // poner el patron completo
  var i = 0;
  var showPattern = setInterval(function() {
    if (i < gamePattern.length) {
      var color = gamePattern[i];
      $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(color);
      i++;
    } else {
      clearInterval(showPattern);
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChosenColor);
      $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColor);
    }
  }, speed);
}

function playSound(name) {
  var audio = new Audio("click.mp3");
  audio.play();
}

function playWrongSound() {
  var wrongAudio = new Audio("buzzer.mp3");
  wrongAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).on("click", ".btn", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor); 
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      
      // hacer que vaya mas rapido mientras avanza el juego
      if (level % 2 === 0 && speed > 200) {
        speed -= 100;
      }
    }
  } else {
    playWrongSound();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over x_x press any key to restart");
    startOver();
  }
}
    
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    speed = 800;
  }
  