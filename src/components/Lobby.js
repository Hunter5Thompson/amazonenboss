import React, { useState, useEffect, useMemo } from "react";
// import GameBoard from "./GameBoard";
import APICalls from "./GameAPI";

const Lobby = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const apiCalls = useMemo(() => new APICalls(), []);

  useEffect(() => {
    // Fetch games when component mounts
    const fetchGames = async () => {
      try {
        const gamesData = await apiCalls.getGames();
        setGames(gamesData || []);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [apiCalls]);

  const handleCreateGame = async () => {
    try {
      const gameId = await apiCalls.createGame();
      if (gameId) {
        // Refresh games list after creating a new game
        const gamesData = await apiCalls.getGames();
        setGames(gamesData || []);
      }
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="lobby">
      <h1>Game Lobby</h1>
      
      {selectedGame ? (
        <div>
          <button onClick={() => setSelectedGame(null)}>Back to Lobby</button>
          <div>Game #{selectedGame.id} selected</div>
        </div>
      ) : (
        <div>
          <button onClick={handleCreateGame}>Create New Game</button>
          
          <h2>Available Games</h2>
          {games.length === 0 ? (
            <p>No games available. Create a new one!</p>
          ) : (
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  <button onClick={() => handleSelectGame(game)}>
                    Game #{game.id}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Lobby;