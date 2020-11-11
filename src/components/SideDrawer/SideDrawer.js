import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Favorite from '@material-ui/icons/Favorite';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import Filter6Icon from '@material-ui/icons/Filter6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import InfoIcon from '@material-ui/icons/Info';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/courses';



function SideDrawer(props) {
  const matches = useMediaQuery('(max-width:600px)');
  let w = '20%';

  if (matches) {
    w = '50%';
  }

  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: 0,
      flexShrink: 0,
    },
    drawerPaper: {
      width: w
    },
    drawerContainer: {
      overflow: 'auto',
    }
  }));
  const classes = useStyles();
  const [favoritSelected, setFavoritSelected] = useState(props.isFavorite);
  const [listItems, setlistItems] = useState([
    { name: 'Level 1', level: 1, selected: props.isFavorite? false : true,},
    { name: 'Level 2', level: 2, selected: false },
    { name: 'Level 3', level: 3, selected: false },
    { name: 'Level 4', level: 4, selected: false },
    { name: 'Level 5', level: 5, selected: false },
    { name: 'Level 6', level: 6, selected: false },
    { name: 'Level 7', level: 7, selected: false },
    { name: 'Level 8', level: 8, selected: false }
  ]);

  const selectItemHandler = (selectedItem) => {
    const newListIems = [
      { name: 'Level 1', level: 1, selected: false },
      { name: 'Level 2', level: 2, selected: false },
      { name: 'Level 3', level: 3, selected: false },
      { name: 'Level 4', level: 4, selected: false },
      { name: 'Level 5', level: 5, selected: false },
      { name: 'Level 6', level: 6, selected: false },
      { name: 'Level 7', level: 7, selected: false },
      { name: 'Level 8', level: 8, selected: false },
    ];
    setFavoritSelected(false);
    const updatedList = newListIems.map((item) => {
      if (item.name === selectedItem.name) {
        item.selected = true;
      }
      return item;
    });

    props.onSelectHandler(selectedItem.level);

    setlistItems(updatedList)
  }

  const selectFavoriteItemHandler = () => {
    const newListIems = [
      { name: 'Level 1', level: 1, selected: false },
      { name: 'Level 2', level: 2, selected: false },
      { name: 'Level 3', level: 3, selected: false },
      { name: 'Level 4', level: 4, selected: false },
      { name: 'Level 5', level: 5, selected: false },
      { name: 'Level 6', level: 6, selected: false },
      { name: 'Level 7', level: 7, selected: false },
      { name: 'Level 8', level: 8, selected: false },
    ];
    setlistItems(newListIems);
    setFavoritSelected(true);
  }

  return (
    <React.Fragment>
      
    <Hidden xsDown={!props.open} >
      
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>

          {listItems.map((item, index) => {
            let x;
            switch (index+1) {
              case 1: x = <Filter1Icon />
                break;
              case 2: x = <Filter2Icon />
                break;
              case 3: x = <Filter3Icon />
                break;
              case 4: x = <Filter4Icon />
                break;
              case 5: x = <Filter5Icon />
                break;
              case 6: x = <Filter6Icon />
                break;
              case 7: x = <Filter7Icon />
                break;
              case 8: x = <Filter8Icon />
                break;
              default: x = <InboxIcon />
                break;
            }
            return (

              <ListItem component={Link} to={'/'} onClick={() => { selectItemHandler(item) }} selected={item.selected} button key={item.name}>
                <ListItemIcon style={item.selected? {color: 'blue'}: null}>{x}</ListItemIcon>
                <ListItemText primary={item.name} style={item.selected? {color: 'blue'}: null}/>
              </ListItem>
            )
          }
          )}
        </List>

        <Divider />
        <List>
            <ListItem component={Link} to={'/favorite'} onClick={() => { selectFavoriteItemHandler() }} selected={favoritSelected} button key='Favorite' >
              <ListItemIcon style={favoritSelected? {color: 'blue'}: null}><Favorite /></ListItemIcon>
              <ListItemText primary='Favorite' style={favoritSelected? {color: 'blue'}: null}/>
            </ListItem>
        </List>
        <List>
            <ListItem component={Link} to={'/ksu_info'}  button key='KSUInfo' >
              <ListItemIcon ><InfoIcon /></ListItemIcon>
              <ListItemText primary='King Saud University'/>
            </ListItem>
        </List>
      </div>
    </Drawer>
    </Hidden>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectHandler: (level) =>
      dispatch(actions.fetchCourses(level,null)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SideDrawer);

