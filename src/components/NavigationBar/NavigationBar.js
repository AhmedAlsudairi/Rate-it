import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button, Hidden, List } from '@material-ui/core';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as authActions from '../../store/actions/auth';
import * as coursesActions from '../../store/actions/courses';
import * as notificationsActions from '../../store/actions/notifications';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  accountButton: {
    marginLeft: theme.spacing(2),

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function NavigationBar(props) {
  const classes = useStyles();

  const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    console.log(props.username);
    if (props.username) {
      console.log(props.username);
      props.onFetchNotifications(props.username);
    }
  }, [props.onFetchNotifications,props.username,props])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyRatings = () => {
    setAnchorEl(null);
    props.history.push('/my_ratings')
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const searchHandler = (event) => {
    props.onSearchHandler(event.target.value);
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp>
            <React.Fragment>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
              <Drawer open={state} onClose={toggleDrawer(false)}>
                <SideDrawer open={state} />
              </Drawer>
            </React.Fragment>
          </Hidden>

          <div className={classes.title}>
            <Link to='/' style={{ textDecoration: 'none' }} >
              <Button >

                <Typography className={classes.title} variant="h6" noWrap>
                  Rate It
                </Typography>

              </Button>
            </Link></div>





          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => searchHandler(event)} />
          </div>
          {props.isAuthenticated ?
            <List>
              <Hidden xsDown>
                <NavLink to='' activeStyle={{ color: 'white' }}>
                  <IconButton

                    edge="start"
                    className={classes.accountButton}
                    aria-label="open drawer"
                  >
                    <NotificationsIcon style={{ color: 'white' }} />
                  </IconButton>
                </NavLink>
                <NavLink to='/logout' >
                  <IconButton

                    edge="start"
                    className={classes.accountButton}
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <ExitToAppIcon style={{ color: 'white' }} />
                  </IconButton>
                </NavLink>
              </Hidden>

              <NavLink to={props.isAuthenticated ? props.location.pathname : '/signin'} activeStyle={{ color: 'white' }}>
                <IconButton

                  edge="start"
                  className={classes.accountButton}
                  aria-label="open drawer"
                  onClick={handleClick}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  <AccountCircleIcon style={{ color: 'white' }} />
                </IconButton>
              </NavLink>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{props.username}</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleMyRatings}>My ratings</MenuItem>
                <Hidden smUp>
                  <MenuItem onClick={handleClose}>Notifications</MenuItem>
                  <MenuItem onClick={() => { props.onLogout(); handleClose(); }}>Logout</MenuItem>
                </Hidden>
              </Menu>
            </List>

            :

            <NavLink to='/signin' activeStyle={{ color: 'white' }}>
              <IconButton

                edge="start"
                className={classes.accountButton}
                aria-label="open drawer"
              >
                <AccountCircleIcon style={{ color: 'white' }} />
              </IconButton>
            </NavLink>}


        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username,
    numNotifications: state.notifications.num_of_notifications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () =>
      dispatch(authActions.authLogout()),
    onInit: () =>
      dispatch(authActions.authInitite()),
    onSearchHandler: (keyword) =>
      dispatch(coursesActions.fetchCourses(null, keyword)),
    onFetchNotifications: (username) =>
      dispatch(notificationsActions.fetchNotifications(username))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar));