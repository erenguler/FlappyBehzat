var birds;
var deadBirds;
var pipes;
var generationCount = 1;
var highScore = 0;
var currentScore = 0;
var slider;
var counter = 0;

var SW = screen.width > 1000 ? screen.width : 1000;
SW = SW * 0.99;
var SH = window.innerHeight * 0.95;

function setup() 
{
    createCanvas(SW,SH);
    slider = createSlider(1, 100, 1);
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
    counter = 0;
    pipes.push(new Pipe());
}

function draw()
{
    for (let z = 0; z < slider.value(); z++) 
    {
        counter++;
        // CALC ALL
        if(counter % 100 == 0) 
        {
            pipes.push(new Pipe());
        }

        for (var k = 0; k < pipes.length; k++)
        {
            pipes[k].update();
        }

        for (var i = birds.length - 1; i >= 0; i--) 
        {
            const nextPipe = this.GetNextPipe(birds[i]);
            birds[i].update(nextPipe.x,nextPipe.top,nextPipe.bottom);

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

    }



    // DRAW ALL
    background(0);
    for (var k = 0; k < pipes.length; k++)
        pipes[k].show();
    for (var k = 0; k < birds.length; k++)
        birds[k].show();
    GetTexts();
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


function GetTexts() {
    stroke(5)
    textStyle(BOLD);
    textSize(15);
    textAlign(LEFT);
    text("Gen:" + generationCount, 0, 15);
    text("Rec:" + highScore, 0, 30);
    text("Cur:" + currentScore, 0, 45);
    text("FPS:" + frameRate().toFixed(2), 0, 60);
    text("FC:" + frameCount, 0, 75);
    text("BIRDS:" + birds.length, 0, 90);
}