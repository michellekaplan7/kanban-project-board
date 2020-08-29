import React from "react";
// import "./App.css";
import "@atlaskit/css-reset";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
import Board from "../Board/Board";

import { Route, Switch } from "react-router-dom";

import styled from "styled-components";

const Body = styled.div`
background-color: #ecf0f1;
font-family: helvetica, arial, sans-serif;
font-size: 16px;
padding-top: 330px;
@include transition(padding-top .5s ease);
`;
function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/projectboard"
          render={() => {
            return (
              <div>
                {/* <Header /> */}
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
