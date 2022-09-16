// AUTHENTICATION MODULE INDEX
/* eslint-disable */
import {db, fireAuth} from '../../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, getDoc} from 'firebase/firestore';


// This is the default user information for signing up and signing in.
const DEFAULT_USER = {
    uid: null,
    email: null,
    firstname: null,
    lastname: null,
    isAdmin: null
}


// This is the authentication module for all the functions needed for the application's authentication.
const authModule = {
    namespaced: true,
    state() {
        return {
            user: DEFAULT_USER,
            auth: false
        }
    },
    actions: {
        async signUp({commit}, payload) {
            // Since this is an async method, we can use a try/catch block instead of typing out the callback functions for the response and errors.
            try {
                // Created an instance of firebase's library to create a user. It will await the loading of the rest of the app first, and then it uses the imported auth object and the payload's email and password to create a user with credentials specified on the front end.
                const userCredential = await createUserWithEmailAndPassword(
                    fireAuth,
                    payload.email,
                    payload.password
                );

                console.log(userCredential);
                // Now we use that userCredential object to store the information for the new user and assign a boolean value to the "isAdmin" key.
                const newUser = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    isAdmin: false
                };

                console.log(newUser);
                // Using firestore imports, creating a document for the newly created user and storing it on the database we imported from firebase. "userDocs" is the name of the collection we save those documents in, or it creates a new collection if "userDocs" does not already exist. The third parameter links the user id to the document. These three arguments together make the first argument for "setDoc".
                // The second argument for "setDoc" is the "newUser" object itself.
                await setDoc(doc(db, 'userDocs', userCredential.uid), newUser);
            } catch(er) {

            }
        }
    }
};


// Exporting the auth module so the store's index file can import it.
export default authModule;