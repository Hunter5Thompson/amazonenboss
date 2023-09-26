import React, { Component } from "react";
import Home from "./components/Lobby";
import Game from "./components/Game";

import Navbar from "./components/Navbar";
import './App.css';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    games: [],
  };

  componentDidMount() {
    // Prüfe, ob der Benutzer bereits angemeldet ist.
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({
        isLoggedIn: true,
        user: JSON.parse(user),
      });
    }

    // Lade die Liste aller aktuellen Spiele.
    fetch("/games")
      .then((response) => response.json())
      .then((games) => this.setState({ games }));
  }

  handleLogout = () => {
    // Lösche den Benutzer aus dem lokalen Speicher.
    localStorage.removeItem("user");

    // Setze den Status auf nicht angemeldet.
    this.setState({
      isLoggedIn: false,
      user: null,
    });
  };

  render() {
    const { isLoggedIn, user, games } = this.state;

    return (
      <div className="app">
        <Navbar />
        {isLoggedIn && (
          <div>
            <header>
              <h1>Spiele</h1>
              <button onClick={this.handleLogout}>Abmelden</button>
            </header>
            <main>
              {games.map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </main>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <header>
              <h1>Anmelden</h1>
            </header>
            <main>
              <input type="text" placeholder="Benutzername" />
              <input type="password" placeholder="Passwort" />
              <button>Anmelden</button>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default App;
