import Ship from "./ship.js";

class GameBoard {
    constructor() {
        this.size = 10;
        this.board = Array(10)
            .fill(null)
            .map(() => Array(10).fill(null));
        this.missedAttacks = [];
        this.ships = [];
    }

    /**
    * @param {Ship} ship - The ship to place.
    * @param {number} row - Starting row coordinate.
    * @param {number} col - Starting column coordinate.
    * @param {string} direction - 'horizontal' or 'vertical'.
    * @returns {Boolean} True if placement was successful, false otherwise.
    */
    placeShip(ship, row, col, direction = 'horizontal') {
        if (!this.isValidPlacement(ship.length, row, col, direction)) return false;

        for (let i = 0; i < ship.length; i++) {
            const r = direction === 'horizontal' ? row : row + i;
            const c = direction === 'horizontal' ? col + i : col;
            this.board[r][c] = ship;  // Place the ship on the board
        }

        this.ships.push(ship);  // Add ship to the ships array
        return true;
    }

    /**
     * @param {number} length - The length of the ship to place.
     * @param {number} row - Starting row coordinate.
     * @param {number} col - Starting column coordinate.
     * @param {string} direction - 'horizontal' or 'vertical'.
     * @returns {Boolean} True if the ship can be placed, false otherwise.
     */
    isValidPlacement(length, row, col, direction) {
        // Check if the ship fits on the board
        if (direction === 'horizontal' && col + length > this.size) return false;
        if (direction === 'vertical' && row + length > this.size) return false;

        // Check if the ship overlaps with any existing ships
        for (let i = 0; i < length; i++) {
            const r = direction === 'horizontal' ? row : row + i;
            const c = direction === 'horizontal' ? col + i : col;
            if (this.board[r][c] !== null) return false;  // Spot is already occupied
        }
        return true;
    }

    /**
     * @param {number} row - The row of the attack.
     * @param {number} col - The column of the attack.
     * @returns {Boolean} True if it was a hit, false if it was a miss.
     */
    receiveAttack(row, col) {
        const target = this.board[row][col];
        if (target instanceof Ship) {
            target.hit();  // Ship is hit
            return true;
        }
        this.missedAttacks.push([row, col]);  // Record miss
        return false;
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    getBoard() {
        return this.board;
    }
    clearBoard() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
      }      
}

// Gameboard factory function
export function gameboardFactory() {
    return new GameBoard();
}

export default GameBoard;
