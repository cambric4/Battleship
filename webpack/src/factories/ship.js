export default class Ship {
    /**
     * @param {string} name - The name of the Ship.
     * @param {number} length - The length of the ship.
     */

    constructor(name = "placeholderShip", length = 1) {
        this.name = name;
        this.length = Math.max(1, length);
        this.hits = 0;
    }

    /**
     * @returns {Boolean} True if hit was unsuccessful, false if already sunk.
     */

    hit() {
        if (this.hits < this.length) {
            this.hits++;
            return true;
        }
        return false;
    }

    /**
     * @returns {Boolean} True if sunk, false otherwise.
     */

    isSunk() {
        return this.hits >= this.length;
    }
}

export function createShip(name, length) {
    return new Ship(name, length);
}