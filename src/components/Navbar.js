import React, { Component } from "react";

class Navbar extends Component {
  render() {
    const links = [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Spiele",
        href: "/games",
      },
      {
        label: "Profil",
        href: "/profile",
      },
      {
        label: "Registrieren",
        href: "/register",
      },
      {
        label: "Anmelden",
        href: "/login",
      },
    ];

    return (
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
