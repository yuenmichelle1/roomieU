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
            this.currentUser = res.data;
         
            this.getAndDisplayUserRoomies(this.currentUser._id);
            // API.getPopulatedUserInfo(this.currentUser._id).then(userData=>{
            //     const candidateRoommates = userData.data.candidateRoomies;
            //     const requestedRoommates = userData.data.requestedRoomies;
    
            //     const requestedRoommatesIds = requestedRoommates.map(roommate=>roommate._id)
            //     // find out mutually liked ones.
            //     const matchedRoommates = candidateRoommates.filter((roommate)=>{
            //         return requestedRoommates.indexOf(roommate._id)!== -1
            //     })
            //     // filter out matched ones from pending roomats
            //     const pendingRoommates = candidateRoommates.filter(roommate=>{
            //         return matchedRoommates.indexOf(roommate._id) === -1
            //     })
            //     // find potential matches. Needs to filter out pending/liked/matched.
            //     API.filterUser(this.currentUser).then(res => {
            //         console.log(res)
            //         if(res.data.length>0){
            //             const potentialRoommates = this.sortByMatchScore(this.currentUser, res.data);              
            //             this.setState({
            //                 pendingRoommates,
            //                 requestedRoommates,
            //                 matchedRoommates,
            //                 potentialRoommates
            //             })
            //         }
            //     })
            // })            
        })
    }
    getAndDisplayUserRoomies = (id)=>{
      
        API.getPopulatedUserInfo(id).then(userData=>{
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

                if(res.data.length>0){
                    const potentialRoommates = this.sortByMatchScore(this.currentUser, res.data);              
                    this.setState({
                        pendingRoommates,
                        requestedRoommates,
                        matchedRoommates,
                        potentialRoommates
                    })
                }
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

        API.requestRoomie(this.currentUser._id, {
          requestedRoomies: [...this.currentUser.requestedRoomies, id]
        }).then(result => {
        //   this.setState({ 
        //       requestedRoomies: newRequestedRoomies,
        //       matchedRoommates: "dd"
        //     });


            

        })
      }
    
  };

//   updateOtherUser = id => {
//     API.getUserInfo().then(res => {
//       const userId = res.data._id;
//       API.getMatch(id).then(result => {
//         const currentCandidateRoomies = [...res.data.candidateRoomies];
//         if (currentCandidateRoomies.indexOf(userId) === -1) {
//           currentCandidateRoomies.push(userId);
//           API.updateUser(id, {
//             candidateRoomies: currentCandidateRoomies
//           }).then(res => console.log(`updated other user`));
//         }
//       });
//     });
//   };

  render() {
    return (
            <Container>
                <MatchedCardWrapper matchedRoommates={this.state.matchedRoommates}/>
                <PendingCardWrapper pendingRoommates={this.state.pendingRoommates}/>
                <PotentialCardWrapper handleClick={this.handleClick} potentialRoommates={this.state.potentialRoommates}/>       
            </Container>
        )
    }
}

export default RoommateCardWrapper;
