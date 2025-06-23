import { Figure } from "./Figure";
import { Position } from "./Position";
import { Direction } from "./Direction";
import { Arrow } from "./Arrow";

export class GameLogic  {

    private startTime: number;
    private timeLimit: number; // Zeitlimit in Millisekunden
    private _size: number;
    private _figures: Figure[];
    private _arrows: Arrow[]; // Liste der Pfeile
    public hasMandatoryMove(color: string): boolean {
        return true;
    }
    private currentPlayer: string;
    private addArrowToBoard(arrow: Arrow): void {
        // Füge den Pfeil zur Liste hinzu
        this._arrows.push(arrow);
    }

    private isValidMove(finalPosition: Position): boolean {
        // Überprüfe, ob die Position innerhalb des Spielfelds liegt
        if (finalPosition.x < 0 || finalPosition.x >= this._size || finalPosition.y < 0 || finalPosition.y >= this._size) {
            return false;
        }
    
        // Überprüfe, ob das Zielfeld bereits von einer anderen Figur besetzt ist
        if (this._figures.some((existingFigure) => existingFigure.isAtPosition(finalPosition))) {
            return false;
        }
        
        // Überprüfe, ob das Zielfeld bereits von einem Pfeil besetzt ist
        if (this._arrows.some((arrow) => arrow.getPosition().equals(finalPosition))) {
            return false;
        }
        
        return true;
    }
    
    


    constructor() {
        this._size = 10;
        this._figures = [];
        this._arrows = []; // Initialisiere die Pfeilliste
        this.startTime = Date.now();
        this.timeLimit = 600000; // 10 minutes in milliseconds
        this.currentPlayer = "white"; // Default starting player
    }
    /**
     * Prüft, ob ein Spieler gewonnen hat.
     *
     * @returns `true`, wenn ein Spieler gewonnen hat, `false` sonst.
     */
    public checkWinner(): boolean {
        let whiteAlive = false;
        let blackAlive = false;
        let whiteHasMandatoryMove = false;
        let blackHasMandatoryMove = false;
    
        for (const figure of this._figures) {
            if (figure.isAlive()) {
                const color = figure.getColor();
                const moves = this.getMoves(figure); // Angenommen, getMoves gibt die möglichen Züge für die Figur zurück
    
                if (color === "white") {
                    whiteAlive = true;
                    if (moves.length > 0) {
                        whiteHasMandatoryMove = true;
                    }
                } else if (color === "black") {
                    blackAlive = true;
                    if (moves.length > 0) {
                        blackHasMandatoryMove = true;
                    }
                }
            }
        }
    
        // Ein Spieler hat gewonnen, wenn er noch lebende Figuren hat, aber der Gegner keine Züge mehr machen kann
        return (whiteAlive && !blackHasMandatoryMove) || (blackAlive && !whiteHasMandatoryMove);
    }
    
    public checkMove(figure: Figure, newPosition: Position): boolean {
        // Prüfen, ob die Position innerhalb des Spielfelds liegt
        if (newPosition.x < 0 || newPosition.x >= this._size || newPosition.y < 0 || newPosition.y >= this._size) {
          return false;
        }
      
        // Prüfen, ob das Zielfeld bereits von einer anderen Figur besetzt ist
        if (this._figures.some((existingFigure) => 
            existingFigure !== figure && existingFigure.isAtPosition(newPosition))) {
          return false;
        }
        
        // Prüfen, ob das Zielfeld bereits von einem Pfeil besetzt ist
        if (this._arrows.some((arrow) => arrow.getPosition().equals(newPosition))) {
          return false;
        }
      
        // Weitere Regeln können hier hinzugefügt werden
        // ...
      
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
        public isValidArrowShoot(finalPosition: Position, direction: Direction): boolean {
            // Überprüfe, ob die Endposition innerhalb des Spielbretts liegt
            if (finalPosition.x < 0 || finalPosition.x >= this._size || finalPosition.y < 0 || finalPosition.y >= this._size) {
                return false;
            }
        
            // Überprüfe, ob die Endposition bereits von einer anderen Figur besetzt ist
            if (this._figures.some(figure => figure.getPosition().equals(finalPosition))) {
                return false;
            }
        
            // Überprüfe, ob die Endposition bereits von einem Pfeil besetzt ist
            if (this._arrows.some(arrow => arrow.getPosition().equals(finalPosition))) {
                return false;
            }
      
            return true;
        }
 
        


        /**
     * Schießt einen Pfeil ab.
     *
     * @param player Spieler, der den Pfeil abfeuert
     * @param move Spielzug, der den Abschuss des Pfeils beschreibt
     * @returns `true`, wenn der Pfeil abgeschossen werden konnte, `false` sonst.
     */
        public shootArrow(player: string, finalPosition: Position, direction: Direction): boolean {
            // Schritt 1: Überprüfe, ob der Spieler an der Reihe ist
            if (this.currentPlayer !== player) {
                return false;
            }
        
            // Schritt 2: Überprüfe die Gültigkeit des Zugs
            if (!this.isValidArrowShoot(finalPosition, direction)){
                return false;
            }
        
            // Schritt 3: Füge den Pfeil zum Spielbrett hinzu
            const arrow = new Arrow(finalPosition, direction);
            this.addArrowToBoard(arrow);
        
            // Zug war erfolgreich
            return true;
        }
        
        
        

     /**
     * Führt einen Zug aus.
     *
     * @param figure Figur, die bewegt werden soll
     * @param newPosition Neue Position der Figur
     */
     public makeMove(figure: Figure, newPosition: Position): boolean {
        // Überprüfe, ob der Zug gültig ist
        if (!this.checkMove(figure, newPosition)) {
            return false;
        }
    
        // Setze die neue Position der Figur
        figure.setPosition(newPosition);
    
        // Überprüfe, ob der Spieler nach dem Zug noch weitere Züge machen muss (Zugpflicht)
        const color = figure.getColor();
        const hasMandatoryMove = this.hasMandatoryMove(color);
    
        if (!hasMandatoryMove) {
            // Wenn der Spieler keine weiteren Züge machen muss, ist der Zug erfolgreich abgeschlossen
            return true;
        } else {
            // Wenn der Spieler noch weitere Züge machen muss, ist der Zug nicht erfolgreich
            return false;
        }
    }
    
    

     /**
     * Gibt alle möglichen Züge für eine Amazone zurück.
     *
     * @param figure Amazone, für die die möglichen Züge zurückgegeben werden sollen
     * @returns Array aller möglichen Züge
     */
     public getMoves(figure: Figure): Position[] {
        let moves: Position[] = [];
    
        for (let x = 0; x < this._size; x++) {
            for (let y = 0; y < this._size; y++) {
                if (this.checkMove(figure, new Position(x, y))) {
                    moves.push(new Position(x, y));
                }
            }
        }
    
        if (figure instanceof Arrow) {
            const newPositions: Position[] = [];
    
            for (const move of moves) {
                newPositions.push(move.add(figure.getDirection()));
            }
    
            moves = newPositions;
        }
    
        return moves;
    }

            /**
     * Prüft, ob die Zeit vorbei ist.
     *
     * @returns `true`, wenn das Spiel vorbei ist, `false` sonst.
     */
    public isTimeUp(): boolean {
        const currentTime = Date.now();
        return currentTime - this.startTime >= this.timeLimit;
    }


        /**
     * Prüft, ob das Spiel vorbei ist.
     *
     * @returns `true`, wenn das Spiel vorbei ist, `false` sonst.
     */
        public isGameOver(): boolean {
            if (this.checkWinner() || this.isTimeUp()) {
                return true;
            }
            return false;
        }

    /**
     * Bewegt eine Dame.
     *
     * @param amazone Dame, die bewegt werden soll
     * @param newPosition Neue Position der Dame
     */
    public moveAmazone(amazone: Figure, newPosition: Position): void {
        this.makeMove(amazone, newPosition);
    }



        /**
     * Prüft, ob eine Dame sich bewegen kann.
     *
     * @param amazone Dame, die bewegt werden soll
     * @param newPosition Neue Position der Dame
     * @returns `true`, wenn die Dame sich bewegen kann, `false` sonst.
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
    
            for (const step of this.getMoves(amazone)) {
                if (step.equals(newPosition)) {
                    return true;
                }
            }
    
            return false;
        }

        
}
