'use strict';
//////////////////// DOM {DOCUMENT OBJECT MODEL- ITS A CONNECTION POINT BETWEEN HTML AND JS} AND DOM MANIPULATION //////////////////

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number✅';
// document.querySelector('.number').textContent = 12;
// document.querySelector('.score').textContent = 19;
// console.log((document.querySelector('.guess').value = 23));

//////////////////// HANDLING CLICK EVENTS //////////////////

//////////REFACTORING CODE//////////
const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};
const displayNumber = function (num) {
  document.querySelector('.number').textContent = num;
};
const changeBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};
const adjustSecretNumberBoxWidth = function (width) {
  document.querySelector('.number').style.width = width;
};
const setScoreTextContent = function (width) {
  document.querySelector('.number').style.width = width;
};

let secretNumber = Math.trunc(Math.random() * 20 + 1);
// document.querySelector('.number').textContent = secretNumber;

let score = 20; // the best practice is to keep the variable that holds the value in out code and not just one the dom
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //   When there is no input
  if (!guess) {
    displayMessage('⛔ No Number');
  }

  //   When player wins
  else if (guess === secretNumber) {
    displayMessage('🥰 Correct Number');
    changeBackgroundColor('#60b347');
    adjustSecretNumberBoxWidth('30rem');
    displayNumber(secretNumber);

    //  check high score
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }

  //   When guess is too high
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Number is Too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You Lost The Game...';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
  //   When guess is too low
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Number is Too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You Lost The Game...';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }

  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? '📈 Number is Too High!'
          : '📉 Number is Too Low!'
      );
      // document.querySelector('.message').textContent =
      //   guess > secretNumber
      //     ? '📈 Number is Too High!'
      //     : '📉 Number is Too Low!';

      score--;
      setScoreTextContent(score);
    } else {
      displayMessage('You Lost The Game...');
      setScoreTextContent(0);
    }
  }
});

/////////////////// Mini Coding Challenge  //////////////////////

// Implement a game rest functionality, so that the player can make a new guess! Here is how:

// 1. Select the element with the 'again' class and attach a click event handler
// 2. In the handler function, restore initial values of the score and secretNumber variables
// 3. Restore the initial conditions of the message, number, score and guess input field
// 4. Also restore the original background color (#222) and number width (15rem)

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  displayMessage('Start guessing...');
  setScoreTextContent(score);
  displayNumber('?');
  document.querySelector('.guess').value = '';
  adjustSecretNumberBoxWidth('15rem');
  changeBackgroundColor('#222');
});
