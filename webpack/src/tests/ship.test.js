import Ship from '../factories/ship.js'

describe('Ship', () => {
    test('initializes with name and length', () => {
        const ship = new Ship('placeholderShip');
        expect(ship.name).toBe('placeholderShip');
        expect(ship.length).toBe(1);
        expect(ship.hits).toBe(0);
    });

    test('creates a ship with custom values', () => {
        const ship = new Ship('Destroyer', 3);
        expect(ship.name).toBe('Destroyer');
        expect(ship.length).toBe(3);
    });

    test('hit() increments hits until ship is sunk', () => {
        const ship = new Ship('Submarine', 2);
        expect(ship.hit()).toBe(true);
        expect(ship.hits).toBe(1);
        expect(ship.hit()).toBe(true);
        expect(ship.hits).toBe(2);
        expect(ship.hit()).toBe(false);
    });

    test('isSunk() returns true only when hits === length', () => {
        const ship = new Ship('Cruiser', 2);
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});