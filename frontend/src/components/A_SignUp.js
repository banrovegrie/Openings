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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function A_SignUp() {
  const classes = useStyles();
  const history = useHistory();

  sessionStorage.setItem('globalID', '0');

  let [signup, setSignup] = useState(
    {
      name: " ",
      email: " ",
      password: " ",
      education:
      {
        institute: " ",
        start_year: " ",
        end_year: " "
      },
      skills: ["haskell", "cpp", "python"]
    }
  );

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/applicants/add', signup)
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
                id="Name"
                label="Name"
                name="Name"
                autoComplete="name"
                onChange = {event => {
                  setSignup(signup = {
                    name: event.target.value,
                    email: signup.email,
                    password: signup.password,
                    education:
                    {
                        institute: signup.education.institute,
                        start_year: signup.education.start_year,
                        end_year: signup.education.start_year
                    },
                    skills: signup.skills
                  });
                  console.log(signup);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {event => {
                  setSignup(signup = {
                    name: signup.name,
                    email: event.target.value,
                    password: signup.password,
                    education:
                    {
                        institute: signup.education.institute,
                        start_year: signup.education.start_year,
                        end_year: signup.education.start_year
                    },
                    skills: signup.skills
                  });
                  console.log(signup);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {event => {
                  setSignup(signup = {
                    name: signup.name,
                    email: signup.email,
                    password: event.target.value,
                    education:
                    {
                        institute: signup.education.institute,
                        start_year: signup.education.start_year,
                        end_year: signup.education.start_year
                    },
                    skills: signup.skills
                  });
                  console.log(signup);
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="institute"
              label="Institute"
              id="institute"
              onChange = {event => {
                setSignup(signup = {
                  name: signup.name,
                  email: signup.email,
                  password: signup.password,
                  education:
                  {
                      institute: event.target.value,
                      start_year: signup.education.start_year,
                      end_year: signup.education.start_year
                  },
                  skills: signup.skills
                });
                console.log(signup);
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="start_year"
              label="Start"
              type="date"
              //defaultValue="2001-01-01"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {event => {
                setSignup(signup = {
                  name: signup.name,
                  email: signup.email,
                  password: signup.password,
                  education:
                  {
                      institute: signup.education.institute,
                      start_year: event.target.value,
                      end_year: signup.education.start_year
                  },
                  skills: signup.skills
                });
                console.log(signup);
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="end_year"
              label="End"
              type="date"
              //defaultValue="2005-01-01"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {event => {
                setSignup(signup = {
                  name: signup.name,
                  email: signup.email,
                  password: signup.password,
                  education:
                  {
                      institute: signup.education.institute,
                      start_year: signup.education.start_year,
                      end_year: event.target.value
                  },
                  skills: signup.skills
                });
                console.log(signup);
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
                onChange = {event => {
                  let str = event.target.value;
                  let arr = str.split(',').map(element => element.trim())
                  setSignup(signup = {
                    name: signup.name,
                    email: signup.email,
                    password: signup.password,
                    education:
                    {
                        institute: signup.education.institute,
                        start_year: signup.education.start_year,
                        end_year: signup.education.start_year
                    },
                    skills: arr
                  });
                  console.log(signup);
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}