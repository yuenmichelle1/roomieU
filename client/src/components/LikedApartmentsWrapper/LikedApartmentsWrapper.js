import React, { Component } from "react";
import API from "../../utils/API";
import { AuthConsumer } from "@hasura/react-check-auth";
import Home from "../Home";
import { Button } from "reactstrap";

class LikedApartmentsWrapper extends Component {
  state = {
    apartments: []
  };
  // grab liked apartments form user then push to state
  componentDidMount() {
    // API.getUserInfo()
  }

  goToApartmentsPage = () => {
      window.location = "/addapartments";
  }

  render() {
    return (
        <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <div>
                <h1> Your Liked Apartments </h1>
             {/* Apartment Card */}
             <Button onClick={this.goToApartmentsPage} style={{width: "300px"}}> + Apartments </Button>
            </div>
          ) : (
            <Home />
          )
        }
      </AuthConsumer>
    );
  }
}

export default LikedApartmentsWrapper;
