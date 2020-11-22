import React from 'react';
import { Map, Marker,GoogleApiWrapper } from 'google-maps-react';



function MapContainer(props) {
  
  
  
  const mapStyles = {
    width: '45%',
    height: '60%',
  };

  return (
  <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 24.723103299480055, lng: 46.61989630231371}}

        >
          <Marker 
          position={{ lat: 24.723103299480055, lng: 46.61989630231371}}
          title="ccis" />
        </Map>
      
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCdFaiBroUHDutRgeiCeNqx_zkiX4S32G4'
})(MapContainer);
