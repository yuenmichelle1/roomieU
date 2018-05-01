import React, { Component } from "react";
import API from "../../utils/API";
import { AuthConsumer } from "@hasura/react-check-auth";
import Home from "../Home";
import { Button, CardColumns } from "reactstrap";
import ApartmentCardTest from "../ApartmentCardTest/ApartmentCardTest";

class LikedApartmentsWrapper extends Component {
  state = {
    apartments: []
  };
  // grab liked apartments form user then push to state
  componentDidMount() {
    API.getUserInfo().then(data => {
      const userId= data.data._id;
      const userApartments = data.data.apartments;
      console.log(userId + " APARTMENTS TEST");
      API.getSavedApartments(userId, userApartments).then(result => {
        this.setState({apartments: [...result.data]})
      })
    })
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
             <CardColumns>
             {this.state.apartments.map(apt => <ApartmentCardTest aptPhoto={apt.photos} address={apt.address} rent={apt.rent} description={apt.description}/>)}
             </CardColumns>
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
