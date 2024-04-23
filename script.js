'use strict';

const goal = 50;

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const under0El = document.querySelector('.under--0');
const under1El = document.querySelector('.under--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const initGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  document.querySelector('.piglet--0').classList.add('hidden');
  document.querySelector('.piglet--1').classList.add('hidden');

  under0El.classList.remove('hidden');
  under1El.classList.add('hidden');

  document.querySelector(
    '.instructions'
  ).textContent = `First player to reach at least ${goal}, WINS!`;
};

initGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  under0El.classList.toggle('hidden');
  under1El.classList.toggle('hidden');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= goal) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.piglet--${activePlayer}`)
        .classList.remove('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
