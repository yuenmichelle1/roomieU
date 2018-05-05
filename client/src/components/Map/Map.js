import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Apartments from '../../ApartmentSearch.json'

class Map extends Component {
  componentDidMount(){
    var apartmentList = Apartments
    console.log(apartmentList);
  }
  state = {
    apartment: ""
  }
   render() {
   const ApartmentMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 41.781570, lng: -87.598852 } }
        defaultZoom = { 13 }
      >
      {
        Apartments.records.map((apt)=>{
        
          return (<Marker
            position={ { lat: Number(apt.latitude), lng: Number(apt.longitude) } }
            key={apt.id}
            onClick={()=>{
              console.log("on click");
              console.log(apt);
              this.setState({apartment:apt})}}
          />)

        })
      }

      </GoogleMap>
   ));

   return(
      <div>
        <ApartmentMap
          containerElement={ <div style={{ height: `550px`, width: '700px', margin: 'auto' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
        <h1>hello {this.state.apartment.listingName}</h1>
      </div>
   );
  }
};

export default Map;