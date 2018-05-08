import React, { Component } from "react";
import API from "../../utils/API";
import { Row, Col, Badge } from "reactstrap";
import "./RoommateCardWrapper.css";
import PendingCardWrapper from "../PendingCardWrapper";
import MatchedCardWrapper from "../MatchedCardWrapper";
import PotentialCardWrapper from "../PotentialCardWrapper";

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";


class RoommateCardWrapper extends Component {
  state = {
    potentialRoommates: [],
    matchedRoommates: [],
    pendingRoommates: [],
    requestedRoommates: [],
    currentUser: {}
  };

  componentDidMount() {
    API.getUserInfo().then(res => {
      this.getAndDisplayUserRoomies(res.data._id);
    });
  }

  getAndDisplayUserRoomies = id => {
    API.getPopulatedUserInfo(id).then(userData => {
      this.setState({ currentUser: userData.data });
      const candidateRoommates = userData.data.candidateRoomies;
      const requestedRoommates = userData.data.requestedRoomies;

      const dislikedRoommatesIds = userData.data.dislikedRoomies;
      console.log(dislikedRoommatesIds, "disliked roomies")

      const requestedRoommatesIds = requestedRoommates.map(
        roommate => roommate._id
      );

      // find out overlap between rquested and candidates
      const matchedRoommates = candidateRoommates.filter(roommate => {
        return requestedRoommatesIds.indexOf(roommate._id) !== -1;
      });

      const matchedRoommatesIds = matchedRoommates.map(
        roommate => roommate._id
      );
      // filter out matched ones from pending roomats
      const pendingRoommates = candidateRoommates.filter(roommate => {
        return matchedRoommatesIds.indexOf(roommate._id) === -1;
      });
      // find potential matches. Needs to filter out pending/liked/matched.
      API.filterUser(this.state.currentUser).then(res => {
        //change compatibi.ity threshold here (1 is 20%,  2 is 40%)
        const potentialRoommates =
          res.data.length > 0
            ? this.sortByMatchScore(this.state.currentUser, res.data).filter(a=>a.matchScore>=2 && dislikedRoommatesIds.indexOf(a._id)===-1)
            : [];
        this.setState({
          pendingRoommates: this.sortByMatchScore(
            this.state.currentUser,
            pendingRoommates
          ),
          requestedRoommates: requestedRoommates,
          matchedRoommates: this.sortByMatchScore(
            this.state.currentUser,
            matchedRoommates
          ),
          potentialRoommates: potentialRoommates
        });
      });
    });
  };

  getAndDisplayUserRoomiesPending = id => {
    API.getPopulatedUserInfo(id).then(userData => {
      this.setState({ currentUser: userData.data });
      const candidateRoommates = userData.data.candidateRoomies;
      const requestedRoommates = userData.data.requestedRoomies;
      const requestedRoommatesIds = requestedRoommates.map(
        roommate => roommate._id
      );

      // find out overlap between rquested and candidates
      const matchedRoommates = candidateRoommates.filter(roommate => {
        return requestedRoommatesIds.indexOf(roommate._id) !== -1;
      });

      const matchedRoommatesIds = matchedRoommates.map(
        roommate => roommate._id
      );
      // filter out matched ones from pending roomats
      const pendingRoommates = candidateRoommates.filter(roommate => {
        return matchedRoommatesIds.indexOf(roommate._id) === -1;
      });
      const newMatchesArr = this.sortByMatchScore(
        this.state.currentUser,
        matchedRoommates
      );
      const stateMatchedRoommatesCopy = [...this.state.matchedRoommates];
      console.log("stateMatchedRoommatesCopy: " + stateMatchedRoommatesCopy);
      const stateMatchedIds = stateMatchedRoommatesCopy.map(
        roommate => roommate._id
      );
      console.log("stateMatchedIds " + stateMatchedIds);
      const newestMatchArrOneObj = newMatchesArr.filter(
        roommate => stateMatchedIds.indexOf(roommate._id) === -1
      );
      console.log(newestMatchArrOneObj);
      if (newestMatchArrOneObj.length > 0) {
        const newMatchPhone = newestMatchArrOneObj[0].phone;
        console.log(`API SEND TEXT ${newMatchPhone}`);
        API.sendText(newMatchPhone).then(data =>
          console.log(`MMOOOOOOOO ${data}`)
        );
      }
      // find potential matches. Needs to filter out pending/liked/matched.
      API.filterUser(this.state.currentUser).then(res => {
        const potentialRoommates =
          res.data.length > 0
            ? this.sortByMatchScore(this.state.currentUser, res.data)
            : [];
        this.setState({
          pendingRoommates: this.sortByMatchScore(
            this.state.currentUser,
            pendingRoommates
          ),
          requestedRoommates: requestedRoommates,
          matchedRoommates: newMatchesArr,
          potentialRoommates: potentialRoommates
        });
      });
    });
  };

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
    return matchSortedByScore;
  };

  handleClick = id => {
    this.requestRoommate(id);
  };

  requestRoommate = id => {
    if (this.state.currentUser.requestedRoomies.indexOf(id) === -1) {
      API.requestRoomie(this.state.currentUser._id, id).then(result => {
        this.getAndDisplayUserRoomies(this.state.currentUser._id);
      });
    }
  };

  handlePendingClick = id => {
      console.log(id)
    this.requestPendingRoommate(id);
  };

  requestPendingRoommate = id => {
    if (this.state.currentUser.requestedRoomies.indexOf(id) === -1) {
      API.requestRoomie(this.state.currentUser._id, id).then(result => {
        this.getAndDisplayUserRoomiesPending(this.state.currentUser._id);
      });
    }
  };

  convertTitle = function(str) {
    const arr = str.split(" ");
    if (arr.length === 1) {
      return arr[0].charAt(0).toUpperCase() + arr[0].substr(1).toLowerCase();
    } else {
      return arr
        .map((word, index) => {
          if (index === 0) {
            return (
              word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() + " "
            );
          } else if (index === arr.length - 1) {
            return word.charAt(0).toUpperCase() + ".";
          } else {
            return "";
          }
        })
        .join("");
    }
  };

    cancelPotential = (dislikedId)=>{
        API.cancelRoomie(this.state.currentUser._id, dislikedId).then(
            (response)=>{
                console.log(response)
                this.setState({
                    potentialRoommates: this.state.potentialRoommates.filter(a=>a._id !==dislikedId)
                })
            }
        )
    };
    declinePending = (declinedId)=>{
        API.declineRoomie(this.state.currentUser._id, declinedId).then(
            (response)=>{
                console.log(response)
                this.setState({
                    pendingRoommates: this.state.pendingRoommates.filter(a=>a._id !==declinedId)
                })
            }
        )
    };


  render() {
    console.log("hello?!", this.state);
    return (
      <Router>
        <div className="roomies-div">
          <Row className="dash-header">
            <Col xs="12" sm="12" md="4">
              <NavLink
                to="/dashboard/matched"
                activeClassName="is-active"
                className="header-text dash-link"
              >
                Matched Roomies
              </NavLink>{" "}
              <Badge className="dash-badge" color="warning">
                {this.state.matchedRoommates.length}
              </Badge>
             </Col>
             <Col xs="12" sm="12" md="4">
              <NavLink
                to="/dashboard/pending"
                activeClassName="is-active"
                className="header-text dash-link"
              >
                Pending Roomies
              </NavLink>{" "}
              <Badge className="dash-badge" color="warning">
                {this.state.pendingRoommates.length}
              </Badge>
              </Col>
             <Col xs="12" sm="12" md="4">
              <NavLink
                to="/dashboard/potential"
                activeClassName="is-active"
                className="header-text dash-link"
              >
                Potential Roomies
              </NavLink>{" "}
              <Badge className="dash-badge" color="warning">
                {this.state.potentialRoommates.length}
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Route
                exact
                path="/dashboard"
                component={() => {
                  return this.state.matchedRoommates.length > 0 ? (
                    <MatchedCardWrapper
                      convertTitle={this.convertTitle}
                      matchedRoommates={this.state.matchedRoommates}
                      changeDashboard={this.props.changeDashboard}
                    />
                  ) : this.state.pendingRoommates.length > 0 ? (
                    <PendingCardWrapper
                      convertTitle={this.convertTitle}
                      handleClick={this.handlePendingClick}
                      pendingRoommates={this.state.pendingRoommates}
                      declinePending = {this.declinePending}
                    />
                  ) : (
                    <PotentialCardWrapper
                      convertTitle={this.convertTitle}
                      handleClick={this.handleClick}
                      potentialRoommates={this.state.potentialRoommates}
                      cancelPotential = {this.cancelPotential}
                    />
                  );
                }}
              />
              <Route
                path="/dashboard/matched"
                component={() => (
                  <MatchedCardWrapper
                    convertTitle={this.convertTitle}
                    matchedRoommates={this.state.matchedRoommates}
                    changeDashboard={this.props.changeDashboard}
                  />
                )}
              />
              <Route
                path="/dashboard/pending"
                component={() => (
                  <PendingCardWrapper
                    convertTitle={this.convertTitle}
                    handleClick={this.handlePendingClick}
                    pendingRoommates={this.state.pendingRoommates}
                    declinePending = {this.declinePending}
                  />
                )}
              />
              <Route
                path="/dashboard/potential"
                component={() => (
                  <PotentialCardWrapper
                    convertTitle={this.convertTitle}
                    handleClick={this.handleClick}
                    potentialRoommates={this.state.potentialRoommates}
                    cancelPotential = {this.cancelPotential}
                  />
                )}
              />
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

export default RoommateCardWrapper;
