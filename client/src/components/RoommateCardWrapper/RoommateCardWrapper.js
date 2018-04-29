import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
import { CardColumns, Container, Row, Col } from "reactstrap";
import "./RoommateCardWrapper.css";
import Home from "../Home";

import PendingRoommateCard from "../PendingRoommateCard";
import MatchedRoommateCard from "../MatchedRoommateCard";
import PotentialRoommateCard from "../PotentialRoommateCard"


class RoommateCardWrapper extends Component {
  state = {
    users: [],
    requestedRoomies: [],
    reqRoomieObjArr: [],
    candidateRoomies: [],
    candidateRoomiesArr: []
  };
  componentDidMount() {
    this.getPotentialMatches().then(() => {
      API.getUserLikes(this.state.requestedRoomies).then(res => {
        this.setState({ reqRoomieObjArr: res.data }, () =>
          console.log(this.state.reqRoomieObjArr)
        );
      }).then(() => {
        API.getUserLikes(this.state.candidateRoomies).then(res =>{
          this.setState({candidateRoomiesArr: res.data});
        })
      })
    });
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

  getPotentialMatches() {
    return API.getUserInfo().then(res => {
      const user = res.data;
      this.setState({ requestedRoomies: user.requestedRoomies, candidateRoomies: user.candidateRoomies });
      API.filterUser({
        school: user.school,
        radius: user.radius,
        budget: user.budget,
        _id: { $ne: user._id }
      })
        .then(res => {
          const ranked = this.sortByMatchScore(user, res.data);
          console.log(ranked.map(a => a.matchScore));
          this.setState({ users: [...ranked] });
        })
        .catch(err => console.log(err));
    });
  }

  handleClick = id => {
    this.likeRoommate(id);
    this.updateOtherUser(id);
  };

  likeRoommate = id => {
    // Get user Info to update user info
    API.getUserInfo().then(res => {
      const currentRequestedRoomies = [...res.data.requestedRoomies];
      if (currentRequestedRoomies.indexOf(id) === -1) {
        const newRequestedRoomies = [...res.data.requestedRoomies, id];
        API.updateUser(res.data._id, {
          requestedRoomies: newRequestedRoomies
        }).then(result => {
          this.setState({ requestedRoomies: newRequestedRoomies });
        })
      }
    });
  };

  updateOtherUser = id => {
    API.getUserInfo().then(res => {
      const userId = res.data._id;
      API.getMatch(id).then(result => {
        const currentCandidateRoomies = [...res.data.candidateRoomies];
        if (currentCandidateRoomies.indexOf(userId) === -1) {
          currentCandidateRoomies.push(userId);
          API.updateUser(id, {
            candidateRoomies: currentCandidateRoomies
          }).then(res => console.log(`updated other user`));
        }
      });
    });
  };

  render() {
    return (
            <Container>
            {/* <MatchedRoommateCard/> */}
            {/* <PendingRoommateCard/> */}
            {this.state.users.map((user, i) => {
            return <PotentialRoommateCard
                    key={i}
                    photo={user.photo}
                    name={user.name}
                    school={user.school}
                    bio={user.bio}
                    id={user._id}
                    handleClick={this.handleClick}
                />
            })}          
            </Container>
        )
    }
}

export default RoommateCardWrapper;
// {this.state.candidateRoomiesArr.map((user, i) => (
//     <RoommateCard
//       key={i}
//       photo={user.photo}
//       name={user.name}
//       school={user.school}
//       bio={user.bio}
//       id={user._id}
//       handleClick={this.handleClick}
//     />
//   ))}