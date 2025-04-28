export class Ship {
    /**
     * @param {string} name - The name of the Ship.
     * @param {number} length - The length of the ship.
     */
    constructor(name = "placeholderShip", length = 1) {
        this.name = name;
        this.length = Math.max(1, length);
        this.hits = new Set(); 
        this.segments = [];
    }

    setSegments(segments) {
        this.segments = segments;
    }

    /**
     * Marks a part of the ship as hit.
     * @param {number} row - The row coordinate of the hit.
     * @param {number} col - The column coordinate of the hit.
     * @returns {Boolean} - True if the hit was successful, false otherwise.
     */
    hit(row, col) {
        const segmentIndex = this.segments.findIndex(([r, c]) => r === row && c === col);
        if (segmentIndex !== -1) {
            this.hits.add(segmentIndex);
            return true;
        }
        return false;
    }
     /**
     * Checks if the ship is hit at a specific coordinate.
     * @param {number} row - The row coordinate to check.
     * @param {number} col - The column coordinate to check.
     * @returns {Boolean} True if this segment has been hit, false otherwise.
     */
     isHitAt(row, col) {
        const segmentIndex = this.segments.findIndex(([r, c]) => r === row && c === col);
        if (segmentIndex !== -1) {
            return this.hits.has(segmentIndex);
        }
        return false;
    }

    /**
     * Checks if the ship is completely sunk.
     * @returns {Boolean} True if all segments are hit, false otherwise.
     */
    isSunk() {
        return this.hits.size === this.length;
    }
}
export function createShip(name, length) {
    return new Ship(name, length);
}
