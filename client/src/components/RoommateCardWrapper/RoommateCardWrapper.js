import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
import { CardColumns, Container, Row, Col } from "reactstrap";
import "./RoommateCardWrapper.css";
import Home from "../Home";

import PendingCardWrapper from "../PendingCardWrapper";
import MatchedCardWrapper from "../MatchedCardWrapper";
import PotentialCardWrapper from "../PotentialCardWrapper";



class RoommateCardWrapper extends Component {
    state = {
        potentialRoommates: [],
        matchedRoommates:[],
        pendingRoommates:[],

        requestedRoommates: [],
        // reqRoomieObjArr: [],
        // candidateRoomies: [],
        // candidateRoomiesArr: []
    };

//   getPotentialMatches() {
//     return API.getUserInfo().then(res => {
//       const user = res.data;
//       this.setState({ requestedRoomies: user.requestedRoomies, pendingRoomies: user.candidateRoomies });
//       API.filterUser(user)
//         .then(res => {
//             console.log(res)
//           const ranked = this.sortByMatchScore(user, res.data);
//           console.log(ranked.map(a => a.matchScore));
//           this.setState({ potentialRoommates: [...ranked] });
//         })
//         .catch(err => console.log(err));
//     });
//   }
    componentDidMount() {
        API.getUserInfo().then(res => {
            const currentUser = res.data
            API.getPopulatedUserInfo(currentUser._id).then(userData=>{
                const pendingRoommates = userData.data.candidateRoomies;
                const requestedRoommates = userData.data.requestedRoomies;
                const requestedRoommatesIds = requestedRoommates.map(roommate=>roommate._id)
                const matchedRoommates = pendingRoommates.filter((roommate)=>{
                    return requestedRoommates.indexOf(roommate._id)!== -1
                })
                API.filterUser(currentUser).then(res => {
                    console.log(res)
                    const potentialRoommates = this.sortByMatchScore(currentUser, res.data);              
                    this.setState({
                        pendingRoommates,
                        requestedRoommates,
                        matchedRoommates,
                        potentialRoommates
                    })
                })
            })
        })
    // API.getPopulatedUserInfo(id)
    // this.getPotentialMatches().then(() => {
    //   API.getUserLikes(this.state.requestedRoomies).then(res => {
    //     this.setState({ reqRoomieObjArr: res.data }, () =>
    //       console.log(this.state.reqRoomieObjArr)
    //     );
    //   }).then(() => {
    //     API.getUserLikes(this.state.candidateRoomies).then(res =>{
    //       this.setState({candidateRoomiesArr: res.data});
    //     })
    //   })
    // });
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

//   handleClick = id => {
//     this.likeRoommate(id);
//     this.updateOtherUser(id);
//   };

//   likeRoommate = id => {
//     // Get user Info to update user info
//     API.getUserInfo().then(res => {
//       const currentRequestedRoomies = [...res.data.requestedRoomies];
//       if (currentRequestedRoomies.indexOf(id) === -1) {
//         const newRequestedRoomies = [...res.data.requestedRoomies, id];
//         API.updateUser(res.data._id, {
//           requestedRoomies: newRequestedRoomies
//         }).then(result => {
//           this.setState({ requestedRoomies: newRequestedRoomies });
//         })
//       }
//     });
//   };

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
                <PotentialCardWrapper potentialRoommates={this.state.potentialRoommates}/>       
            </Container>
        )
    }
}

export default RoommateCardWrapper;
