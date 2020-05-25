/*
3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use Google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
The flow:
One dice
1. Roll dice
2. Display result
3. If dice roll = 6 and previous roll was 6, lose turn
4. Else add score and give turn to next player
*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, prevDiceRoll , prevDiceRoll1;
prevDiceRoll = [0, 0];
prevDiceRoll1 = [0, 0];
winningScore = 100;
winningScoreBox = document.getElementById('winning-score');
winningScoreBox.addEventListener('change', function() {
	
	winningScore = parseInt(this.value, 10);
});
init();
document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		//1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src =  'dice-' + dice + '.png';

		var diceDOM1 = document.querySelector('.dice-one');
		diceDOM1.style.display = 'block';
		diceDOM1.src =  'dice-' + dice1 + '.png';

		
		//If dice roll = 6 and previous roll was 6, lose turn
		if (dice === 6 && prevDiceRoll[activePlayer] === 6 || dice1 === 6 && prevDiceRoll1[activePlayer] === 6) {
			scores[activePlayer] = 0;
			roundScore = 0;
			nextPlayer();
		} else {
			//Add score
			roundScore += dice;
			roundScore += dice1;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			prevDiceRoll[activePlayer] = dice;
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;


		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


		//Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice-one').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//Next player
			nextPlayer();
		}
	}
	

});

function nextPlayer() {
	//Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice-one').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice-one').style.display = 'none';


	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
