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
    // necessary for content to be below app bar
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

const useStyles3 = makeStyles((theme) =>({
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
    axios.get('http://localhost:5000/jobs')
      .then(res => {
        setJobData(res.data);
        setToAxios(false)
      });
    console.log(jobData);
  }

  console.log('globalID ' + sessionStorage.getItem('globalID'));

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
          <ListItem button key="profile"
            onClick={() => {
              history.push('/profile-applicant');
            }}
          >
            <ListItemIcon><NaturePeopleIcon /></ListItemIcon>
            <ListItemText primary="My Profile" />
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

        <Grid container className={classes3.root} spacing={4}>
        {jobData?.map(job => {
          return (
            <Grid key={job._id} item>
              <Paper elevation={6} style={{minWidth: 750}}>
                <span style={{margin: '2rem'}}>
                <div className={classes2.paperContent}>
                  <h1>{job.title}</h1>
                  <Rating name="read-only" value={job.total_rating/job.total_number_of_ratings} readOnly />
                  <h2>{job.recruiter.name}, {job.recruiter.email}</h2>
                  <Typography variant={'subtitle1'}>Job Requirements</Typography>
                  <ul>
                    <li>Deadline: {(new Date(job.deadline)).toDateString()}</li>
                    <li>Type of Job: {job.type_of_job}</li>
                    <li>Duration: {job.duration} Months</li>
                    <li>Skills Required: {job.skills.join(", ")}</li>
                  </ul>
                  <Typography variant={'subtitle1'}>Further Job Details</Typography>
                  <ul>
                    <li>Positions Open: {job.max_number_of_positions}</li>
                    <li>Maximum Applications (intaking): {job.max_number_of_applications}</li>
                    <li>Salary: {job.salary}</li>
                  </ul>
                  <Typography variant={'subtitle1'}>Rating: {job.total_rating/job.total_number_of_ratings}</Typography>
                </div>
                </span>
              </Paper>
            </Grid>
          )
        })}
        </Grid>
      </main>
    </div>
  );
}