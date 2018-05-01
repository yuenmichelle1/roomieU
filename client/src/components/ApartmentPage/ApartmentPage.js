import React, {Component} from "react";
import Map from "../Map";
import {Button} from "reactstrap";

class ApartmentPage extends Component {
  goToDashboard = () => {
    window.location ="/dashboard";
  }
  render() {
    return(
    <div>
      <Button onClick={this.goToDashboard} style={{width: "300px"}}> Back To Dashboard </Button>
      <h1 align="center">Apartment Page</h1>
      <Map />
    </div>
    )

  }
    
} 

export default ApartmentPage;