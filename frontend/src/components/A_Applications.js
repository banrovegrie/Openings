import { React, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, CssBaseline, AppBar,
  Toolbar, List, Typography,
  Divider, IconButton, ListItem,
  ListItemIcon, ListItemText,
  Button, Paper, Grid, Popover
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import Rating from '@material-ui/lab/Rating'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SaveIcon from '@material-ui/icons/Save';
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
}));

const useStyles3 = makeStyles((theme) => ({
  root: {
    minWidth: 800,
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [applicationsData, setApplicationsData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [toAxios, setToAxios] = useState(true);
  const [toAxios2, setToAxios2] = useState(true);

  if (toAxios) 
  {
    axios.get(`http://localhost:5000/applicants/${sessionStorage.getItem('globalID')}`)
      .then(res => {
        setApplicationsData(res.data);
        setToAxios(false)
      });
    console.log(applicationsData);
    console.log(applicationsData.applications);
  }

  if (toAxios2)
  {
    axios.get('http://localhost:5000/jobs')
      .then(res => {
        setJobData(res.data);
        setToAxios2(false)
      });
    console.log(jobData);
  }

  console.log('globalID ' + sessionStorage.getItem('globalID'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [rateValue, setRateValue] = useState(0);
  const [jobRateDetails, setJobRateDetails] = useState({
    id: " ",
    total_rating: 0,
    total_number_of_ratings: 0
  });

  const handleClick = (event, job) => {
    setAnchorEl(event.currentTarget);
    setRateValue(0);
    setJobRateDetails({
      id: job._id,
      total_rating: job.total_rating,
      total_number_of_ratings: job.total_number_of_ratings
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openRate = Boolean(anchorEl);

  const handleRateSave = (event, val) => {
    event.preventDefault();
    console.log(val);
    console.log(jobRateDetails);
    
    axios.post(`http://localhost:5000/jobs/rating/update/${jobRateDetails.id}`, {
      total_rating: (jobRateDetails.total_rating + val),
	    total_number_of_ratings: (jobRateDetails.total_number_of_ratings + 1)
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
      
    axios.post(`http://localhost:5000/applicants/update/status/${sessionStorage.getItem('globalID')}/${jobRateDetails.id}`, {
      status: `Accepted and Rated ${val}/5`
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  
    handleClose();
    window.location.reload({forcedReload: false});
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
            My Applications
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
          <ListItem button key="profile"
            onClick={() => {
              history.push('/profile-applicant');
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
        <Grid container className={classes3.root} spacing={4}>
        {applicationsData?.applications?.map(app => {
          
          for (let i = 0; i < jobData.length; i++)
          {
            if (app.id === jobData[i]._id){
              return (
                <Grid key={jobData[i]._id} item>
                  <Paper elevation={6} style={{minWidth: 750}}>
                    <span style={{margin: '2rem'}}>
                    <div className={classes2.paperContent}>
                      <h1>{jobData[i].title}</h1>
                      <Rating name="read-only" value={jobData[i]?.total_rating/jobData[i]?.total_number_of_ratings} readOnly />
                      <h3>{`${jobData[i].recruiter.name}`}</h3>
                      <Typography variant={'subtitle1'}>
                        <ul>
                          <li>Connect: {jobData[i].recruiter.email}</li>
                          <li>Salary: {jobData[i].salary}</li>
                          <li>Date of Joining: {"NIL"}</li>
                          <li>Rating: {jobData[i]?.total_rating/jobData[i]?.total_number_of_ratings}</li>
                        </ul>
                      </Typography>
                      <Grid container justify="flex-end">
                        {
                          //Applied, Shortlisted, Accepted, Rejected, Rated
                          (app.status === "Accepted")?
                          <div>
                          <Button variant="contained" style={{backgroundColor: '#ffbf00'}}>
                            {app.status}
                          </Button>
                          &nbsp;	&nbsp;
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(event) => handleClick(event, jobData[i])}
                            startIcon={<ThumbUpIcon />}
                          >
                            Click to Rate
                          </Button>
                          <Popover
                            id={app.id}
                            open={openRate}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                          >
                            <span style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: '0.5rem'
                              }}
                            >
                              <Rating
                                name="simple-controlled"
                                value={rateValue}
                                onChange={(event, newValue) => {
                                  setRateValue(newValue);
                                }}
                              />
                              <IconButton id={app.id} aria-label="submit" color="primary"
                                onClick={(event) => handleRateSave(event, rateValue)}
                              >
                                <SaveIcon />
                              </IconButton>
                            </span>
                          </Popover>
                          </div>
                          :
                          <div>
                          <Button variant="contained" color="primary">
                            {app.status}
                          </Button>
                          &nbsp;	&nbsp;
                          <Button
                            variant="contained"
                            color="primary"
                            disabled
                            onClick={handleClick}
                            startIcon={<ThumbUpIcon />}
                          >
                            Click to Rate
                          </Button>
                          </div>
                        }
                      </Grid>
                    </div>
                    </span>
                  </Paper>
                </Grid>
              )
            }
          }
        })}
        </Grid>
      </main>
    </div>
  );
}