import React from "react";
// import "./App.css";
import "@atlaskit/css-reset";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
import Board from "../Board/Board";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/projectboard"
          render={() => {
            return (
              <div>
                <Header />
                <Board />
              </div>
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <Header />
                <Landing />
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
