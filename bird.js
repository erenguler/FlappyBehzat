function Bird(brain) 
{
    this.brain;
    this.img = loadImage('https://i.ibb.co/vswcDLC/behzat.png');
    this.x = 25;
    this.y = 200;
    this.size = 25;
    this.fitness = 0;
    this.isCrash = false;
    this.gravity = 0.6;
    this.jumpDistance = -10;
    this.velocity = 0;
    this.score = 0;
    this.passedPipeCount = 0;

    if (brain) 
    {
        this.brain = brain.copy();
        this.brain.mutate(0.1);
    } 
    else 
    {
        this.brain = new NeuralNetwork(5, 5, 2);
    }

    this.show = function()
    {
        image(this.img, this.x, this.y, this.size, this.size);
    }

    this.update = function(pipeX, spaceStartY, spaceEndY) 
    {
        this.score = frameCount;
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.size > height || this.y < 0) 
        {
            this.isCrash = true;
        }

        this.think(pipeX, spaceStartY, spaceEndY);
    }

    this.jump = function() 
    {
        this.velocity = this.jumpDistance;
    }

    this.think = function(pipeX, spaceStartY, spaceEndY)
    {
        const inputs = [
          (pipeX / width ).toFixed(2),
          (spaceStartY / height).toFixed(2),
          (spaceEndY / height).toFixed(2),
          (this.y / height).toFixed(2),
          (this.velocity / this.jumpDistance * -1).toFixed(2),
        ];
        const output = this.brain.predict(inputs);
        if (output[0] < output[1]) 
        {
          this.jump();
        }
    }
}