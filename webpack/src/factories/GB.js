class GameBoard {
    constructor() {
        this.size = 10;
        this.board = Array(10).fill(null).map(() => Array(10).fill(null)); // 10x10 board
        this.missedAttacks = [];
        this.ships = [];
    }

    // Place a ship on the board
    placeShip(ship, row, col, direction = 'horizontal') {
        if (!this.isValidPlacement(ship.length, row, col, direction)) {
            console.log("Placement failed for ship: " + ship.name);
            return false; // Failed placement
        }

        let shipSegments = [];
        for (let i = 0; i < ship.length; i++) {
            const r = direction === 'horizontal' ? row : row + i;
            const c = direction === 'horizontal' ? col + i : col;
            this.board[r][c] = ship; // Place ship at the coordinates
            shipSegments.push([r, c]); // Record the ship's segments
        }

        ship.setSegments(shipSegments); // Pass ship segments to the ship object
        this.ships.push(ship); // Add ship to the list of ships
        console.log(`${ship.name} placed at (${row}, ${col})`);
        return true; // Successfully placed
    }

    // Check if placement is valid
    isValidPlacement(length, row, col, direction) {
        if (direction === 'horizontal') {
            if (col + length > this.size) {
                console.log("Invalid: Ship exceeds board size horizontally");
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (this.board[row][col + i] !== null) {
                    console.log(`Invalid: Position (${row}, ${col + i}) is already occupied`);
                    return false;
                }
            }
        } else {
            if (row + length > this.size) {
                console.log("Invalid: Ship exceeds board size vertically");
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (this.board[row + i][col] !== null) {
                    console.log(`Invalid: Position (${row + i}, ${col}) is already occupied`);
                    return false;
                }
            }
        }
        return true;
    }

    // Receive an attack at a specific row and column
    receiveAttack(row, col) {
        const ship = this.board[row][col];
        if (ship === null) {
            // Missed attack
            this.missedAttacks.push([row, col]);
            console.log(`Miss at (${row}, ${col})`);
            return false; // Miss
        } else {
            // Mark the hit on the ship
            let hitSuccessful = ship.hit(row, col); // Use row and col for better precision

            if (hitSuccessful) {
                console.log(`Hit on ship at (${row}, ${col})`);

                // Check if the ship is sunk
                if (ship.isSunk()) {
                    console.log(`Ship ${ship.name} is sunk!`);
                }
                return true; // Hit
            }
        }
        return null; // Spot has already been attacked
    }

    // Check if all ships are sunk
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    getBoard() {
        return this.board;
    }

    clearBoard() {
        this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
        this.missedAttacks = []; // Optionally reset missed attacks as well
    }
}
function gameboardFactory() {
    return new GameBoard();
}

export { gameboardFactory, GameBoard };
