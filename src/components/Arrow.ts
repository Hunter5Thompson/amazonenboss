import { Position } from "./Position";
import { Direction } from "./Direction";


export class Arrow {

    private _position: Position;
    private _isAlive: boolean;
    private _isHit: boolean;
    private _color: string;
    private _owner: string;

    constructor(position: Position) {
        this._position = position;
        this._isAlive = true;
        this._isHit = false;
        this._color = "red";
        this._owner = "Spieler 1";
    }
    
        /**
     * Gibt die Position des Pfeils zurück.
     *
     * @returns Position des Pfeils
     */
    public getPosition(): Position {
        return this._position;
    }

    /**
     * Setzt die Position des Pfeils.
     *
     * @param x X-Koordinate der neuen Position
     * @param y Y-Koordinate der neuen Position
     */
    public setPosition(x: number, y: number): void {
        this._position = { x, y };
    }

        /**
     * Setzt den Status des Pfeils auf getroffen.
     *
     * @param isHit `true`, wenn der Pfeil getroffen ist, `false` sonst.
     */
        public setHit(isHit: boolean): void {
            this._isHit = isHit;
        }
        
    /**
     * Prüft, ob der Pfeil noch am Leben ist.
     *
     * @returns `true`, wenn der Pfeil noch am Leben ist, `false` sonst.
     */
    public isAlive(): boolean {
        return this._isAlive;
    }

    /**
     * Prüft, ob der Pfeil eine Amazone getroffen hat.
     *
     * @returns `true`, wenn der Pfeil eine Amazone getroffen hat, `false` sonst.
     */
    public isHit(): boolean {
        return this._isHit;
    }

    /**
     * Gibt die Farbe des Pfeils zurück.
     *
     * @returns Farbe des Pfeils
     */
    public getColor(): string {
        return this._color;
    }

    /**
     * Setzt die Farbe des Pfeils.
     *
     * @param color Neue Farbe des Pfeils
     */
    public setColor(color: string): void {
        this._color = color;
    }

    /**
     * Gibt den Besitzer des Pfeils zurück.
     *
     * @returns Besitzer des Pfeils
     */
    public getOwner(): string {
        return this._owner;
    }

    /**
     * Setzt den Besitzer des Pfeils.
     *
     * @param owner Neuer Besitzer des Pfeils
     */
    public setOwner(owner: string): void {
        this._owner = owner;
    }

        /**
     * Bewegt den Pfeil um eine bestimmte Anzahl von Feldern in eine bestimmte Richtung.
     *
     * @param direction Richtung, in die der Pfeil bewegt wird
     * @param steps Anzahl der Felder, um die der Pfeil bewegt wird
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

/* 
Die Funktion isAlive() gibt true zurück, wenn der Pfeil noch am Leben ist, und false, wenn er nicht mehr am Leben ist.
Die Funktion isHit() gibt true zurück, wenn der Pfeil eine Amazone getroffen hat, und false, wenn er keine Amazone getroffen hat.
Die Funktion getColor() gibt die Farbe des Pfeils zurück.
Die Funktion setColor() setzt die Farbe des Pfeils auf den angegebenen Wert.
Die Funktion getOwner() gibt den Besitzer des Pfeils zurück.
Die Funktion setOwner() setzt den Besitzer des Pfeils auf den angegebenen Wert. */