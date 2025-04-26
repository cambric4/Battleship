import GameBoard from '../factories/GB.js'
import Ship from '../factories/ship.js'

describe('GameBoard', () => {
    let board;
    beforeEach(() => {
        board = new GameBoard();
    });

    test('places a ship correctly', () => {
        const destroyer = new Ship('Destroyer', 2);
        board.placeShip(destroyer, 0, 0, 'horizontal');
        const grid = board.getBoard();
        expect(grid[0][0]).toBe(destroyer);
        expect(grid[0][1]).toBe(destroyer);
    });
    
    test('prevents overlapping ships', () => {
        const ship1 = new Ship('Destroyer', 2);
        const ship2 = new Ship('Submarine', 3);
        board.placeShip(ship1, 0, 0, 'horizontal');
        const result = board.placeShip(ship2, 0, 1, 'horizontal');
        expect(result).toBe(false);
    });
    
    test('handles vertical ship placement', () => {
        const cruiser = new Ship('Cruiser', 3);
        board.placeShip(cruiser, 1, 1, 'vertical');
        const grid = board.getBoard();
        expect(grid[1][1]).toBe(cruiser);
        expect(grid[2][1]).toBe(cruiser);
        expect(grid[3][1]).toBe(cruiser);
    });
});