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
    schedule: "Morning Bird",
    partying: "I'm a Party Animal! I love having my friends over to throw a rager",
    bio: ""
  };
  grabUserProfile = event => {
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    
  };

  render() {
    return (
      <div className="wrapper">
        <h1 className="text-center"> Tell Us A Bit About You</h1>
        <UserinfoForm grabUserProfile={this.grabUserProfile} />
        <h1 className="text-center"> Your Ideal Roommate</h1>
        <RoomieForm />
      </div>
    );
  }
}

export default FormWrapper;
