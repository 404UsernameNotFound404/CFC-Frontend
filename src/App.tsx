import React, { useEffect, useState } from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Pages/Login/LoginPage';
import { BASEURL } from './Constants';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import Cookie from 'js-cookie'

const axios = require("axios");

function App(props: any) {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  
  const RedirectToLogin = () => {
    if(redirectToLogin) return <Redirect to = '/login' />;
  }

  const checkToken = async () => {
    try {
      if (!!Cookie.get("authToken")) {
        const res = await axios.post(`${BASEURL}/login`, JSON.stringify({Username: props.user.Username, Password: props.user.Password}));
        if (res.data.Username.length > 0) {
          props.updateUserData({Username: res.data.Username, AuthToken: Cookie.get("authToken")})
          setRedirectToLogin(false);
        }
        throw "auth token wrong or expired"
      }
      throw "no auth token"
    } catch (err) {
      setRedirectToLogin(true);
    }
  }

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <div>
      <Router>
        <Route path = '/home' component = {Home} />
        <Route path = '/search' component = {Search} />
        <Route path = '/login' component = {Login} />
        {props.loggedIn ? <NavBar /> : ''}
        {RedirectToLogin()}
      </Router>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  }
}

const mapDispatchToProps = (dispatchMethod: any) => {
  return {
    updateUserData: (user: any) => { dispatchMethod({type: 'ADD_USER_DATA', user: user})}
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
