/**
 * Redraws the board based on the current state of the GameBoard.
 * @param {HTMLElement} boardElement - The HTML element for the board.
 * @param {GameBoard} gameBoard - The GameBoard instance to draw.
 */
export function drawBoard(boardElement, gameBoard) {
    const cells = boardElement.querySelectorAll(".cell");
    let cellIndex = 0;

    // Loop over the board's rows and columns to render cells
    for (let row = 0; row < gameBoard.size; row++) {
        for (let col = 0; col < gameBoard.size; col++) {
            const cell = cells[cellIndex];
            const ship = gameBoard.board[row][col];

            // Apply classes to cells based on their state
            if (ship) {
                cell.classList.add("ship"); // Ship present in this cell
            } else {
                cell.classList.remove("ship");
            }

            // Mark hit or miss
            if (gameBoard.missedAttacks.some(([r, c]) => r === row && c === col)) {
                cell.classList.add("miss");
            }

            cellIndex++;
        }
    }
}
