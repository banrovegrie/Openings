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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SaveIcon from '@material-ui/icons/Save';
import Rating from '@material-ui/lab/Rating';
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

  const [jobData, setJobData] = useState([]);
  const [toAxios, setToAxios] = useState(true);

  if (toAxios)
  {
    axios.get(`http://localhost:5000/jobs`)
      .then(res => {
        setJobData(res.data);
        setToAxios(false);
      })
      .catch(err => console.log(err));
    
    console.log(jobData);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [rateValue, setRateValue] = useState(0);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [appRateDetails, setAppRateDetails] = useState({
    job_id: " ",
    id: " ",
    total_rating: 0,
    total_number_of_ratings: 0
  });
  const openRate = Boolean(anchorEl);

  const handleClick = (event, ID, job_ID) => {
    axios.get(`http://localhost:5000/applicants/${ID}`)
      .then(res => {
        console.log(res);
        setAppRateDetails({
          job_id: job_ID,
          id: ID,
          total_rating: res.data.total_rating,
          total_number_of_ratings: res.data.total_number_of_ratings
        });
      })
      .catch(err => console.log(err));
    setAnchorEl(event.currentTarget);
    setRateValue(0);
  };

  const handleRateSave = (event, val) => {
    event.preventDefault();
    console.log(val);
    console.log(appRateDetails);

    axios.post(`http://localhost:5000/applicants/rating/update/${appRateDetails.id}`, {
      total_rating: (appRateDetails.total_rating + val),
	    total_number_of_ratings: (appRateDetails.total_number_of_ratings + 1)
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    axios.post(`http://localhost:5000/jobs/update/status/${appRateDetails.job_id}/${appRateDetails.id}`, {
      status: `Accepted and Rated ${val}/5`
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
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
            My Employees
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
        <Grid container className={classes3.root} spacing={4}>
          {jobData?.map(job => {
            if (job?.recruiter?.id === sessionStorage.getItem('globalID'))
            {
              for (let i = 0; i < job?.applications?.length; i++)
              {
                if (job?.applications[i]?.status.substring(0, 3) === "Acc")
                return (
                  <Grid key={job?.applications[i]?.id} item>
                    <Paper elevation={6} style={{minWidth: 750}}>
                      <span style={{margin: '2rem'}}>
                      <div className={classes2.paperContent}>
                        <h1>{job?.applications[i]?.name}</h1>
                        <Typography variant={'subtitle1'}>
                          <ul>
                            <li><a style={{textDecorationLine: 'underline'}}>Job Title</a>: {job?.title}</li>
                            <li><a style={{textDecorationLine: 'underline'}}>Type of Job</a>: {job?.type_of_job?.charAt(0)?.toUpperCase() + job?.type_of_job?.slice(1)}</li>
                            <li><a style={{textDecorationLine: 'underline'}}>Date of Joining</a>: {job?.updatedAt?.substring(0, 10)}</li>
                          </ul>
                        </Typography>  
                        <Grid container justify="flex-end">
                          {
                            // Applied, Shortlisted, Rejected, Accepted
                            (job?.applications[i]?.status === "Accepted")?
                              <div>
                                <Button variant="contained" color="secondary"
                                  startIcon={<ThumbUpIcon />}
                                  onClick={(event) => handleClick(event, job?.applications[i]?.id, job._id)}
                                >
                                  Rate
                                </Button>
                                <Popover
                                  id={job?.applications[i]?.id}
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
                                    <IconButton id={job?.applications[i]?.id} aria-label="submit" color="primary"
                                      onClick={(event) => handleRateSave(event, rateValue)}
                                    >
                                      <SaveIcon />
                                    </IconButton>
                                  </span>
                                </Popover>
                              </div>
                            :
                              <Button variant="contained" color="primary"
                              >
                                {job?.applications[i]?.status}
                              </Button>
                          }
                        </Grid>
                      </div>
                      </span>
                    </Paper>
                  </Grid>
                );
              }
            }
          })}
        </Grid>
      </main>
    </div>
  );
}