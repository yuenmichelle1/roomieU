import React, { Component } from "react";
import RoomieForm from "../RoomieForm";
import UserinfoForm from "../UserinfoForm";
import { Row, Col, Button } from "reactstrap";
import API from "../../utils/API";
import {AuthConsumer} from '@hasura/react-check-auth';
import Home from "../Home";
import './formwrapper.css';

class FormWrapper extends Component {
  state = {
    budget: "$0 - $800",
    radius: "0-5 miles",
    bio: "",
    userGender: "",
    userGenderScore: "",
    userSmoke: "",
    userSmokeScore: "",
    userParty: "",
    userPartyScore: "",
    userSchedule: "",
    userScheduleScore: "",
    userPets: "",
    userPetsScore: "",
    genderPref: "",
    genderPrefScore:"",
    smokePref: "",
    smokePrefScore: "",
    partyPref: "",
    partyPrefScore: "",
    petsPref: "",
    petsPrefScore: "",
    schedulePref: "",
    schedulePrefScore: ""
  };

  grabUserProfile = event => {
    const value = event.target.value;
    const name = event.target.dataset.name;
    const newObj = { [name]: value };
    this.setState(newObj);
    console.log(newObj);
    console.log(name);
  };

 
  setUserQuals = event => {
    const value = event.target.value;
    const name = event.target.dataset.name;
    const score = event.target.dataset.score;
    const scoreName = name + "Score";
    const newObj = { [name]: value, [scoreName]: score };
    this.setState(newObj);
    console.log(newObj);
  };

  sendData = event => {
    const userInfo = {
      budget: this.state.budget,
      radius: this.state.radius,
      bio: this.state.bio,
    //   userQuals: [
    //     { gender: this.state.userGenderScore },
    //     { schedule: this.state.userScheduleScore },
    //     { smoke: this.state.userSmokeScore },
    //     { party: this.state.userPartyScore },
    //     { pets: this.state.userPetsScore }
    //   ],
    //   roommatePrefs: [
    //     { gender: this.state.genderPrefScore },
    //     { schedule: this.state.schedulePrefScore },
    //     { smoke: this.state.smokePrefScore },
    //     { party: this.state.partyPrefScore },
    //     { pets: this.state.petsPrefScore }
    //   ]
        userQuals: [
            this.state.userGenderScore,
            this.state.userScheduleScore,
            this.state.userSmokeScore,
            this.state.userPartyScore,
            this.state.userPetsScore
        ],
        roommatePrefs: [
            this.state.genderPrefScore,
            this.state.schedulePrefScore,
            this.state.smokePrefScore,
            this.state.partyPrefScore,
            this.state.petsPrefScore
        ]
    };

    // first get current user info to get userID (note that userData is nested inside of data property)
    // then update user info in the db with preferences. Returned data should be complete user info
    API.getUserInfo().then(currentUserInfo=>{
        const currentUserId = currentUserInfo.data._id;
        API.updateUser(currentUserId, userInfo).then(message => {
            // This message shows if user successfulay updated. If you prefer returning uer data, edit user controller to return dbuser
            // console.log(data)
            console.log(message.data);
            window.location = "/dashboard";
        }
        );
    });
  }

    
// only alllow access if user if logged in 
  render() {
    return (
    <AuthConsumer> 
        {({userInfo, isLoading, error}) => (userInfo ?        
            (<Row className="wrapper more-info-div">
              <Col xs="12" sm="12" md="12" lg="12">
                <h1 className="text-center header-text form-header form-header-top"> Tell Us A Bit About You</h1>
                <UserinfoForm
                grabUserProfile={this.grabUserProfile}
                setUserQuals={this.setUserQuals}
                userGender={this.state.userGender}
                userSmoke={this.state.userSmoke}
                userSchedule={this.state.userSchedule}
                userParty={this.state.userParty}
                userPets={this.state.userPets}
                />
                <h1 className="text-center header-text form-header"> Your Ideal Roommate</h1>
                <RoomieForm 
                setUserQuals={this.setUserQuals}
                genderPref={this.state.genderPref}
                smokePref={this.state.smokePref}
                schedulePref={this.state.schedulePref}
                partyPref={this.state.partyPref}
                petsPref={this.state.petsPref}
                />
                <Row className="text-center">
                  <Col xs="12" sm="12" md="12" lg="12">
                    <Button onClick={this.sendData} color="success" className="submit-form-btn">Submit</Button>
                  </Col>
                </Row>
              </Col>
            </Row>):(<Home/>)
        )}                 
    </AuthConsumer> 
    );
  }
}

export default FormWrapper;
