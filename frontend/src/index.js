import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn'
import R_SignUp from './components/R_SignUp'
import A_SignUp from './components/A_SignUp'
import A_Dashboard from './components/A_Dashboard'
import A_Profile from './components/A_Profile'
import { /*Link,*/ BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
  <Router>
    
    <Route path='/' exact>
      <SignIn />
    </Route>
    
    <Route path='/sign-up-recruiter' exact>
      <R_SignUp />
    </Route>
    
    <Route path='/sign-up-applicant' exact>
      <A_SignUp />
    </Route>

    <Route path='/dashboard-applicant' exact>
      <A_Dashboard />
    </Route>

    <Route path='/profile-applicant' exact>
      <A_Profile />
    </Route>

  </Router>,
  document.getElementById('root')
);