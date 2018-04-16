import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import FormWrapper from "./components/FormWrapper";


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignupForm} /> */}
        <Route exact path="/roommatepreferences" component={FormWrapper} />
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
      </div>
    </Router>
    );
  }
}

export default App;
