class GameBoard {
    constructor() {
        this.size = 10;
        this.board = Array(10).fill(null).map(() => Array(10).fill(null)); // 10x10 board
        this.missedAttacks = [];
        this.ships = [];
        this.areAllShipsSunk = false;  // Flag to track if all ships are sunk
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
        const cell = document.getElementById(`cell-${row}-${col}`);
    
        if (ship === null) {
            // Missed attack
            this.missedAttacks.push([row, col]);
            console.log(`Miss at (${row}, ${col})`);
            if (cell) {
                cell.classList.add('miss'); // <<< ADD "miss" class to cell
            }
            return false; // Miss
        } else {
            // Mark the hit on the ship
            let hitSuccessful = ship.hit(row, col); // Use row and col for better precision
    
            if (hitSuccessful) {
                console.log(`Hit on ship at (${row}, ${col})`);
                if (cell) {
                    cell.classList.add('hit'); // <<< ADD "hit" class to cell
                }
    
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

    // Update the boards based on the ship statuses
    updateBoards() {
        if (this.allShipsSunk()) {
            this.areAllShipsSunk = true; // Correctly set the flag
            this.displayEnemyBoard(); // Reveal the enemy board when all ships are sunk
        }
    }

    // Display the enemy board once all ships are sunk
    displayEnemyBoard() {
        if (this.areAllShipsSunk) {
            console.log("All enemy ships are sunk!");
            // Render the full enemy board here, showing all ships
            this.renderEnemyBoard();
        }
    }

    // Method to render the enemy board (after all ships are sunk)
    renderEnemyBoard() {
        if (this.allShipsSunk) {
            console.log("Rendering the full enemy board...");
            // Your code to display the full enemy board
            // This is where you'd want to display the ships, hits, and misses on the board
        } else {
            console.log("Enemy ships are still afloat. The board remains hidden.");
            // Placeholder code to hide the board or render it differently
        }
    }
    

    // Handle a hit and check if all ships are sunk
    handleHit() {
        this.updateBoards(); // This will check if all ships are sunk after a hit
    }

    // Handle player moves
    handlePlayerMove(row, col) {
        // Assuming you check for a hit here
        if (this.receiveAttack(row, col)) {
            this.handleHit(); // This checks if all ships are sunk after each move
        }
    }

    // Method to render the board based on ship status
    render() {
        if (this.areAllShipsSunk) {
            // Render the full enemy board since all ships are sunk
            this.renderEnemyBoard();
        } else {
            // Render a placeholder or nothing until all ships are sunk
            console.log("Enemy ships are still afloat. The board remains hidden.");
        }
    }

    // Get the board for external use
    getBoard() {
        return this.board;
    }

    // Clear the board (reset)
    clearBoard() {
        this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
        this.missedAttacks = [];
    }
}


// Factory to create new game boards
function gameboardFactory() {
    return new GameBoard();
}

export { gameboardFactory, GameBoard };
