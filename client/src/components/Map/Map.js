import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Apartments from "../../ApartmentSearch.json";
import { Row, Col } from "reactstrap";
import MapAptCard from "../MapAptCard";
import API from "../../utils/API";
import './Map.css';

class Map extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  state = {
    apartment: {},
    isSaved: false,
    userSavedApts: [],
    userId: "", 
    userSavedAddressArr: []
  };

  componentDidMount() {
    // get current user's Saved Apartments.
    API.getUserInfo().then(data => {
      const userId = data.data._id;
      const userAptAddressesArr = data.data.apartments;
      API.getSavedApartments(userId, userAptAddressesArr).then(aptObjs => {
        this.setState({ userSavedApts: aptObjs.data, userId: userId, userSavedAddressArr: userAptAddressesArr });
      });
    });
  }

  onClick = apt => {
    const userSavedAptsCopy = [...this.state.userSavedApts];
    if (userSavedAptsCopy.find(apartment => apartment.address === apt.address)) {
      this.setState({ apartment: apt, isSaved: true });
    } else {
      this.setState({ apartment: apt, isSaved: false });
    }
  };

  saveAptToDB = aptObj => {
    // create Apt To Database if it is not in there
    API.checkDBForApt(aptObj).then(result => {
      // if does not exist, then create apartment in apartments Collection
      if (result.data === null) {
        API.saveAptToDatabase({
          listingName: aptObj.listingName,
          address: aptObj.address,
          city: aptObj.city,
          rent: aptObj.prices,
          features: aptObj.features,
          photos: aptObj.imageURLs,
          propertyType: aptObj.propertyType,
          link: aptObj.sourceURLs,
          latitude: aptObj.latitude,
          longitude: aptObj.longitude
        }).then(data => {
          // update currentUser to Save Address into apartmentsArr of userDocument
          const userId= this.state.userId;
          const newAddr= data.data.address;
          const userSavedAddresses = [...this.state.userSavedAddressArr, newAddr];
          this.saveAptToUser(userId, userSavedAddresses);
        });
      } else {
        const userId = this.state.userId;
        const newAddr= aptObj.address;
        const userSavedAddresses = [...this.state.userSavedAddressArr, newAddr];
        this.saveAptToUser(userId, userSavedAddresses);
      }
    });
  };

  saveAptToUser = (id, addressArr) => {
    API.updateUser(id, {apartments: addressArr}).then(result => {
      API.getSavedApartments(id, result.data.apartments).then(aptObjs => {
        this.setState({userSavedApts: aptObjs.data, userSavedAddressArr: addressArr, isSaved: true});
      })
    })   
  }

  unsaveFromUser=(address) => {
    const userSavedAddressArrCopy = [...this.state.userSavedAddressArr];
    const newAddressArrRemovingUnsaved = userSavedAddressArrCopy.filter(addr => (addr !== address));
    const userId= this.state.userId;
    API.updateUser(userId, {apartments: newAddressArrRemovingUnsaved}).then(user => {
      API.getSavedApartments(userId, user.data.apartments).then(aptObjs => {
        this.setState({userSavedApts: aptObjs.data, userSavedAddressArr: newAddressArrRemovingUnsaved, isSaved: false});
      })
    })
  }

  render() {
    const ApartmentMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 41.78157, lng: -87.598852 }}
        defaultZoom={14}
      >
        {Apartments.map(apt => {
          return (
            <Marker
              position={{
                lat: Number(apt.latitude),
                lng: Number(apt.longitude)
              }}
              key={apt.id}
              onClick={() => this.onClick(apt)}
            />
          );
        })}
      </GoogleMap>
    ));

    return (
      <Row>
        <Col xs="12">
          {Object.keys(this.state.apartment).length !== 0 ? (
            <Row>
              <Col xs="12">
                <Row>
                  <Col xs="0" sm="0" md="2" lg="2"/>
                  <Col xs="12" sm="12" md="8" lg="8">
                    <ApartmentMap
                      containerElement={
                        <div
                          style={{ height: `250px`, width: "100%", margin: "auto", marginTop: "30px", marginBottom: "30px" }}
                        />
                      }
                      mapElement={<div style={{ height: `100%`, width: "100%" }} />}
                    />
                  </Col>
                  <Col xs="0" sm="0" md="2" lg="2"/>
                </Row>
                <Row className="text-left">
                  <Col xs="0" sm="0" md="2" lg="2"/>
                  <Col xs="12" sm="12" md="8" lg="8">
                    <MapAptCard
                      aptData={this.state.apartment}
                      saveAptToDB={this.saveAptToDB}
                      unsaveFromUser={this.unsaveFromUser}
                      isSaved={this.state.isSaved}
                    />
                  </Col>
                  <Col xs="0" sm="0" md="2" lg="2"/>
                </Row>
              </Col>
            </Row>
          ) : (
            <ApartmentMap
              containerElement={
                <div
                  style={{ height: `500px`, width: "90%", margin: "0 auto", marginTop: "30px" }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
        </Col>
      </Row>
    );
  }
}

export default Map;
