import Player from "../factories/Player.js"
import GameBoard from "../factories/GB.js"
import Ship from "../factories/ship.js"

describe('Player', () => {
    let player;
    let enemyBoard;

    beforeEach(() => {
        player = new Player('Human');
        enemyBoard = new GameBoard();
    });

    test('attacks a position on the enemy board', () => {
        const ship = new Ship('Destroyer', 2);
        enemyBoard.placeShip(ship, 0, 0, 'horizontal');
        const result = player.attack(enemyBoard, 0, 0);
        expect(result).toBe(true);
        expect(ship.hits).toBe(1);
    });

    test('records previous attacks', () => {
        player.attack(enemyBoard, 2, 3);
        const result = player.attack(enemyBoard, 2, 3);
        expect(result).toBe(null); // already attacked
    });

    test('computer player generates random valid attack', () => {
        const computer = new Player('Computer', true);
        const spy = jest.spyOn(computer, 'attack');
        const { row, col, result } = computer.randomAttack(enemyBoard);
        expect(row).toBeGreaterThanOrEqual(0);
        expect(col).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(10);
        expect(col).toBeLessThan(10);
        expect(typeof result).toBe('boolean');
        expect(spy).toHaveBeenCalledWith(enemyBoard, row, col);
    });
});