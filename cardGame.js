//Data
let arr4 = [
  { name: "./images/bird.jpg", data: "bird" },
  { name: "./images/bird2.jpg", data: "bird2" },
  { name: "./images/bear.jpg", data: "bear" },
  { name: "./images/bee.jpg", data: "bee" },
  { name: "./images/butterfly.jpg", data: "butterfly" },
  { name: "./images/bull.jpg", data: "bull" },
  { name: "./images/camel.jpg", data: "camel" },
  { name: "./images/cat.jpg", data: "cat" },
  { name: "./images/bird.jpg", data: "bird" },
  { name: "./images/bird2.jpg", data: "bird2" },
  { name: "./images/bear.jpg", data: "bear" },
  { name: "./images/bee.jpg", data: "bee" },
  { name: "./images/butterfly.jpg", data: "butterfly" },
  { name: "./images/bull.jpg", data: "bull" },
  { name: "./images/camel.jpg", data: "camel" },
  { name: "./images/cat.jpg", data: "cat" },
];

//Query selector
const create = (el) => {
  return document.createElement(el);
};
const get = (el) => {
  return document.querySelector(el);
};

const text = get("#text");
const start = get("#start");
const next = get("#next");
const board = get("#board");
const totalTime = get("#totalTime");
const count = get("#count");
const time = get("#time");

//shuffle the data
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
};
//Flip the card
let flipped = false;
let locked = false;
let firstCard, secondCard;
function flipCard() {
  if (this === firstCard) return;
  if (locked) return;
  this.classList.toggle("flip");
  if (!flipped) {
    flipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}
//Check if card match and count
const checkForMatch = () => {
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
  isMatch ? disabledCard() : unflippedCard();
};

const disabledCard = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchQuantity++;
  totalTimer += 5;
  timer = 5;
  countMatch();
  resetBoard();
};

const unflippedCard = () => {
  locked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    totalTimer -= 2;
    timer = 2;
    countMatch();
    resetBoard();
  }, 1000);
};
const resetBoard = () => {
  [flipped, locked] = [false, false];
  [firstCard, secondCard] = [null, null];
};

//Display counter, timer
let matchQuantity = 0;
let totalTimer = 60;
let timer = "";
const displayTimer = () => {
  totalTime.innerHTML = "Time remaining: 60 seconds";
  count.innerHTML = "Lives: 0";
  time.innerHTML = "Bonus time";
  let counter1 = setInterval(remaining, 1000);
  function remaining() {
    totalTimer = totalTimer - 1;
    totalTime.innerHTML = `Time remaining: ${totalTimer} seconds`;
    if (totalTimer <= 0) {
      clearInterval(counter1);
      loseTheGame();
    } else if (totalTimer > 0 && matchQuantity === arr4.length / 2) {
      clearInterval(counter1);
      winTheGame();
    }
  }
};
const countMatch = () => {
  count.innerHTML = `Lives: ${matchQuantity}`;
  timer === 5
    ? (time.innerHTML = `Plus: +5 seconds`)
    : (time.innerHTML = `Subtract: -2 seconds`);
};
const loseTheGame = () => {
  text.innerHTML = "You have lost the game, click the button below to restart";
  text.style.display = "block";
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.removeEventListener("click", flipCard));
  start.innerHTML = "Restart the game";
  start.style.display = "block";
  board.style.opacity = 0.3;
};
const winTheGame = () => {
  text.innerHTML =
    "You have won the game, click the button below to start next round";
  text.style.display = "block";
  next.style.display = "block";
  board.style.opacity = 0.3;
};
//Display data on the screen
window.onload = () => {
  totalTime.innerHTML = "Time remaining: 60 seconds";
  count.innerHTML = "Lives: 0";
  time.innerHTML = "Bonus time";
  text.innerHTML = `Welcome to MEMORY MATCH! You only have 50 seconds to match all the cards, plus 5 seconds for each match and subtract 2 seconds for each mismatch, click the button below to start`;
  next.style.display = "none";
};
let gameBoard = "";
start.onclick = () => {
  start.style.display = "none";
  text.style.display = "none";
  shuffleArray(arr4);
  matchQuantity = 0;
  totalTimer = 60;
  timer = "";
  displayTimer();
  arr4.map((card) => {
    let cardImg =
      `<div class="card" data-animal="${card.data}">` +
      `<img class="front" src="${card.name}">` +
      `<img class="back" src="./images/sea.jpg">` +
      "</div>";
    gameBoard = cardImg + gameBoard;
    board.innerHTML = gameBoard;
  });
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
};
