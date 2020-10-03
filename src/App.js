import React,{useState} from 'react';
import logo from './logo.svg';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HomePageComponent from './Components/HomePageComponent/HomePageComponent';
import HeaderPageComponent from '../src/Components/HeaderPageComponent/HeaderPageComponent';
import ChatPageComponent from './Components/ChatPageComponent/ChatPageComponent';


function App() {
    const [name , setname ] = useState(null);
    const [email , setemail ] = useState(null);
    const [profilepic , setprofilepic ] = useState(null);
    const [isloggedin , setisloggedin ] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderPageComponent name={name} setname={setname} email={email} setemail={setemail} profilepic={profilepic} setprofilepic={setprofilepic} isloggedin={isloggedin} setisloggedin={setisloggedin} />
        <Switch>
          <Route exact path="/home" component={() => <HomePageComponent isloggedin={isloggedin} />}/>
          <Route exact path="/" component={() => <HomePageComponent isloggedin={isloggedin} email={email} />}/>
          <Route exact path="/chat/:emailid" children={() => <ChatPageComponent isloggedin={isloggedin} email={email}/>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
