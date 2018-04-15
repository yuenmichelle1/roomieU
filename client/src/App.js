import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import RoomieForm from "./components/RoomieForm";


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* <Nav /> */}
        <Route exact path="/" component={RoomieForm} />
      </div>
    </Router>
    );
  }
}

export default App;
