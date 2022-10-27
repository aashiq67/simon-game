userClickedPattern = [];
gamePattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
var firstTym = 1;
var level = 0;

$(document).keypress(function(){
    if(firstTym==1)
        nextSequence();
    else
        startOver();
    firstTym=0;
});

function nextSequence(){

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    userClickedPattern = [];

    animatePress(randomColor);
    playSound(randomColor);
    
    index=0;
}

var index=0;
$(".btn").click(function(){

    if(firstTym==0){
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        checkAnswer(index);
        index++;
    }
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function playSound(key){
    var audio;
    if(key == "blue")
        audio = new Audio("sounds/blue.mp3");
    else if(key == "green")
        audio = new Audio("sounds/green.mp3");
    else if(key == "red")
        audio = new Audio("sounds/red.mp3");
    else if(key == "yellow")
        audio = new Audio("sounds/yellow.mp3");
    else
        audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(currentLevel==level-1){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    }
}

function startOver(){
    level=0;
    gamePattern = [];
    nextSequence();
}