'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const Current0El = document.getElementById('current--0');
const Current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  Current0El.textContent = 0;
  Current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // its not a global variable because each time we roll the dice we want a new random variable
    console.log(dice);

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    // 3. check for rolled 1: if true, switch players
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // Current0El.textContent = currentScore; //change later
    } else {
      // Switch Players
      switchPlayer();
    }
  }
});

// Holding Current Score
btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('Hold button');
    // 1. add current core to active player's score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] +currentScore
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2 CHeck if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // a. Finish the game
      playing = false;
      diceEl.classList.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      activePlayer = 0;
      //   if you're using query selector, you need the id and class selectors
    } else {
      // b. else switch players
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', init);
