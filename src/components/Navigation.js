import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { headerScroll } from "../scripts/functions";

const Navigation = () => {
  useEffect(() => {
    headerScroll();
  }, []);
  return (
    <header id="header">
      <div className="nav-ctnr">
        <Link exact to="/" className="logo">
          Paris'Events
        </Link>
        <nav className="navigation">
          <NavLink exact to="/" activeClassName="nav-active">
            Accueil
          </NavLink>
          <NavLink exact to="/search" activeClassName="nav-active">
            Recherche
          </NavLink>
          <NavLink exact to="/favorites" activeClassName="nav-active">
            Favoris
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
