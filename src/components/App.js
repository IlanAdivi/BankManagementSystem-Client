import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './pages/auth/Login';
import PrivateRoute from './pages/privateRoute/PrivateRoute';
import PersonalDetails from './pages/privateRoute/personalDetails/PersonalDetails';
import BankAccounts from './pages/privateRoute/bankAccounts/BankAccounts';
import LoanDetails from './pages/privateRoute/loanDetails/LoanDetails';
import './App.css';
import { logoutUser, setCurrentUser } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(state => {
    return state.auth;
  });

  if (localStorage.token && !authenticated.isAuthenticated) {
    const token = localStorage.token;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    history.push("/personalDetails");
    // Check for expired token
    const currentTime = Date.now() / 100000000;
    if (decoded.exp < currentTime) {
      dispatch(logoutUser());
      history.push("/");
    }
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/personalDetails" component={PersonalDetails} />
        <PrivateRoute exact path="/bankAccounts" component={BankAccounts} />
        <PrivateRoute exact path="/loanDetails" component={LoanDetails} />
      </Switch>
    </div>
  );
}

export default App;
