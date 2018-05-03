import React, { Component } from "react";
import API from "../../utils/API";
import {Button} from "reactstrap";
import "./RoommateCardWrapper.css";
import PendingCardWrapper from "../PendingCardWrapper";
import MatchedCardWrapper from "../MatchedCardWrapper";
import PotentialCardWrapper from "../PotentialCardWrapper";


class RoommateCardWrapper extends Component {
    state = {
        potentialRoommates:[],
        matchedRoommates:[],
        pendingRoommates:[],
        requestedRoommates: [],
        roommateWrapper: "matched"
    };
    currentUser={};
    componentDidMount() {
        API.getUserInfo().then(res => {    
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
                const potentialRoommates = res.data.length>0?this.sortByMatchScore(this.currentUser, res.data):[];  
                this.setState({
                    pendingRoommates,
                    requestedRoommates,
                    matchedRoommates,
                    potentialRoommates
                })
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
      this.requestRoommate(id);
  };

  requestRoommate = (id) => {
    if (this.currentUser.requestedRoomies.indexOf(id) === -1) {
        API.requestRoomie(this.currentUser._id, id).then(result => {
        this.getAndDisplayUserRoomies(this.currentUser._id);
        })
      }    
  };

  changeWrapper = (entry) => {
        this.setState({roommateWrapper: entry});
  } 

  displayWrapper = (entry) => {
    switch(entry){
        case "matched": return <MatchedCardWrapper matchedRoommates={this.state.matchedRoommates} changeDashboard={this.props.changeDashboard}/>;
        case "pending": return <PendingCardWrapper handleClick={this.handleClick} pendingRoommates={this.state.pendingRoommates}/>;
        case "potential": return <PotentialCardWrapper handleClick={this.handleClick} potentialRoommates={this.state.potentialRoommates}/>;
        default : return null;
    }
  }

  

  render() {
    return (
        <div>
            <Button onClick={()=> this.changeWrapper('matched')}> Matched ({this.state.matchedRoommates.length}) </Button>
            <Button onClick={()=> this.changeWrapper('pending')}> Pending ({this.state.pendingRoommates.length}) </Button>
            <Button onClick={()=> this.changeWrapper('potential')}> Potential ({this.state.potentialRoommates.length})</Button>
            {this.displayWrapper(this.state.roommateWrapper)}     
        </div>
        )
    }
}

export default RoommateCardWrapper;
