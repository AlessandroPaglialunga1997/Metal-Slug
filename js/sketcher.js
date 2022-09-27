
var ArrayOfInfoPathsImages = [];
var Images = [];

//istanzia gli elementi che cambieranno forma e immagine durante il gioco, per poterli cambiare dinamicamente 
//in modo più leggibile
function Sketcher(){
	this.loadImages();
	this.playgroundWrapper = document.getElementById("playgroundWrapper");
	this.playground = document.getElementById("playground0");
	this.playgroundFollowing = document.getElementById("playground1");
	this.firstBlock = document.getElementById("firstBlock");
	this.numberScore0 = document.getElementById("numberScore0");
	this.numberScore1 = document.getElementById("numberScore1");
	this.numberScore2 = document.getElementById("numberScore2");
	this.numberScore3 = document.getElementById("numberScore3");
	this.numberScore4 = document.getElementById("numberScore4");
	this.numberScore5 = document.getElementById("numberScore5");
	this.lifeBar0 = document.getElementById("lifeBar0"); 
	this.lifeBar1 = document.getElementById("lifeBar1"); 
	this.lifeDiv = document.getElementById("life"); 
	this.secondBlock = document.getElementById("secondBlock");
	this.numberTimer0 = document.getElementById("numberTimer0");
	this.numberTimer1 = document.getElementById("numberTimer1");
	this.credit = document.getElementById("credit");
	this.thirdBlock = document.getElementById("thirdBlock");
	this.playerNode = document.getElementById("player");
	this.playerLegsNode = document.getElementById("playerLegs");
	this.playerBustNode = document.getElementById("playerBust"); 
	this.numberLife = document.getElementById("numberLife");
	this.screen = document.getElementById("screen");
	this.gameOverImg = document.getElementById("gameOver");
}

//carica le immagini necessarie al gioco su un unico array indicizzato
//per evitare ritardi
Sketcher.prototype.loadImages= 
	function(){
		//tali array rispecchiano le cartelle all'interno del percorso ./../css/img/
		var firstnamePathArray = ["number0", "number1", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "player", "soldier", "soldier", "soldier", "soldier", "soldier", "soldier", "boss", "boss", "boss"];
		var secondnamePathArray = [null, null, "bomb", "death", "explosion", "exulting", "getting_down", "getting_down_move", "getting_down_shooting", "jumping", "jumping_legs", "reloading", "resuscitate", "running", "running_legs_right", "shooting", "stabbing", "standing_stance", "standing_stance_legs", "throwing_bomb", "death", "death_blood", "running", "shooting", "standing_stance", "take_gun", "death", "running", "shooting"];
		var numberOfImagesArray = [12, 10, 7, 10, 21, 4, 11, 7, 6, 6, 6, 18, 32, 6, 13, 10, 6, 4, 4, 5, 7, 15, 12, 5, 4, 8, 15, 4, 6];

		var contatore = 0; //serve ad indicare in che posizione si trova nell'array Images la prima immagine di quella cartella
		for(var i=0; i<firstnamePathArray.length; i++){
			ArrayOfInfoPathsImages.push(new InfoPathImages(firstnamePathArray[i], secondnamePathArray[i], numberOfImagesArray[i], contatore));
			contatore += numberOfImagesArray[i];
		}  

		for(var i=0; i<ArrayOfInfoPathsImages.length; i++)
			for(var j=1; j<=ArrayOfInfoPathsImages[i].numberOfImages; j++){
				var img = new Image();
				if(ArrayOfInfoPathsImages[i].secondname == null)
					img.src = "./../css/img/"+ ArrayOfInfoPathsImages[i].firstname + "/number" + (j-1) + ".png";
				else 
					img.src = "./../css/img/"+ ArrayOfInfoPathsImages[i].firstname +"/" + ArrayOfInfoPathsImages[i].secondname +"/" + ArrayOfInfoPathsImages[i].secondname + "" + j + ".png";
				Images.push(img);
			}
	}  

//dato il nome della prima cartella dopo css/img e di quella successiva
//restituisce la posizione nell'array Images la prima immagine di quella cartella
Sketcher.prototype.findFirstIndexOfImage =
	function(firstname, secondname){
		for (var i = 0; i < ArrayOfInfoPathsImages.length; i++)
			if(firstname == ArrayOfInfoPathsImages[i].firstname && secondname == ArrayOfInfoPathsImages[i].secondname)
				return ArrayOfInfoPathsImages[i].indexOfArray;
	}  

Sketcher.prototype.drawPlayground =
	function(level, player) {
		this.playgroundWrapper.style.height = (PLAYGROUND_HEIGHT + 100)+ 'px';
		this.playground.style.height = PLAYGROUND_HEIGHT + 'px';
		this.playground.style.width = PLAYGROUND_WIDTH + 'px';
		this.playground.style.backgroundImage = "url(./../css/img/sfondo/livello" + level + ".png)";
		this.playground.style.marginLeft = (this.screen.clientWidth - 700)/2 + 'px';
		this.firstBlock.style.marginLeft = ((this.screen.clientWidth - 700)/2 + 30) + 'px';
		this.numberScore0.style.display = "inline";
		this.numberScore1.style.display = "none";
		this.numberScore2.style.display = "none";
		this.numberScore3.style.display = "none";
		this.numberScore4.style.display = "none";
		this.numberScore5.style.display = "none";
		this.lifeDiv.style.marginTop = 25 + 'px';
		this.lifeBar1.style.backgroundColor = "none";
		this.lifeBar1.style.borderColor = "grey";
		this.lifeBar1.style.borderRadius = 10 + 'px';
		this.lifeBar1.style.borderStyle = "solid";
		this.lifeBar1.style.borderWidth = 2 + 'px';
		this.lifeBar0.style.backgroundColor = "red";
		this.lifeBar0.style.borderRadius = 10 + 'px';
		this.lifeBar0.style.borderStyle = "solid";
		this.lifeBar0.style.borderWidth = 2 + 'px';
		this.thirdBlock.style.marginTop = (PLAYGROUND_HEIGHT + window.innerWidth*0.01 + 15) + 'px';
		this.thirdBlock.style.fontSize = 25 + 'px';
		this.thirdBlock.style.left = (this.playground.offsetLeft + PLAYGROUNDWRAPPER_WIDTH - 250) + 'px';
		SHIFT_PLAYGROUND_FIXED = -this.playground.offsetLeft;
		SHIFT_PLAYGROUND = SHIFT_PLAYGROUND_FIXED;
		this.playerLegsNode.style.bottom = 0 + 'px';
		this.playerBustNode.style.top = 0 + 'px';
		this.numberArms3Node = document.getElementById("numberArms3");
		this.numberArms2Node = document.getElementById("numberArms2");
		this.numberArms1Node = document.getElementById("numberArms1");
		this.numberBomb2Node = document.getElementById("numberBomb2");
		this.numberBomb1Node = document.getElementById("numberBomb1");
		this.numberLife.src = "./../css/img/number0/number" + player.up + ".png";
		this.gameOverImg.style.marginTop = (window.innerWidth*0.01 + 50) + "px";
	} 

Sketcher.prototype.drawTimer =
	function(deci, unit){
		this.numberTimer1.src ="./../css/img/number0/number" + deci + ".png";
	 	this.numberTimer0.src ="./../css/img/number0/number" + unit + ".png";
	}  

//effetto compare/scompare
Sketcher.prototype.drawCredit =
	function(flag){
		if(flag == 1)
			this.credit.style.display = "none";
		else
			this.credit.style.display = "inline";			
	} 

//quando il giocatore arriva al centro dello schermo l'immagina sottostante (il playground) scorre verso sinistra
//andando a decrementare il margine sinistro
Sketcher.prototype.shiftPlayground =
	function() {
		this.playground.style.marginLeft = (parseInt(this.playground.style.marginLeft) - STEP_PLAYGROUND) + 'px';
	} 

//il playground scorre su tutta la schermata. Per mostrare lo scorrimento solo su una parte dello schermo
//(quella centrale) aggiungo sopra, ai lati, dei div colorati che nascondono parte del playground
Sketcher.prototype.drawSides =
	function() {
		var sideLeft1 = document.getElementById('sideLeft1');
		var sideLeft2 = document.getElementById('sideLeft2');
		var sideRight1 = document.getElementById('sideRight1');
		var sideRight2 = document.getElementById('sideRight2');
		sideLeft1.style.backgroundImage = 'url("./../css/img/sfondo/sfondo_body.jpg")';
		sideLeft1.style.width = (window.innerWidth*0.1) + "px";
		sideLeft1.style.marginLeft = -(window.innerWidth*0.1) + "px";
		sideLeft1.style.height = 410 + "px"; //360 di playground più 50 di offsetTop
		sideLeft2.style.background = "black";
		sideLeft2.style.width = parseInt(this.playground.style.marginLeft) + "px";
		sideLeft2.style.marginLeft = 0 + "px";
		sideLeft2.style.height = 410 + "px";
		sideLeft2.style.borderRadius = 30 + "px";
		sideRight1.style.background = "black";
		sideRight1.style.width = parseInt(this.playground.style.marginLeft) + "px";
		sideRight1.style.marginLeft = (this.screen.clientWidth - parseInt(this.playground.style.marginLeft)) + "px";
		sideRight1.style.height = 410 + "px";
		sideRight1.style.borderRadius = 30 + "px";
		sideRight2.style.backgroundImage = 'url("./../css/img/sfondo/sfondo_body.jpg")';
		sideRight2.style.width = (window.innerWidth*0.1) + "px";
		sideRight2.style.marginLeft = (this.screen.clientWidth) + "px";
		sideRight2.style.height = 410 + "px";
	} 

//con type intendo l'azione da svolgere in base alla quale si prenderà in considerazione unna cartella diversa
//e in base all'indice (che viene modificato dai metodi della classe Game) in cui si trova l'azione
//viene scelta l'immagine da proiettare
//dati per la ricerca dell'immagine e caratteristiche su di essa (altezza, larghezza, margin, ecc.)
//vengono passati ad una fuzione che si occuperà di attuare il cambio immagine (drawAction) 
Sketcher.prototype.drawPlayer =
	function(player, type) {
		if(player.direction > 0)
			this.playerNode.style.transform = "scaleX(1)";
		if(player.direction < 0)
			this.playerNode.style.transform = "scaleX(-1)";
		this.playerNode.style.backgroundImage = "";
		this.playerBustNode.style.display = "block";
		this.playerLegsNode.style.display = "block";
		var secondname = "";

		if(type == "running_right")
			secondname = "running";
		else
			secondname = type;
		
		var firstIndexOfImageOfArray = this.findFirstIndexOfImage("player", secondname);
		switch(type){
			case "standing_stance":
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_standing_stance, player.height_standing_stance, player.width_standing_stance, null, null, 0); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null); 
				break;
			case "standing_stance_legs":
				this.drawAction(player, this.playerLegsNode, firstIndexOfImageOfArray, player.index_standing_stance_legs, player.height_standing_stance_legs, player.width_standing_stance_legs, null, null, null); 
				break;
			case "running_right": 
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_running_right, player.height_running, player.width_running, null, null, 0); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null); 
				break;
			case "running_legs_right": 
				this.drawAction(player, this.playerLegsNode, firstIndexOfImageOfArray, player.index_running_legs_right, player.height_running_legs, player.width_running_legs_right, null, null, null);  
				break;
			case "running_left": 
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_running_left, player.height_running, player.width_running, null, null, 0); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null); 
				break;
			case "running_legs_left": 
				this.drawAction(player, this.playerLegsNode, firstIndexOfImageOfArray, player.index_running_legs_left, player.height_running_legs, player.width_running_legs_left, null, null, null);  
				break;
			case "jumping":	
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_jumping, player.height_jumping, player.width_jumping, null, null, player.marginLeft_jumping); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null);  
				break;
			case "jumping_legs":
				this.drawAction(player, this.playerLegsNode, firstIndexOfImageOfArray, player.index_jumping, null, player.width_jumping_legs, null, null, null); 
				break;
			case "shooting": 
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_shooting, player.height_shooting, player.width_shooting, null, null, 0); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null);  
				break;
			case "throwing_bomb": 
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_throwing_bomb, player.height_throwing_bomb, player.width_throwing_bomb, null, null, 0); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null);  
				break; 
			case "bomb": 
				this.drawBomb(player, this.playerNode, type, "player"); 
				break;
			case "reloading": 
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_reloading, player.height_reloading, player.width_reloading, null, null, 0); 
				this.drawAction(player, this.playerNode, null, null, player.height_standing_stance_div, null, - PLAYER_RADIUS, -PLAYER_RADIUS, null);  
				break;
			case "getting_down": 
				this.drawAction(player, this.playerNode, firstIndexOfImageOfArray, player.index_getting_down, player.height_getting_down, player.width_getting_down, player.top_getting_down, player.left_getting_down, null); 
				this.playerLegsNode.style.display = "none";  
				this.playerBustNode.style.display = "none"; 
				break;
			case "getting_down_move":
				this.drawAction(player, this.playerNode, firstIndexOfImageOfArray, player.index_getting_down_move, null, null, player.top_getting_down_move, player.left_getting_down_move, null); 
				this.playerBustNode.style.display = "none"; 
				this.playerLegsNode.style.display = "none";  
				break;
			case "getting_down_shooting": 
				this.drawAction(player, this.playerNode, firstIndexOfImageOfArray, player.index_getting_down_shooting, player.height_getting_down_shooting, player.width_getting_down_shooting, player.top_getting_down_shooting, null, null); 
				this.playerBustNode.style.display = "none"; 
				this.playerLegsNode.style.display = "none"; 
				break;
			case "stabbing": 
				this.drawAction(player, this.playerBustNode, firstIndexOfImageOfArray, player.index_stabbing, player.height_stabbing, player.width_stabbing, null, null, player.marginLeft_stabbing); 
				this.drawAction(player, this.playerNode, null, player.index_stabbing, player.height_stabbing_div, null, player.top_stabbing_div, player.left_stabbing_div, null); 
				break;
			case "exulting": 
				this.drawAction(player, this.playerNode, firstIndexOfImageOfArray, player.index_exulting, player.height_exulting, player.width_exulting, player.top_exulting, null, null); 
				this.playerBustNode.style.display = "none"; 
				this.playerLegsNode.style.display = "none"; 
				break;
			case "death":  
				this.drawAction(player, this.playerNode, firstIndexOfImageOfArray, player.index_death, player.height_death, player.width_death, player.top_death, player.left_death, null); 
				this.playerBustNode.style.display = "none"; 
				this.playerLegsNode.style.display = "none";  
				break;
			case "resuscitate": 
				this.drawAction(player, this.playerNode, firstIndexOfImageOfArray, player.index_resuscitate, player.height_resuscitate, player.width_resuscitate, player.top_resuscitate, null, null); 
				this.playerBustNode.style.display = "none"; 
				this.playerLegsNode.style.display = "none"; 
				break;
		}

	}

//come il player
//qui viene passato "i" l'indice dell'array dei soldati per riconoscere il nodo da modificare
Sketcher.prototype.drawSoldier =
	function(soldier, type, i) {
		soldierNode = this.addNode(soldier, "soldier" + i, "soldier_class", SOLDIER_RADIUS);
		if(soldier.direction < 0)
			soldierNode.style.transform = "scaleX(1)";
		if(soldier.direction > 0)
			soldierNode.style.transform = "scaleX(-1)";
		var secondname = "";
		if(type == "running_left")
			secondname = "running";
		else
			secondname = type;
		var firstIndexOfImageOfArray = this.findFirstIndexOfImage("soldier", secondname);
		switch(type){
			case "standing_stance": 
				this.drawAction(soldier, this.soldierNode, firstIndexOfImageOfArray, soldier.index_standing_stance, soldier.height_standing_stance, soldier.width_standing_stance, null, null, null); 
				break;
			case "running_left": 
				this.drawAction(soldier, soldierNode, firstIndexOfImageOfArray, soldier.index_running, soldier.height_running, soldier.width_running, null, null, null);  
				break;
			case "take_gun":
				var left_take_gun;
				if(soldier.direction == -1)
					left_take_gun = soldier.left_take_gun;
				else
					left_take_gun = [-48, -48, -48, -48, -48, -42, -51, -48]; []
				this.drawAction(soldier, soldierNode, firstIndexOfImageOfArray, soldier.index_take_gun, soldier.height_take_gun, soldier.width_take_gun, soldier.top_take_gun, left_take_gun, null);  
				break;
			case "death": 
				this.drawAction(soldier, soldierNode, firstIndexOfImageOfArray, soldier.index_death, soldier.height_death, soldier.width_death, soldier.top_death, null, null);  
				break;
			case "death_blood": 
				this.drawAction(soldier, soldierNode, firstIndexOfImageOfArray, soldier.index_death, soldier.height_death_blood, soldier.width_death_blood, soldier.top_death_blood, null, null);  
				break;
			case "shooting":
				var left_shooting;
				if(soldier.direction == -1)
					left_shooting = soldier.left_shooting;
				else
					left_shooting = [-52, -54, -53, -53, -60];
				this.drawAction(soldier, soldierNode, firstIndexOfImageOfArray, soldier.index_shooting, soldier.height_shooting, soldier.width_shooting, soldier.top_shooting, left_shooting, null);   
				break;
		}
	} 

//come il player
Sketcher.prototype.drawBoss =
	function(boss, type){
		bossNode = this.addNode(boss, "boss", "boss_class", BOSS_RADIUS); 
		var firstIndexOfImageOfArray = this.findFirstIndexOfImage("boss", type);
		
		if(boss.direction < 0)
			bossNode.style.transform = "scaleX(1)";
		if(boss.direction > 0)
			bossNode.style.transform = "scaleX(-1)";

		switch(type){
			case "running": 
				this.drawAction(boss, bossNode, firstIndexOfImageOfArray, boss.index_running_left, boss.height_running, boss.width_running, null, null, null);  
				break;
			case "death": 
				this.drawAction(boss, bossNode, firstIndexOfImageOfArray, boss.index_death, boss.height_death, boss.width_death, boss.top_death, null, null);  
				break;
			case "shooting":
				this.drawAction(boss, bossNode, firstIndexOfImageOfArray, boss.index_shooting, boss.height_shooting, boss.width_shooting, null, null, null);    
				break;
		}
	}

//modifica il nodo passato con le informazioni date
Sketcher.prototype.drawAction =
	function(subject, subjectNode, firstIndexOfImageOfArray, index, height_action, width_action, top_action, left_action, margin_left_action){
		if(firstIndexOfImageOfArray !== null)
			subjectNode.style.background = "url(" + Images[firstIndexOfImageOfArray + index - 1].src + ")";
		if(height_action !== null)
			if(is_int(height_action))
				subjectNode.style.height = height_action + 'px';
			else
				subjectNode.style.height = height_action[index - 1] + 'px';
		if(width_action !== null)	
			if(is_int(width_action))
				subjectNode.style.width = width_action + 'px';
			else	
				subjectNode.style.width = width_action[index - 1] + 'px';
		if(top_action !== null)
			if(is_int(top_action))
				subjectNode.style.top = (subject.point.y + top_action) + 'px';
			else
				subjectNode.style.top = (subject.point.y + top_action[index - 1]) + 'px';
		if(left_action !== null)
			if(is_int(left_action))
				subjectNode.style.left = (subject.point.x + left_action) + 'px';
			else
				subjectNode.style.left = (subject.point.x + left_action[index - 1]) + 'px';
		if(margin_left_action !== null)
			if(is_int(margin_left_action))
				subjectNode.style.marginLeft = margin_left_action + 'px';
			else
				subjectNode.style.marginLeft = margin_left_action[index - 1] + 'px';
	} 

Sketcher.prototype.drawBullet =
	function(bullet, i, idBullet, colorBorder) {
		bulletNode = this.addNode(bullet, idBullet + i, "bullet", 0)
		if(idBullet == "bulletBoss"){
			bulletNode.style.height = 5 + 'px';
			bulletNode.style.width = 15 + 'px';
			bulletNode.style.border = 2 + "px solid " + colorBorder;
		}else
			bulletNode.style.border = 2 + "px solid " + colorBorder;
	}  

Sketcher.prototype.drawBomb =
	function(bomb, i) {
		bombNode = this.addNode(bomb, "bomb" + i, "bomb", 0);
		bombNode.style.backgroundImage = "url('./../css/img/player/bomb/bomb"+ bomb.img +".png')";
		bombNode.style.width = bomb.width[bomb.img - 1] + 'px';
		bombNode.style.height = bomb.height[bomb.img - 1] + 'px';
	} 

Sketcher.prototype.drawExplosion =
	function(explosion, i) {	
		explosionNode = this.addNode(explosion, "explosion" + i, "explosion_class", 0);
		explosionNode.style.backgroundImage = "url('./../css/img/player/explosion/explosion"+ explosion.img +".png')";
		
		if(explosion.img == 1){
			explosionNode.style.top = (explosion.point.y - 63) + 'px';
			explosionNode.style.left = (explosion.point.x - 15) + 'px';
		}else{
			explosionNode.style.top = (explosion.point.y - 90) + 'px';
			explosionNode.style.left = (explosion.point.x) + 'px';
		
		}
		if(explosion.img == 2)
			explosionNode.style.width = 45 + 'px';
		else
			explosionNode.style.width = 50 + 'px';
		explosionNode.style.height = explosion.height[explosion.img - 1] + 'px';
	}  

//aggiunge un nodo al playground
Sketcher.prototype.addNode =
	function(subject, id, className, radius){
		subjectNode = document.getElementById(id);
		if(subjectNode == null){
			subjectNode = document.createElement('div');
			subjectNode.setAttribute('class', className);
			subjectNode.id = id;
			this.playgroundWrapper.insertBefore(subjectNode, document.getElementById("sideLeft"));
		}
		subjectNode.style.top = (subject.point.y - radius) + 'px';
		subjectNode.style.left = (subject.point.x - radius) + 'px';
		return subjectNode;
	} 

Sketcher.prototype.drawCounterArms =
	function(numberArms3, numberArms2, numberArms1){
		this.numberArms3Node.src = "./../css/img/number0/number" + numberArms3 +".png";
		this.numberArms2Node.src = "./../css/img/number0/number" + numberArms2 +".png";
		this.numberArms1Node.src = "./../css/img/number0/number" + numberArms1 +".png";
	} 

Sketcher.prototype.drawCounterBombs =
	function(numberBomb2, numberBomb1){
		this.numberBomb2Node.src = "./../css/img/number0/number" + numberBomb2 +".png";
		this.numberBomb1Node.src = "./../css/img/number0/number" + numberBomb1 +".png";
	} 

//inizialmente solo il number0 è presente sul campo
//mano a mano che il player fa punti verranno presentati in schermata gli altri
Sketcher.prototype.drawScore =
	function(number0, number1, number2, number3, number4, number5){
		if(number1 !== 0)
			this.numberScore1.style.display = "inline";
		else if(number2 !== 0){
			this.numberScore2.style.display = "inline";
		}else if(number3 !== 0){
			this.numberScore3.style.display = "inline";
		}else if(number4 !== 0){
			this.numberScore4.style.display = "inline";
		}if(number5 !== 0){
			this.numberScore5.style.display = "inline";
		}
		this.numberScore0.src = "./../css/img/number0/number"+ number0 +".png";
		this.numberScore1.src = "./../css/img/number0/number"+ number1 +".png";
		this.numberScore2.src = "./../css/img/number0/number"+ number2 +".png";
		this.numberScore3.src = "./../css/img/number0/number"+ number3 +".png";
		this.numberScore4.src = "./../css/img/number0/number"+ number4 +".png";
		this.numberScore5.src = "./../css/img/number0/number"+ number5 +".png";
	} 

