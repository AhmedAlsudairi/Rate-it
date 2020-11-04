import React from 'react';
import { Map, Marker,GoogleApiWrapper } from 'google-maps-react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    },

  },
  paper: {
    padding: 30,
    margin: '20px 0px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

function MapContainer(props) {
  
  const classes = useStyles();
  
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
  apiKey: ''
})(MapContainer);
