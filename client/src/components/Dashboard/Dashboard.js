import React, { Component } from "react";
import { AuthConsumer } from "@hasura/react-check-auth";
import { Container } from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";
import RoommateCardWrapper from "../RoommateCardWrapper";
import LikedApartmentsWrapper from "../LikedApartmentsWrapper";
import CombinedUsersAptsDash from "../CombinedUsersAptsDash";

class Dashboard extends Component {
  state = {
    isMatchedDashboard: false
  };
  changeDashboard = (id) => {
    console.log(id);
    this.setState({ isMatchedDashboard: true });
  };
  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            this.state.isMatchedDashboard ? (
              <CombinedUsersAptsDash />
            ) : (
              <Container>
                <RoommateCardWrapper changeDashboard={this.changeDashboard}/>
                <LikedApartmentsWrapper />
              </Container>
            )
          ) : (
            <Home />
          )
        }
      </AuthConsumer>
    );
  }
}

export default Dashboard;
