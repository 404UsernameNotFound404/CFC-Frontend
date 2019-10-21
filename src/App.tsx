import React, { useEffect, useState } from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Pages/Login/LoginPage';
import EditPage from './Components/Pages/Edit/EditPage'
import { BASEURL } from './Constants';
import UserPage from './Components/Pages/Page/UserPage';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,

} from "react-router-dom";
import { connect } from 'react-redux';
import Cookie from 'js-cookie'


const axios = require("axios");

function App(props: any) {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);

  const RedirectToLogin = () => {
    if (redirectToLogin) return <Redirect to='/login' />;
  }

  const showNavBarFunct = () => {
    setRedirectToLogin(false);
    setShowNavBar(true);
    return <></>
  }

  const checkToken = async () => {
    try {
      if (Cookie.get("authToken").length > 0) {
        const res = await axios.post(`${BASEURL}/checkToken`, JSON.stringify({ JWTToken: Cookie.get("authToken") }));
        if (res.data.Valid.length > 0) {
          props.updateUserData({ JWTToken: Cookie.get("authToken"), UserID: res.data.Valid })
        } else {
          setRedirectToLogin(true);
          throw "auth token wrong or expired"
        }
      } else {
        throw "no auth token"
      }
    } catch (err) {
      console.log(err)
      props.updateUserData({ JWTToken: "", UserID: "" })
    }
  }

  useEffect(() => {
    checkToken();
  }, [])

  const onLoginPage = () => {
    setShowNavBar(false);
    return <Login />;
  }

  return (
    <div>
      <Router>
        {console.log(redirectToLogin)}
        {RedirectToLogin()}
        <Route component={showNavBarFunct} />
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/search' component={Search} />
          <Route path='/login' component={onLoginPage} />
          <Route path='/page' component={UserPage} />
          <Redirect from = '/edit' to ={`/page?id=${props.user.UserID}`} />
          <Route path='/about' component={Home} />
          <Route path='/learn' component={Home} />
          <Route component={Home} />
        </Switch>
        <NavBar showNavBar={showNavBar} logedIn={props.loggedIn} />
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
    updateUserData: (loginInfo: any) => { dispatchMethod({ type: 'LOGIN', loginInfo: loginInfo }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
