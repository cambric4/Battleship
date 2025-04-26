import { createShip } from './ship.js';
import { gameboardFactory } from './GB.js';

/**
 * Sets up the player's board by allowing them to place ships.
 * @param {HTMLElement} boardElement - The HTML element for the board.
 * @param {GameBoard} playerBoard - The player's GameBoard instance.
 */
export function setupPlayerBoard(boardElement, playerBoard) {
  const shipsToPlace = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Destroyer", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Patrol Boat", length: 2 }
  ];
  
  let currentShipIndex = 0;
  let isVertical = false;  // Optional: Can add a button to rotate ships later

  // Add event listener to handle ship placement
  boardElement.addEventListener('click', (e) => {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;  // Ignore clicks on non-cell elements

    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);

    // Get the current ship to place (name and length)
    const { name, length } = shipsToPlace[currentShipIndex];
    const ship = createShip(name, length);

    // Try to place the ship
    if (playerBoard.placeShip(ship, x, y, isVertical)) {
      currentShipIndex++;
      drawBoard(boardElement, playerBoard);  // Redraw the board with updated ship placements
    } else {
      alert('Invalid placement!');  // Alert if ship placement fails
    }

    // If all ships are placed, stop the placement process
    if (currentShipIndex >= shipsToPlace.length) {
      boardElement.removeEventListener('click', arguments.callee);  // Remove click listener
      alert('All ships placed! Let the game begin!');
    }
  });
}

/**
 * Redraws the board based on the current state of the GameBoard.
 * @param {HTMLElement} boardElement - The HTML element for the board.
 * @param {GameBoard} board - The GameBoard instance to draw.
 */
export function drawBoard(boardElement, board) {
  boardElement.innerHTML = '';  // Clear the board before drawing

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = i;  // Set x-coordinate as a data attribute
      cell.dataset.y = j;  // Set y-coordinate as a data attribute

      // If a ship is placed at this cell, mark it
      if (board.getBoard()[i][j] !== null) {
        cell.classList.add('ship');
      }

      boardElement.appendChild(cell);
    }
  }
}
