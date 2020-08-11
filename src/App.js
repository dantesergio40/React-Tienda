import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,   
} from "react-router-dom";


import Login from './components/login/login';
import Register from './components/login/register';
import Inicio from './components/inicio/inicio';


function App() {
  return (
   <Router>
     <Switch>
        <Route path="/" exact component={Login}/>           
        <Route path="/inicio" exact component={Inicio}/>            
        <Route path="/register" exact component={Register}/>           
     </Switch>
   </Router>    
  );
}

export default App;

     