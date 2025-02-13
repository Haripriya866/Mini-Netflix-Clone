import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="app-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/movie/:id" component={MovieDetails} />
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
