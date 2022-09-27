function Bomb(x, y, firstX, firstY, img, time, direction){
	this.point = new Point(x, y);
	this.firstX = firstX;
	this.firstY = firstY;
	this.img = img; 
	this.time = time;
	this.direction = direction;
	this.width = [15, 15, 18, 20, 23, 22, 23];
	this.height = [28, 25, 23, 20, 18, 15, 15];
}

//movimento parabolico (considerando il numero delle immagini 7)
Bomb.prototype.move =
	function() {
		this.time += 1;
		var t = this.time;
		var xi = this.firstX;
		var yi = this.firstY;
		var vix = 30;
		var a = 11.8;
		var viy = a*7/2;
		var xf = xi + vix*t*this.direction;
		var yf = yi - (viy*t) + (a*t*t/2); 
		this.point = new Point(xf, yf, this.firstX, this.firstY, this.img, this.time);
	}
