import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
    Collapse,
    Navbar,
    NavbarToggler,
  } from 'reactstrap';

function HeaderPageComponent({name,setname,email,setemail,profilepic,setprofilepic,isloggedin,setisloggedin}) {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setisloggedin(true);
          setemail(user.email);
          setname(user.displayName);
          setprofilepic(user.photoURL);
        } else {
          setisloggedin(false);
          setprofilepic(null);
          setname(null);
        }
      });
    var provider = new firebase.auth.GoogleAuthProvider();
    var db = firebase.firestore();
    var login = (event) => {
        event.preventDefault();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log("Yaha Tak")
            db.collection("users").where("Email", "==", user.email).get()
                .then(function(querySnapshot) {
                    console.log("Then Block", querySnapshot);
                    if (querySnapshot.docs.length !== 0) {
                        querySnapshot.forEach(function(doc) {
                            db.collection("users").doc(user.email).update({
                                isonline:true
                            })
                            .then(()=>{
                                console.log("Logged In");
                            })
                            .catch((e)=>{
                                console.log("Error in online setting",e);
                            })
                        });
                            console.log("Already Registered !");
                    } else {
                        console.log("Not Already Registered !!!");
                        db.collection("users").doc(user.email).set({
                                Name: user.displayName,
                                Email: user.email,
                                ProfilePic: user.photoURL,
                                CreatedAt: new Date(),
                                uid: user.uid,
                                isonline:true
                            })
                            .then(function() {
                                console.log("Document successfully written!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });
                        console.log(user);
                    }
                    console.log("Logged in");
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    var logout = (event)=>{
        event.preventDefault();
        firebase.auth().signOut().then(function() {
            db.collection("users").doc(email).update({
                isonline:false
            })
            .then(()=>{
                setemail(null);
                console.log("Logged Out");
            })
            .catch((e)=>{
                console.log("Error in online setting",e);
            })
          }).catch(function(error) {
            console.log("Some error in logging out");
          });
    }
    return ( 
    <div>
      <Navbar color="light" light expand="md">
      <Link className = "navbar-brand" to = "/home" > V Chat </Link> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        
                {isloggedin ?
                <React.Fragment>
                    <ul className = "navbar-nav ml-auto" >
                        <li className ="nav-item">
                            <img src= {profilepic} alt={profilepic} style={{maxWidth:"55px",maxHeight:"55px"}} className="rounded-circle" />
                        </li> 
                    </ul>
                    <ul className = "navbar-nav" >
                        <li className ="nav-item">
                            <h3 style={{padding:"10px"}}>{name}</h3>
                        </li> 
                    </ul>
                    <ul className = "navbar-nav ml-auto" >
                        <li className = "nav-item ml-auto" >
                            <button className = "btn btn-outline-success my-2 my-sm-0" type = "submit" onClick = {logout}>Logout</button> 
                        </li> 
                    </ul>
                </React.Fragment>
                :
                <ul className = "navbar-nav ml-auto" >
                    <li className = "nav-item" >
                        <button className = "btn btn-outline-success my-2 my-sm-0" type = "submit" onClick = {login}>Login</button> 
                    </li>
                </ul>
                }  
        </Collapse>
      </Navbar>
    </div>
    );
}

export default HeaderPageComponent;