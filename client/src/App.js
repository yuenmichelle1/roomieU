import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import FormWrapper from "./components/FormWrapper";


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* <Nav /> */}
        <Route exact path="/" component={FormWrapper} />
      </div>
    </Router>
    );
  }
}

export default App;
