// AUTHENTICATION MODULE INDEX
/* eslint-disable */
import {db, fireAuth} from '../../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import router from '../../routes';
import {msgError, msgSuccess} from '../../tools/vuex.js';
import {firebaseErrors} from '../../tools/fbalerts';


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
    mutations: {
        setUser(state, payload) {
            // We'll use this mutation to set the newly created user information to the state values. The "...payload" is the information received from the "newUser" object created in the "signUp" action. The "...state.user" populates all of the fields in the default user object, but the null properties are replaced where the payload fills them in.
            state.user = {
                ...state.user,
                ...payload
            }
            state.auth = true;
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

                // Now we use that userCredential object to store the information for the new user and assign a boolean value to the "isAdmin" key.
                const newUser = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    isAdmin: false // WARNING - CLOUD FUNCTION
                };

                // Using firestore imports, creating a document for the newly created user and storing it on the database we imported from firebase. "userDocs" is the name of the collection we save those documents in, or it creates a new collection if "userDocs" does not already exist. The third parameter links the user id to the document. These three arguments together make the first argument for "setDoc".
                // The second argument for "setDoc" is the "newUser" object itself.
                await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
                // Here we are committing the action to the mutation "setUser" and inserting the information stored in the "newUser" object.
                commit('setUser', newUser);
                // Once the user signs up successfully, there will be a success message and they will be pushed to their dashboard.
                msgSuccess(commit, 'Welcome!');
                router.push('/user/dashboard');

            } catch(error) {
                console.log(error);
                msgError(commit, firebaseErrors(error.code));
            }
        },
        async getUserProfile({commit}, payload) {
            try {
                // To get a user profile, we go to the firebase db and get the information from the specific document. To do this, we use the imported "getDoc", fill in the imported db, the name of the collection the document is located, and the specific uid of the document (passed in through the payload argument).
                const docSnapshot = await getDoc(doc(db, 'users', payload));

                // If firebase finds the user document then return all of the data inside of the document snapshot, otherwise it will return null.
                if(docSnapshot.exists()) {
                    return docSnapshot.data();
                } else {
                    return null;
                }

            } catch(error) {
                console.log(error);
            }
        },
        async signIn({commit, dispatch}, payload) {
            try {
                // When signing in, the imported firebase library "signInWithEmailAndPassword" will populate the user needed to sign in.
                const userCredential = await signInWithEmailAndPassword(
                    fireAuth,
                    payload.email,
                    payload.password
                );

                // We dispatch the action "getUserProfile" to search the firebase database for the document containing the user's information. If the user does not exist, it will go to the catch block.
                const userData = await dispatch('getUserProfile', userCredential.user.uid);
                // If the user exists in the database, we will commit the data returned to the mutation "setUser".
                commit('setUser', userData);
                // Once the user signs in successfully, they will be pushed to their dashboard.
                router.push('/user/dashboard');

            } catch(error) {
                console.log(error);
                msgError(commit, firebaseErrors(error.code));
            }
        }
    }
};


// Exporting the auth module so the store's index file can import it.
export default authModule;