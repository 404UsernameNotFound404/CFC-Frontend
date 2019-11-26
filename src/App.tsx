import React, { useEffect, useState } from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBarPage';
import Login from './Components/Pages/Login/LoginPage';
import AboutPage from './Components/Pages/About/AboutPage'
import { BASEURL } from './Constants';
import UserPage from './Components/Pages/Page/UserPage';
import LearningPage from './Components/Pages/Learning/LearnPage'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,

} from "react-router-dom";
import Cookie from 'js-cookie'
import { AppContext} from './Context/AppContext'

const axios = require("axios");

function App(props: any) {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [userToken, setUserToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");


  const RedirectToLogin = () => {
    if (redirectToLogin) return <Redirect to='/login' />;
  }

  const showNavBarFunct = () => {
    setRedirectToLogin(false);
    setShowNavBar(true);
    return <></>
  }

  const checkToken = async () => {
    console.log("check token")
    console.log(Cookie.get("authToken"))
    try {
      if (Cookie.get("authToken").length > 0) {
        const res = await axios.post(`${BASEURL}/checkToken`, JSON.stringify({ JWTToken: Cookie.get("authToken") }));
        if (res.data.Valid.length > 0) {
          console.log("valid cookie")
          setUserToken(Cookie.get("authToken"))
          setUserID(res.data.Valid)
          setLoggedIn(true)
        } else {
          setRedirectToLogin(true);
          throw "auth token wrong or expired"
        }
      } else {
        throw "no auth token"
      }
    } catch (err) {
      console.log("error when checking token")
      setUserToken("")
      setUserID("")
    }
  }

  useEffect(() => {
    console.log("asd")
    checkToken();
  }, [loggedIn])

  const onLoginPage = () => {
    setShowNavBar(false);
    return <Login />;
  }

  return (
    <div>
      <AppContext.Provider value = {{userID, userToken: userToken, loggedIn: loggedIn, setUserToken: setUserToken, setLoggedIn: setLoggedIn}}>
        <Router>
          {RedirectToLogin()}
          <Route component={showNavBarFunct} />
          <Switch>
            <Route path='/home' component={Home} />
            <Route path = '/search' component = {Search}/>
            <Route path='/login' component={onLoginPage} />
            <Route path='/page' component={UserPage} />
            {console.log(userID)}
            <Redirect from = '/edit' to ={`/page?id=${userID}`} />
            <Route path='/about' component={AboutPage} />
            <Route path='/learn' component={LearningPage} />
            <Route component={Home} />
          </Switch>
          <NavBar showNavBar={showNavBar} />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
