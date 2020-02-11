import React, { useEffect, useState } from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBarPage';
import Login from './Components/Pages/Login/LoginPage';
import AboutPage from './Components/Pages/About/AboutPage'
import UserPage from './Components/Pages/Page/User/UserPage';
import LearningPage from './Components/Pages/Learning/LearnPage'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Cookie from 'js-cookie'
import { AppContext } from './Context/AppContext'
import OrgPage from './Components/Pages/Page/Org/OrgPage'
import VerificationPage from './Components/Pages/Verify/Verify'
import ContactPage from './Components/Pages/Contact/Contact';
import FAQ from './Components/Pages/FAQ/FAQPage'
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy/PrivacyPolicy';
import ForgotPasswordPage from './Components/Pages/ForgotPasswordPage/ForgotPage';
import EventPage from './Components/Pages/Event/EventPage'

const axios = require("axios");

function App() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [userToken, setUserToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState(-1);


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
        console.log("checking token")
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/checkToken`, JSON.stringify({ JWTToken: Cookie.get("authToken") }));
        if (res.data.UserID.length > 0) {
          console.log("setting user token to cookie")
          setUserToken(Cookie.get("authToken"))
          setUserID(res.data.UserID)
          setUserType(res.data.Type)
          setLoggedIn(true)
        } else {
          setRedirectToLogin(true);
          throw "auth token wrong or expired"
        }
      } else {
        throw "no auth token"
      }
    } catch (err) {
      console.log("Setting token blank error")
      setUserToken("")
      setUserID("")
    }
  }

  const login = (token: string, userType: number, userID: string, rememberMe: boolean) => {
    setUserToken(token);
    setUserType(userType);
    setUserID(userID);
    setLoggedIn(true);
    if (rememberMe) {
      Cookie.set("authToken", token)
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
      <AppContext.Provider value = {{login: login, userID, userToken: userToken, loggedIn: loggedIn, setUserToken: setUserToken, setLoggedIn: setLoggedIn, userType: userType, setUserType: setUserType}}>
        <Router>
          {RedirectToLogin()}
          <Route component={showNavBarFunct} />
          <Switch>
            <Route path='/home' component={Home} />
            <Route path = '/search' component = {Search}/>
            <Route path='/login' component={onLoginPage} />
            <Route path='/page' component={UserPage} />
            {console.log(userID)}
            <Redirect from = '/edit' to ={`/${(userType === 0) ? "page" : "organization"}?id=${userID}`} />
            <Route path='/about' component={AboutPage} />
            <Route path = '/event' component = {EventPage} />
            <Route path='/learn' component={LearningPage} />
            <Route path = '/organization' component = {OrgPage} />
            <Route path = '/verify' component = {VerificationPage} />
            <Route path = '/contact' component = {ContactPage} />
            <Route path = '/FAQ' component = {FAQ} />
            <Route path = '/Privacy-Policy' component = {PrivacyPolicy} />
            <Route path = '/profile' component = {() => <ProfilePage userID = {userID} />} />
            <Route path = '/forgotPassword' component = {ForgotPasswordPage} />
            <Route component={Home} />
          </Switch>
          <NavBar showNavBar={showNavBar} />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
