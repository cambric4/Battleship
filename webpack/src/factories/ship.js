export default class Ship {
    /**
     * @param {string} name - The name of the Ship.
     * @param {number} length - The length of the ship.
     */

    constructor(name = "placeholderShip", length = 1) {
        this.name = name;
        this.length = Math.max(1, length);
        this.hits = new Set();  // Array to track hits on each segment
        this.segments = [];
    }

    setSegments(segments) {
        this.segments = segments;
    }

    /**
     * Marks a part of the ship as hit.
     * @param {number} index - The index of the part being hit (0 to length-1).
     * @returns {Boolean} - True if the hit was successful, false if the ship is already sunk.
     */
     // Mark a segment as hit based on row and column
     hit(row, col) {
        // Check if this segment is part of the ship
        const segmentIndex = this.segments.findIndex(([r, c]) => r === row && c === col);
        if (segmentIndex !== -1) {
            this.hits.add(segmentIndex); // Mark this segment as hit
            return true;
        }
        return false;
    }

    /**
     * @returns {Boolean} True if the ship is sunk (all segments hit), false otherwise.
     */
    isSunk() {
        return this.hits.size === this.length; // Ship is sunk when all segments are hit
    }
}

export function createShip(name, length) {
    return new Ship(name, length);
}
