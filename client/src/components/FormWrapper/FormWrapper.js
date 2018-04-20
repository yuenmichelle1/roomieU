import React, { Component } from "react";
import RoomieForm from "../RoomieForm";
import UserinfoForm from "../UserinfoForm";
import { Button } from "reactstrap";
import API from "../../utils/API";

class FormWrapper extends Component {
  state = {
    budget: "$0 - $500",
    radius: "0-5 miles",
    bio: "",
    userGender: "",
    userGenderScore:"",
    userSmoke: "",
    userSmokeScore: "",
    userParty: "",
    userPartyScore: "",
    userSchedule: "",
    userScheduleScore: "",
    userPets: "",
    userPetsScore: "",
    genderPref: "",
    smokePref: "",
    partyPref: "",
    petsPref: "",
    schedulePref: "",
    selectedValue: ""
  };
  grabUserProfile = event => {
    // Update the appropriate state
    const value = event.target.value;
    const name = event.target.dataset.name;
    const newObj = { [name]: value };
    this.setState(newObj);
    console.log(newObj);
    console.log(name);
  };

  setIdealRoommate = event => {
    const value = event.target.value;
    const name = event.target.dataset.name;
    const newObj = { [name]: value };
    this.setState(newObj);
  };

  setUserQuals = event => {
    const value = event.target.value;
    const name = event.target.dataset.name;
    const score = event.target.dataset.score;
    const scoreName = name+'Score';
    const newObj = { [name]: value, [scoreName]: score };
    this.setState(newObj);
    console.log(newObj);
  };

  sendData = event => {
    const roommatePref = {
      roommatePref: [
        { gender: this.state.genderPref },
        { schedule: this.state.schedulePref },
        { smoke: this.state.smokePref },
        { party: this.state.partyPref },
        { pets: this.state.petsPref }
      ]
    };
    API.updateUser(roommatePref).then(data =>
      console.log(`${data} has been sent`)
    );
  };

  render() {
    return (
      <div className="wrapper">
        <h1 className="text-center"> Tell Us A Bit About You</h1>
        <UserinfoForm
          grabUserProfile={this.grabUserProfile}
          setUserQuals={this.setUserQuals}
          userGender={this.state.userGender}
          userSmoke={this.state.userSmoke}
          userSchedule={this.state.userSchedule}
          userParty={this.state.userParty}
          userPets = {this.state.userPets}
        />
        <h1 className="text-center"> Your Ideal Roommate</h1>
        <RoomieForm setIdealRoommate={this.setIdealRoommate} />
        <Button onClick={this.sendData}>Submit</Button>
      </div>
    );
  }
}

export default FormWrapper;
