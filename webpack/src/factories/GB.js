import  Ship  from "./ship.js"

export default class GameBoard {
    constructor () {
        this.size = 10;
        this.board = Array(10)
            .fill(null)
            .map(() => Array(10).fill(null));
        this.missedAttacks = [];
        this.ships = [];
    }
    /**
    * @param {number} x - Starting x coordinate.
    * @param {number} y - Starting y coordinate.
    * @param {number} length - Length of the ship.
    * @param {string} direction - 'horizontal' or 'vertical'. 
    * @returns {Boolean} True if placement was successful. 
    */
    
    
    
    placeShip(ship, row, col, direction = 'horizontal') {
        if (!this.isValidPlacement(ship.length, row, col, direction)) return false;

        for (let i = 0; i <ship.length; i++) {
            const r = direction === 'horizontal' ? row : row + i;
            const c = direction === 'horizontal' ? col + i : col;
            this.board[r][c] = ship;
        }

        this.ships.push(ship);
        return true;
    }

    isValidPlacement(length, row, col, direction) {
        for (let i = 0; i < length; i++) {
            const r = direction === 'horizontal' ? row : row +i;
            const c = direction === 'horizontal' ? col + i: col;
            if (r >= this.size || c >= this.size || this.board[r][c] !== null) {
                return false;
            }
        }
        return true;
    }

    /**
     * @returns {Boolean} True if it was a hit, false if it was missed.
     */

    receiveAttack(row, col) {
        const target = this.board[row][col];
        if (target instanceof Ship) {
            target.hit();
            return true;
        }
        this.missedAttacks.push([row],[col]);
        return false;
    }

    allShipsSunk () {
        return this.ships.every(ship => ship.isSunk());
    }

    getMissedAttacks() {
        return this.missedAttacks;
    }

    getBoard() {
        return this.board;
    }
}