import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfBiKZD-HTS_VFhg1kta_c_AKYjD21cmU",
  authDomain: "vtalk-4c535.firebaseapp.com",
  databaseURL: "https://vtalk-4c535.firebaseio.com",
  projectId: "vtalk-4c535",
  storageBucket: "vtalk-4c535.appspot.com",
  messagingSenderId: "422717256700",
  appId: "1:422717256700:web:4d585458fe82cd30fbf879",
  measurementId: "G-4PQG5P8SGX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
