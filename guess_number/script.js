'use strict';

let number = Math.trunc(Math.random() * 20) + 1;
const maxTimes = document.querySelector('.score').textContent;
let times = document.querySelector('.score').textContent;

const resetScore = function () {
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = maxTimes;
  document.querySelector('.guess').value = '';

  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  number = Math.trunc(Math.random() * 20) + 1;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ Please enter a number';
  }
  if (guess >= 1 && guess <= 20) {
    document.querySelector('.score').textContent = times;
    if (guess === number) {
      const high = Number(document.querySelector('.highscore').textContent);
      if (times > high) {
        document.querySelector('.highscore').textContent = times;
      }
      document.querySelector('.message').textContent = '🎊 Bingo!';
      document.querySelector('.number').textContent = number;
      document.querySelector('.number').style.width = '20rem';
      document.querySelector('body').style.backgroundColor = 'green';
    } else {
      times--;
      document.querySelector('.score').textContent = times;
      if (times <= 0) {
        document.querySelector('.message').textContent = '💢 You lose the game';
      } else {
        if (guess > number) {
          document.querySelector('.message').textContent = '📈 Too high!';
        } else if (guess < number) {
          document.querySelector('.message').textContent = '📉 Too low!';
        }
      }
    }
  } else {
    document.querySelector('.message').textContent = '⛔ Guess number 1~20';
  }
});

document.querySelector('.again').addEventListener('click', resetScore);
