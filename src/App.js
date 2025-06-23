import React, { Component } from "react";
import Lobby from "./components/Lobby";
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
    fetch("https://gruppe15.toni-barth.com/games/")
      .then((response) => response.json())
      .then((games) => this.setState({ games }))
      .catch((error) => console.error("Error fetching games:", error));
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
    const { isLoggedIn } = this.state;

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
              <Lobby />
            </main>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <header>
              <h1>Anmelden</h1>
            </header>
            <main>
              <form onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.username.value;
                const password = e.target.password.value;
                
                // Simple validation
                if (username && password) {
                  // Create a user object
                  const user = {
                    username,
                    name: username,
                    email: `${username}@example.com`
                  };
                  
                  // Store user in localStorage
                  localStorage.setItem("user", JSON.stringify(user));
                  
                  // Update state
                  this.setState({
                    isLoggedIn: true,
                    user
                  });
                } else {
                  alert("Bitte geben Sie einen Benutzernamen und ein Passwort ein.");
                }
              }}>
                <input type="text" name="username" placeholder="Benutzername" required />
                <input type="password" name="password" placeholder="Passwort" required />
                <button type="submit">Anmelden</button>
              </form>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default App;
