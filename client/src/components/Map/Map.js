import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Apartments from '../../ApartmentSearch.json'
import {
  Row, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

class Map extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    var apartmentList = Apartments
    console.log(apartmentList);
    console.log(this.state);
  }

  onClick = (apt) => {
    console.log("on click");
    console.log(apt);
    this.setState({ apartment: apt })
  }

  render() {
    const ApartmentMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 41.781570, lng: -87.598852 }}
        defaultZoom={13}
      >
        {
          Apartments.map((apt) => {

            return (<Marker
              position={{ lat: Number(apt.latitude), lng: Number(apt.longitude) }}
              key={apt.id}
              onClick={() => this.onClick(apt)}
            />)

          })
        }

      </GoogleMap>

    ));
    if (this.state != null) {
      return (
        <div>
          <Row className="MapAptCard">
            <Col xs="6" sm="6" md="6" lg="6">
              <ApartmentMap
                containerElement={<div style={{ height: `550px`, width: '700px', margin: 'auto' }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col xs="6" sm="6" md="6" lg="6">
              <Card>
                <CardImg src={this.state.apartment.imageURLs[0]} alt="Card image cap" />
                <CardBody>
                  <CardTitle>
                    <h1>{this.state.apartment.address}, {this.state.apartment.city}</h1>
                  </CardTitle>
                  <CardText>
                    <h3>${this.state.apartment.prices}</h3>
                    {this.state.apartment.features.map(features => (
                      <div>
                        <h3>{features.key}</h3>
                        <p>{features.value}</p>
                      </div>
                    ))}
                  </CardText>
                  <Button>Save</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <div>
        <ApartmentMap
          containerElement={<div style={{ height: `550px`, width: '700px', margin: 'auto' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
};

export default Map;