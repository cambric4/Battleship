import { createShip } from './ship.js';
import { GameBoard } from './GB.js';
import  Player from './Player.js';

// Ensure this function is defined before you use it.
export function drawBoard(boardElement, gameBoard, isEnemy = false) {
    const cells = boardElement.querySelectorAll(".cell");
    let cellIndex = 0;

    for (let row = 0; row < gameBoard.size; row++) {
        for (let col = 0; col < gameBoard.size; col++) {
            const cell = cells[cellIndex];
            const ship = gameBoard.board[row][col];

            // Reset classes
            cell.classList.remove('ship', 'hit', 'miss');

            if (ship) {
                cell.classList.add('ship');
            }

            // Check if it's a hit (only for enemy board)
            if (isEnemy && ship && ship.isHitAt(row, col)) {
                cell.classList.add('hit');
            }
            // Check for missed attacks
            else if (gameBoard.missedAttacks.some(([r, c]) => r === row && c === col)) {
                cell.classList.add('miss');
            }

            cellIndex++;
        }
    }
}


let player = new Player('Player1');
let enemyBoard = new GameBoard;

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

    // Create a named function to handle ship placement
    function handleClick(e) {
        const cell = e.target;
        if (!cell.classList.contains('cell')) return;  // Ignore clicks on non-cell elements

        const x = parseInt(cell.dataset.row);
        const y = parseInt(cell.dataset.col);

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
            boardElement.removeEventListener('click', handleClick);  // Remove click listener
            alert('All ships placed! Let the game begin!');
        }
    }

    // Add event listener to handle ship placement
    boardElement.addEventListener('click', handleClick);
}

/**
 * Redraws the board based on the current state of the GameBoard.
 * @param {HTMLElement} boardElement - The HTML element for the board.
 * @param {GameBoard} board - The GameBoard instance to draw.
 */
export function createBoard(boardElement, boardArray, isEnemy = false) {
    boardElement.innerHTML = ''; // Clear the board

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            const cellData = boardArray[row][col];

            // Show hit/miss status
            if (cellData?.isHit) {
                cell.classList.add('hit');
            } else if (cellData?.isMiss) {
                cell.classList.add('miss');
            } else if (!isEnemy && cellData?.hasShip) {
                cell.classList.add('ship'); // Optional: Show player's ships
            }

            boardElement.appendChild(cell);
        }
    }
}
