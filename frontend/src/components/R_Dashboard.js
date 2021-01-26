import { React, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, CssBaseline, AppBar,
  Toolbar, List, Typography,
  Divider, IconButton, ListItem,
  ListItemIcon, ListItemText,
  Button, Paper, Grid, TextField,
  Dialog, DialogActions, DialogContent,
  DialogTitle, DialogContentText
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
  };

  const handleViewApp = (event, job) => {
    event.preventDefault();
    console.log(job._id + ": " + job.title);
    sessionStorage.setItem('jobID', job._id);
    history.push('/recruiter/job_applications');
  };

  const [openApply, setOpenApply] = useState(false);
  const [atJob, setAtJob] = useState({
    id: " ",
    title: " "
  });
  const [editJob, setEditJob] = useState({
    max_number_of_applications: 0,
    max_number_of_positions: 0,
    deadline: 0
  });

  const handleApplyClose = () => {
    setOpenApply(false);
  };

  const handleMakeApply = () => {
    console.log(atJob);
    console.log(editJob);
  
    axios.post(`http://localhost:5000/jobs/update/${atJob.id}`, editJob)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    handleApplyClose();
    window.location.reload({forcedReload: false});
  };

  const handleEditJob = (job) => {
    console.log(job._id + ": " + job.title);
    setAtJob({
      id: job._id,
      title: job.title
    });
    setOpenApply(true);
  };

  const handleDeleteJob = (job) => {
    console.log(job._id + ": " + job.title);

    for (let i = 0; i < job?.applications?.length; i++)
    {
      axios.post(`http://localhost:5000/applicants/update/status/${job.applications[i].id}/${job._id}`, {
        status: "Job Deleted"
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    axios.delete(`http://localhost:5000/jobs/${job._id}`)
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
        <Grid container className={classes3.root} spacing={4}>
        {jobData?.map(job => {
          if (job.recruiter.id === sessionStorage.getItem('globalID'))
          return (
            <Grid key={job._id} item>
              <Paper elevation={6} style={{minWidth: 750}}>
                <span style={{margin: '2rem'}}>
                <div className={classes2.paperContent}>
                  <h1>{job.title}</h1>
                  <Typography variant={'subtitle1'}>
                  <ul>
                    <li><a style={{textDecorationLine: 'underline'}}>Date of Posting</a>: {(new Date(job.createdAt)).toDateString()}</li>
                    <li><a style={{textDecorationLine: 'underline'}}>Number of Applicants</a>: {job?.applications?.length}</li>
                    <li><a style={{textDecorationLine: 'underline'}}>Remaining Number of Positions</a>: {
                      job.max_number_of_positions -  job?.applications?.reduce(function(previousValue, currentObject) {
                        return previousValue + (currentObject?.status?.substring(0, 3) === "Acc" ? 1: 0); 
                      }, 0)}</li>
                  </ul>
                  </Typography>
                  <Grid container justify="flex-end">
                    <IconButton aria-label="delete" color="secondary"
                      onClick={() => handleDeleteJob(job)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    &nbsp; &nbsp;
                    <IconButton aria-label="edit" color="primary"
                      onClick={() => handleEditJob(job)}
                    >
                      <EditIcon />
                    </IconButton>
                    <Dialog open={openApply} onClose={handleApplyClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Edit Job: {atJob.title}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                          id={`deadline ${atJob.id}`}
                          label="Deadline"
                          type="date"
                          variant="outlined"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={event => {
                            setEditJob({
                              ...editJob,
                              deadline: event.target.value
                            });
                          }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id={`max app ${atJob.id}`}
                          label="Maximum Number of Applications"
                          type="number"
                          fullWidth
                          onChange={(event) => {
                            setEditJob({
                              ...editJob,
                              max_number_of_applications: event.target.value
                            });
                          }}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id={`max pos ${atJob.id}`}
                          label="Maximum Number of Positions"
                          type="number"
                          fullWidth
                          onChange={(event) => {
                            setEditJob({
                              ...editJob,
                              max_number_of_positions: event.target.value
                            });
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleApplyClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleMakeApply} color="secondary">
                          Edit
                        </Button>
                      </DialogActions>
                    </Dialog>
                    &nbsp; &nbsp; &nbsp;
                    <Button variant="contained" style={{backgroundColor: '#ffbf57'}}
                      onClick={(event) => handleViewApp(event, job)}
                    >
                      View Applications
                    </Button>
                  </Grid>
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