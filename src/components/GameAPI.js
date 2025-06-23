import axios from "axios";

export default class APICalls {
  async createGame() {
    const response = await axios.post("https://gruppe15.toni-barth.com/games/", {
      maxTurnTime: 60000,
      players: [0, 1],
      board: {
        gameSizeRows: await this.getUserInput("Wie viele Reihen soll das Spielfeld haben?"),
        gameSizeColumns: await this.getUserInput("Wie viele Spalten soll das Spielfeld haben?"),
        squares: [],
      },
    });

    if (response.status === 200) {
      const game = response.data;
      console.log("Spiel erstellt:", game);
      return game.id;
    } else {
      console.error("Fehler beim Erstellen des Spiels:", response);
    }
  }

  async getGames() {
    const response = await axios.get("https://gruppe15.toni-barth.com/games/");

    if (response.status === 200) {
      const games = response.data;
      console.log("Spiele erhalten:", games);
      return games;
    } else {
      console.error("Fehler beim Abrufen der Spiele:", response);
    }
  }

  async makeMove(gameId, playerId, move, shot) {
    const response = await axios.post(
      `https://gruppe15.toni-barth.com/move/${playerId}/${gameId}`,
      {
        move,
        shot,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Zug erfolgreich abgesendet");
    } else {
      console.error("Fehler beim Absetzen des Zuges:", response);
    }
  }

  async getUserInput(question) {
    try {
      // Try to use window.prompt if in browser environment
      if (typeof window !== 'undefined' && window.prompt) {
        const input = window.prompt(question);
        return input ? parseInt(input, 10) || 10 : 10; // Default to 10 if parsing fails
      } else {
        // Default value for non-browser environments
        console.log(question + " (Using default value: 10)");
        return 10;
      }
    } catch (error) {
      console.error("Error getting user input:", error);
      return 10; // Default fallback value
    }
  }
}
