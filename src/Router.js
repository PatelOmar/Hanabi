import React, { Suspense, lazy, useState } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


import Home from "./pages/Home";
import Lobby from "./pages/Lobby";

export default function AppRouter() {
    return (
      <Router>
        
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/lobby/:code">
              <Lobby />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/lobby/:code/start">
              <Home />
            </Route>
          </Switch>
      </Router>
    );
  }