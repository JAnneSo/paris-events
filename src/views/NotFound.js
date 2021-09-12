import React from "react";
import Navigation from "../components/Navigation";

const NotFound = () => {
  return (
    <div>
      <Navigation />
      <main className="not-found-main">
        <h1 className="hinge">Erreur 404</h1>
      </main>
    </div>
  );
};

export default NotFound;
