import { Position } from "./Position";
import { Direction } from "./Direction";

export class Figure {

    private _position: Position;
    private _isAlive: boolean;
    private _isHit: boolean;
    private _color: string;
    private _owner: string;
    public type: "white" | "black";

  

    constructor(position: Position, type: "white" | "black") {
        this._position = position;
        this._isAlive = true;
        this._isHit = false;
        this._color = "red";
        this._owner = "Spieler 1";
        this.type = type;
    }

    /**
     * Prüft, ob die Figur noch am Leben ist.
     *
     * @returns `true`, wenn die Figur noch am Leben ist, `false` sonst.
     */
    public isAlive(): boolean {
        return this._isAlive;
    }

    /**
     * Prüft, ob die Figur eine Amazone getroffen hat.
     *
     * @returns `true`, wenn die Figur eine Amazone getroffen hat, `false` sonst.
     */
    public isHit(): boolean {
        return this._isHit;
    }

    /**
     * Gibt die Farbe der Figur zurück.
     *
     * @returns Farbe der Figur
     */
    public getColor(): string {
        return this._color;
    }

    /**
     * Setzt die Farbe der Figur.
     *
     * @param color Neue Farbe der Figur
     */
    public setColor(color: string): void {
        this._color = color;
    }

    /**
     * Gibt den Besitzer der Figur zurück.
     *
     * @returns Besitzer der Figur
     */
    public getOwner(): string {
        return this._owner;
    }

    /**
     * Setzt den Besitzer der Figur.
     *
     * @param owner Neuer Besitzer der Figur
     */
    public setOwner(owner: string): void {
        this._owner = owner;
    }

    /**
     * Setzt die Position der Figur.
     *
     * @param x X-Koordinate der neuen Position
     * @param y Y-Koordinate der neuen Position
     */
    public setPosition(x: number, y: number): void {
        this._position = { x, y };
    }

    /**
     * Gibt die Position der Figur zurück.
     *
     * @returns Position der Figur
     */
    public getPosition(): Position {
        return this._position;
    }

    /**
     * Prüft, ob die Figur eine bestimmte Position erreicht hat.
     *
     * @param position Position, die geprüft werden soll
     * @returns `true`, wenn die Figur die Position erreicht hat, `false` sonst.
     */
    public isAtPosition(position: Position): boolean {
        return this._position.x === position.x && this._position.y === position.y;
    }

    /**
     * Bewegt die Figur um eine bestimmte Anzahl von Feldern in eine bestimmte Richtung.
     *
     * @param direction Richtung, in die die Figur bewegt wird
     * @param steps Anzahl der Felder, um die die Figur bewegt wird
     */
    public move(direction: Direction, steps: number): void {
        switch (direction) {
            case Direction.Up:
                this._position.y -= steps;
                break;
            case Direction.Down:
                this._position.y += steps;
                break;
            case Direction.Left:
                this._position.x -= steps;
                break;
            case Direction.Right:
                this._position.x += steps;
                break;
        }
    }

}
