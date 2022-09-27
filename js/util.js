// COSTANTI //
var PLAYER_RADIUS = 20;
var PLAYGROUND_HEIGHT = 360;
var PLAYGROUND_WIDTH = 3476;
var PLAYGROUND_FIRST_STEP = 672; 
var PLAYGROUND_SECOND_STEP = 1822;
var PLAYGROUND_THIRD_STEP = 3335;
var PLAYGROUNDWRAPPER_WIDTH = 700;
var playerOffsetLeft = 10;
var playerOffsetLeftStart = 90;
var playerOffsetDownStart = 85;
var STEP_PLAYER = 5;
var STEP_DOWN_PLAYER = 3;
var STEP_PLAYGROUND = STEP_PLAYER; 
var SOLDIER_RADIUS = 30;
var STEP_SOLDIER = STEP_PLAYER;
var POINT = 32;
var BOSS_RADIUS = 35;
var SLOW_DOWN_STANDING_STANCE = 8;
var SLOW_DOWN_RUNNING = 4;
var SLOW_DOWN_JUMPING = 4;
var SLOW_DOWN_THROWING_BOMB = 3;
var SLOW_DOWN_RELOADING = 3;
var SLOW_DOWN_BOMB = 3;
var SLOW_DOWN_EXPLOSION = 2;
var SLOW_DOWN_GETTING_DOWN = 1;
var SLOW_DOWN_SHOOTING = 2;
var SLOW_DOWN_EXULTING = 5;
var SLOW_DOWN_TIMER = 50;
var SLOW_DOWN_STABBING = 3;
var SLOW_DOWN_DEATH = 3;
var SLOW_DOWN_SCORE = 1;
var SLOW_DOWN_COUNTDOWN = 50;
var SLOW_DOWN_RESUSCITATE = 3;
var RELOADING_ARMS = 8;
var RELOADING_BOMBS = 5;
var SLOW_DOWN_CREATE_SOLDIER = 100;
var SLOW_DOWN_RUNNING_SOLDIER = 4;
var SLOW_DOWN_TAKE_GUN_SOLDIER = 5;
var SLOW_DOWN_SHOOTING_SOLDIER = 3;
var SLOW_DOWN_DEATH_SOLDIER = 3;
var SLOW_DOWN_DISAPPEAR_SOLDIER = 80;
var SLOW_DOWN_DEATH_BLOOD_SOLDIER = 3;
var SLOW_DOWN_LEAVE_GUN_SOLDIER = 5;
var SLOW_DOWN_MOVE_BOSS = 5;
var SLOW_DOWN_SHOOTING_BOSS = 8;
var SLOW_DOWN_DEATH_BOSS = 3;
// COSTANTI //

function Point(x,y){
	this.x = x;
	this.y = y;
}

function ParabolicMotion(yi, xi, vyi, vxi, a, t) {
		yf = yi - (vyi*t) + (a*t*t/2); 
		xf = xi + vxi*t;
		return new Point(xf, yf);
	}

function is_numeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function is_int(n){
  if (!is_numeric(n)) return false
  else return (n % 1 == 0);
}

//crea un oggetto con le seguenti informazioni per facilitare la ricerca delle immagine allo Sketcher
function InfoPathImages(firstname, secondname, numberOfImages, indexOfArray){
	this.firstname = firstname;
	this.secondname = secondname;
	this.numberOfImages = numberOfImages;
	this.indexOfArray = indexOfArray;
}

//maschera il div di login e mostra il div di registrazione
function goToRegister() {
	document.getElementById("fieldset_login").style.display = "none";
	document.getElementById("buttonToRegister").style.display = "none";
	document.getElementById("hr").style.display = "none";
	document.getElementById("manualeUtente").style.display = "none";
	document.getElementById("fieldset_register").style.display = "block";
}	
