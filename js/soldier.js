// contiene le impostazioni (altezza, larghezza e margine) 
// per le immagini che verrano visualizzate in sequenza in base all'azione in esecuzione
// tale impostazioni verranno richieste dallo Sketcher
function Soldier(x, y, stepX, stop_and_take_gun, loader){
	this.point = new Point(x, y);
	this.stepX = stepX;
	this.life = 3;
	this.loader = loader;
	this.direction = -1;
	this.arms = loader;
	this.stop_and_take_gun = stop_and_take_gun;
	this.flagStandingStance = false;
	this.flagTakeGun = false;
	this.typeDeath; // 0 = SIMPLE DEATH; 1 = DEATH WITH BLOOD
	this.finish_index_running = 12;
	this.index_running = 1;
	this.width_running = [21, 27, 28, 24, 25, 25, 23, 21, 23, 25, 25, 25];
	this.height_running = [40, 39, 39, 38, 39, 40, 40, 40, 39, 39, 39, 40];
	this.finish_index_take_gun = 8;
	this.index_take_gun = 1;
	this.height_take_gun = [38, 38, 40, 41, 45, 36, 37, 37];
	this.width_take_gun = [25, 26, 26, 34, 38, 38, 47, 43];
	this.left_take_gun = [-30, -30, -30, -36, -39, -42, -51, -48];
	this.top_take_gun = [-30, -28, -30, -31, -34, -27, -28, -28];
	this.finish_index_death = 7;
	this.index_death = 1;
	this.height_death = [40, 39, 38, 38, 26, 18, 19];
	this.width_death = [31, 37, 40, 41, 39, 45, 45];
	this.top_death = [-30, -29, -28, -27, -16, -9, -9];
	this.finish_index_death_blood = 15;
	this.height_death_blood = [43, 44, 44, 44, 44, 45, 42, 43, 45, 46, 44, 34, 26, 19, 19];
	this.width_death_blood = [29, 31, 32, 35, 40, 43, 43, 48, 48, 49, 49, 48, 47, 47, 49];
	this.top_death_blood = [-32, -34, -34, -33, -33, -34, -32, -32, -36, -36, -35, -25, -17, -9, -9];
	this.finish_index_standing_stance = 3;
	this.index_standing_stance = 1;
	this.heigth_standing_stance = [38, 37, 36, 35];
	this.width_standing_stance = [26, 28, 27, 25];
	this.left_standing_stance = [3, 0, 0, 0];
	this.top_standing_stance = [2, 3, 3, 4];
	this.finish_index_shooting = 5;
	this.index_shooting = 1;
	this.height_shooting = [38, 38, 36, 35, 41];
	this.width_shooting = [39, 61, 60, 60, 72];
	this.left_shooting = [-42, -64, -63, -63, -70];
	this.top_shooting = [-30, -30, -28, -27, -32];
}

Soldier.prototype.Running =
	function() {
		this.point = new Point(this.point.x + (this.direction*this.stepX), this.point.y);
	}

Soldier.prototype.move =
	function(move){
		this.point = new Point(this.point.x + move, this.point.y);
	}