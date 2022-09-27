var playgroundTimer = null;
var playerTimer = null;
var playerBulletsBombsTimer = null;
var soldierTimer = null;
var soldierBulletsTimer = null;
var gameTimer = null;
var bossBulletsTimer = null;
var bossTimer = null;
var game = null;

//funzione chiamata al caricamento della pagina
function begin(){
	game = new Game(); //istanzia il gioco
	game.createPlayground(); //crea il playground, istazia il giocatore e inizializza delle variabili utili per il disegno
	gameTimer = setInterval('game.clockGame()', 20);
	playerTimer = setInterval('game.clockPlayer()', 20); //si occupa di controllare se è stato premuto uno o più tasti, 
	game.start(game);
														   //in base ai quali richiama le funzioni opportune
}
//contiene le variabili e le funzioni necessarie per l'esecuzione del gioco
function Game(){
	this.screen = document.getElementById("screen");
	this.playgroundWrapper = document.getElementById("playgroundWrapper");
	this.playground = document.getElementById("playground0");
	this.bust = document.getElementById("playerBust");
	this.lifeBar = document.getElementById("lifeBar0"); 
	this.lifeBarWidth = 120;
	this.level = 1;
	this.player = null; //lo inizializzo al momento della creazione del playground
	this.score = 0;
	this.newScore = this.score;
	this.counterArms = RELOADING_ARMS;
	this.counterBomb = RELOADING_BOMBS;
	this.sketcher = new Sketcher();
	this.bullets = new Array();
	this.bulletsSoldier = new Array();
	this.bombs = new Array();
	this.explosions = new Array();
	this.soldiers = new Array();
	this.number_soldier = 3;
	this.boss = null;
	this.bulletsBoss = new Array();
	this.flagGameOver = false;
	//flag per ogni tasto della tastiera di intersse
	this.flagA = false; this.flagW = false; this.flagD = false; this.flagK = false; this.flagSpaceBar = false; this.flagZ = false; this.flagL = false; this.flagS = false; this.flagM = false; this.flagFinishLevel = false; this.flagEnter = false; this.flagDeath = false;
	//indice per rallentare l'esecuzione di disegno.
	this.index_slow_down_player = SLOW_DOWN_STANDING_STANCE;
	this.index_slow_down_player_running = SLOW_DOWN_RUNNING;
	this.index_slow_down_bomb = SLOW_DOWN_BOMB; 
	this.index_slow_down_explosion = SLOW_DOWN_EXPLOSION;
	this.index_slow_down_soldier = SLOW_DOWN_RUNNING_SOLDIER;
	this.index_slow_down_create_soldire = SLOW_DOWN_CREATE_SOLDIER; 
	this.index_slow_down_running_soldier = SLOW_DOWN_RUNNING_SOLDIER; 
	this.index_slow_down_take_gun_soldier = SLOW_DOWN_TAKE_GUN_SOLDIER; 
	this.index_slow_down_shooting_soldier = SLOW_DOWN_SHOOTING_SOLDIER; 
	this.index_slow_down_death_soldier = SLOW_DOWN_DEATH_SOLDIER; 
	this.index_slow_down_death_blood_soldier = SLOW_DOWN_DEATH_BLOOD_SOLDIER; 
	this.index_slow_down_boss = SLOW_DOWN_MOVE_BOSS;
	this.slow_down_disappear_soldier = 0; 
	this.index_slow_down_leave_gun_soldier = SLOW_DOWN_LEAVE_GUN_SOLDIER; 
	this.index_slow_down_score = SLOW_DOWN_SCORE; 
	this.index_slow_down_countdown = SLOW_DOWN_COUNTDOWN; 
	this.index_slow_down_shift_playground = SLOW_DOWN_RUNNING - 1;
	//flag di utilizzo grafico per l'ostacolo del primo livello
	this.flagPlayerFirstStep = false;
	window.addEventListener('keydown', this.handlerKeyDown.bind(this), false);
	window.addEventListener('keyup', this.handlerKeyUp.bind(this), false);
	//timer in alto al centro
	this.timer = 60; this.index_slow_down_timer = 0;
	//variabili di controllo per il salto 
	this.time=0;
	this.flagJumping = false; 
	this.y_iniziale = 0; 
	this.x_iniziale = 0; 
	this.vyi_iniziale = 0;

	this.countdown = 10; //countdown per resuscitare
	this.flagBoss = false; //superato un step diventa true e arriva il boss finale del livello
}

//istanzia offset in base allo schermo, il player, il boss e disegna il campo da gioco
Game.prototype.createPlayground =
	function() {
		playgroundOffsetY = this.playground.offsetTop; 
		this.player = new Player(PLAYER_RADIUS + playerOffsetLeftStart, PLAYGROUND_HEIGHT + playgroundOffsetY - PLAYER_RADIUS - playerOffsetDownStart, STEP_PLAYER, PLAYER_RADIUS);
		this.sketcher.drawPlayground(this.level, this.player);
		playgroundOffsetX = this.playground.offsetLeft;
		this.boss = new Boss(PLAYGROUNDWRAPPER_WIDTH, PLAYGROUND_HEIGHT - BOSS_RADIUS, 5, -1);
		this.boss.point = new Point(this.boss.point.x + playgroundOffsetX, this.boss.point.y + playgroundOffsetY);
		this.player.point = new Point(this.player.point.x + playgroundOffsetX, this.player.point.y);
		this.sketcher.drawSides();
	}

//ogni flag rappresenta un tasto, ogni tasto può essere premuto solo in determinate condizioni
//per evitare combinazioni non permesse come sparare e lanciare una bomba contemporaneamente
Game.prototype.handlerKeyDown =
	function(e) {
		e = (!e) ? window.event: e;
		var key= (e.which!= null) ? e.which: e.keyCode;
		var nothing = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false  && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagA = this.flagA == true && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagW = this.flagA == false && this.flagW == true && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagS = this.flagA == false && this.flagW == false && this.flagS == true && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagD = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == true && this.flagL == false && this.flagK == false && this.flagM == false && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagL = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == true && this.flagK == false && this.flagM == false && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagK = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == true && this.flagM == false && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagM = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == true && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagSpaceBar = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false && this.flagSpaceBar == true && this.flagZ == false && this.flagGameOver == false;
		var onlyFlagZ = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false && this.flagSpaceBar == false && this.flagZ == true && this.flagGameOver == false;
		//console.log(key);
		switch (key){
			case 13: if(this.player.life <= 0 && this.flagDeath == false || this.flagFinishLevel == true)
						this.flagEnter = true;
					break;
			case 32: if((nothing || onlyFlagD || onlyFlagA) && (this.counterBomb !== 0) && this.player.life >= 0){
						this.index_slow_down_player = SLOW_DOWN_THROWING_BOMB;
						this.flagSpaceBar = true; 
					}
					 break;
			case 65: if((nothing || onlyFlagW || onlyFlagS || onlyFlagL || onlyFlagK || onlyFlagM || onlyFlagSpaceBar) && this.player.life >= 0){
						this.index_slow_down_player_running = SLOW_DOWN_RUNNING;
						this.flagA = true; 
					}
					 break;
			case 68: if((nothing || onlyFlagW || onlyFlagS || onlyFlagL || onlyFlagK || onlyFlagM || onlyFlagSpaceBar)&& this.player.life >= 0){
						this.index_slow_down_player_running = SLOW_DOWN_RUNNING;
						this.flagD = true; 
					}
					 break;
			case 75: if((nothing || onlyFlagA || onlyFlagS || onlyFlagD) && (this.counterArms !== 0) && this.player.life >= 0 && (this.boss == null || (this.boss !== null && this.flagS == false))){
						this.index_slow_down_player = SLOW_DOWN_SHOOTING;
						this.flagK = true; 
					}
					 break;
			case 76: if((nothing || onlyFlagA || onlyFlagD)&& this.player.life >= 0){
						this.index_slow_down_player = SLOW_DOWN_RELOADING;
						this.flagL = true; 
					}
					 break;
			case 77: if((nothing || onlyFlagA || onlyFlagD)&& this.player.life >= 0){
						this.index_slow_down_player = SLOW_DOWN_STABBING;
						this.flagM = true; 
					}
					 break;
			case 83: if(nothing && this.player.life >= 0){
						this.index_slow_down_player = SLOW_DOWN_GETTING_DOWN;
						this.flagS = true; 
					}
					 break;
			case 87: if((nothing || onlyFlagA || onlyFlagD) && this.player.life >= 0){
						this.index_slow_down_player = SLOW_DOWN_JUMPING;
						this.flagW = true; 
						this.y_iniziale = this.player.point.y; 
						this.x_iniziale = this.player.point.x;
						this.vyi_iniziale = 3*11/2;
					}break;

		}
	}

Game.prototype.handlerKeyUp =
	function(e) {
		e = (!e) ? window.event: e; //Explorer -> !e
		var key= (e.which!= null) ? e.which: e.keyCode;var nothing = this.flagA == false && this.flagW == false && this.flagS == false && this.flagD == false && this.flagL == false && this.flagK == false && this.flagM == false  && this.flagSpaceBar == false && this.flagZ == false && this.flagGameOver == false;
				switch (key){
			case 65: this.flagA = false; break;
			case 68: this.flagD = false; break;
			case 83: this.flagS = false; break;
		}
	}

Game.prototype.start =
	function(game){
		playerBulletsBombsTimer = setInterval('game.clockPlayerBulletsBombs()', 20);
		soldierTimer = setInterval('game.clockSoldier()', 20); //fa muovere i soldati
		soldierBulletsTimer = setInterval('game.clockSoldierBullets()', 20);
		bossTimer = setInterval('game.clockBoss()', 20);
		bossBulletsTimer = setInterval('game.clockBossBullents()', 20);
	}

//alla fine del gioco o alla morte del player il popup mostrerà un bottone reset che ripristinerà il gioco
Game.prototype.reset = 
	function(){
		clearInterval(bossTimer);
		clearInterval(bossBulletsTimer);
		clearInterval(playerBulletsBombsTimer);
		clearInterval(gameTimer);
		clearInterval(playerTimer);
		this.DeleteAllSoldiers();
		this.DeleteBoss();
		this.DeleteAllBulletsSoldier();
		this.playground.style.opacity = 1;
		STEP_PLAYGROUND = STEP_PLAYER;
		document.getElementById("gameOver").style.opacity = 0;
		document.body.style.background = 'url("./../css/img/sfondo/sfondo_body.jpg")';
		this.sketcher.drawScore(0, 0, 0, 0, 0, 0);
		this.lifeBarWidth = 120;
		this.lifeBar.style.width = this.lifeBarWidth + 'px';
		begin();
	}

//alla fine del gioco o alla morte del player il popup mostrerà un bottone exit che porterà al login
Game.prototype.exit =
	function(){
		history.back();
	}

Game.prototype.clockGame =
	function() {
		if(this.level == 1)
			this.PlayerFirstStepLevel1(); //controlla l superamento del primo step del livello uno
		this.updateArmsBombsAndScore(); //aggiorna le informazioni visibili al giocatore riguardo il suo equipaggiamento
		this.shiftPlaygroundAndSoldier(); //quando il player è al centro e corre verso destra in realtà rimane al centro e il resto scorre verso sx
		this.updateTimerView(); //aggiorna il timer, se arriva a 0 il player perde, mano mano che uccide soldati si incrementa
		this.bossIsComing(); //superato un determinato punto inizia ad arrivare il boss
		this.clockCountdown(); //quando muore il player e quest'ultimo ha ancora delle vite a disposizione ha 10 sec per premere invio e riprendere il punto che aveva lasciato
								//"negli anni 90 si davano 10 secondi per inserire un nuovo gettone.. erano altri tempi"
		this.checkPositionSoldiersAndPlayer(); //se il giocatore supera un soldato quest'ultimo si girerà verso il giocatore settando la direzione del soldato 
		this.manageNewLevel(); //serve per il ripristino di alcune variabili quando si passa a un nuovo livello
		this.checkPositionBossAndPlayer(); //se il giocatore supera il boss quest'ultimo si girerà verso il giocatore settando la direzione del boss 
	}

Game.prototype.PlayerFirstStepLevel1 =
	function() {
		if(PLAYGROUND_FIRST_STEP - ((this.screen.clientWidth - 700)/2) + parseInt(this.playground.style.marginLeft) <= (PLAYGROUNDWRAPPER_WIDTH/2) && this.flagPlayerFirstStep == false && this.flagW == false){
			this.player.index_jumping = this.player.finish_index_jumping;
			this.y_iniziale = PLAYGROUND_HEIGHT + playgroundOffsetY - PLAYER_RADIUS - playerOffsetDownStart;
			this.vyi_iniziale = -3.3*1.8/2;
			this.x_iniziale = this.player.point.x;
			this.flagJumping = true;
			this.flagW = true;
			this.flagPlayerFirstStep = true;
		}
	}

Game.prototype.shiftPlaygroundAndSoldier =
	function(){ 
		if(parseInt(this.playground.style.marginLeft) + PLAYGROUND_WIDTH - playgroundOffsetX - PLAYGROUND_HEIGHT*2 <= 0)
			STEP_PLAYGROUND = 0;
		if(this.flagD == true && !(this.player.point.x < playgroundOffsetX + (PLAYGROUNDWRAPPER_WIDTH/2) || STEP_PLAYGROUND == 0 && this.player.point.x < playgroundOffsetX+PLAYGROUNDWRAPPER_WIDTH - 120) && !(this.index_slow_down_shift_playground == SLOW_DOWN_RUNNING - 1))
				this.index_slow_down_shift_playground++;
		else if(this.flagD == true && !(this.player.point.x < playgroundOffsetX + (PLAYGROUNDWRAPPER_WIDTH/2) || STEP_PLAYGROUND == 0 && this.player.point.x < playgroundOffsetX+PLAYGROUNDWRAPPER_WIDTH - 120) && (this.index_slow_down_shift_playground == SLOW_DOWN_RUNNING - 1)){
				this.index_slow_down_shift_playground = 0;
				this.sketcher.shiftPlayground();
				this.ShiftSoldiers();
		}
	}

Game.prototype.updateArmsBombsAndScore =
	function(){
		this.sketcher.drawCounterArms(parseInt(this.counterArms/100), parseInt(this.counterArms/10), this.counterArms%10);
		this.sketcher.drawCounterBombs(parseInt(this.counterBomb/10), this.counterBomb%10);
		this.Score();
	}

Game.prototype.updateTimerView =
	function(){
		if(this.timer !== 0){
			if(this.flagFinishLevel == false){
				if(this.index_slow_down_timer == SLOW_DOWN_TIMER){
					this.timer -= 1;
					this.sketcher.drawTimer(Math.floor(this.timer/10), this.timer%10);
					this.sketcher.drawCredit(this.timer%2);
					this.index_slow_down_timer = 0;
				}else
					this.index_slow_down_timer += 1;
			}
		}else{
			this.clearTimer();
			this.GameOver();
		}
	}

Game.prototype.bossIsComing =
	function(){
		if(parseInt(this.playground.style.marginLeft) + PLAYGROUND_WIDTH - playgroundOffsetX - PLAYGROUND_HEIGHT*2 <= 0){
				this.flagBoss = true;
				this.number_soldier = 0;
		}
	}

Game.prototype.clockCountdown =
	function(){
		var count = this.index_slow_down_countdown % SLOW_DOWN_COUNTDOWN;
		if(this.player.life <= 0 && this.flagDeath == false && this.countdown !== 0){
			if(count == 0){
				this.countdown -= 1;
				if(this.countdown % 2 == 0) 
					document.getElementById("labelCountdown").style.display = "none";
				else
					document.getElementById("labelCountdown").style.display = "inline";
				document.getElementById("numberCountdown").style.display = "inline";
				document.getElementById("numberCountdown").src = "./../css/img/number1/number"+ this.countdown +".png"
				if(this.countdown == 0){
					this.GameOver();
					document.getElementById("labelCountdown").style.display = "none";
					document.getElementById("numberCountdown").style.display = "none";
				}
			}
			this.index_slow_down_countdown = count + 1;
		}
	}

Game.prototype.checkPositionSoldiersAndPlayer =
	function(){
		for(var i=0; i<this.soldiers.length; i++){
			if(this.soldiers[i].point.x + 20 <= this.player.point.x && this.soldiers[i].life !== 0 && this.soldiers[i].direction !== 1)
				this.soldiers[i].direction = 1;
			if(this.soldiers[i].point.x + SOLDIER_RADIUS + this.soldiers[i].stop_and_take_gun <= this.player.point.x && this.soldiers[i].life !== 0 && this.soldiers[i].direction == 1){
				this.soldiers[i].flagStandingStance = false;
				this.soldiers[i].flagTakeGun = false;
				this.soldiers[i].arms = this.soldiers[i].loader;
				this.soldiers[i].index_shooting = 1;
			}
			if(this.soldiers[i].point.x - 40 >= this.player.point.x && this.soldiers[i].life !== 0 && this.soldiers[i].direction !== -1)
				this.soldiers[i].direction = -1;
			if(this.soldiers[i].point.x - SOLDIER_RADIUS - this.soldiers[i].stop_and_take_gun >= this.player.point.x && this.soldiers[i].life !== 0 && this.soldiers[i].direction == -1){
				this.soldiers[i].flagStandingStance = false;
				this.soldiers[i].flagTakeGun = false;
				this.soldiers[i].arms = this.soldiers[i].loader;
				this.soldiers[i].index_shooting = 1;
			}
		}
	}

Game.prototype.checkPositionBossAndPlayer =
	function(){
		if(this.boss.point.x + 20 <= this.player.point.x && this.boss.life !== 0 && this.boss.direction !== 1){
			this.boss.direction = 1;
			this.boss.index_shooting = 1;
		}
		if(this.boss.point.x - 40 >= this.player.point.x && this.boss.life !== 0 && this.boss.direction !== -1){
			this.boss.direction = -1;
			this.boss.index_shooting = 1;
		}
	}

Game.prototype.manageNewLevel =
	function(){
		if(this.flagFinishLevel == true && this.flagEnter == true)
			if(this.level == 3){
				this.flagEnter = false;
				createPopup(this.newScore, this);
			}
			else{
				this.manageSoldiersForNewLevel(); 
				this.manageBossForNewLevel();
				this.managePlayerForNewLevel();
				this.setVariablesForNewLevel();
			}
	}

Game.prototype.manageBossForNewLevel =
	function(){
		clearInterval(bossTimer);
		clearInterval(bossBulletsTimer);
		this.boss.life = this.boss.totalLife + this.level*2;
		this.boss.flagShooting = false;
		this.flagBoss = false;
		this.boss.flagDeath = true;
		this.DeleteBoss();
		this.boss = new Boss(playgroundOffsetX + PLAYGROUNDWRAPPER_WIDTH, PLAYGROUND_HEIGHT - BOSS_RADIUS + playgroundOffsetY, 5);

	}

Game.prototype.manageSoldiersForNewLevel =
	function(){
		this.number_soldier = 3 + this.level - 1;
		this.DeleteAllSoldiers();
		this.DeleteAllBulletsSoldier();
		this.soldiers=[];
		this.bulletsSoldier=[];
	}

Game.prototype.managePlayerForNewLevel =
	function(){
		clearInterval(playerBulletsBombsTimer);
		this.player.life = 10;
		this.player.point = new Point(PLAYER_RADIUS + playerOffsetLeftStart + playgroundOffsetX, PLAYGROUND_HEIGHT + playgroundOffsetY - PLAYER_RADIUS*2 - 10);
	}

Game.prototype.setVariablesForNewLevel =
	function(){
		this.level += 1; //aumenta il livello. La difficoltà è basata sul livello
		this.timer = 60 - (this.level * 5); //ad ogni livello il giocatore ha meno tempo
		this.counterArms = RELOADING_ARMS;
		this.counterBomb = RELOADING_BOMBS;
		this.flagEnter = false;
		this.flagFinishLevel = false;
		this.lifeBarWidth = 120;
		this.lifeBar.style.width = this.lifeBarWidth + 'px';
		this.start(game);
		STEP_PLAYGROUND = STEP_PLAYER; //alla fine del livello precedente il playground si era fermato perchè STEP_PLAYGROUND = 0;
		document.body.style.background = 'url("./../css/img/sfondo/sfondo_body.jpg")';
		document.getElementById("level").innerText = "LEVEL " + this.level;
		this.sketcher.drawPlayground(this.level, this.player);
	}

//in base hai tasti premuti vengono settati i relativi flag
//in base ai flag settati parte sempre e solo una funzione che presenta l'azione del giocatore
//gli indici delle varie azioni servono per determinare l'immagine da proiettare
Game.prototype.clockPlayer =
	function() {
		this.PlayerStandingStance();
		this.PlayerRunning();
		this.PlayerJumping();
		this.PlayerShooting();
		this.PlayerThrowingBomb();
		this.PlayerReloading();
		this.PlayerGettingDown();
		this.PlayerStabbing();
		this.PlayerIsHit();
		if(this.boss !== null)
			this.PlayerExulting();
		this.PlayerDeath();
		this.PlayerResuscitate();
	}

//chiama la funzione che disegna il player
Game.prototype.PlayerAction =
	function(index_action, finish_index_action, count, type_action, direction, move, jumping){
		var increment = 0;
		if(count == 0){
			increment = 1;
			this.sketcher.drawPlayer(this.player, type_action);
			if((move == 1 || move == -1 || move == 2 || move == -2))
				this.player.Running(move);
			if(jumping !== null){
				var parabolicPoint = new Point();
				this.time += 1;
				this.x_iniziale += move*STEP_PLAYER;
				parabolicPoint = ParabolicMotion(this.y_iniziale, this.x_iniziale, this.vyi_iniziale, 0, 3.3, this.time);
				this.player.point = new Point(parabolicPoint.x, parabolicPoint.y);
				if(index_action == finish_index_action && direction == 1) //&& direction == 1
					return -(finish_index_action-1);
				if(index_action == 1 && direction == -1)
					return finish_index_action - 1;
				increment = direction;
			}
			else
				if(index_action == finish_index_action)
					return -(finish_index_action-1);
		}
		return increment;
	}

//la logica per tutte le azioni è la stessa, incremento l'indice dell'azione e chiamo la funzione disegnatore con gli opportuni parametri

//quando non viene premuto nessun tasto
Game.prototype.PlayerStandingStance =
	function() {
		if(this.flagA == false && this.flagW == false && this.flagD == false && this.flagK == false && this.flagSpaceBar == false && this.flagZ == false && this.flagL == false && this.flagS == false && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){
			this.player.flagDown = false;
			this.player.index_running_right = 1;
			var count = this.index_slow_down_player % SLOW_DOWN_STANDING_STANCE;
			this.player.index_standing_stance += this.PlayerAction(this.player.index_standing_stance, this.player.finish_index_standing_stance, count, "standing_stance", null, null, null);
			this.player.index_standing_stance_legs += this.PlayerAction(this.player.index_standing_stance_legs, this.player.finish_index_standing_stance_legs, count, "standing_stance_legs", null, null, null);
			this.index_slow_down_player = count + 1;
		}
	}

//quando preme A o D
Game.prototype.PlayerRunning =
	function(){
		if((this.flagA == true || this.flagD == true) && this.flagW == false && this.flagK == false && this.flagSpaceBar == false && this.flagZ == false && this.flagL == false && this.flagS == false && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){	
			var count = this.index_slow_down_player_running % (SLOW_DOWN_RUNNING - 1);
			this.player.direction = (this.flagA) ? -1 : 1;
			this.player.index_running_right += this.PlayerAction(this.player.index_running_right, this.player.finish_index_running_right, count, "running_right", null, null, null);
			this.RunningLegs(this.player.direction);
		}
	}

//il player è divisio in due: corpo e gambe. Per ognuna delle quali deve essere chiamata la funzione
//di disegno perchè sono due div diversi
Game.prototype.RunningLegs =
	function(){
		var move = null;
		if(this.player.direction == 1)
			if((this.player.point.x < playgroundOffsetX + (PLAYGROUNDWRAPPER_WIDTH/2)) || (STEP_PLAYGROUND == 0 && this.player.point.x < playgroundOffsetX+PLAYGROUNDWRAPPER_WIDTH - 120)) //!!!!COSTANTE
				move = 1;
		if(this.player.direction == -1)
			if(this.player.point.x > PLAYER_RADIUS + playgroundOffsetX + playerOffsetLeft)
				move = -1;
		var count = this.index_slow_down_player_running % (SLOW_DOWN_RUNNING - 1);
		this.player.index_running_legs_right += this.PlayerAction(this.player.index_running_legs_right, this.player.finish_index_running_legs_right, count, "running_legs_right", null, move, null);
		this.index_slow_down_player_running = count + 1;
	}

//quando preme W (se sta fermo, va verso SX o verso DX)
Game.prototype.PlayerJumping =
	function(){
		if(this.flagW == true && this.flagK == false && this.flagSpaceBar == false && this.flagZ == false && this.flagL == false && this.flagS == false && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){
			if(this.flagD && ((this.player.point.x < playgroundOffsetX + (PLAYGROUNDWRAPPER_WIDTH/2)) || (STEP_PLAYGROUND == 0 && this.player.point.x < playgroundOffsetX+PLAYGROUNDWRAPPER_WIDTH - 120)))
				this.Jumping(1, "jumping");
			else if(this.flagA && this.player.point.x > PLAYER_RADIUS + playgroundOffsetX + playerOffsetLeft)
				this.Jumping(-1, "jumping");
			else
				this.Jumping(0, "jumping");
		}
	}

Game.prototype.Jumping =
	function(move){
		var direction = (this.flagJumping == false) ? 1 : -1;
		var count = this.index_slow_down_player % SLOW_DOWN_JUMPING;
		this.player.index_jumping += this.PlayerAction(this.player.index_jumping, this.player.finish_index_jumping, count, "jumping", direction, move, 1);
		this.PlayerAction(this.player.index_jumping, this.player.finish_index_jumping, count, "jumping_legs", direction, null, null, null)
		this.flagJumping = (this.player.index_jumping == this.player.finish_index_jumping) ? true : this.flagJumping;
		if(this.player.index_jumping == 1){
			this.flagW = false;
			this.time = 0;
			this.flagJumping = false;
			this.index_slow_down_player = SLOW_DOWN_JUMPING;
		}else
			this.index_slow_down_player = count + 1;
	}

//quando preme K (se sta fermo, va verso SX o verso DX)
Game.prototype.PlayerShooting =
	function(){
		if(this.flagW == false && this.flagK == true && this.flagSpaceBar == false && this.flagZ == false && this.flagL == false && this.flagS == false && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){
			if(this.flagA)
				this.player.direction = -1;
			if(this.flagD)
				this.player.direction = 1;
			this.Shooting(this.player, 20*this.player.direction, -12, this.bullets, null, null);
			if(this.flagA || this.flagD)
				this.RunningLegs();
			this.PlayerResetShooting();
		}
	}

Game.prototype.PlayerResetShooting =
	function(){
		if(this.player.index_shooting !== 1)
			this.flagK = true;
		else{
			this.flagK = false;
			this.counterArms -= 1;
			this.index_slow_down_player = SLOW_DOWN_SHOOTING;
		}
	}

Game.prototype.Shooting =
	function(subject, offsetX, offsetY, bullets){
		var count = this.index_slow_down_player % SLOW_DOWN_SHOOTING;
		if(count == 0)
			this.CreateBullets(subject, bullets, subject.point.x + offsetX, subject.point.y + offsetY, this.player.direction);
		subject.index_shooting += this.PlayerAction(subject.index_shooting, subject.finish_index_shooting, count, "shooting", null, null, null);
		this.index_slow_down_player = count + 1;
	}

//quando preme SpaceBar(se sta fermo, va verso SX o verso DX)
Game.prototype.PlayerThrowingBomb =
	function(){
		if(this.flagW == false && this.flagK == false && this.flagSpaceBar == true && this.flagZ == false && this.flagL == false && this.flagS == false && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){
			if(this.flagA)
				this.player.direction = -1;
			if(this.flagD)
				this.player.direction = 1;
			this.ThrowingBomb();
			if(this.flagA || this.flagD)
				this.RunningLegs();
		}
	}

Game.prototype.ThrowingBomb =
	function(){
		var count = this.index_slow_down_player % SLOW_DOWN_THROWING_BOMB;
		if(count == 0)
			this.CreateBomb();
		this.player.index_throwing_bomb += this.PlayerAction(this.player.index_throwing_bomb, this.player.finish_index_throwing_bomb, count, "throwing_bomb", null, null, null);
		this.index_slow_down_player = count + 1;
		if(this.player.index_throwing_bomb !== 1)
			this.flagSpaceBar = true;
		else{
			this.counterBomb -= 1;
			this.flagSpaceBar = false;
			this.index_slow_down_player = SLOW_DOWN_THROWING_BOMB;
		}
	}

//quando preme L (se sta fermo, va verso SX o verso DX)
Game.prototype.PlayerReloading =
	function(){
		if(this.flagW == false && this.flagK == false && this.flagSpaceBar == false && this.flagZ == false && this.flagL == true && this.flagS == false && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){
			if(this.flagA)
				this.player.direction = -1;
			if(this.flagD)
				this.player.direction = 1;
			this.Reloading();
			if(this.flagA || this.flagD)
				this.RunningLegs();
		}
	}

Game.prototype.Reloading =
	function(){
		var count = this.index_slow_down_player % SLOW_DOWN_RELOADING;
		this.player.index_reloading += this.PlayerAction(this.player.index_reloading, this.player.finish_index_reloading, count, "reloading", null, null, null);
		if(this.player.index_reloading == this.player.finish_index_reloading)
			this.counterArms = RELOADING_ARMS;
		this.index_slow_down_player = count + 1;
		if(this.player.index_reloading !== 1)
			this.flagL = true;
		else{
			this.flagL = false;
			this.index_slow_down_player = SLOW_DOWN_RELOADING;
		}
	}

//quando preme S (se sta fermo)
Game.prototype.PlayerGettingDown =
	function(){
		if(this.flagW == false && this.flagSpaceBar == false && this.flagZ == false && this.flagL == false && this.flagS == true && this.flagM == false && this.player.life > 0 && this.flagFinishLevel == false){
			if(this.flagA){
				this.player.direction = -1;
				this.PlayerGettingDownMove();
			}else if(this.flagD){
				this.player.direction = 1;
				this.PlayerGettingDownMove();
			}
			else{
				if(this.flagK){
					this.GettingDownShooting();
					return;
				}
				if(this.player.flagDown == true)
					this.player.index_getting_down = 11;
				var count = this.index_slow_down_player % SLOW_DOWN_GETTING_DOWN;
				this.player.index_getting_down += this.PlayerAction(this.player.index_getting_down, this.player.finish_index_getting_down, count, "getting_down", null, null, null);
				if(this.player.index_getting_down == this.player.finish_index_getting_down)
					this.player.flagDown = true;
				this.index_slow_down_player = count + 1;
			}
		}
	}

//quando preme S (se va verso SX o verso DX)
Game.prototype.PlayerGettingDownMove =
	function(){
		var move = null;
		if(this.player.direction == 1)
			if((this.player.point.x < playgroundOffsetX + (PLAYGROUNDWRAPPER_WIDTH/2)) || (STEP_PLAYGROUND == 0 && this.player.point.x < playgroundOffsetX+PLAYGROUNDWRAPPER_WIDTH - 120)) //!!!!COSTANTE
				move = 2;
		if(this.player.direction == -1)
			if(this.player.point.x > PLAYER_RADIUS + playgroundOffsetX + playerOffsetLeft)
				move = -2;
		var count = this.index_slow_down_player % SLOW_DOWN_RUNNING;
		this.player.index_getting_down_move += this.PlayerAction(this.player.index_getting_down_move, this.player.finish_index_getting_down_move, count, "getting_down_move", null, move, null);
		this.index_slow_down_player = count + 1;
	}

//quando preme S e K
Game.prototype.GettingDownShooting =
	function(){
		var count = this.index_slow_down_player % SLOW_DOWN_SHOOTING;
		if(count == 0)
			this.CreateBullets(this.player, this.bullets, this.player.point.x + 25*this.player.direction, this.player.point.y - 2, this.player.direction);
		this.player.index_getting_down_shooting += this.PlayerAction(this.player.index_getting_down_shooting, this.player.finish_index_getting_down_shooting, count, "getting_down_shooting", null, null, null);
		this.index_slow_down_player = count + 1;
		if(this.player.index_getting_down_shooting !== 1)
			this.flagK = true;
		else{
			this.flagK = false;
			this.counterArms -= 1;
			this.index_slow_down_player = SLOW_DOWN_SHOOTING;
		}
	}

Game.prototype.PlayerStabbing =
	function(){
		if(this.flagW == false && this.flagK == false && this.flagSpaceBar == false && this.flagZ == false && this.flagL == false && this.flagS == false && this.flagM == true && this.player.life > 0 && this.flagFinishLevel == false){
			if(this.flagA)
				this.player.direction = -1;
			if(this.flagD)
				this.player.direction = 1;
			this.Stabbing();
			if(this.flagA || this.flagD)
				this.RunningLegs();
		}
	}

//quando preme M (se sta fermo, va verso SX o verso DX)
Game.prototype.Stabbing =
	function(){
		var count = this.index_slow_down % SLOW_DOWN_STABBING;
		this.player.index_stabbing += this.PlayerAction(this.player.index_stabbing, this.player.finish_index_stabbing, count, "stabbing", 1, null, null, null, null, null);
		this.index_slow_down = count + 1;
		if(this.player.index_stabbing !== 1)
			this.flagM = true;
		else{
			this.flagM = false;
			this.index_slow_down = SLOW_DOWN_STABBING;
		}
	}

//quando finisce il livello
Game.prototype.PlayerExulting =
	function() {
		if(this.boss.life <= 0){
			clearInterval(soldierTimer); 
			clearInterval(soldierBulletsTimer);
			this.flagFinishLevel = true;
			document.body.style.background = ((this.player.index_exulting % 2) == 0) ? 'blue' : 'red';
			var count = this.index_slow_down_player % SLOW_DOWN_EXULTING;
			this.player.index_exulting += this.PlayerAction(this.player.index_exulting, this.player.finish_index_exulting, count, "exulting", 1, null, null);
			this.index_slow_down_player = count + 1;

		}
	}

//il player può essere colpito o da un soldato o dal boss
//in entrambi i casi si effettua un controllo della posizione del player (x e y)
//e la posizione delle pallottole del boss e del soldato
Game.prototype.PlayerIsHit =
	function(){
		if(this.player.life > 0){
			this.PlayerIsHitBySoldier();
			this.PlayerIsHitByBoss();
		}
	}

Game.prototype.PlayerIsHitBySoldier =
	function(){
		for(j=0; j<this.bulletsSoldier.length; j++)
			if(this.bulletsSoldier[j].point.x <= (this.player.point.x + PLAYER_RADIUS/2) && this.bulletsSoldier[j].point.x >= (this.player.point.x) && this.flagS == false && this.bulletsSoldier[j].point.y <= this.player.point.y + PLAYER_RADIUS/2){ 
				this.DeleteBullet(this.bulletsSoldier, "bulletSoldier", j);
				if(this.player.life <= 2){
					this.flagDeath = true;
					this.time = 0;
					this.index_slow_down_player = SLOW_DOWN_DEATH;
				}
				this.player.life -= 1;
				this.lifeBarWidth -= 12;
				this.lifeBar.style.width = this.lifeBarWidth + 'px';
			}
	}

Game.prototype.PlayerIsHitByBoss =
	function(){
		for(j=0; j<this.bulletsBoss.length; j++)
			if(this.bulletsBoss[j].point.x <= (this.player.point.x + PLAYER_RADIUS/2) && this.bulletsBoss[j].point.x >= (this.player.point.x) && this.flagS == false && this.bulletsBoss[j].point.y <= this.player.point.y + PLAYER_RADIUS/2){ 
				this.DeleteBullet(this.bulletsBoss, "bulletBoss", j);
				if(this.player.life <= 2){
					this.flagDeath = true;
					this.time = 0;
					this.index_slow_down_player = SLOW_DOWN_DEATH;
				}
				this.player.life -= 2;
				this.lifeBarWidth -= 24;
				this.lifeBar.style.width = this.lifeBarWidth + 'px';
			}
	}

//è un'azione come le altre. finita l'animazione viene chiamata la funzione Lose
Game.prototype.PlayerDeath =
	function(){
		var count = this.index_slow_down_player % SLOW_DOWN_DEATH;
		if(this.player.life <= 0 && this.flagDeath == true){
			this.player.index_death += this.PlayerAction(this.player.index_death, this.player.finish_index_death, count, "death", 1, null, null);
			this.index_slow_down_player = count + 1;
			if(this.player.index_death == 1 &&  count == 0){
				this.flagDeath = false;
				this.Lose();
				this.index_slow_down_resuscitate_player = SLOW_DOWN_RESUSCITATE;
			}
		}
	}

//è un'azione come le altre che però ripristina il gioco che si era temporaneamente fermato
Game.prototype.PlayerResuscitate = 
	function(){
		if(this.flagEnter == true && this.flagFinishLevel == false){
			this.countdown = 0;
				if(this.player.index_resuscitate == 1){
					this.player.up -= 1;
					document.getElementById("numberLife").src = "./../css/img/number0/number"+ this.player.up +".png";
				}
				var count = this.index_slow_down_resuscitate_player % SLOW_DOWN_RESUSCITATE;
				this.player.index_resuscitate += this.PlayerAction(this.player.index_resuscitate, this.player.finish_index_resuscitate, count, "resuscitate", 1, null, null);
				this.index_slow_down_resuscitate_player = count + 1;
				if(this.player.index_resuscitate !== 1)
					this.flagEnter = true;
				else{
					this.flagEnter = false;
					document.getElementById("labelCountdown").style.display = "none";
					document.getElementById("numberCountdown").style.display = "none";
					this.player.life = 10;
					this.lifeBarWidth = 120;
					this.lifeBar.style.width = this.lifeBarWidth + 'px';
					this.playground.style.opacity = 1;
					this.start();
				}
		}
	}

Game.prototype.Score =
	function(){
		var numberScore0 = 0;
		var numberScore1 = 0;
		var numberScore2 = 0;
		var numberScore3 = 0;
		var numberScore4 = 0;
		var numberScore5 = 0;
		if(this.score !== this.newScore)
			if(this.index_slow_down_score == SLOW_DOWN_SCORE){
				this.score += 1;
				numberScore0 = this.score % 10;
				numberScore1 = Math.floor((this.score % 100)/10);
				numberScore2 = Math.floor((this.score % 1000)/100);
				numberScore3 = Math.floor((this.score % 10000)/1000);
				numberScore4 = Math.floor((this.score % 100000)/10000);
				numberScore5 = Math.floor((this.score % 1000000)/100000);
				this.sketcher.drawScore(numberScore0, numberScore1, numberScore2, numberScore3, numberScore4, numberScore5);
				this.index_slow_down_score = 0;
			}else
				this.index_slow_down_score += 1;
	}

Game.prototype.Lose =
	function(){
		this.clearTimer();
		this.playground.style.opacity = 0.3;
		if(this.player.up != 0){
			this.countdown = 10;
		}else
			this.GameOver();
	}

Game.prototype.clearTimer =
	function(){
		clearInterval(playerBulletsBombsTimer);
		clearInterval(soldierTimer); 
		clearInterval(soldierBulletsTimer); 
		clearInterval(bossTimer);
		clearInterval(bossBulletsTimer);
	}

Game.prototype.GameOver =
	function(){
		clearInterval(gameTimer); 
		clearInterval(playerTimer);
		this.playground.style.opacity = 0.3;
		this.DeleteAllSoldiers();
		this.DeleteAllBulletsSoldier();
		this.DeleteBoss();
		this.flagGameOver = true;
		createPopup(this.newScore, this); 
		document.getElementById("gameOver").style.opacity = 1;
	}

//aggiorna la posizione di pallottole, bombe e esplosioni, eventualmente le elimina
Game.prototype.clockPlayerBulletsBombs =
	function(){
		if(this.bullets.length !== 0){
			this.moveBullets(this.bullets, "bullet");
			this.ControlBullets(this.bullets, "bullet");}

		if(this.bombs.length !== 0){
			this.moveBombs();
			this.deleteBombs()}

		if(this.explosions.length !== 0){
			this.moveExplosion();
			this.deleteExplosion();}
	}

Game.prototype.CreateBullets =
	function(subject, bullets, x, y, direction){
		if(subject.index_shooting == 3 || subject.index_getting_down_shooting == 3)
			bullets.push(new Bullet(x, y, 5, direction));
	}

Game.prototype.moveBullets =
	function(bullets, idBullet) {
		for(var i=0; i<bullets.length; i++){
			bullets[i].move();
			if(idBullet == "bullet") this.sketcher.drawBullet(bullets[i], i, idBullet, "red");
			else if (idBullet == "bulletBoss") this.sketcher.drawBullet(bullets[i], i, idBullet, "blue")
			else this.sketcher.drawBullet(bullets[i], i, idBullet, "black")
		}
	}

Game.prototype.ControlBullets =
	function(bullets, idBullet) {
		for(var i = 0; i < bullets.length; i++)
			if(bullets[0].point.x > PLAYGROUNDWRAPPER_WIDTH + playgroundOffsetX || bullets[0].point.x < playgroundOffsetX - 5)
				this.DeleteBullet(bullets, idBullet, i);
	}

Game.prototype.DeleteBullet =
	function(bullets, idBullet, i){
		bullets.splice(i,1);
		bulletNodeFirst = document.getElementById(idBullet + i);
		if(bulletNodeFirst !== null) bulletNodeFirst.parentNode.removeChild(bulletNodeFirst);
		bulletNodeLast = document.getElementById(idBullet + (bullets.length));
		if(bulletNodeLast !== null) bulletNodeLast.parentNode.removeChild(bulletNodeLast);
	}

Game.prototype.CreateBomb =
	function(){
		if(this.player.index_throwing_bomb == 4){
			var x, y;
			var x = this.player.point.x - 10;
			var y = this.player.point.y - 10;
			this.bombs.push(new Bomb(x, y, x, y + PLAYER_RADIUS, 0, 0, this.player.direction));
		}
	}

Game.prototype.moveBombs =
	function() {
		var count = this.index_slow_down_bomb % SLOW_DOWN_BOMB;
		if(count == 0){
			for(var i=0; i<this.bombs.length; i++){
				this.bombs[i].move();
				if(this.bombs[i].img !== 7)
					this.bombs[i].img = this.bombs[i].img + 1;
				else
					this.bombs[i].img = 1;
				this.sketcher.drawBomb(this.bombs[i], i);
			}
		}
		this.index_slow_down_bomb = count + 1;
	}

Game.prototype.deleteBombs =
	function() {
		if(this.bombs[0].img == 7){
			this.explosions.push(new Explosion(this.bombs[0].point.x, this.bombs[0].point.y, 0))
			this.bombs.splice(0,1);
			bombsNodeFirst = document.getElementById("bomb" + (0));
			bombsNodeFirst.parentNode.removeChild(bombsNodeFirst);
			if(this.bombs.length !== 0){
				bombsNodeLast = document.getElementById("bomb" + (this.bombs.length));
				bombsNodeLast.parentNode.removeChild(bombsNodeLast);
			}
		}
	}

Game.prototype.moveExplosion =
	function() {
		var count = this.index_slow_down_explosion % SLOW_DOWN_EXPLOSION;
		if(count == 0){
			for(var i=0 ; i<this.explosions.length; i++){
				if(this.explosions[i].img !== 21){
					if((this.player.point.x == playgroundOffsetX + (PLAYGROUNDWRAPPER_WIDTH/2)) && (this.flagD == true))
						this.explosions[i].point = new Point(this.explosions[i].point.x - STEP_PLAYER, this.explosions[i].point.y);
					this.explosions[i].img = this.explosions[i].img + 1;
					this.sketcher.drawExplosion(this.explosions[i], i);
				}
			}
		}
		this.index_slow_down_explosion = count + 1;
	}

Game.prototype.deleteExplosion =
	function() {
		if(this.explosions[0].img == 21){
			this.explosions.splice(0,1);
			explosionNodeFirst = document.getElementById("explosion" + 0);
			explosionNodeFirst.parentNode.removeChild(explosionNodeFirst);
			if(this.explosions.length !== 0){
				explosionNodeLast = document.getElementById("explosion" + (this.explosions.length));
				explosionNodeLast.parentNode.removeChild(explosionNodeLast);
			}
		}
	}

Game.prototype.clockSoldier =
	function() {
		//ogni due secondi c'è il 50% di probabilità che venga generato un soldato
		//istanza di un soldato e inserimento nell'array
		//(il soldato arriva da destra)
		this.SoldierCreate();
		if(this.soldiers.length !== 0){
			//per ogni soldato presente, nel caso si trovi ad una distanza maggiore di DISTANCE_RUN px dal player, deve correre fino a quest'utimo
			//finchè non si trova o a FIRST_DISTANCE_TAKE_GUN o a SECOND_DISTANCE_TAKE_GUN o THIRD_DISTANCE_TAKE_GUN px di distanza, stabilito da un valore randomico
			this.SoldierRunning();
			//se il soldato è fermo e non ha ha preso l'arma, prende l'arma
			this.SoldierTakeGun();
			//lascia l'arma per ricaricare
			this.SoldierLeaveGun();
			//se il soldato è fermo e ha l'arma, spara
			this.SoldierShooting();
			//se il soldato viene colpito dal coltello, muore
			this.SoldierIsHitWithKnife();
			//se la vita del soldato è a 0, muore
			this.SoldierDeathWithGun();
		}
		if(this.soldiers.length !== 0) 
			//se il soldato viene pugnalato, muore
			this.SoldierDeathBlood();
		//se il soldato viene colpito da un proiettile, la sua vita diminuisce di un punto
		if(this.soldiers.length !== 0 && this.bullets.length !== 0)
			this.SoldierIsHitWithBullet();
		//se il soldato viene colpito da una bomba, muore
		if(this.soldiers.length !== 0 && this.explosions.length !== 0)
			this.SoldierIsHitWithBomb();
	}

Game.prototype.SoldierCreate =
	function() {
		var count = this.index_slow_down_create_soldire % SLOW_DOWN_CREATE_SOLDIER;
		if(count == 0){
			if(this.flagPlayerFirstStep == true && Math.random()*4 >= (1/this.level) && this.number_soldier !== 0) //this.flagPlayerFirstStep == true && 
				if(this.player.point.x < playgroundOffsetX + PLAYGROUNDWRAPPER_WIDTH - 130){
					this.soldiers.push(new Soldier(playgroundOffsetX + PLAYGROUNDWRAPPER_WIDTH, PLAYGROUND_HEIGHT + playgroundOffsetY - SOLDIER_RADIUS - 10, STEP_SOLDIER, this.SoldierStop(), 1*this.level));
					this.number_soldier -= 1;
				}
		}
		this.index_slow_down_create_soldire = count + 1;
	}

Game.prototype.ShiftSoldiers =
	function(){
		for(i=0; i<this.soldiers.length; i++)
			if(true)
				this.soldiers[i].move(-STEP_PLAYGROUND);
	}

Game.prototype.SoldierStop =
	function(){
		var index_for_distance_player_ = Math.floor(Math.random()*3);
		var distance_player_ = 0;
		switch (index_for_distance_player_){
			case 0: distance_player_ = 100; break;
			case 1: distance_player_ = 200; break;
			case 2: distance_player_ = 300; break;
		}
		
		return distance_player_;
	}

Game.prototype.SoldierAction =
	function(index_action, finish_index_action, count, type_action, direction, move, i){
		this.sketcher.drawSoldier(this.soldiers[i], type_action, i);
		if(index_action == finish_index_action && direction == 1)
			return -(finish_index_action-1);
		if(index_action == 1 && direction == -1)
			return finish_index_action - 1;
		if((move == 1 || move == -1 || move == 2 || move == -2)) //move !== null
			this.soldiers[i].Running();
		return direction;
	}

Game.prototype.SoldierRunning =
	function(){
		var count = this.index_slow_down_running_soldier % SLOW_DOWN_RUNNING_SOLDIER;
		if(count == 0)
			for(var i=0; i<this.soldiers.length; i++)
				if(this.soldiers[i].flagStandingStance == false && this.soldiers[i].life > 0){
					if(this.soldiers[i].direction == -1){
						if(this.soldiers[i].point.x < (this.player.point.x + this.soldiers[i].stop_and_take_gun))
							this.soldiers[i].flagStandingStance = true;
					}else{
						if(this.soldiers[i].point.x > (this.player.point.x - this.soldiers[i].stop_and_take_gun))
							this.soldiers[i].flagStandingStance = true;
					}
					this.soldiers[i].index_running += this.SoldierAction(this.soldiers[i].index_running, this.soldiers[i].finish_index_running, count, "running_left", 1, -2, i);
				}
		this.index_slow_down_running_soldier = count + 1;
	}

Game.prototype.SoldierTakeGun =
	function(){
		var count = this.index_slow_down_take_gun_soldier % SLOW_DOWN_TAKE_GUN_SOLDIER;
		if(count == 0)
			for(var i=0; i<this.soldiers.length; i++)
				if(this.soldiers[i].flagStandingStance == true && this.soldiers[i].flagTakeGun == false && this.soldiers[i].life > 0){
					this.soldiers[i].index_take_gun += this.SoldierAction(this.soldiers[i].index_take_gun, this.soldiers[i].finish_index_take_gun, count, "take_gun", 1, null, i);
					if(this.soldiers[i].index_take_gun == this.soldiers[i].finish_index_take_gun)
						this.soldiers[i].flagTakeGun = true;				
				}
		this.index_slow_down_take_gun_soldier = count + 1;;
	}

Game.prototype.SoldierLeaveGun =
	function(){
		var count = this.index_slow_down_leave_gun_soldier % SLOW_DOWN_LEAVE_GUN_SOLDIER;
		if(count == 0)
			for(var i=0; i<this.soldiers.length; i++)
				if(this.soldiers[i].flagStandingStance == true && this.soldiers[i].flagTakeGun == true && this.soldiers[i].life > 0 && this.soldiers[i].arms == 0){
					this.soldiers[i].index_take_gun += this.SoldierAction(this.soldiers[i].index_take_gun, this.soldiers[i].finish_index_take_gun, count, "take_gun", -1, null, i);
					if(this.soldiers[i].index_take_gun == 1){
						this.soldiers[i].flagTakeGun = false;
						this.soldiers[i].arms = this.soldiers[i].loader;
					}
				}
		this.index_slow_down_leave_gun_soldier = count + 1;;
	}

Game.prototype.SoldierShooting =
	function(){
		var count = this.index_slow_down_shooting_soldier % SLOW_DOWN_SHOOTING_SOLDIER;
		if(count == 0){
			for(var i=0; i<this.soldiers.length; i++)
				if(this.soldiers[i].flagTakeGun == true && this.soldiers[i].life > 0 && this.soldiers[i].arms !== 0){
					if(this.soldiers[i].index_shooting == 3){
						this.soldiers[i].arms -= 1;
						this.CreateBullets(this.soldiers[i], this.bulletsSoldier, this.soldiers[i].point.x + - SOLDIER_RADIUS - 10, this.soldiers[i].point.y + - SOLDIER_RADIUS + 5, this.soldiers[i].direction);
					}
					this.soldiers[i].index_shooting += this.SoldierAction(this.soldiers[i].index_shooting, this.soldiers[i].finish_index_shooting, count, "shooting", 1, null, i);
				}
		}
		this.index_slow_down_shooting_soldier = count + 1;
	}

Game.prototype.SoldierDeathWithGun =
	function(){
		this.SoldierDeath(0, this.soldiers[0].finish_index_death);
	}

Game.prototype.SoldierDeath =
	function(typeDeath, finish_index_action){
		var typeDeathAction = (typeDeath == 0) ? "death" : "death_blood";
		var count = this.index_slow_down_death_soldier % SLOW_DOWN_SHOOTING_SOLDIER;
		if(count == 0)
			for(var i=0; i<this.soldiers.length; i++)
				if(this.soldiers[i].life == 0 && this.soldiers[i].typeDeath == typeDeath)
					if(this.soldiers[i].index_death == finish_index_action)
						setTimeout(this.DeleteSoldier(i), 2000);
					else
						this.soldiers[i].index_death += this.SoldierAction(this.soldiers[i].index_death, finish_index_action, count, typeDeathAction, 1, null, i);

		this.index_slow_down_death_soldier = count + 1;
	}

Game.prototype.SoldierDeathBlood =
	function(){
		this.SoldierDeath(1, this.soldiers[0].finish_index_death_blood);
	}

Game.prototype.DeleteSoldier =
	function(i){
		this.number_soldier += 1;
		this.soldiers.splice(i,1);
		soldierNodeFirst = document.getElementById("soldier" + i);
		soldierNodeFirst.parentNode.removeChild(soldierNodeFirst);
		if(this.soldiers.length !== 0){
			soldierNodeLast = document.getElementById("soldier" + (this.soldiers.length));
			if(soldierNodeLast !== null) soldierNodeLast.parentNode.removeChild(soldierNodeLast);
		}
	}

Game.prototype.DeleteAllSoldiers =
	function(){
		var soldierNode = null;
		for(var i=0; i<this.soldiers.length; i++){
			soldierNode = document.getElementById("soldier" + i);
			if(soldierNode !== null)soldierNode.parentNode.removeChild(soldierNode);
		}
	}

Game.prototype.DeleteAllBulletsSoldier =
	function(){
		var bulletSoldierNode = null;
		for(var i=0; i<this.bulletsSoldier.length; i++){
			bulletSoldierNode = document.getElementById("bulletSoldier" + i);
			if(bulletSoldierNode !== null)bulletSoldierNode.parentNode.removeChild(bulletSoldierNode);
		}
	}

Game.prototype.SoldierIsHitWithBullet =
	function(){
		for(i=0; i<this.soldiers.length; i++)
			if(this.soldiers[i].life > 0)	
				for(j=0; j<this.bullets.length; j++)
					if(this.bullets[j].point.x >= this.soldiers[i].point.x - SOLDIER_RADIUS && this.bullets[j].point.x <= this.soldiers[i].point.x - 20 && this.bullets[j].point.y >= this.soldiers[i].point.y - SOLDIER_RADIUS){ 
						this.DeleteBullet(this.bullets, "bullet", j);
						this.soldiers[i].life -= 1;
						if(this.soldiers[i].life == 0){
							this.soldiers[i].typeDeath = 0;
							this.newScore += POINT;
							this.timer += 4;
						}
					}
	}

Game.prototype.SoldierIsHitWithBomb =
	function(){
		for(i=0; i<this.soldiers.length; i++)
			if(this.soldiers[i].life > 0)	
				for(j=0; j<this.explosions.length; j++)
					if(this.explosions[j].point.x >= (this.soldiers[i].point.x - SOLDIER_RADIUS*2) && this.explosions[j].point.x <= this.soldiers[i].point.x && this.explosions[j].img == 1){ 
						this.soldiers[i].life = 0;
						this.soldiers[i].typeDeath = 1;
						this.newScore += POINT/2;
						this.timer += 2;
					}
	}

Game.prototype.SoldierIsHitWithKnife =
	function(){
		for(i=0; i<this.soldiers.length; i++)
			if(this.soldiers[i].life > 0)	
				if(this.player.point.x >= (this.soldiers[i].point.x - SOLDIER_RADIUS) && this.player.point.x <= this.soldiers[i].point.x && this.flagM == true){ 
					this.soldiers[i].life = 0;
					this.soldiers[i].typeDeath = 1;
					this.newScore += POINT/2;
					this.timer += 2;
				}
	}

Game.prototype.clockSoldierBullets =
	function(){
		if(this.bulletsSoldier.length !== 0){
			this.moveBullets(this.bulletsSoldier, "bulletSoldier");
			this.ControlBullets(this.bulletsSoldier, "bulletSoldier");}
	}

Game.prototype.clockBoss =
	function(){
		if(this.flagBoss == true){ // diventa true dopo che il giocatore a superato un determinato punto
			this.BossMove(); // sposta il boss verso il giocatore fino ad un determinato punto
			this.BossShooting(); //se il boss è fermo, spara
			//se il boss viene colpito la sua vita viene decrementat
			//anche qui viene fatto un controllo sulle posizioni di pallottola e boss
			this.BossIsHitWhitBullet();
			this.BossIsHitWhitBomb();
			this.BossDeath();
		}
	}

Game.prototype.BossAction =
	function(index_action, finish_index_action, count, type_action, direction, move){
		this.sketcher.drawBoss(this.boss, type_action);
		if(index_action == finish_index_action && direction == 1)
			return -(finish_index_action-1);
		if(index_action == 1 && direction == -1)
			return finish_index_action - 1;
		if((move == 1 || move == -1 || move == 2 || move == -2))
			this.boss.Running(move);
		return direction;
	}

Game.prototype.BossMove =
	function(){
		if(this.boss.flagShooting == false && this.boss.life > 0){
			var count = this.index_slow_down_boss % SLOW_DOWN_MOVE_BOSS;
			if(count == 0)
				if(this.boss.point.x <= PLAYGROUNDWRAPPER_WIDTH + playgroundOffsetX - BOSS_RADIUS - 150){
					this.boss.flagShooting = true;
					this.index_slow_down_boss = SLOW_DOWN_SHOOTING_BOSS;
				 }
				else
					this.boss.index_running_left += this.BossAction(this.boss.index_running_left, this.boss.finish_index_running_left, count, "running", 1, -1);
			this.index_slow_down_boss = count + 1;
		}
	}

Game.prototype.BossShooting =
	function(){
		if(this.boss.flagShooting == true && this.boss.life > 0){
			var count = this.index_slow_down_boss % SLOW_DOWN_SHOOTING_BOSS;
			if(count == 0){
				var x_bullet;
				if(this.boss.direction < 0)
					x_bullet = this.boss.point.x - BOSS_RADIUS - 10;
				else
					x_bullet = this.boss.point.x + BOSS_RADIUS - 10;
				this.CreateBullets(this.boss, this.bulletsBoss, x_bullet, this.boss.point.y + BOSS_RADIUS - 70, this.boss.direction);
				this.boss.index_shooting += this.BossAction(this.boss.index_shooting, this.boss.finish_index_shooting, count, "shooting", 1, 0);
			}
			this.index_slow_down_boss = count + 1;
		}
	}

Game.prototype.BossIsHitWhitBullet =
	function(){
		if(this.boss.life > 0)	
			for(j=0; j<this.bullets.length; j++)
				if(this.bullets[j].point.x >= this.boss.point.x - BOSS_RADIUS && this.bullets[j].point.x <= this.boss.point.x + BOSS_RADIUS){ 
					this.DeleteBullet(this.bullets, "bullet", j);
					this.boss.life -= 1;
					if(this.boss.life <= 0){
						this.index_slow_down_player = SLOW_DOWN_EXULTING;
						this.newScore += POINT*10;
						this.index_slow_down_boss = SLOW_DOWN_DEATH_BOSS;
					}
				}
	}

Game.prototype.BossIsHitWhitBomb =
	function(){
		if(this.boss.life > 0)	
			for(j=0; j<this.explosions.length; j++)
				if(this.explosions[j].point.x >= (this.boss.point.x - BOSS_RADIUS*2) && this.explosions[j].point.x <= this.boss.point.x && this.explosions[j].img == 1){ 
					this.boss.life -= 3;
					if(this.boss.life <= 0){
						this.index_slow_down_player = SLOW_DOWN_EXULTING;
						this.newScore += POINT*10;
						this.index_slow_down_boss = SLOW_DOWN_DEATH_BOSS;
					}
				}
	}

Game.prototype.BossDeath =
	function(){
		if(this.boss.life <= 0 && this.boss.flagDeath == false){
			var count = this.index_slow_down_boss % SLOW_DOWN_DEATH_BOSS;
			if(count == 0)
				if(this.index_slow_down_boss == SLOW_DOWN_DEATH_BOSS){
					this.boss.index_death += this.BossAction(this.boss.index_death, this.boss.finsh_index_boss, count, "death", 1, 0);
					if(this.boss.index_death == this.boss.finish_index_death)
						this.boss.flagDeath = true;
				}
			this.index_slow_down_boss = count + 1;
		}
	}

Game.prototype.DeleteBoss =
	function(){
		var bossNode = null;
		if(this.flagFinishLevel == true && this.flagEnter == true && this.boss.flagDeath == true){	
			this.boss = null;
			bossNode = document.getElementById("boss");
			bossNode.parentNode.removeChild(bossNode);
		}
	}

Game.prototype.clockBossBullents =
	function(){
		if(this.bulletsBoss.length !== 0){
				this.moveBullets(this.bulletsBoss, "bulletBoss");
				this.ControlBullets(this.bulletsBoss, "bulletBoss");	
		}
	}
