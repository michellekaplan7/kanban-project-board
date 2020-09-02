import React from "react";
import "@atlaskit/css-reset";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
import Board from "../Board/Board";

import { Route, Switch } from "react-router-dom";

import styled from "styled-components";

const Body = styled.div`
  background-color: white;
  font-family: helvetica, arial, sans-serif;
  font-size: 16px;
  margin-top: 20%;
  @include transition(padding-top 0.5s ease);
`;

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/projectboard"
          render={() => {
            return (
              <Body>
                <Header />
                <Board />
              </Body>
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Body>
                <Header />
                <Landing />
              </Body>
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
