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
const start = get("#start");
const board = get("#board");

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

const checkForMatch = () => {
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
  isMatch ? disabledCard() : unflippedCard();
};

const disabledCard = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
};

const unflippedCard = () => {
  locked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
};
const resetBoard = () => {
  [flipped, locked] = [false, false];
  [firstCard, secondCard] = [null, null];
};

//Display data on the screen
let gameBoard = "";
start.onclick = (card) => {
  board.innerHTML = "";
  let cardArray = shuffleArray(arr4);
  console.log("array", cardArray);
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
