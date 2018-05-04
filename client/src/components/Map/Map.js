import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Apartments from '../../ApartmentSearch.json'

class Map extends Component {
  componentDidMount(){
    var apartmentList = Apartments
    console.log(apartmentList);
  }

   render() {
   const ApartmentMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 41.781570, lng: -87.598852 } }
        defaultZoom = { 13 }
      >
      <Marker
      position={ { lat: 41.7747220, lng: -87.6030070 } }
      key="AV-SR7NOjCNrmMAssnwb"
    />
      <Marker
      position={ { lat: 41.7742340, lng: -87.6024800 } }
      key="AV-Sj9JjyCk2Bpf6Dv-x"
    />
      <Marker
      position={ { lat: 41.7745160, lng: -87.6115420 } }
      key="AV-SqmbUyCk2Bpf6Efbz"
    />
      <Marker
      position={ { lat: 41.7757150, lng: -87.6037310 } }
      key="AV-UPju0AXxH_fqQZjXJ"
    />
      <Marker
      position={ { lat: 41.7691247, lng: -87.6183120 } }
      key="AV-Svq6n_RWkykBu9r1V"
    />
      <Marker
      position={ { lat: 41.774513, lng: -87.611551 } }
      key="AV-S6oQ5AXxH_fqQTnsE"
    />
      <Marker
      position={ { lat: 41.7900470, lng: -87.6163130 } }
      key="AV-THFZijCNrmMAsykPJ"
    />
      <Marker
      position={ { lat: 41.7805099, lng: -87.6038260 } }
      key="AV-TypVU_RWkykBuDA8E"
    />
      <Marker
      position={ { lat: 41.7752600, lng: -87.5993820 } }
      key="AV-TsDRajCNrmMAs1R_X"
    />
      <Marker
      position={ { lat: 41.7841777, lng: -87.6222188 } }
      key="AV-To7Q7yCk2Bpf6JvT_"
    />
      <Marker
      position={ { lat: 41.7747140, lng: -87.6102949 } }
      key="AV-TLyroAXxH_fqQVIL2"
    />
      <Marker
      position={ { lat: 41.777638, lng: -87.586896 } }
      key="AV-SqZkq_RWkykBu9I1A"
    />
      <Marker
      position={ { lat: 41.7941540, lng: -87.5898969 } }
      key="AV-UAFoO_RWkykBuD0Rb"
    />
      <Marker
      position={ { lat: 41.7534718, lng: -87.5833582 } }
      key="AV-SuDps_RWkykBu9hM9"
    />
      <Marker
      position={ { lat: 41.7633171, lng: -87.6021332 } }
      key="AV-SYfsx_RWkykBu69Rd"
    />
      <Marker
      position={ { lat: 41.7756460, lng: -87.6037310 } }
      key="AV-SdOn3jCNrmMAsuRFQ"
    />
      <Marker
      position={ { lat: 41.7850990, lng: -87.6135980 } }
      key="AV-SlAtb_RWkykBu8ik8"
    />
      <Marker
      position={ { lat: 41.7769780, lng: -87.6067650 } }
      key="AV-SlxAPAXxH_fqQRd1U"
    />
      <Marker
      position={ { lat: 41.7835820, lng: -87.6076010 } }
      key="AV-TAlaNAXxH_fqQUKg3"
    />
      <Marker
      position={ { lat: 41.7925880, lng: -87.6227540 } }
      key="AV-TJYf8AXxH_fqQU7Wj"
    />
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