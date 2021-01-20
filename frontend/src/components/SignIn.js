import { React, useState, useEffect } from 'react';
import {
  Avatar, Button, makeStyles, Container, TextField,
  Typography, Box, CssBaseline, FormControlLabel, Checkbox,
  Link, Grid, StylesProvider
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { BrowserRouter as Router, Redirect, Route, useHistory} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  sessionStorage.setItem('globalID', '0');
  console.log(sessionStorage.getItem('globalID'));
  let [login, setLogin] = useState(
    {
      email: ' ',
      password: ' '
    }
  );  

  const handleSubmit = event => {
    event.preventDefault();
    axios.get('http://localhost:5000/applicants')
      .then(res => {
        const loginData = res.data;
        console.log(loginData);
        loginData.forEach(log => {
          if (log.email === login.email && log.password === login.password)
          {
            sessionStorage.setItem('globalID', log._id);
            console.log(sessionStorage.getItem('globalID'));
            history.push('/dashboard-applicant');
          }
        });
        const globalID = sessionStorage.getItem('globalID');
        console.log(globalID);
      })
      .catch(err => console.log(err));

    if (sessionStorage.getItem('globalID') !== '0');
    else
    {
      axios.get('http://localhost:5000/recruiters')
        .then(res => {
          const loginData = res.data;
          console.log(loginData);
          loginData.forEach(log => {
            if (log.email === login.email && log.password === login.password)
            {
              sessionStorage.setItem('globalID', log._id);
              console.log(sessionStorage.getItem('globalID'));
              history.push('/dashboard-recruiter');
            }
          });
          const globalID = sessionStorage.getItem('globalID');
          console.log(globalID);
        })
        .catch(err => console.log(err));

      if (sessionStorage.getItem('globalID') !== '0');
      else
        history.push('/');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} 
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {event => {
              setLogin(login = {
                email: event.target.value, 
                password: login.password
              });
              console.log(login);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {event => {
              setLogin(login = {
                email: login.email, 
                password: event.target.value
              });
              console.log(login);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/sign-up-recruiter" variant="body2">
                {"Sign Up as Recruiter"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up-applicant" variant="body2">
                {"Sign Up as Applicant"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}