import React, { Component } from "react";
import RoomieForm from "../RoomieForm";
import UserinfoForm from "../UserinfoForm";
// import { Link } from "react-router";
import API from "../../utils/API";

class FormWrapper extends Component {
  state = {
    gender: "Male",
    budget: "$0 - $500",
    radius: "0-5 miles",
    smoking: "I don't smoke at all!",
    pets: "I don't have one and I would rather not live with one.",
    schedule: "Morning Bird",
    partying: "I'm a Party Animal! I love having my friends over to throw a rager",
    bio: "", 
    roommatePreferences: []
  };
  grabUserProfile = event => {
    // Update the appropriate state
    const value= event.target.value;
    const name= event.target.dataset.name;
    const newObj = {[name]: value};
    this.setState(newObj);
    console.log(newObj);
    console.log(name);
  };

  setIdealRoommate = (event) => {
    const value= event.target.value;
    const name= event.target.dataset.name;
    const newObj = {[name]: value};
    const roommatePrefCopy = [...this.state.roommatePreferences];
    roommatePrefCopy.push(newObj);
    console.log(roommatePrefCopy);
    this.setState({roommatePreferences: roommatePrefCopy}); 
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="text-center"> Tell Us A Bit About You</h1>
        <UserinfoForm grabUserProfile={this.grabUserProfile} />
        <h1 className="text-center"> Your Ideal Roommate</h1>
        <RoomieForm setIdealRoommate={this.setIdealRoommate}/>
      </div>
    );
  }
}

export default FormWrapper;
