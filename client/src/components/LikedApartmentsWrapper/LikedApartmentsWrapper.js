import React, { Component } from "react";
import API from "../../utils/API";
import { AuthConsumer } from "@hasura/react-check-auth";
import Home from "../Home";
import { Button, CardColumns } from "reactstrap";
import ApartmentCardTest from "../ApartmentCardTest/ApartmentCardTest";
import Schools from "../../CollegesUniversities.json";
const SchoolNames = Schools.features.map(el => el.properties.NAME);

class LikedApartmentsWrapper extends Component {
  state = {
    apartments: []
  };
  // grab liked apartments form user then push to state
  componentDidMount() {
    API.getUserInfo().then(data => {
      const userId = data.data._id;
      const userApartments = data.data.apartments;
      console.log(userId + " APARTMENTS TEST");
      API.getSavedApartments(userId, userApartments).then(result => {
        // results.data is an array of addresses
        this.setState({ apartments: [...result.data] });
      });
    });
  }

  goToApartmentsPage = () => {
    API.getUserInfo().then(data => {
      // Get User School
      const userSchoolName = data.data.school;
      const userSchoolObj = Schools.features.filter(
        el => el.properties.NAME === userSchoolName
      );
      console.log(userSchoolObj[0]);
      window.location = "/addapartments";
    });
    // get school by geolocation or zipcode using
    // find the element in array that has the name
  };

  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <div>
              <h1> Your Liked Apartments </h1>
              {/* Apartment Card */}
              <CardColumns>
                {this.state.apartments.map(apt => (
                  <ApartmentCardTest
                    aptPhoto={apt.photos[0]}
                    address={apt.address}
                    rent={apt.rent}
                    description={apt.features.join(",")}
                  />
                ))}
              </CardColumns>
              <Button
                onClick={this.goToApartmentsPage}
                style={{ width: "300px" }}
              >
                {" "}
                + Apartments{" "}
              </Button>
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
