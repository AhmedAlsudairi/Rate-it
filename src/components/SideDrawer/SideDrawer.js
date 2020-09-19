import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Favorite from '@material-ui/icons/Favorite';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import Filter6Icon from '@material-ui/icons/Filter6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import useMediaQuery from '@material-ui/core/useMediaQuery';




export default function SideDrawer(props) {
  const matches = useMediaQuery('(max-width:600px)');
  let w='20%';

  if(matches){
    w='50%';
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
  const [listItems,setlistItems] = useState([
    {name: 'All',selected: true,},
    {name: 'Level 1',selected: false},
    {name: 'Level 2',selected: false},
    {name: 'Level 3',selected: false},
    {name: 'Level 4',selected: false},
    {name: 'Level 5',selected: false},
    {name: 'Level 6',selected: false},
    {name: 'Level 7',selected: false},
    {name: 'Level 8',selected: false}
  ]);
  const selectItemHandler = (selectedItem) => {
    const newListIems = [
      {name: 'All',selected: false,},
      {name: 'Level 1',selected: false},
      {name: 'Level 2',selected: false},
      {name: 'Level 3',selected: false},
      {name: 'Level 4',selected: false},
      {name: 'Level 5',selected: false},
      {name: 'Level 6',selected: false},
      {name: 'Level 7',selected: false},
      {name: 'Level 8',selected: false},
    ];

   const updatedList = newListIems.map((item)=>{
      if(item.name === selectedItem.name){
        item.selected = true;
      }
      return item;
    })
    console.log();
    setlistItems(updatedList)
  }
  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
            <Typography align='center'>Filter</Typography>
            <Divider/>
          <List>
              
            {listItems.map((item, index) => {
                let x;
              switch(index){
                case 0: x=<SelectAllIcon/>
                break;
                case 1: x=<Filter1Icon/>
                break;
                case 2: x=<Filter2Icon/>
                break;
                case 3: x=<Filter3Icon/>
                break;
                case 4: x=<Filter4Icon/>
                break;
                case 5: x=<Filter5Icon/>
                break;
                case 6: x=<Filter6Icon/>
                break;
                case 7: x=<Filter7Icon/>
                break;
                case 8: x=<Filter8Icon/>
                break;
                default: x=<InboxIcon />
                    break;
              }  
              return (
                
              <ListItem onClick={()=>{selectItemHandler(item)}} selected={item.selected} button key={item.name}>
                <ListItemIcon>{x}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            )}
            )}
          </List>
          <Divider />
          <List>
              <ListItem button key='Favorite' >
                <ListItemIcon><Favorite/></ListItemIcon>
                <ListItemText primary='Favorite' />
              </ListItem>
          </List>
          
        </div>
      </Drawer>
  );
}
