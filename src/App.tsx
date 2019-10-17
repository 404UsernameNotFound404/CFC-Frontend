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
  const [first, setFirst] = useState(true);
  
  const RedirectToLogin = () => {
    if(redirectToLogin) return <Redirect to = '/login' />;
  }

  // const RedirectToHome = () => {
  //   if(props.loggedIn) return <Redirect to = '/home' />;
  // }

  const checkToken = async () => {
    try {
      if (!!Cookie.get("authToken")) {
        const res = await axios.post(`${BASEURL}/checkToken`, JSON.stringify({JWTToken: Cookie.get("authToken")}));
        if (res.data.Valid.length > 0) {
          props.updateUserData({JWTToken: Cookie.get("authToken")})
        } else {
          setRedirectToLogin(true);
          console.log("ahhhhhh")
          throw "auth token wrong or expired"
        }
      } else {
        throw "no auth token"
      }
    } catch (err) {
      props.updateUserData({JWTToken: ""})
      setRedirectToLogin(true);
    }
    setFirst(false);
  }

  const checkLoggedInStatus = () => {
    if(!props.loggedIn) {
      console.log("asdjkaskd")
      setRedirectToLogin(true);
    }
  }

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if(!first) checkLoggedInStatus();
  });

  return (
    <div>
      <Router>
        {RedirectToLogin()}
        <Route path = '/home' component = {Home} />
        <Route path = '/search' component = {Search} />
        <Route path = '/login' component = {Login} />
        {props.loggedIn ? <NavBar /> : ''}
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
    updateUserData: (loginInfo: any) => { dispatchMethod({type: 'LOGIN', loginInfo: loginInfo})}
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
