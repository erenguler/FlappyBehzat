function Bird() 
{
    this.img = loadImage('https://i.ibb.co/vswcDLC/behzat.png');
    this.x = 25;
    this.y = 0;
    this.size = 50;
    this.isCrash = false;
    this.gravity = 0.6;
    this.jumpDistance = -15;
    this.velocity = 0;
    this.score = 0;

    this.show = function () 
    {
        image(this.img, this.x, this.y, this.size, this.size);
    }

    this.update = function () 
    {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.size > height) 
        {
            this.isCrash = true;
        }

        if (this.y < 0) 
        {
            this.isCrash = true;
        }
    }

    this.isPassed = function (x, w) 
    {
        if (this.x > x + w) 
        {
            return true;
        }
        return false;
    }

    this.jump = function () 
    {
        this.velocity = this.jumpDistance;
    }

    this.eat = function (type) 
    {
        if (type == 1) 
        {
            this.size += 10; 
        }
        else if(type == 2)
        {
            this.size -= 10;
        }
    }

}