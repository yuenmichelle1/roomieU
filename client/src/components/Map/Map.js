import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Apartments from "../../ApartmentSearch.json";
import { Row, Col } from "reactstrap";
import MapAptCard from "../MapAptCard";
import API from "../../utils/API";

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
    userSavedAddressArr: [], 
    aptsInBudget: []
  };

  componentDidMount() {
    // get current user's Saved Apartments.
    API.getUserInfo().then(data => {
      const userId = data.data._id;
      const userAptAddressesArr = data.data.apartments;
      const userBudget = data.data.budget;
      const userBudgetSplit= userBudget.split("$");
      const userBudgetCap= userBudgetSplit[userBudgetSplit.length-1];
      // do a check to see if userBudget is 3001+ that changes logic. 
      const aptsFilteredByCap = Apartments.filter(aptObj => (aptObj.prices <= parseInt(userBudgetCap)));
      console.log(aptsFilteredByCap);

      // get users savedapartments array object
      API.getSavedApartments(userId, userAptAddressesArr).then(aptObjs => {
        this.setState({
          userSavedApts: aptObjs.data,
          userId: userId,
          userSavedAddressArr: userAptAddressesArr,
          aptsInBudget: aptsFilteredByCap
        }, ()=> console.log(this.state.aptsInBudget));
      });
    });
  }

  onClick = apt => {
    const userSavedAptsCopy = [...this.state.userSavedApts];
    if (
      userSavedAptsCopy.find(apartment => apartment.address === apt.address)
    ) {
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
          const userId = this.state.userId;
          const newAddr = data.data.address;
          const userSavedAddresses = [
            ...this.state.userSavedAddressArr,
            newAddr
          ];
          this.saveAptToUser(userId, userSavedAddresses);
        });
      } else {
        const userId = this.state.userId;
        const newAddr = aptObj.address;
        const userSavedAddresses = [...this.state.userSavedAddressArr, newAddr];
        this.saveAptToUser(userId, userSavedAddresses);
      }
    });
  };

  saveAptToUser = (id, addressArr) => {
    API.updateUser(id, { apartments: addressArr }).then(result => {
      API.getSavedApartments(id, result.data.apartments).then(aptObjs => {
        this.setState({
          userSavedApts: aptObjs.data,
          userSavedAddressArr: addressArr,
          isSaved: true
        });
      });
    });
  };

  unsaveFromUser = address => {
    const userSavedAddressArrCopy = [...this.state.userSavedAddressArr];
    const newAddressArrRemovingUnsaved = userSavedAddressArrCopy.filter(
      addr => addr !== address
    );
    const userId = this.state.userId;
    API.updateUser(userId, { apartments: newAddressArrRemovingUnsaved }).then(
      user => {
        API.getSavedApartments(userId, user.data.apartments).then(aptObjs => {
          this.setState({
            userSavedApts: aptObjs.data,
            userSavedAddressArr: newAddressArrRemovingUnsaved,
            isSaved: false
          });
        });
      }
    );
  };

  render() {
    const ApartmentMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 41.78157, lng: -87.598852 }}
        defaultZoom={13}
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
      <div>
        {Object.keys(this.state.apartment).length !== 0 ? (
          <Row>
            <Col xs="6" sm="6" md="6" lg="6">
              <ApartmentMap
                containerElement={
                  <div
                    style={{ height: `550px`, width: "700px", margin: "auto" }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col xs="6" sm="6" md="6" lg="6">
              <MapAptCard
                aptData={this.state.apartment}
                saveAptToDB={this.saveAptToDB}
                unsaveFromUser={this.unsaveFromUser}
                isSaved={this.state.isSaved}
              />
            </Col>
          </Row>
        ) : (
          <ApartmentMap
            containerElement={
              <div
                style={{ height: `550px`, width: "700px", margin: "auto" }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        )}
      </div>
    );
  }
}

export default Map;
