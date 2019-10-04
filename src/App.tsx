import React, { useEffect } from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Pages/Login/LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

function App(props: any) {
  
  useEffect(() => {
     const fakeCallToServer = {userId: '23', token: 'asdd123123sadazxc', FName: 'Henry', LName: 'Morrris'}
     props.updateUserData(fakeCallToServer);
  },[]);

  return (
    <div>
      <Router>
        <Route path = '/home' component = {Home} />
        <Route path = '/search' component = {Search} />
        <Route path = '/login' component = {Login} />
        {true ? <NavBar /> : ''}
      </Router>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatchMethod: any) => {
  return {
    deletePost: (id: any) => { dispatchMethod({type: 'DELETE_POST', id: id})},
    updateUserData: (user: any) => { dispatchMethod({type: 'ADD_USER_DATA', user: user})}
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
