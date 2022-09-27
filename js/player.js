// contiene le impostazioni (altezza, larghezza e margine) 
// per le immagini che verrano visualizzate in sequenza in base all'azione in esecuzione
// tale impostazioni verranno richieste dallo Sketcher
//gli indici delle varie azioni servono per determinare l'immagine da proiettare
function Player(x, y, stepX){
	this.point = new Point(x, y);
	this.stepX = stepX;
	this.life =10;
	this.up = 1;
	this.flagDown = false; //indica se il player è abbassato o meno
	this.direction = 1; //indica se si sta muovendo verse dx o verso sx. Servirà allo Sketcher determinare il verso dell'immagine
	this.finish_index_standing_stance = 4;
	this.finish_index_standing_stance_legs = 4;
	this.index_standing_stance = 1;
	this.index_standing_stance_legs = 1;
	this.width_standing_stance = [30, 30, 29, 29];
	this.height_standing_stance_div = 38;
	this.height_standing_stance = [28, 28, 28, 28];
	this.left_standing_stance = [0, 0, 0, 0];
	this.top_standing_stance =[1, 2, 2, 1];
	this.height_standing_stance_legs = 16;
	this.width_standing_stance_legs = 20;
	this.finish_index_running_right = 6;
	this.index_running_rigth = 1;
	this.finish_index_running_legs_right = 13;
	this.index_running_legs_right = 1;
    this.width_running_legs_right = [20, 20, 30, 33, 20, 16, 17, 22, 28, 32, 20, 16, 20];
    this.width_running = [29, 30, 30, 30, 30, 30];
    this.height_running = 28;
    this.height_running_legs = [17,20,20,17,20,20,20,20,20,17,20,20,20,20,20,20,20,20,20];
	this.finish_index_jumping = 6;
	this.index_jumping = 1;
	this.height_jumping = 25;
	this.width_jumping = 28;
	this.width_jumping_legs = 19;
    this.marginLeft_jumping = -7;
    this.height_jumping_div = [44, 42, 42, 41, 42, 42];
	this.finish_index_reloading = 18;
	this.index_reloading = 1;
    this.width_reloading = [32, 35, 37, 35, 36, 37, 39, 36, 36, 37, 38, 38, 38, 40, 40, 40, 40, 40, 40];
    this.height_reloading = [32, 30, 30, 26, 30, 30, 30, 30, 30, 30, 28, 27, 26, 30, 28, 28, 27, 30];
	this.finish_index_shooting = 9;
	this.index_shooting = 1;
    this.width_shooting = [53, 53, 40, 38, 38, 38, 38, 36, 33];
    this.height_shooting = [25, 25, 25, 25, 25, 25, 25, 25, 25];
	this.finish_index_throwing_bomb = 5;
	this.index_throwing_bomb = 1;
	this.height_throwing_bomb = 28;
    this.width_throwing_bomb = [32, 29, 28, 29, 32, 39, 36, 34, 35];
	this.finish_index_getting_down = 11;
	this.index_getting_down = 1;
    this.height_getting_down = [40, 40, 38, 28, 28, 27, 27, 26, 26, 24, 24];
    this.width_getting_down = [30, 30, 30, 34, 34, 33, 34, 35, 34, 33, 34];
    this.top_getting_down = [-22, -22, -20, -10, -10, -10, -10, -9, -9, -8, -8];
    this.left_getting_down = [-20, -20, -20, -25, -25, -25, -25, -20, -20, -20, -20];
	this.finish_index_getting_down_move = 7;
	this.index_getting_down_move = 1;
    this.top_getting_down_move = -8;
    this.left_getting_down_move = -20;
	this.finish_index_getting_down_shooting = 6;
	this.index_getting_down_shooting = 1;
	this.height_getting_down_shooting = 28;
    this.width_getting_down_shooting = [52, 53, 40, 38, 38, 38];
    this.top_getting_down_shooting = -10;
	this.finish_index_exulting = 4;
	this.index_exulting = 1;
    this.width_exulting = 39;
    this.height_exulting = [42, 44, 43, 43];
    this.top_exulting = -25;
	this.finish_index_stabbing = 6;
	this.index_stabbing = 1;
    this.width_stabbing = [22, 26, 44, 45, 46 ,46];
	this.height_stabbing =[32, 31, 35, 40, 40, 40];
	this.marginLeft_stabbing = [-2, -7, -8, -10, -15, -14];
	this.height_stabbing_div = [38, 38, 40, 52, 52, 56];
	this.top_stabbing_div = [-20, -20, -22, -34, -34, -38];
	this.left_stabbing_div = -20;
	this.finish_index_death = 10;
	this.index_death = 1;
	this.width_death = [35, 41, 43, 47, 48, 48, 47, 48, 48, 50];
	this.height_death = [47, 39, 36, 33, 27, 31, 33, 29, 18, 19]; 
	this.top_death = [-18, -15, -13, -8, -5, -3, -2, -1, 7, 7];
	this.left_death = -20;
	this.finish_index_resuscitate = 32;
	this.index_resuscitate = 1;
	this.width_resuscitate = [49, 47, 44, 45, 43, 39, 33, 32, 31, 30, 30, 29, 28, 28, 27, 26, 26, 26, 28, 41, 25, 23, 23, 25, 24, 23, 23, 24, 23, 21, 23, 21];
	this.height_resuscitate = [18, 18, 19, 21, 22, 29, 33, 33, 31, 31, 31, 33, 31, 31, 32, 33, 35, 36, 39, 39, 40, 41, 42, 41, 41, 41, 41, 41, 41, 40, 41, 41]; 
	this.top_resuscitate = [0, 0, -1, -1, -2, -9,  -13, -13, -11, -11, -11, -13, -11, -11, -12, -13, -15, -16, -19, -19, -20, -21, -22, -21, -21, -21, -21, -21, -21, -22, -21, -21];
	this.height_playerNode_div = 38;
}

// nel caso il giocatore si trovasse in "getting_down" lo step percorso sarebbe ridotto
Player.prototype.Running =
	function(i) {
		var STEP = 0
		if(Math.abs(i) == 1)
			STEP = this.stepX;
		else
			STEP = this.stepX - 2;
		var k = i/(Math.abs(i));
		this.point = new Point(this.point.x + (k*STEP), this.point.y);
	}
	