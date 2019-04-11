function Pipe()
{
    this.w = 30;
    this.x = width;
    this.top = random(height/2);
    this.bottom = this.top + 300
    this.speed = 5;

    this.show = function () 
    {
        strokeWeight(0);
        fill(255);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height-this.bottom);
    }

    this.update = function () 
    {
        this.x -= this.speed;
    }

    this.isHit = function (bird) 
    {
        if(bird.y < this.top || bird.y + bird.size > this.bottom)
            if (bird.x + bird.size > this.x && bird.x < this.x + this.w) 
                return true;
        return false;
    }

    this.offScreen = function () 
    {
        if (this.x < -this.w) 
        {
            return true;
        }
        return false;
    }

}