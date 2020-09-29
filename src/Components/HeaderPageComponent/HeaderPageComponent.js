import React from 'react';
import {
    Link
} from 'react-router-dom';
import firebase from 'firebase';

function HeaderPageComponent(props) {
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
                        querySnapshot.forEach((doc) => {
                            console.log(doc.exists);
                            console.log("Already Registered !");
                        })
                    } else {
                        console.log("Not Already Registered !!!");
                        db.collection("users").add({
                                Name: user.displayName,
                                Email: user.email,
                                ProfilePic: user.photoURL,
                                CreatedAt: new Date(),
                                uid: user.uid
                            })
                            .then(function() {
                                console.log("Document successfully written!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });
                        console.log(user);
                    }
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
    return ( 
    <div>
        <nav className = "navbar navbar-expand-lg navbar-light bg-light" >
        <Link className = "navbar-brand" to = "/home" > Navbar </Link> 
        <div className = "collapse navbar-collapse" id = "navbarSupportedContent">
            <ul className = "navbar-nav ml-auto" >
                <li className = "nav-item" >
                    <button className = "btn btn-outline-success my-2 my-sm-0" type = "submit" onClick = {login}>Login</button> 
                </li> 
            </ul> 
        </div> 
        </nav>
    </div>
    );
}

export default HeaderPageComponent;