import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import DogDetail from './Components/DogDetail/DogDetail';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import CreateDog from './Components/CreateDog/CreateDog'
/* import Filter from './Components/Filter/Filter'; */

function App() { 
  return (
    <div className="App">
      
      <NavBar exact path='/' component = {NavBar}/>
      <Route exact path='/landingPage' component={LandingPage}/>
      {/* <Route exact path='/home' component={Filter}/> */}
      <Route exact path='/home' component={Home}/>
      <Route exact path='/dogs/:id' component={DogDetail}/>
      <Route exact path='/createDog' component={CreateDog}/>
     
    </div>
  );
}

export default App;
