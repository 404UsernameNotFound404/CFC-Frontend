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
  console.log(props);
  useEffect(() => {
     props.deletePost(0);
  },[])

  return (
    <div>
      <Router>
        <Route path = '/home' component = {Home} />
        <Route path = '/search' component = {Search} />
        <Route path = '/login' component = {Login} />
        {/* {true ? <NavBar /> : ''} */}
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
    deletePost: (id: any) => { dispatchMethod({type: 'DELETE_POST', id: id})}
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
