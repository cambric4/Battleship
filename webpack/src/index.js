import GameBoard, { gameboardFactory } from "./factories/GB.js";
import Player from "./factories/Player.js";
import Ship from "./factories/ship.js";
import './style.css';
import { drawBoard } from './factories/setup.js';

// DOM element selection
const playerBoardElement = document.getElementById("player-board");
const enemyBoardElement = document.getElementById("enemy-board");
const messageElement = document.getElementById("message");
const shipContainer = document.getElementById("ship-container");
const rotateButton = document.getElementById("rotate-btn");

let currentShipIndex = 0;
let currentOrientation = 'horizontal';

// Initialize game logic
const playerBoard = new gameboardFactory();
const enemyBoard = new GameBoard();
const player = new Player("Player");
const computer = new Player("Computer", true);

// Ship data
const ships = [
  new Ship("Carrier", 5),
  new Ship("Battleship", 4),
  new Ship("Destroyer", 3),
  new Ship("Submarine", 3),
  new Ship("Patrol Boat", 2)
];

// Function to create the board in the DOM
function createBoard(boardElement, boardData, isEnemy = false) {
  boardElement.innerHTML = '';
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (!isEnemy) {
        if (boardData[row][col] !== null) {
          cell.classList.add("ship");
        }
      }

      boardElement.appendChild(cell);
    }
  }
}

// Render boards for both player and enemy
function renderBoards() {
  createBoard(playerBoardElement, playerBoard.getBoard(), false);
  createBoard(enemyBoardElement, enemyBoard.getBoard(), true);
  drawBoard(playerBoardElement, playerBoard);  // After ships are placed
}

// Handle clicks on the enemy board (player attacking)
function handleEnemyBoardClick(e) {
  if (!e.target.classList.contains("cell")) return;

  const row = parseInt(e.target.dataset.row, 10);
  const col = parseInt(e.target.dataset.col, 10);

  const result = player.attack(enemyBoard, row, col);

  if (result === null) {
    messageElement.textContent = "You already attacked that spot!";
    return;
  }

  if (result) {
    e.target.classList.add("hit");
    messageElement.textContent = "Hit!";
  } else {
    e.target.classList.add("miss");
    messageElement.textContent = "Miss!";
  }

  if (enemyBoard.allShipsSunk()) {
    messageElement.textContent = "You won! 🎉";
    enemyBoardElement.removeEventListener("click", handleEnemyBoardClick);
    return;
  }

  setTimeout(() => {
    computerMove();
  }, 500);
}

// Computer makes a random move
function computerMove() {
  let row, col, result;

  do {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    result = computer.attack(playerBoard, row, col);
  } while (result === null);

  const cells = playerBoardElement.querySelectorAll(".cell");
  const index = row * 10 + col;
  const cell = cells[index];

  if (result) {
    cell.classList.add("hit");
    messageElement.textContent = "Computer hit your ship!";
  } else {
    cell.classList.add("miss");
    messageElement.textContent = "Computer missed!";
  }

  if (playerBoard.allShipsSunk()) {
    messageElement.textContent = "Computer wins! 💀";
    enemyBoardElement.removeEventListener("click", handleEnemyBoardClick);
  }
}

// Place ships randomly on the board (for computer)
function placeRandomShips(board) {
  ships.forEach(ship => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      placed = board.placeShip(ship, row, col, direction);
    }
  });
}

// Function to handle player ship placement
async function placePlayerShips() {
  return new Promise((resolve) => {
    function handleBoardClick(e) {
      const row = parseInt(e.target.dataset.row, 10);
      const col = parseInt(e.target.dataset.col, 10);

      if (playerBoard.placeShip(ships[currentShipIndex], row, col, currentOrientation)) {
        renderBoards();
        currentShipIndex++;

        if (currentShipIndex === ships.length) {
          playerBoardElement.removeEventListener('click', handleBoardClick);
          resolve();
        }
      } else {
        messageElement.textContent = "Invalid placement! Try again.";
      }
    }

    rotateButton.addEventListener('click', () => {
      currentOrientation = currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
      messageElement.textContent = `Current orientation: ${currentOrientation}`;
    });

    playerBoardElement.addEventListener('click', handleBoardClick);
    messageElement.textContent = `Place your ${ships[currentShipIndex].name} (${currentOrientation})`;
  });
}

// Initialize the game
async function initGame() {
  playerBoard.clearBoard();
  enemyBoard.clearBoard();
  placeRandomShips(enemyBoard);
  await placePlayerShips();

  enemyBoardElement.addEventListener("click", handleEnemyBoardClick);
  messageElement.textContent = "Game started! Attack the computer's board!";
  rotateButton.style.display = 'none';
}

// Reset button functionality
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", async () => {
  playerBoardElement.classList.add("fade-out");
  enemyBoardElement.classList.add("fade-out");

  setTimeout(async () => {
    playerBoard.clearBoard();
    enemyBoard.clearBoard();
    currentShipIndex = 0;
    currentOrientation = 'horizontal';
    rotateButton.style.display = 'block';

    await initGame();

    playerBoardElement.classList.remove("fade-out");
    playerBoardElement.classList.remove("fade-in");
    enemyBoardElement.classList.remove("fade-out");
    enemyBoardElement.classList.remove("fade-in");
  }, 500);
});

// Start the game
initGame();
