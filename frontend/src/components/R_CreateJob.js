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
import WorkIcon from '@material-ui/icons/Work';
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

  const [addJob, setAddJob] = useState({
    title: " ",
    recruiter: 
    {
      id: " ",
      name: " ",
      email: " "
    },
    max_number_of_applications: 1000,
    max_number_of_positions: 2,
    deadline: "2021-02-02", 
    skills: ["java", "python"],
    type_of_job: "fulltime",
    duration: 6,
    salary: 100202
  });

  if (toGetAxios) {
    axios.get(`http://localhost:5000/recruiters/${sessionStorage.getItem('globalID')}`)
      .then(res => {
        setProfileData(res.data);
        setToGetAxios(false);
      });
    console.log(profileData);
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(addJob);
    axios.post(`http://localhost:5000/jobs/add`, addJob)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WorkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Job
        </Typography>
        <br />
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
                name="title"
                label="Title"
                id="title"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      id: profileData?._id,
                      name: profileData?.name,
                      email: profileData?.email
                    },
                    title: event.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="max_number_of_positions"
                label="Maximum Number of Positions"
                id="max_number_of_positions"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    max_number_of_positions: event.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="max_number_of_applications"
                label="Maximum Number of Applications"
                id="max_number_of_applications"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    max_number_of_applications: event.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="deadline"
                label="Deadline"
                type="date"
                //defaultValue="2001-01-01"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    deadline: event.target.value
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
                defaultValue="haskell, cpp, python"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    skills: event.target.value.split(',').map(element => element.trim())
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="type_of_job"
                label="Type of Job (fulltime / part-time / work from home)"
                id="type_of_job"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    type_of_job: event.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="duration"
                label="Duration (0 - 6)"
                id="duration"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    duration: event.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="salary"
                label="Salary (per month)"
                id="salary"
                onChange={event => {
                  setAddJob({
                    ...addJob,
                    recruiter: 
                    {
                      ...addJob.recruiter
                    },
                    salary: event.target.value
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
            Submit
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
            Create Job
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
              history.push('/dashboard-recruiter');
            }}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="my_profile"
            onClick={() => {
              history.push('/profile-recruiter');
            }}
          >
            <ListItemIcon><NaturePeopleIcon /></ListItemIcon>
            <ListItemText primary="My Profile" />
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