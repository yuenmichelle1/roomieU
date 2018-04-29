import React, { Component } from "react";
import { AuthConsumer } from "@hasura/react-check-auth";
import { CardColumns, Container, Row, Col } from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";
import RoommateCardWrapper from "../RoommateCardWrapper";

class Dashboard extends Component {

  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <Container>
                <RoommateCardWrapper currentUser={userInfo}/>
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
