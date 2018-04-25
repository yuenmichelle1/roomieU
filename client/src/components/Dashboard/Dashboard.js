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
    users: []
  };
  componentDidMount() {
    // this.getAllUsers();
    this.getAllUsers();
  }

  getAllUsers() {
    API.getAllUsers()
      .then(res => {
        this.setState({ users: [...res.data] });
        console.log([...res.data].map(el => el.name));
      })
      .catch(err => console.log(err));
  }

  getPotentialMatches() {
    API.getUserInfo().then(res => {
      // userData
      // query
      const school= res.data.school;
      console.log(`HERE IS MY STUPID ${school}`);
      API.getMatches({school: school}).then(res => console.log(res.data))
      // console.log(userSchool);
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
                    {this.state.users.map(user => (
                      <RoommateCard
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
