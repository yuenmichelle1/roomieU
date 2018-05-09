import React, { Component } from "react";
import { AuthConsumer } from "@hasura/react-check-auth";
import { Container } from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";
import RoommateCardWrapper from "../RoommateCardWrapper";
import LikedApartmentsWrapper from "../LikedApartmentsWrapper";
import CombinedUsersAptsDash from "../CombinedUsersAptsDash";
import ApartmentPage from "../ApartmentPage";

class Dashboard extends Component {
  state = {
    isMatchedDashboard: false,
    currentDashboard: 'Home',
    otherUserId: "",
    aptData: {} 
  };

  changeDashboard = id => {
    console.log(id);
    if (this.state.isMatchedDashboard) {
      this.setState({ isMatchedDashboard: false, otherUserId: id });
    } else {
      this.setState({ isMatchedDashboard: true, otherUserId: id });
    }
  };

  showAptData = (obj) => {
    this.setState({ showAptData: true, aptData: obj }, () => console.log(this.state.aptData));
  };

  getUnmatchedDashboard = () => {
    return this.state.aptData && this.state.aptData.address 
      ? <ApartmentPage aptData={this.state.aptData} /> 
      : (
        <Container className="dash-container">
          <RoommateCardWrapper
            changeDashboard={this.changeDashboard}
            id={this.state.otherUserId}
          />
          <LikedApartmentsWrapper showAptData={this.showAptData}/>
        </Container>
      )
  }

  getAuthenticatedDashboard = () => {
    return (
      this.state.isMatchedDashboard 
        ? (
          <CombinedUsersAptsDash
            changeDashboard={this.changeDashboard}
            id={this.state.otherUserId}
          />
        ) 
        : this.getUnmatchedDashboard()
      ) 
  }

  render() {
    return (
      <AuthConsumer>
        {
          (userInfo, isLoading, error) => userInfo 
            ? this.getAuthenticatedDashboard()
            : <Home />
        }
      </AuthConsumer>
    );
  }
}

export default Dashboard;
