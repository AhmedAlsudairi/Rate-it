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
          initialCenter={{ lat: 24.725396524498763, lng: 46.62368517580898}}

        >
          <Marker 
          position={{ lat: 24.725396524498763, lng: 46.62368517580898}}
          title="king saud university" />
        </Map>
      
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCdFaiBroUHDutRgeiCeNqx_zkiX4S32G4'
})(MapContainer);
