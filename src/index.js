import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import SAMPLE_DATA from './crimeData.json';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdASmrDjabP2zne7t47qIccNvkx2qlBps",
    authDomain: "info340-project-2.firebaseapp.com",
    projectId: "info340-project-2",
    storageBucket: "info340-project-2.appspot.com",
    messagingSenderId: "152979003891",
    appId: "1:152979003891:web:3b6e850ed342b6e8a45a86"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render( 
    <Router>
      <App data = { SAMPLE_DATA }/> 
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();