import React from 'react';
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
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 0,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  }
}));

export default function SideDrawer(props) {
  const classes = useStyles();

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
              
            {['All', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'].map((text, index) => {
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
                
              <ListItem button key={text}>
                <ListItemIcon>{x}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )}
            )}
          </List>
          <Divider />
          <List>
              <ListItem button key='Favorite'>
                <ListItemIcon><Favorite/></ListItemIcon>
                <ListItemText primary='Favorite' />
              </ListItem>
          </List>
        </div>
      </Drawer>
  );
}
