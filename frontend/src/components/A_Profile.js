import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, CssBaseline, AppBar,
  Toolbar, List, Typography,
  Divider, IconButton, ListItem,
  ListItemIcon, ListItemText,
  Button, Paper, Container, Grid,
  Avatar, TextField, Box, Link,
  Checkbox, FormControlLabel
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
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

const useStyles3 = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = () => {
  const classes = useStyles3();

  const [profileData, setProfileData] = useState([]);
  const [toGetAxios, setToGetAxios] = useState(true);
  
  const [updateData, setUpdateData] = useState({
      education:  {
        institute: " ",
        start_year: "2000-02-02",
        end_year: "2000-02-02",
      },
      skills: []
    }
  );

  if (toGetAxios)
  {
    axios.get(`http://localhost:5000/applicants/${sessionStorage.getItem('globalID')}`)
      .then(res => {
        setProfileData(res.data);
        setToGetAxios(false);
        setUpdateData({
            education:  {
              institute: profileData?.education?.institute,
              start_year: profileData?.education?.start_year,
              end_year: profileData?.education?.end_year,
            },
            skills: profileData?.skills
        })
      });
    console.log(profileData);
    console.log(profileData?.skills?.join(", "));
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(updateData);
    axios.post(`http://localhost:5000/applicants/update/${sessionStorage.getItem('globalID')}`, updateData)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {profileData?.name}
        </Typography>
        <Typography component="h3" variant="subtitle1">
          {profileData?.email}
        </Typography>
        <br/>
        <Rating name="read-only" value={profileData?.total_rating/profileData?.total_number_of_ratings} readOnly />
        <form className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="institute"
                label="Institute"
                id="institute"
                value={`${updateData?.education?.institute}`}
                onChange = {event => {
                  setUpdateData({
                    education:  {
                      institute: event.target.value,
                      start_year: updateData?.education?.start_year,
                      end_year: updateData?.education?.end_year,
                    },
                    skills: updateData?.skills
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="start_year"
                label="Start"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  `${updateData?.education?.start_year?.substring(0, 10) 
                    == undefined ? 
                    "2000-02-02" : updateData?.education?.start_year?.substring(0, 10)
                  }`
                }
                onChange = {event => {
                  setUpdateData({
                    education:  {
                      institute: updateData?.education?.institute,
                      start_year: event.target.value,
                      end_year: updateData?.education?.end_year,
                    },
                    skills: updateData?.skills
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="end_year"
                label="End"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  `${updateData?.education?.end_year?.substring(0, 10)
                    == undefined ? 
                    "2000-02-02" : updateData?.education?.end_year?.substring(0, 10)
                  }`
                }
                onChange = {event => {
                  setUpdateData({
                    education:  {
                      institute: updateData?.education?.institute,
                      start_year: updateData?.education?.start_year,
                      end_year: event.target.value,
                    },
                    skills: updateData?.skills
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="skills"
                label="Skills (comma separated)"
                id="skills"
                value={`${updateData?.skills?.join(", ")}`}
                onChange = {event => {
                  setUpdateData({
                    education:  {
                      institute: updateData?.education?.institute,
                      start_year: updateData?.education?.start_year,
                      end_year: updateData?.education?.end_year,
                    },
                    skills: event.target.value.split(',').map(element => element.trim())
                  })
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

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

  console.log('globalID = ' + sessionStorage.getItem('globalID'));

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
            My Profile
            {/*Dashboard, My Profile, My Applications*/}
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
          <ListItem button key="dashboard"
            onClick={() => {
              history.push('/dashboard-applicant');
            }}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="my_applications"
            onClick={() => {
              history.push('/applications-applicant');
            }}
          >
            <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
            <ListItemText primary="My Applications" />
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
        
        <Profile />

      </main>
    </div>
  );
}