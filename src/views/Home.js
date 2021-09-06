import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import EventService from "../EventService";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    EventService.fetchResult("théatre").then((eventData) => {
      setData(eventData);
      console.log(eventData);
    });
  }, []);

  return (
    <div className="home">
      <Navigation />
      <h1>Accueil</h1>
    </div>
  );
};

export default Home;
