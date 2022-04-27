var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level++;
    $("h1").html("Level " + level);
}



$(document).keydown(() => {
    if (!isStarted) {
        nextSequence();
        $("h1").html("Level " + level);
        isStarted = true;
    }
});


// $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
$(".btn").click((event) => {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 150);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            // console.log("Success");
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 250);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
        console.log("Wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isStarted = false;
}

