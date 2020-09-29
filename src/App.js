import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LoginPageComponent from '../src/Components/LoginPageComponent/LoginPageComponent';
import HomePageComponent from '../src/Components/ChatPageComponent/ChatPageComponent';
import HeaderPageComponent from '../src/Components/HeaderPageComponent/HeaderPageComponent';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderPageComponent />
          <Route path="/login" component={LoginPageComponent} />
          <Route path="/home" component={HomePageComponent} />
          <Route exact path="/" component={HomePageComponent} />
      </div>
    </BrowserRouter>
  );
}

export default App;
