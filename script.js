'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const rolldice = document.querySelector('.btn--roll');
const newdice = document.querySelector('.btn--new');
const holddice = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let scores, currentScore, activePlayer, playing;

//Start Condintions
const init = function () {
  scores = [0, 0]; 
  currentScore = 0; 
  activePlayer = 0; 
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); 
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

score0El.textContent = 0;
score1El.textContent = 0;

let switchPlayer = function () {
  //Switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; 
  currentScore = 0; 
  player0El.classList.toggle('player--active'); 
  player1El.classList.toggle('player--active');
}; 

rolldice.addEventListener('click', function () {
  if (playing) {
    //1.random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; 
    } else {
      switchPlayer();
    }
  }
});

holddice.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active players score
    scores[activePlayer] += currentScore;
    //scores[1]=score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); 
    } else {
      switchPlayer();
    }
  }
});

newdice.addEventListener('click', init); 
