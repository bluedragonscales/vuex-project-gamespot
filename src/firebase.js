// MAIN FIREBASE CONFIGURATION
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


// This object was copied from the firebase console when registering the app for firebase SDK.
const firebaseConfig = {
    apiKey: "AIzaSyBee-4RfKgamFzX8rChX0IBBmSTlRToiP0",
    authDomain: "gamespot-aeec5.firebaseapp.com",
    projectId: "gamespot-aeec5",
    storageBucket: "gamespot-aeec5.appspot.com",
    messagingSenderId: "110344853708",
    appId: "1:110344853708:web:2560b9274b0fea2c274a69",
    measurementId: "G-3MS6TT93M8"
};


// Initializing the configuration from the firebase db.
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Creating instances of these imports to pass around the application more easily.
const fireAuth = getAuth();
const db = getFirestore();



// Exporting all the instances created.
export {
    firebaseApp,
    fireAuth,
    db
}