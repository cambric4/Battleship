import { GameBoard } from "./GB.js";

export default class Player {
    constructor(name = 'Player', isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.previousAttacks = new Set();  // Keeps track of previous attacks to prevent duplicates
        this.attackedCells = [];  // Initialize attackedCells as an empty array
    }

    /**
     * Attack the enemy board at the specified coordinates.
     * @param {GameBoard} enemyBoard - The opponent's GameBoard instance.
     * @param {number} row - The row to attack.
     * @param {number} col - The column to attack.
     * @returns {Boolean|null} - Returns true if it's a hit, false if it's a miss, or null if the spot has already been attacked.
     */
    attack(board, row, col) {
        // Check if the cell has already been attacked (using Set correctly)
        if (this.previousAttacks.has(`${row},${col}`)) {
            console.log(`You have already attacked this spot (${row}, ${col}).`);
            return null;  // Already attacked this spot
        }
    
        // Mark this cell as attacked
        this.previousAttacks.add(`${row},${col}`);
    
        const result = board.receiveAttack(row, col);  // Pass the attack to the board
        console.log(`Attack at (${row}, ${col}) result: ${result ? 'Hit' : 'Miss'}`);
        return result;  // Return true/false depending on whether it was a hit or miss
    }    
  
    /**
     * Perform a random attack on the enemy board.
     * @param {GameBoard} enemyBoard - The opponent's GameBoard instance.
     * @returns {Object|null} - Returns an object with row, col, and result of the attack or null if the attack was previously made.
     */
    randomAttack(enemyBoard) {
        let row, col, result;

        // Repeat until a valid random attack is made
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            result = this.attack(enemyBoard, row, col);
        } while (result === null);  // Retry if the spot was already attacked

        return { row, col, result };
    }
}
