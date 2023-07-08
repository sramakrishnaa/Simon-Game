var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keypress(function () {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 100);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {


    $('#' + currentColour).addClass("pressed");
    setTimeout(function () {
        $('.btn.' + currentColour).removeClass("pressed")
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }
  