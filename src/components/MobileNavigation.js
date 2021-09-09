import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <div className="mobile-nav">
      <NavLink exact to="/" activeClassName="nav-active">
        <div>
          <FontAwesomeIcon icon={faHome} />
          <p>Accueil</p>
        </div>
      </NavLink>
      <NavLink exact to="/search" activeClassName="nav-active">
        <div>
          <FontAwesomeIcon icon={faSearch} />
          <p>Recherche</p>
        </div>
      </NavLink>
      <NavLink exact to="/favorites" activeClassName="nav-active">
        <div>
          <FontAwesomeIcon icon={faHeart} />
          <p>Favoris</p>
        </div>
      </NavLink>
    </div>
  );
};

export default MobileNavigation;
