import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import mainPage from "./containers/mainPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={mainPage} />
      </Switch>
    </Router>
  );
}

export default App;
