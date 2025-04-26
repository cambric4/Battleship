export default class Player {
    constructor(name = 'Player', isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.previousAttacks = new Set();  // Keeps track of previous attacks to prevent duplicates
    }

    /**
     * Attack the enemy board at the specified coordinates.
     * @param {GameBoard} enemyBoard - The opponent's GameBoard instance.
     * @param {number} row - The row to attack.
     * @param {number} col - The column to attack.
     * @returns {Boolean|null} - Returns true if it's a hit, false if it's a miss, or null if the spot has already been attacked.
     */
    attack(enemyBoard, row, col) {
        const key = `${row},${col}`;  // Unique identifier for the attack based on row and column
        if (this.previousAttacks.has(key)) return null;  // Return null if the player has already attacked this spot

        this.previousAttacks.add(key);  // Add the attack to the history

        // Return the result of the attack (true for hit, false for miss)
        return enemyBoard.receiveAttack(row, col);
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
