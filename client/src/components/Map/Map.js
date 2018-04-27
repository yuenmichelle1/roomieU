import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
   render() {
   const ApartmentMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 41.8781, lng: -87.6298 } }
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ));

   return(
      <div>
        <ApartmentMap
          containerElement={ <div style={{ height: `550px`, width: '700px', margin: 'auto' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};

export default Map;