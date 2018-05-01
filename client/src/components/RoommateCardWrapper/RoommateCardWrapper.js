import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
// import { CardColumns, Container, Row, Col } from "reactstrap";
import {Container} from "reactstrap";
import "./RoommateCardWrapper.css";
// import Home from "../Home";

import PendingCardWrapper from "../PendingCardWrapper";
import MatchedCardWrapper from "../MatchedCardWrapper";
import PotentialCardWrapper from "../PotentialCardWrapper";



class RoommateCardWrapper extends Component {
    state = {
        potentialRoommates:[],
        matchedRoommates:[],
        pendingRoommates:[],
        requestedRoommates: []
    };
    currentUser={};
    componentDidMount() {
        API.getUserInfo().then(res => {
            // this.currentUser = res.data;       
            this.getAndDisplayUserRoomies(res.data._id);            
        })
    }
    getAndDisplayUserRoomies = (id)=>{
      
        API.getPopulatedUserInfo(id).then(userData=>{
            this.currentUser = userData.data;  
            const candidateRoommates = userData.data.candidateRoomies;
            const requestedRoommates = userData.data.requestedRoomies;
         
            const requestedRoommatesIds = requestedRoommates.map(roommate=>roommate._id)
            
            // find out overlap between rquested and candidates
            const matchedRoommates = candidateRoommates.filter((roommate)=>{    
                return requestedRoommatesIds.indexOf(roommate._id)!== -1
            })

            const matchedRoommatesIds =  matchedRoommates.map(roommate=>roommate._id)
            // filter out matched ones from pending roomats
            const pendingRoommates = candidateRoommates.filter(roommate=>{
                return matchedRoommatesIds.indexOf(roommate._id) === -1
            })

            // find potential matches. Needs to filter out pending/liked/matched.
            API.filterUser(this.currentUser).then(res => {
                console.log(this.currentUser,"wow")       
                const potentialRoommates = res.data.length>0?this.sortByMatchScore(this.currentUser, res.data):[];  
                console.log(potentialRoommates,"potential roomate in filterUser")
                this.setState({
                    pendingRoommates,
                    requestedRoommates,
                    matchedRoommates,
                    potentialRoommates
                }, ()=>console.log(this.state))
            })
        })
    }
  sortByMatchScore = function(user, filteredMatches) {
    const prefs = user.roommatePrefs;
    const matchSortedByScore = filteredMatches.map(filteredMatch => {
      let score = 0;
      filteredMatch.userQuals.forEach((a, i) => {
        if (prefs[i] === "0" || prefs[i] === a) {
          score++;
        }
      });
      filteredMatch["matchScore"] = score;
      return filteredMatch;
    });
    return matchSortedByScore.sort((a, b) => b.matchScore - a.matchScore);
  };

  handleClick = id => {
      console.log("requested" + id)
      this.requestRoommate(id);
    // this.updateOtherUser(id);
  };

  requestRoommate = (id) => {
    console.log(this.currentUser)
    if (this.currentUser.requestedRoomies.indexOf(id) === -1) {

        API.requestRoomie(this.currentUser._id, id).then(result => {
        //   this.setState({ 
        //       requestedRoomies: newRequestedRoomies,
        //       matchedRoommates: "dd"
        //     });
        console.log(result, "      result")
        this.getAndDisplayUserRoomies(this.currentUser._id);

        })
      }
    
  };

  render() {
    return (
            <Container>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <MatchedCardWrapper matchedRoommates={this.state.matchedRoommates}/>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <PendingCardWrapper handleClick={this.handleClick} pendingRoommates={this.state.pendingRoommates}/>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <PotentialCardWrapper handleClick={this.handleClick} potentialRoommates={this.state.potentialRoommates}/>   
                        </div>
                    <div className="col-md-3"></div>
                </div>
            </Container>
        )
    }
}

export default RoommateCardWrapper;
