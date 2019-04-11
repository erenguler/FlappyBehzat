function Food() {
    this.img1 = loadImage('https://i.ibb.co/D5szWWz/bira.png');
    this.img2 = loadImage('https://i.ibb.co/7rz8Ypj/oralet.png');
    this.x = width;
    this.y = random(height);
    this.speed = 5;
    this.size = 25;
    this.type = Math.floor(random(2)+1);

    this.show = function () 
    {
        if (this.type == 1) 
        {
            image(this.img1, this.x, this.y, this.size, this.size);
        }
        else if(this.type == 2)
        {
            image(this.img2, this.x, this.y, this.size, this.size);
        }
    }

    this.update = function () 
    {
        this.x -= this.speed;
    }

    this.isHit = function (bird) 
    {
        if(bird.y < this.y + this.size && bird.y + bird.size > this.y)
            if (bird.x + bird.size > this.x && bird.x < this.x + this.size) 
                return true;
        return false;
    }

    this.offScreen = function () 
    {
        if (this.x < -this.size) 
        {
            return true;
        }
        return false;
    }
}