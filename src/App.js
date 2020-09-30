import React,{useState} from 'react';
import logo from './logo.svg';
import {BrowserRouter,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HomePageComponent from './Components/HomePageComponent/HomePageComponent';
import HeaderPageComponent from '../src/Components/HeaderPageComponent/HeaderPageComponent';


function App() {
    const [name , setname ] = useState(null);
    const [email , setemail ] = useState(null);
    const [profilepic , setprofilepic ] = useState(null);
    const [isloggedin , setisloggedin ] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderPageComponent name={name} setname={setname} email={email} setemail={setemail} profilepic={profilepic} setprofilepic={setprofilepic} isloggedin={isloggedin} setisloggedin={setisloggedin} />
          <Route path="/home" component={HomePageComponent} />
          <Route exact path="/" component={HomePageComponent} />
      </div>
    </BrowserRouter>
  );
}

export default App;
