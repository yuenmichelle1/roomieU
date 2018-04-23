import React, { Component } from "react";
import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
//neeeds to be a class because need to grab matches and display image cards;
class Dashboard extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    API.getAllUsers().then(res => this.setState({ users: res })).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.users.map(name => <h1 style={{color: "black"}}> {name}</h1>)} 
      </div>
    );
  }
}

export default Dashboard;
