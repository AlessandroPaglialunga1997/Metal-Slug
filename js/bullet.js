function Bullet(x, y, stepX, direction){
	this.point = new Point(x, y);
	this.stepX = stepX;
	this.direction = direction;
}

Bullet.prototype.move =
	function() {
		this.point = new Point(this.point.x + (this.direction*this.stepX), this.point.y);
	}