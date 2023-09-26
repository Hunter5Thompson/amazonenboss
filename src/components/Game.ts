import { Figure } from "./Figure";
import { Position } from "./Position";
import { Direction } from "./Direction";
import { Arrow } from "./Arrow";

export class Game  {

    private _size: number;
    private _figures: Figure[];

    constructor() {
        this._size = 10;
        this._figures = [];
    }
    /**
     * Prüft, ob ein Spieler gewonnen hat.
     *
     * @returns `true`, wenn ein Spieler gewonnen hat, `false` sonst.
     */
    public checkWinner(): boolean {
        for (const figure of this._figures) {
            if (figure.isAlive() && figure.getColor() === "rot") {
                return false;
            }
        }

        return true;
    }


        /**
     * Prüft, ob eine Amazone sich bewegen kann.
     *
     * @param amazone Amazone, die bewegt werden soll
     * @param newPosition Neue Position der Amazone
     * @returns `true`, wenn die Amazone sich bewegen kann, `false` sonst.
     */
        public checkMoveAmazone(amazone: Figure, newPosition: Position): boolean {
            if (!amazone.isAlive()) {
                return false;
            }
    
            if (newPosition.x < 0 || newPosition.x >= this._size) {
                return false;
            }
    
            if (newPosition.y < 0 || newPosition.y >= this._size) {
                return false;
            }
    
            if (this._figures.some((figure) => figure.isAtPosition(newPosition))) {
                return false;
            }
    
            return true;
        }

            /**
     * Prüft, ob ein Pfeil sich bewegen kann.
     *
     * @param arrow Pfeil, der bewegt werden soll
     * @param direction Richtung, in die der Pfeil bewegt werden soll
     * @param steps Anzahl der Felder, um die der Pfeil bewegt werden soll
     * @returns `true`, wenn der Pfeil sich bewegen kann, `false` sonst.
     */
    public checkMoveArrow(arrow: Arrow, direction: Direction, steps: number): boolean {
        if (!arrow.isAlive()) {
            return false;
        }

        switch (direction) {
            case Direction.Up:
                if (arrow.getPosition().y - steps < 0) {
                    return false;
                }
                break;
            case Direction.Down:
                if (arrow.getPosition().y + steps >= this._size) {
                    return false;
                }
                break;
            case Direction.Left:
                if (arrow.getPosition().x - steps < 0) {
                    return false;
                }
                break;
            case Direction.Right:
                if (arrow.getPosition().x + steps >= this._size) {
                    return false;
                }
                break;
        }

        return true;
    }

        /**
     * Prüft, ob ein Pfeil eine Figur trifft.
     *
     * @param arrow Pfeil, der geprüft werden soll
     * @returns `true`, wenn der Pfeil eine Figur trifft, `false` sonst.
     */
        public checkMovePfeilTreffer(arrow: Arrow): boolean {
            for (const figure of this._figures) {
                if (figure.isAtPosition(arrow.getPosition())) {
                    return true;
                }
            }
    
            return false;
        }

        /**
     * Schießt einen Pfeil ab.
     *
     * @param player Spieler, der den Pfeil abfeuert
     * @param move Spielzug, der den Abschuss des Pfeils beschreibt
     * @returns `true`, wenn der Pfeil abgeschossen werden konnte, `false` sonst.
     */
        public shootArrow(player: string, move: Move): boolean {
            // TODO: Implementieren
        }

        /**
     * Führt einen Spielzug für einen Spieler aus.
     *
     * @param player Spieler, der den Spielzug ausführt
     */
        public makeMove(player: string): void {
            // TODO: Implementieren
        }

        /**
     * Gibt alle möglichen Spielzüge für einen Spieler zurück.
     *
     * @param player Spieler, für den die Spielzüge ermittelt werden sollen
     * @returns Liste aller möglichen Spielzüge
     */
        public getMoves(player: string): Move[] {
            // TODO: Implementieren
        }

        /**
     * Prüft, ob das Spiel vorbei ist.
     *
     * @returns `true`, wenn das Spiel vorbei ist, `false` sonst.
     */
        public isGameOver(): boolean {
            // TODO: Implementieren
        }

        /**
     * Prüft, ob ein Spielzug gültig ist.
     *
     * @param player Spieler, der den Spielzug ausführen möchte
     * @param move Spielzug, der überprüft werden soll
     * @returns `true`, wenn der Spielzug gültig ist, `false` sonst.
     */
        public checkMove(player: string, move: Move): boolean {
            // TODO: Implementieren
        }

        /**
     * Bewegt eine Amazone.
     *
     * @param player Spieler, der die Amazone bewegt
     * @param move Spielzug, der die Bewegung der Amazone beschreibt
     * @returns `true`, wenn die Amazone bewegt werden konnte, `false` sonst.
     */
        public moveAmazone(player: string, move: Move): boolean {
            // TODO: Implementieren
        }
}
