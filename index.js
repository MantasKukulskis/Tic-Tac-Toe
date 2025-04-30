const buttons = document.querySelectorAll(".btn");
const resultEl = document.querySelector(".result");
const restartBtn = document.getElementById("restartBtn");
const symbolImgs = document.querySelectorAll(".symbol");

let currentPlayer = "X";
let playerSymbol = null;
let board = Array(9).fill(null);
let gameActive = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// ✅ Funkcija įdedanti SVG ikoną vietoj teksto
function setSymbol(btn, symbol) {
  const img = document.createElement("img");
  img.src = symbol === "X" ? "./img/cross.svg" : "./img/zero.svg";
  img.alt = symbol;
  img.classList.add("symbol-img");
  btn.appendChild(img);
}

function startGame() {
  board = Array(9).fill(null);
  buttons.forEach(btn => {
    btn.innerHTML = ""; // ❗ Naudojam innerHTML, kad pašalintų ir SVG
    btn.disabled = false;
  });
  resultEl.textContent = "Game in progress...";
  currentPlayer = playerSymbol;
  gameActive = true;
}

function checkWinner() {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      resultEl.textContent = `${board[a]} wins!`;
      gameActive = false;
      disableBoard();
      return;
    }
  }

  if (!board.includes(null)) {
    resultEl.textContent = "It's a draw!";
    gameActive = false;
  }
}

function disableBoard() {
  buttons.forEach(btn => btn.disabled = true);
}

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    setSymbol(btn, currentPlayer);

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

restartBtn.addEventListener("click", () => {
  if (playerSymbol) {
    startGame();
  } else {
    resultEl.textContent = "Choose X or O to start!";
  }
});

symbolImgs.forEach(img => {
  img.addEventListener("click", () => {
    playerSymbol = img.dataset.symbol;
    currentPlayer = playerSymbol;
    resultEl.textContent = `You chose ${playerSymbol}. Game started!`;
    startGame();
  });
});