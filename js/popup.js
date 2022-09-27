id_popup = 'popup';
content_popup_id = 'popupContent' ;

function scoreLabel(newScore){
	var scorePopup = document.createElement('div');	
	var textScorePopup = document.createTextNode('Your score is: ' + newScore);
	scorePopup.appendChild(textScorePopup);  
	return scorePopup;
}

//riceve i dati dalla funzione requestScores() 
function createScoreTable(data, tablewrap){
	var table = document.createElement('table');
	table.setAttribute('id', "scoreTable");
	
	var tr = document.createElement('tr');
	var usernameth = document.createElement('th');
	var scoreth = document.createElement('th');
	var usernameText = document.createTextNode("Username");
	var scoreText = document.createTextNode("BESTSCORE");
	
	usernameth.appendChild(usernameText);
	scoreth.appendChild(scoreText);
	tr.appendChild(usernameth);
	tr.appendChild(scoreth);
	table.appendChild(tr);
	
	var tbody = document.createElement('tbody');
	tbody.setAttribute('id', "scoreTbody");
	
	for(var i = 0; i < data.length; i++){
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var textTd1 = document.createTextNode(data[i].username);
		td1.appendChild(textTd1);
		tr.appendChild(td1);
		var td2 = document.createElement('td');
		var textTd2 = document.createTextNode(data[i].bestScore);
		td2.appendChild(textTd2);
		tr.appendChild(td2);
		tbody.appendChild(tr);
	
	}
	table.appendChild(tbody);
	tablewrap.appendChild(table);
}

//ripristina il gioco
function resetButton(game){
	var button = document.createElement('button');
	button.setAttribute('id', "resetButton");
	button.setAttribute('onClick', 'game.reset(), closePopup()');
	var text = document.createTextNode("RESET");
	button.appendChild(text);
	return button;
}

//torna al login
function exitButton(game){
	var button = document.createElement('button');
	button.setAttribute('id', "exitButton");
	button.setAttribute('onClick', 'game.exit()');
	var text = document.createTextNode("EXIT");
	button.appendChild(text);	
	return button;
}

function createPopup(newScore, game){
	var popup = document.getElementById(id_popup);
	if (popup !== null)
		return;
	var popup = document.createElement('div');		
	popup.setAttribute('id', id_popup);

	var content = document.createElement('div');		
	content.setAttribute('id', content_popup_id);
	content.appendChild(scoreLabel(newScore));
	
	var tablewrap = document.createElement('div');
	tablewrap.setAttribute('class', "tablewrap");
	content.appendChild(tablewrap);
	requestScores(tablewrap);	
	
	content.appendChild(resetButton(game));
	content.appendChild(exitButton(game));


	popup.appendChild(content);
	document.body.appendChild(popup);
} 

function closePopup(){
	var popup = document.getElementById(id_popup);
	if (popup === null)
		return;
	
	document.body.removeChild(popup);
}