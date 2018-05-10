import React, {Component} from "react";
import Map from "../Map";
import {Row, Col, Button} from "reactstrap";
import './ApartmentPage.css';

class ApartmentPage extends Component {
  goToDashboard = () => {
    window.location ="/dashboard";
  }
  render() {
    return(
    <Row className="aptpage-div">
      <Col xs="12">
        <Row className="aptpage-title">
          <Col xs="12">
            <h1 className="header-text text-center">Search for an apartment nearby</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-center">
            <Button onClick={this.goToDashboard} outline color="success" className="dashback-btn">Back To Dashboard</Button>
          </Col>
        </Row>
        <Row className="map-div">
          <Col xs="12">
            <Map aptData={this.props.aptData}/>
          </Col>
        </Row>
      </Col>
    </Row>
    )

  }
    
} 

export default ApartmentPage;