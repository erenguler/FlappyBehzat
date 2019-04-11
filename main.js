var mainScore;
var isEnded;
var birds;
var pipes;
var foods;

var Sw = screen.width-20;
var SH = screen.height-50;

function setup() 
{
    createCanvas(Sw,SH);
    NewGame();
}

function NewGame()
{
    birds = [];
    pipes = [];
    foods = [];
    mainScore = 0;
    isEnded = false;
    frameCount = 0;
    birds.push(new Bird());
    pipes.push(new Pipe());
}

function draw()
{
    background(0);
    frameRate(60);

    if(isEnded)  
    {
        GameOverTexts();
        return;
    }
    InGameTexts();

    if(frameCount % 100 == 0) 
    {
        pipes.push(new Pipe());
        // console.log("pipes:" + pipes.length + " | birds:" + birds.length+ " | foods:" + foods.length);
    }

    if(frameCount % 333 == 0) 
    {
        foods.push(new Food());
    }

    for (var i = birds.length - 1; i >= 0; i--) 
    {
        birds[i].update();
        birds[i].show();

        if (birds[i].isCrash)
        {
            birds.splice(i,1);
            continue;
        }

        for(var j = pipes.length - 1; j >= 0; j--)
        {
            pipes[j].update();

            pipes[j].show();

            if (pipes[j].isHit(birds[i])) 
                birds[i].isCrash = true;

            if(pipes[j].offScreen())
            {
                pipes.splice(j,1);
                birds[i].score++;
                mainScore = birds[i].score;
            }
        }

        for(var k = foods.length - 1; k >= 0; k--)
        {
            foods[k].update();
            foods[k].show();

            if (foods[k].isHit(birds[i])) 
            {
                birds[i].eat(foods[k].type);
                foods.splice(k,1);
                continue;
            }

            if(foods[k].offScreen())
            {
                foods.splice(k,1);
            }
        }

    }

    if(birds.length <= 0)   
        isEnded = true;

    Floor();
}

function mouseClicked() 
{
    if(isEnded) 
    {
        NewGame();
    }
    else
    {
        if(birds.length > 0)
            for (var i = birds.length - 1; i >= 0; i--) 
                birds[i].jump();
    }
  
}

function InGameTexts() {
    stroke(5)
    textStyle(BOLD);
    textSize(50);
    textAlign(CENTER);
    text(mainScore, width / 2 - 30, 60);
}

function GameOverTexts() {
    stroke(5)
    textStyle(BOLD);
    textSize(100);
    textAlign(CENTER);
    text("SCORE", width/2, height/4);
    text(mainScore, width/2, height/2);
}

function Floor() 
{
    strokeWeight(0);
    fill(255);
    rect(0, SH-10, Sw, 10);
}