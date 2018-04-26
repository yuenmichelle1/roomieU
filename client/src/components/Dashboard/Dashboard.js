import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
import RoommateCard from "../RoommateCard/RoommateCard";
import { AuthConsumer } from "@hasura/react-check-auth";
import { CardColumns, Container, Row, Col } from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";

class Dashboard extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    // this.getAllUsers();
    this.getPotentialMatches();
  };

//   getAllUsers() {
//     API.getAllUsers()
//       .then(res => {
//         this.setState({ users: [...res.data] });
//         console.log([...res.data].map(el => el.name));
//       })
//       .catch(err => console.log(err));
//   };

  sortByMatchScore = function (user, filteredMatches){
    const prefs = user.roommatePrefs
    const matchSortedByScore = filteredMatches.map(filteredMatch=>{
        let score = 0;   
        filteredMatch.userQuals.forEach((a,i)=>{
            if(prefs[i] === "0"|| prefs[i] === a){
                score++
            }
        })
        filteredMatch["matchScore"] = score;
        return filteredMatch
    })
    return matchSortedByScore.sort((a,b)=>b.matchScore-a.matchScore)
};

  getPotentialMatches() {
    API.getUserInfo().then(res => {
      const user = res.data
      console.log(`HERE IS MY userData ${user}`);
      API.filterUser({ school: user.school, radius: user.radius, budget: user.budget, _id: {$ne: user._id} })
        .then(res => {
            const ranked = this.sortByMatchScore(user,res.data)
            console.log(ranked.map(a=>a.matchScore))
            this.setState({ users: [...ranked] })
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <Container>
              <Row>
                <h1> Potential Roommates That Best Suit You </h1>
                <Col>
                  <CardColumns>
                    {this.state.users.map((user,i) => (
                      <RoommateCard
                        key = {i}
                        photo={user.photo}
                        name={user.name}
                        school={user.school}
                        bio={user.bio}
                      />
                    ))}
                  </CardColumns>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <br />
              <br />
              <Row>
                <h1> Roommates That You Like</h1>
                <br />
                <br />
                <br />
                <br />
                <Col>
                  <CardColumns />
                </Col>
              </Row>
              <Row>
                <h1> Roommates That Like YOU </h1>
                <Col>
                  <CardColumns />
                </Col>
              </Row>
            </Container>
          ) : (
            <Home />
          )
        }
      </AuthConsumer>
    );
  }
}

export default Dashboard;
