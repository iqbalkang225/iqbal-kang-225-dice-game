// const dice = document.querySelector('.dice');
// const rollDice = document.querySelector('.roll-dice');
// const holdScore = document.querySelector('.hold-score');
// const newGame = document.querySelector('.new-game');
// const playerInput1 = document.querySelector('.player-input-1');
// const playerInput2 = document.querySelector('.player-input-2');
// const btnInput1 = document.querySelector('.btn-input-1');
// const btnInput2 = document.querySelector('.btn-input-2');
// const player1 = document.querySelector('#player-1');
// const player2 = document.querySelector('#player-2');
// let totalScore1 = document.querySelector('.total-1');
// let totalScore2 = document.querySelector('.total-2');
// const currentScoreEl = document.querySelector('.current-score');
// const box1 = document.querySelector('.box-1');
// const box2 = document.querySelector('.box-2');

// let currentScore = 0;
// let activePlayer = 1;
// const players = [0 , 0];

// btnInput1.addEventListener('click', () => {
//   players.push(playerInput1.value);
//   document.querySelector(`.box-${activePlayer}`).classList.add('active');
// });



// // Rolling Dice
// rollDice.addEventListener('click', () => {
//   let diceNumber = Math.trunc((Math.random() * 6) + 1);
//   dice.src = `./images/dice-${diceNumber}.png`;

//   if(diceNumber !== 1) {
//     currentScore += diceNumber;
//     document.querySelector(`.current-score-${activePlayer}`).textContent = currentScore;
//   } else{
//     currentScore = 0;
//     box1.classList.toggle('flip');
//     box2.classList.toggle('flip');
//     document.querySelector(`.current-score-${activePlayer}`).textContent = currentScore;
//     activePlayer = (activePlayer === 1) ? 2 : 1;
    
//   }
  
// });

// // Holding Score
// holdScore.addEventListener('click', () => {
//   players[activePlayer - 1] += currentScore;
  
//   if(players[activePlayer - 1] < 20) {
//     document.querySelector(`.total-${activePlayer}`).textContent = players[activePlayer - 1];
//     currentScore = 0;
//     box1.classList.toggle('flip');
//     box2.classList.toggle('flip');
//     activePlayer = activePlayer === 1 ? 2 : 1;
//   } else{
//     console.log( `player ${activePlayer} wins`)
//   }
  
// });

const players = document.querySelectorAll('.player-name');
const totalScore1El = document.querySelector('.total-score-1');
const totalScore2El = document.querySelector('.total-score-2');
const currentScore1El = document.querySelector('.current-player-score-1')
const currentScore2El = document.querySelector('.current-player-score-2')
const btnRoll = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold-game');
const btnReset = document.querySelector('.new-game');
const dices = document.querySelectorAll('.dice');

let gameOver = false;
let currentScore = 0;
let activePlayer = 1;
let totalScores = [null, 0, 0];

// Getting Player's names from user and setting up the initial values
let playerNames = [null, prompt(`Enter first Player's name:`), prompt(`Enter second Player's name:`)];
// const playerNames = [null, 'iqbal gill', 'gill kang'];


// Setting players Names
for(let i = 1; i <= players.length; i++) {
  playerNames[i] = playerNames[i].slice(0, 1).toUpperCase() + playerNames[i].slice(1);

  document.querySelector(`#player-name-${i}`).textContent = 
  playerNames[i];
  document.querySelector(`.current-player-name-${i}`).textContent = playerNames[i];
}

// Display Dice Function
const displayDice = function(rollDice) {
  dices.forEach(dice => {
    dice.classList.add('dice');
  });
  dices[rollDice - 1].classList.remove('dice');
}

// Switch Player Function
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.current-player-${activePlayer}`).classList.toggle('flip');
  activePlayer = activePlayer === 1 ? 2 : 1;
  document.querySelector(`.current-player-${activePlayer}`).classList.toggle('flip');
  document.querySelector(`.current-player-score-${activePlayer}`).textContent = currentScore;
}

// Rolling Dice
btnRoll.addEventListener('click', () => {
  if(!gameOver) {
    // 1. Generating Dice Number
    let diceNumber = Math.trunc((Math.random() * 6) + 1);
    displayDice(diceNumber);

    // 2. Current score of active player
    currentScore += diceNumber;

    // 3. Switiching active player
    if(diceNumber !== 1) {
      document.querySelector(`.current-player-score-${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding Score and Switching player
btnHold.addEventListener('click', () => {
  if(!gameOver) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`.total-score-${activePlayer}`).textContent = totalScores[activePlayer];
    
    if(totalScores[activePlayer] < 50) {
      switchPlayer();
    }  else {
      document.querySelector(`.current-player-${activePlayer}`).classList.add('winner');
      document.querySelector(`.current-player-name-${activePlayer}`).textContent = `${playerNames[activePlayer]} Wins! 🏆`
      gameOver = true;
    }
  }
});

// Resetting Game
btnReset.addEventListener('click', () => {
  gameOver = false;
  currentScore = 0;
  activePlayer = 1;
  totalScores = [null, 0, 0];

  document.querySelector(`.current-player-${activePlayer}`).classList.remove('winner');
  // document.querySelector(`.current-player-name-${activePlayer}`).textContent = `${playerNames[activePlayer]} Wins! 🏆`
 

  for(let i = 1; i <= players.length; i++) {
    document.querySelector(`#player-name-${i}`).textContent = 
    `Player ${i}`;
    document.querySelector(`.current-player-name-${i}`).textContent = `Player-${i}`;
    document.querySelector(`.total-score-${i}`).textContent = 0;
    document.querySelector(`.current-player-score-${i}`).textContent = 0;
    document.querySelector(`.current-player-name-${i}`).textContent = `Enter Players`;
  }

  playerNames = [null, prompt(`put first Player's name:`), prompt(`puts second Player's name:`)];

  for(let i = 1; i <= players.length; i++) {
    playerNames[i] = playerNames[i].slice(0, 1).toUpperCase() + playerNames[i].slice(1);
  
    document.querySelector(`#player-name-${i}`).textContent = 
    playerNames[i];
    document.querySelector(`.current-player-name-${i}`).textContent = playerNames[i];
  }
});
