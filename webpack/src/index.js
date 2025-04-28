import { gameboardFactory, GameBoard, } from './factories/GB.js';
import Player from "./factories/Player.js";
import { Ship } from "./factories/ship.js";
import './style.css';
import { createBoard, setupPlayerBoard, drawBoard } from './factories/setup.js';

// Create board and player instances
const playerBoard = new gameboardFactory();
const enemyBoard = new GameBoard();
const player = new Player("Player");
const computer = new Player("Computer", true);

// Get board elements
const playerBoardElement = document.getElementById("player-board");
const enemyBoardElement = document.getElementById("enemy-board");

document.addEventListener('DOMContentLoaded', function () {
    const messageElement = document.getElementById("messageElement");
  
    // Setup player board
    setupPlayerBoard(playerBoardElement, playerBoard);
  
    // Render boards for both player and enemy (enemy board is initially hidden)
    function renderBoards() {
      createBoard(playerBoardElement, playerBoard.getBoard(), false); // Render the player board
      createBoard(enemyBoardElement, enemyBoard.getBoard(), true); // Render the enemy board (but hidden initially)
    }
  
    renderBoards(); // Ensure this is being called after DOM is loaded
  
    // Handle clicks on the enemy board (player attacking)
    function handleEnemyBoardClick(e) {
        if (!e.target.classList.contains("cell")) return;
    
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);
    
        console.log(`Player attacking: row ${row}, col ${col}`); // Debugging log
    
        const result = player.attack(enemyBoard, row, col); // Player attacks enemy
    
        if (result === null) {
            messageElement.textContent = "You already attacked that spot!";
            return;  // Return early, do not process further
        }
    
        // Update message based on hit or miss
        if (result) {
            e.target.classList.add("hit");
            messageElement.textContent = "Hit! You hit the enemy ship!";
        } else {
            e.target.classList.add("miss");
            messageElement.textContent = "Miss! No ship at that spot!";
        }
    
        // Re-render enemy board to reflect the hit/miss
        drawBoard(enemyBoardElement, enemyBoard);
    
        // Check if all enemy ships are sunk
        if (enemyBoard.allShipsSunk()) {
            messageElement.textContent = "You won! 🎉";
    
            // Reveal the enemy board once all ships are sunk
            enemyBoardElement.style.display = "block"; // Show enemy board
    
            enemyBoardElement.removeEventListener("click", handleEnemyBoardClick);
            return;
        }
    
        // Computer makes a move
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
        result = computer.attack(playerBoard, row, col); // Computer attacks player
      } while (result === null);  // Re-attempt if the spot is already attacked
  
      const cells = playerBoardElement.querySelectorAll(".cell");
      const index = row * 10 + col;
      const cell = cells[index];
  
      console.log(`Computer attacking: row ${row}, col ${col}`); // Debugging log
  
      if (result) {
        cell.classList.add("hit");
        messageElement.textContent = "Computer hit your ship!";
      } else {
        cell.classList.add("miss");
        messageElement.textContent = "Computer missed!";
      }
  
      // Re-render player board to reflect the hit/miss
      drawBoard(playerBoardElement, playerBoard);
  
      if (playerBoard.allShipsSunk()) {
        messageElement.textContent = "Computer wins! 💀";
        enemyBoardElement.removeEventListener("click", handleEnemyBoardClick);
      }
    }
  
    // Initialize game
    placeRandomShips(enemyBoard);
    renderBoards(); // Ensure this is being called
  
    // Add event listener to handle player clicks on enemy board
    enemyBoardElement.addEventListener("click", handleEnemyBoardClick);
  
    function placeRandomShips(board) {
      const shipsToPlace = [
        { name: "Carrier", length: 5 },
        { name: "Battleship", length: 4 },
        { name: "Destroyer", length: 3 },
        { name: "Submarine", length: 3 },
        { name: "Patrol Boat", length: 2 },
      ];
  
      for (const { name, length } of shipsToPlace) {
        let placed = false;
        while (!placed) {
          const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
          const row = Math.floor(Math.random() * 10);
          const col = Math.floor(Math.random() * 10);
  
          const ship = new Ship(name, length);
          placed = board.placeShip(ship, row, col, direction);
        }
      }
    }
  
    const resetButton = document.getElementById("reset-button");
  
    resetButton.addEventListener("click", () => {
      // Start fade-out animation
      playerBoardElement.classList.add("fade-out");
      enemyBoardElement.classList.add("fade-out");
  
      setTimeout(() => {
        // After fade-out (500ms), reset everything
        playerBoard.clearBoard();
        enemyBoard.clearBoard();
        messageElement.textContent = "";
  
        placeRandomShips(playerBoard);
        placeRandomShips(enemyBoard);
        renderBoards();
  
        // Fade boards back in
        playerBoardElement.classList.remove("fade-out");
        playerBoardElement.classList.add("fade-in");
  
        enemyBoardElement.classList.remove("fade-out");
        enemyBoardElement.classList.add("fade-in");
  
        // Reattach event listener
        enemyBoardElement.addEventListener("click", handleEnemyBoardClick);
      }, 500); // Match CSS transition time
    });
  });
  