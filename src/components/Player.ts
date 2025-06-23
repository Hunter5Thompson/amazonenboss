export class Player {
    private _id: number;
    private _name: string;
    private _color: string;
    private _isActive: boolean;

    constructor(id: number, name: string, color: string) {
        this._id = id;
        this._name = name;
        this._color = color;
        this._isActive = false;
    }

    /**
     * Gets the player's ID.
     * 
     * @returns The player's ID.
     */
    public getId(): number {
        return this._id;
    }

    /**
     * Gets the player's name.
     * 
     * @returns The player's name.
     */
    public getName(): string {
        return this._name;
    }

    /**
     * Sets the player's name.
     * 
     * @param name The new name for the player.
     */
    public setName(name: string): void {
        this._name = name;
    }

    /**
     * Gets the player's color.
     * 
     * @returns The player's color.
     */
    public getColor(): string {
        return this._color;
    }

    /**
     * Sets the player's color.
     * 
     * @param color The new color for the player.
     */
    public setColor(color: string): void {
        this._color = color;
    }

    /**
     * Checks if the player is active.
     * 
     * @returns True if the player is active, false otherwise.
     */
    public isActive(): boolean {
        return this._isActive;
    }

    /**
     * Sets the player's active status.
     * 
     * @param isActive The new active status for the player.
     */
    public setActive(isActive: boolean): void {
        this._isActive = isActive;
    }
}