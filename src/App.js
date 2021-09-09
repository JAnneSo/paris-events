import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import SearchPage from "./views/SearchPage";
import Event from "./views/Event";
import Favorites from "./views/Favorites";
import NotFound from "./views/NotFound";
import "./styles/paris-events.scss";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/event" component={Event} />
          <Route path="/favorites" exact component={Favorites} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      <script src="./scripts/headerScroll.js"></script>
    </div>
  );
}

export default App;
