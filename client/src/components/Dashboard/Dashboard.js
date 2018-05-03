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
    isMatchedDashboard: false,
    otherUserId: ""
  };
  changeDashboard = (id) => {
    console.log(id);
    if (this.state.isMatchedDashboard){
        this.setState({ isMatchedDashboard: false, otherUserId: id });
    } else {
        this.setState({isMatchedDashboard: true, otherUserId: id});
    }
  };

  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            this.state.isMatchedDashboard ? (
              <CombinedUsersAptsDash changeDashboard={this.changeDashboard} id={this.state.otherUserId}/>
            ) : (
              <Container>
                <RoommateCardWrapper changeDashboard={this.changeDashboard} id={this.state.otherUserId}/>
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
