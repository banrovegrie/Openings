import { React, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, CssBaseline, AppBar,
  Toolbar, List, Typography,
  Divider, IconButton, ListItem,
  ListItemIcon, ListItemText,
  Button, Paper, Grid
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import Rating from '@material-ui/lab/Rating'
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
  const [appData, setAppData] = useState([]);
  const [toAxios, setToAxios] = useState(true);
  const [toAxios2, setToAxios2] = useState(true);

  if (toAxios)
  {
    axios.get(`http://localhost:5000/jobs/${sessionStorage.getItem('jobID')}`)
      .then(res => {
        setJobData(res.data);
        setToAxios(false);
      })
      .catch(err => console.log(err));
    
    console.log(jobData);
  };
  
  if (toAxios2)
  {
    axios.get(`http://localhost:5000/applicants`)
    .then(res => {
      setAppData(res.data);
      setToAxios2(false);
    })
    .catch(err => console.log(err));
    
    console.log(appData);
  }

  const handleShortlist = (app) => {
    console.log(app._id + "::: " + app.name)
    axios.post(`http://localhost:5000/jobs/update/status/${sessionStorage.getItem('jobID')}/${app._id}`, {
      status: "Shortlisted"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    axios.post(`http://localhost:5000/applicants/update/status/${app._id}/${sessionStorage.getItem('jobID')}`, {
      status: "Shortlisted"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    window.location.reload({forcedReload: false});
  };

  const handleAccept = (app) => {
    console.log(app._id + "::: " + app.name)
    axios.post(`http://localhost:5000/jobs/update/status/${sessionStorage.getItem('jobID')}/${app._id}`, {
      status: "Accepted"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    axios.post(`http://localhost:5000/applicants/update/status/${app._id}/${sessionStorage.getItem('jobID')}`, {
      status: "Accepted"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    axios.get(`http://localhost:5000/recruiters/${sessionStorage.getItem('globalID')}`)
      .then(res => {
        console.log(res);
        axios.post('http://localhost:5000/recruiters/mail', {
          name: res.data.name,
          email: app?.email
        })
          .then(response => console.log(response))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    window.location.reload({forcedReload: false});
  };

  const handleReject = (app) => {
    console.log(app._id + "::: " + app.name)
    axios.post(`http://localhost:5000/jobs/update/status/${sessionStorage.getItem('jobID')}/${app._id}`, {
      status: "Rejected"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    axios.post(`http://localhost:5000/applicants/update/status/${app._id}/${sessionStorage.getItem('jobID')}`, {
      status: "Rejected"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
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
            {jobData?.title + " Applicants"}
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
              sessionStorage.setItem('jobID', '0');
              history.push('/dashboard-recruiter');
            }}
          >
            <ListItemIcon><ArrowBackIcon /></ListItemIcon>
            <ListItemText primary="Back to Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='logout'
            onClick={() => {
              sessionStorage.setItem('globalID', '0');
              sessionStorage.setItem('jobID', '0');
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
        {appData?.map(app => {
          for(let i = 0; i < app?.applications?.length; i++)
          {
            //console.log(app?.applications[i]?.id + ": " + app?.applications[i]?.title);
            if ((app?.applications[i]?.id === sessionStorage.getItem('jobID')) && (app?.applications[i]?.status !== "Rejected"))
            return (
              <Grid key={app?._id} item>
                <Paper elevation={6} style={{minWidth: 750}}>
                  <span style={{margin: '2rem'}}>
                  <div className={classes2.paperContent}>
                    <h1>{app.name}</h1>
                    {(app?.total_number_of_ratings !== 0) ?
                    <Rating name="read-only" value={app?.total_rating/app?.total_number_of_ratings} readOnly />
                    :
                    <Typography variant={'subtitle1'} style={{fontWeight: 'bold'}}>Unrated</Typography>}
                    <Typography variant={'subtitle1'}>
                    <ul>
                      <li>Skills: {app?.skills?.join(", ")}</li>
                      <li>Date of Application: {app?.updatedAt.substring(0, 10)}</li>
                      <li>Education: {app?.education?.institute + " (" + app?.education?.start_year?.substring(0, 4) + " to " + app?.education?.end_year?.substring(0, 4) + ")"}</li>
                      <li>SOP: {jobData?.applications?.map(post => {
                        if (post?.id === app?._id)
                        return (<a key={post.id}>{post?.SOP}</a>);
                      })}</li>
                      <li>Stage of Application: {app?.applications[i]?.status}</li>
                    </ul>
                    </Typography>
                    <Grid container justify="flex-end">
                      {
                        // Applied, Shortlisted, Rejected, Accepted
                        (app?.applications[i]?.status === "Applied")?
                          <div>
                          <Button variant="contained" color="primary"
                            onClick={() => handleShortlist(app)}
                          >
                            Shortlist
                          </Button>
                          &nbsp; &nbsp;
                          <Button variant="contained" color="secondary"
                            onClick={() => handleReject(app)}
                          >
                            Reject
                          </Button>
                          </div>
                        :
                          (app?.applications[i]?.status === "Shortlisted")?
                            <div>
                            <Button variant="contained" color="primary"
                              onClick={() => handleAccept(app)}
                            >
                              Accept
                            </Button>
                            &nbsp; &nbsp;
                            <Button variant="contained" color="secondary"
                              onClick={() => handleReject(app)}
                            >
                              Reject
                            </Button>
                            </div>
                          :
                            <Button variant="contained" disabled>
                              Accepted
                            </Button>
                      }
                    </Grid>
                  </div>
                  </span>
                </Paper>
              </Grid>
            );
          }
        })}
        </Grid>
      </main>
    </div>
  );
}