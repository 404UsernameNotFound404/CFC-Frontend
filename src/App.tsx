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
import LoadingPage from './Components/ComponentLibrayer/LoadingPage';
import MessageToUserComponent from './Components/MessageToUser/MessageToUserComponent';
import PageCreationTest from './Components/Pages/PageCreationTest';
import Approve from './Components/Pages/ApproveUpdateRequests/Approve';

const axios = require("axios");

function App() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [userToken, setUserToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [messageToUser, setMessageToUser] = useState({message: "", colour: "black" })

  useEffect(() => {
    checkToken();
  }, [])


  const RedirectToLogin = () => {
    if (redirectToLogin) return <Redirect to='/login' />;
  }

  const showNavBarFunct = () => {
    setRedirectToLogin(false);
    setShowNavBar(true);
    return <></>
  }

  const checkToken = async () => {
    let authToken = Cookie.get("authToken")
    try {
      setLoading(true);
      if (authToken.length <= 1) throw "No Auth Token it's fine"
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/checkToken`, JSON.stringify({ JWTToken: authToken }));
      if (res.data.UserID == undefined) throw "Invalid Token"
      setUserToken(authToken);
      setUserID(res.data.UserID);
      setUserType(res.data.Type);
      setLoggedIn(true);
      
      setLoading(false);
    } catch (err) {
      if (authToken != undefined && authToken.length > 0) setRedirectToLogin(true);
      setUserToken("")
      setUserID("");
      Cookie.set("authToken", "")
      setLoading(false);
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

  if (!loading) {
    return (
      <div>
        <AppContext.Provider value={{ setMessageToUser: setMessageToUser, login: login, userID, userToken: userToken, loggedIn: loggedIn, setUserToken: setUserToken, setLoggedIn: setLoggedIn, userType: userType, setUserType: setUserType }}>
          {console.log("rendering")}
          <Router>
            {RedirectToLogin()}
            <Route component={showNavBarFunct} />
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/search' component={Search} />
              <Route path='/login' component={Login} />
              <Route path='/page' component={UserPage} />
              <Redirect from='/edit' to={`/${(userType === 0) ? "page" : "organization"}?id=${userID}`} />
              <Route path='/about' component={AboutPage} />
              <Route path='/event' component={EventPage} />
              <Route path='/learn' component={LearningPage} />
              <Route path='/organization' component={OrgPage} />
              <Route path='/verify' component={VerificationPage} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/FAQ' component={FAQ} />
              <Route path='/Privacy-Policy' component={PrivacyPolicy} />
              <Route path='/profile' component={() => <ProfilePage userID={userID} />} />
              <Route path='/forgotPassword' component={ForgotPasswordPage} />
              <Route path='/pageCreationTesting' component = {PageCreationTest} />
              <Route path = '/theInnerCircle' component = {Approve} />
              <Route component={Home} />
            </Switch>
            <MessageToUserComponent message = {messageToUser.message} colour = {messageToUser.colour} />
            <Switch>
              <Route path = "/login" component = {() => <div />} />
              <NavBar showNavBar={showNavBar} />
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    );
  } else {
    return (
      <LoadingPage />
    )
  }
}

export default App;

/*
[{"id":2621,"sections":[{"width":"48%","type":0,"fontSize":1.5,"text":"Write here...","id":2512,"textAlign":"left"},{"width":"48%","type":0,"fontSize":1.5,"text":"Write here...","id":655,"textAlign":"left"}],"type":2},{"type":1,"id":2960,"sections":{"imgSrc":"","width":"100%","height":"15em"}}]
*/
