import React from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Pages/Login/LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        {/* <NavBar /> */}
        <Route path = '/home' component = {Home} />
        <Route path = '/search' component = {Search} />
        <Route path = '/login' component = {Login} />
      </Router>
    </div>
  );
}

export default App;
