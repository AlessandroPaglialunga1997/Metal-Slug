// contiene le impostazioni (altezza, larghezza e margine) 
// per le immagini che verrano visualizzate in sequenza in base all'azione in esecuzione
// tale impostazioni verranno richieste dallo Sketcher
function Boss(x, y, stepX, direction){
	this.point = new Point(x, y);
	this.stepX = stepX;
	this.life = 10;
	this.direction = direction;
	this.flagShooting = false;
	this.flagDeath = false;
	this.finish_index_running_left = 4;
	this.index_running_left = 1;
	this.height_running = [42,42,42,42];
	this.width_running = [70,70,70,70];
	this.finish_index_shooting = 6;
	this.index_shooting = 1;
	this.height_shooting = [43,38,41,40,40,44];
	this.width_shooting = [72,72,72,74,72,73];
	this.finish_index_death = 15;
	this.index_death = 1;
	this.height_death = [42,43,49,56,57,61,66,65,67,67,68,64,42,41,41];
	this.width_death = [76,73,74,74,75,73,76,72,73,74,74,74,78,78,79];
	this.top_death = [-30,-31,-37,-44,-45,-49,-54,-53,-55,-55,-56,-52,-30,-30,-30];
}

Boss.prototype.Running =
	function(i) {
		this.point = new Point(this.point.x + (i*this.stepX), this.point.y);
	}