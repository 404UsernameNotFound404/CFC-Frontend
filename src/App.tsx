import React from 'react';
import Home from './Components/Pages/Home/HomePage';
import Search from './Components/Pages/Search/SearchPage';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      {/* <Home /> */}
      <Search />
    </div>
  );
}

export default App;
