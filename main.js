var birds;
var deadBirds;
var pipes;
var generationCount = 1;
var highScore = 0;
var currentScore = 0;

var SW = screen.width;
var SH = screen.height;

function setup() 
{
    createCanvas(SW,SH);
    NewGame();
}

function NewGame()
{
    birds = [];
    GenerateBirds();
    deadBirds = [];
    pipes = [];
    frameCount = 0;
    currentScore = 0;
    pipes.push(new Pipe());
}

function draw()
{
    background(0);
    frameRate(60);

    if(frameCount % 100 == 0) 
    {
        pipes.push(new Pipe());
    }

    for (var k = 0; k < pipes.length; k++)
    {
        pipes[k].update();
        pipes[k].show();
    }

    for (var i = birds.length - 1; i >= 0; i--) 
    {
        const nextPipe = this.GetNextPipe(birds[i]);
        birds[i].update(nextPipe.x,nextPipe.top,nextPipe.bottom);

        birds[i].show();

        if (birds[i].isCrash)
        {
            deadBirds.push(birds[i]);
            birds.splice(i,1);
            continue;
        }

        for(var j = pipes.length - 1; j >= 0; j--)
        {
            if (pipes[j].isHit(birds[i])) 
                birds[i].isCrash = true;

            if(pipes[j].offScreen())
            {
                pipes.splice(j,1);
                birds[i].passedPipeCount++;

                currentScore = birds[i].passedPipeCount;

                if (currentScore > highScore) {
                    highScore = currentScore;
                }
            }
        }

    }

    if(birds.length <= 0)   
    {
        CalcFitness();
        generationCount++;
        NewGame();
    }

    GenTexts();
}

function GenerateBirds() 
{
    for (var i = 0; i < 100; i += 1) 
    {
        const brain = deadBirds ? PickOne().brain : null;
        const newBird = new Bird(brain);
        birds.push(newBird);
    }
    return birds;
}

function GetNextPipe(bird)
{
    for (var i = 0; i < pipes.length; i++) 
        if (pipes[i].x > bird.x) 
            return pipes[i];
}

function PickOne()
{
    var index = 0;
    var r = Math.random();
    while (r > 0) 
    {
        r -= deadBirds[index].fitness;
        index += 1;
    }
    index -= 1;
    return deadBirds[index];
}

function CalcFitness() {
    var totalScore = 0;
    for (var k = 0; k < deadBirds.length; k++)
    {
        totalScore += deadBirds[k].score;
    }

    for (var k = 0; k < deadBirds.length; k++)
    {
        deadBirds[k].fitness = deadBirds[k].score / totalScore;
    }
}


function GenTexts() {
    stroke(5)
    textStyle(BOLD);
    textSize(25);
    textAlign(CENTER);
    text("Gen:" + generationCount, 40, 25);
    text("Rec:" + highScore, 40, 50);
    text("Cur:" + currentScore, 40, 75);
}