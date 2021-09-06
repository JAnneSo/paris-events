import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="navigation">
        <NavLink exact to="/" activeClassName="nav-active">
          Accueil
        </NavLink>
        <NavLink exact to="/search" activeClassName="nav-active">
          Recherche
        </NavLink>
        <NavLink exact to="/event" activeClassName="nav-active">
          Évènement
        </NavLink>
        <NavLink exact to="/favorites" activeClassName="nav-active">
          Favoris
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
