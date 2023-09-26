import { Direction } from './Direction';

export class Position {
    constructor(public x: number, public y: number) {}

    add(direction: Direction): Position {
        switch (direction) {
            case Direction.Up:
                return new Position(this.x, this.y - 1);
            case Direction.Down:
                return new Position(this.x, this.y + 1);
            case Direction.Left:
                return new Position(this.x - 1, this.y);
            case Direction.Right:
                return new Position(this.x + 1, this.y);
            default:
                return this; // Falls keine gültige Richtung angegeben ist, bleibt die Position unverändert
        }
    }
    equals(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }
    to?: string;
}
    
