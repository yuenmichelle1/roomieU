import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/all" component={ProductList} />
        <Route exact path="/new" component={NewProduct} />
      </div>
    </Router>
    );
  }
}

export default App;
