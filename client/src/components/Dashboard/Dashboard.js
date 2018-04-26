import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
import RoommateCard from "../RoommateCard/RoommateCard";
import { AuthConsumer } from "@hasura/react-check-auth";
import { CardColumns, Container, Row, Col } from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";
//neeeds to be a class because need to grab matches and display image cards;
class Dashboard extends Component {
  state = {
    users: [],
    // OBJECT IDS IN REQUESTED ROOMIES AND CANDIDATE ROOMIES
    requestedRoomies: [],
    candidateRoomies: [],
    // {USER OBJECTS TO DISPLAY } IN DISPLAY ARR
    reqRoomiesDisplayArr: [],
    candRoomiesDisplayArr: []
  };

  componentDidMount() {
    this.getPotentialMatches();
  }

  getPotentialMatches() {
    API.getUserInfo().then(res => {
      const candidateRoomies = res.data.candidateRoomies;
      const requestedRoomies = res.data.requestedRoomies;
      API.filterUser({
        school: res.data.school,
        radius: res.data.radius,
        budget: res.data.budget,
        _id: { $ne: res.data._id }
      })
        .then(res => {
          this.setState({
            users: [...res.data],
            requestedRoomies: requestedRoomies,
            candidateRoomies: candidateRoomies
          }, this.displayRequestedRoomies());
        })
        .catch(err => console.log(err));
    });
  }

  displayRequestedRoomies = () => {
    //reqRoomiesCopy =  array of ids
    const reqRoomiesCopy = [...this.state.candidateRoomies];
    const reqRoomiesDisplayCopy=[...this.state.reqRoomiesDisplayArr];
    reqRoomiesCopy.forEach(el => {
      API.getRequestedRoomie(el).then(res => {
        reqRoomiesDisplayCopy.push(res.data);
        this.setState({reqRoomiesDisplayArr: reqRoomiesDisplayCopy});
      });
    });
  };

  displayCandidateRoomies = () => {
    //reqRoomiesCopy =  array of ids
    const candidateCopy = [...this.state.candidateRoomies];
    const candidateDisplayCopy=[...this.state.candRoomiesDisplayArr];
    candidateCopy.forEach(el => {
      API.getRequestedRoomie(el).then(res => {
        candidateDisplayCopy.push(res.data);
        this.setState({candRoomiesDisplayArr: candidateDisplayCopy});
      });
    });
  };

  likeRoommmate = requestedRoomieId => {
    API.getUserInfo().then(res => {
      const newRequestedRoomies = [
        ...res.data.requestedRoomies,
        requestedRoomieId
      ];
      API.updateUser(res.data._id, {
        requestedRoomies: newRequestedRoomies
      }).then(result => {
        this.setState({ requestedRoomies: newRequestedRoomies }, this.displayRequestedRoomies());
      });
    });
  };

  updateOtherUser = requestedRoomieId => {
    console.log('TOO TEST');
    API.getRequestedRoomie(requestedRoomieId).then(roomieResult => {
      console.log(`HELLLOOOOOO ${roomieResult.data}`);
      const candidateRoomies = roomieResult.data.candidateRoomies;
      console.log(`Test${candidateRoomies}`)
      if (candidateRoomies.indexOf(requestedRoomieId) === -1){
        API.getUserInfo().then(res => {
          const newCandidateRoomies=[...candidateRoomies, res.data._id];
          API.updateUser(requestedRoomieId, {
            candidateRoomies: newCandidateRoomies
          })
        });
      }
    });
  };

  handleLike = requestedRoomieId => {
    this.likeRoommmate(requestedRoomieId);
    this.updateOtherUser(requestedRoomieId);
    // this.displayCandidateRoomies();
  };

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
                    {this.state.users.map(user => (
                      <RoommateCard
                        photo={user.photo}
                        name={user.name}
                        school={user.school}
                        bio={user.bio}
                        id={user._id}
                        key={user._id}
                        handleLike={this.handleLike}
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
                  <CardColumns>
                    {this.state.reqRoomiesDisplayArr.map(roomie => (
                      <RoommateCard
                        photo={roomie.photo}
                        name={roomie.name}
                        school={roomie.school}
                        bio={roomie.bio}
                        id={roomie._id}
                        key={roomie._id}
                        handleLike={this.handleLike}
                      />
                    ))}
                  </CardColumns>
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
