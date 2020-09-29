import React from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
function HeaderPageComponent(props) {
    var provider = new firebase.auth.GoogleAuthProvider();
    var login = (event) => {
        event.preventDefault();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);
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
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to="/home">Navbar</Link>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            {/* <Link class="nav-link" to="/login" >Login</Link> */}
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={login} >Login</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default HeaderPageComponent;