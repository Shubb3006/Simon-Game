var gamepattern=[];
var userclickpattern=[];
var buttoncolors=["red", "blue", "green", "yellow"];
var level=0;
var started=0;
var score=0;
var gameover=0;
$(document).keypress(function(){
    if(!started)
    {
        $(".score").text("Your Score is : "+score);
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
});

function getanimate(color)
{
    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    }, 100);
}
function startOver()
{
    level=0;
    gamepattern=[];
    score=0;
    started=false;
}

$(".btn").click(function(){
    if(started)
    {
        var userchosencolor=$(this).attr("id");
        userclickpattern.push(userchosencolor);
        playsound(userchosencolor);
        console.log(userclickpattern);
        getanimate(userchosencolor);4
        checkanswer(userclickpattern.length-1);
    }
})

function playsound(color)
{
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}

function checkanswer(currentlevel)
{
    if(userclickpattern[currentlevel]===gamepattern[currentlevel])
    {
        console.log("Success");
        if(userclickpattern.length===gamepattern.length)
        {
            setTimeout(() => {
                nextsequence();
            }, 1000);
            score++;
        }
    }
    else
    {
        console.log("FAiled");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // started=0;
        $(".score").text("Your Score is : "+score);
        startOver();
    }
}

function nextsequence()
{
    userclickpattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomnumber=Math.floor(Math.random()*4);
    console.log(randomnumber);
    var randomchosencolor=buttoncolors[randomnumber];
    console.log(randomchosencolor);
    gamepattern.push(randomchosencolor);
    console.log(gamepattern)

    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100)
    playsound(randomchosencolor);
}
