export default class Player {
    constructor(name = 'Player', isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.previousAttacks = new Set();
    }

    /**
     * 
     * @param {GameBoard} enemyBoard -The opponents game board.
     * @param {Number} row - Row to attack.
     * @param {number} col - Column to attack.
     * @returns {Boolean} - True if hit, false if miss.
     */

    attack(enemyBoard, row, col) {
        const key = `${row},${col}`;
        if (this.previousAttacks.has(key)) return null;
        this.previousAttacks.add(key);
        return enemyBoard.receiveAttack(row, col);
    }

    /**
     * 
     * @param {GameBoard} enemyBoard 
     * @returns {object} - { row, col, result}
     */

    randomAttack(enemyBoard) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const result = this.attack(enemyBoard, row, col);
        if (result === null) return null;
        return { row, col, result };
    }
    
}