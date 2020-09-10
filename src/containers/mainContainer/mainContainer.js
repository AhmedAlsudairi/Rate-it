import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Favorite from '@material-ui/icons/Favorite';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTowIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Looks6Icon from '@material-ui/icons/Looks6';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar/>
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
                case 1: x=<LooksOneIcon/>
                break;
                case 2: x=<LooksTowIcon/>
                break;
                case 3: x=<Looks3Icon/>
                break;
                case 4: x=<Looks4Icon/>
                break;
                case 5: x=<Looks5Icon/>
                break;
                case 6: x=<Looks6Icon/>
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
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
