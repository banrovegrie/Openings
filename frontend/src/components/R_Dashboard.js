import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, CssBaseline, AppBar,
  Toolbar, List, Typography,
  Divider, IconButton, ListItem,
  ListItemIcon, ListItemText,
  Button, Paper
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from 'axios';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: "100%",
    },
  },
  paperContent: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="profile"
            onClick={() => {
              history.push('/profile-recruiter');
            }}
          >
            <ListItemIcon><NaturePeopleIcon /></ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button key="create_job"
            onClick={() => {
              history.push('/createjob-recruiter');
            }}
          >
            <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
            <ListItemText primary="Create Job" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='logout'
            onClick={() => {
              sessionStorage.setItem('globalID', '0');
              history.push('/');
            }}
          >
            <ListItemIcon><LockIcon /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <h1 align='center'>Welcome to Bible</h1>

        <div className={classes2.root}>
          <Paper elevation={6}>
            <div className={classes2.paperContent}>
              <Typography paragraph>
                After Sodom was destroyed, Lot took his two daughters to
                live with them in a cave (like ya do). One day, his older
                daughter said to the younger: “Our father is old, and there
                is no man around here to give us children — as is the custom
                all over the earth. Let’s get our father to drink wine and then
                sleep with him and preserve our family line through our father.” (Genesis 19:30)
            </Typography>
            </div>
          </Paper>
        </div>
        <br /> <br />
        <div className={classes2.root}>
          <Paper elevation={6}>
            <div className={classes2.paperContent}>
              <Typography paragraph>
                This plan worked out so well that the younger daughter did
                it the following night, with Lot being entirely unaware of it
                again, somehow! “So they got their father to drink wine that night
                also, and the younger daughter went in and slept with him. Again he
                was not aware of it when she lay down or when she got up. So both
                of Lot’s daughters became pregnant by their father.” (Genesis 19:35)
              </Typography>
            </div>
          </Paper>
        </div>
        <br /> <br />
        <div className={classes2.root}>
          <Paper elevation={6}>
            <div className={classes2.paperContent}>
              <Typography paragraph>
                That’s the end! Nothing bad happens to these folks. They bear
                sons and name them Moab and Ben. To recap: Roofie-ing one’s
                elderly father and raping him = fine. Agreeing to lead a slave
                rebellion for God but forget to circumcise your infant son = DEATH.
              </Typography>
            </div>
          </Paper>
        </div>
      </main>
    </div>
  );
}