'use strict';

const players = [
  { total_sc: 0, cur_sc: 0 }, // player 0
  { total_sc: 0, cur_sc: 0 }, // player 1
];
const max_score = 100;

let cur_player = 0;
let game_over = false;

const init = function () {
  cur_player = 0;
  game_over = false;
  document.querySelector('.dice').classList.add('hidden');
  for (let i = 0; i < players.length; i++) {
    players[i].total_sc = players[i].cur_sc = 0;

    // total and current score
    document.querySelector(`#score--${i}`).textContent = 0;
    document.querySelector(`#current--${i}`).textContent = 0;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
  }

  // color
  document
    .querySelector(`.player--${cur_player}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${(cur_player + 1) & 0x1}`)
    .classList.remove('player--active');
};

// ==== update DOM element ====
const updateCurScore = function (cur_player) {
  document.querySelector(`#current--${cur_player}`).textContent =
    players[cur_player].cur_sc;
};

const updateTotalScore = function (cur_player) {
  document.querySelector(`#score--${cur_player}`).textContent =
    players[cur_player].total_sc;
};

const updatePlayer = function (cur_player) {
  const next_player = (cur_player + 1) & 0x1;
  // clear current score
  players[cur_player].cur_sc = 0;
  updateCurScore(cur_player);

  document
    .querySelector(`.player--${cur_player}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${next_player}`)
    .classList.add('player--active');

  return next_player;
};

// ==== Event ====
// roll
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (game_over) return;

  let dice_num = Math.trunc(Math.random() * 6) + 1;
  const diceEle = document.querySelector('.dice');

  diceEle.classList.remove('hidden');
  diceEle.src = `img/dice-${dice_num}.png`;

  if (dice_num == 1) {
    players[cur_player].cur_sc = 0;
    updateCurScore(cur_player);
    cur_player = updatePlayer(cur_player);
  } else {
    players[cur_player].cur_sc += dice_num;
    updateCurScore(cur_player);
  }
});

// hold
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (game_over) return;
  players[cur_player].total_sc += players[cur_player].cur_sc;
  updateTotalScore(cur_player);

  if (players[cur_player].total_sc >= max_score) {
    game_over = true;
    document
      .querySelector(`.player--${cur_player}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${cur_player}`)
      .classList.remove('player--active');
  } else {
    cur_player = updatePlayer(cur_player);
  }
});

document.querySelector('.btn--new').addEventListener('click', init);

init();
