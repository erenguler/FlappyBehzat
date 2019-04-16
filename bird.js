function Bird(brain) 
{
    this.brain;
    this.img = loadImage('https://i.ibb.co/vswcDLC/behzat.png');
    this.x = 25;
    this.y = 0;
    this.size = 50;
    this.fitness = 0;
    this.isCrash = false;
    this.gravity = 0.6;
    this.jumpDistance = -15;
    this.velocity = 0;
    this.score = 0;
    this.passedPipeCount = 0;

    if (brain) 
    {
        this.brain = brain.copy();
        this.brain.mutate( function (x) {
        if (Math.random() < 0.1) 
        {
            const offset = Math.random();
            return x + offset;
        }
        return x;
        });

    } 
    else 
    {
        this.brain = new NeuralNetwork(5, 5, 1);
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
          (this.velocity / 15).toFixed(2),
        ];
        const output = this.brain.predict(inputs);
        if (output > 0.5) {
          this.jump();
        }
    }
}