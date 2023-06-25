var gamePattern = [];
var userPattern = [];
//var clickDetect = false;
var check = 0;
var l = 1;


function highlight(button){
$("."+button).addClass("pressed");
setTimeout(function(){
    $("."+button).removeClass("pressed");
    var audio = new Audio("sounds/"+button+".mp3");
audio.play();
}, 200);
}




function nextSequence(level){
    $("body").off("keydown");
    $("h1").text("Level "+level);
    var buttonColors = ["r" , "g" , "b" , "y"];
    for(let i = 0; i < level ; i++){
        var randomNumber = Math.floor((Math.random()*4));
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        setTimeout(function() {
            highlight(gamePattern[i]);
        }, (i+1) * 1000);
    }
    console.log(gamePattern);
    user(level);
}



function user(level){
   
    $(".btn").on("click",function(){
        var i = level;
        var buttonId = $(this).attr("id")
        highlight(buttonId);
        userPattern.push(buttonId);
        
        if (userPattern.length === gamePattern.length){
            $(".btn").off("click");
            for (let i = 0 ; i< level; i++){
                if(gamePattern[i]===userPattern[i]){
                    check ++;
                }
            }
            if(check === level){
                console.log("you win");
                level ++; 
                gamePattern = [];
                userPattern = [];
                check = 0;
                nextSequence(level);
            }
            else{
                $("h1").text("Level lost :(. Press Enter to Restart.");
                console.log("you lose");
                level ++; 
                gamePattern = [];
                userPattern = [];
                check = 0;
                $("body").on("keydown", function(event){
                    if(event.key === "Enter"){
                        nextSequence(1);
                    }
                })
                
            }
        }
    });
}

$("body").on("keydown", function(event){
    if(event.key === "Enter"){
        nextSequence(1);
    }
})

