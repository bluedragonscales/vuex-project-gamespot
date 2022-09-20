// ARTICLES MODULE INDEX
/* eslint-disable */
import {msgError, msgSuccess} from '@/tools/vuex.js';
import {db} from '@/firebase.js';
import router from '@/routes.js';
import {doc, setDoc, collection, serverTimestamp} from 'firebase/firestore';



// Start an object that will be a collection of articles and use the collection library from firebase to show that we want to put this collection on the "db" database. The new collection on the database will be called "articles" now. 
let artCollection = collection(db, 'articles');


// This is the articles module for all the functions needed for the application's articles.
const articlesModule = {
    namespaced: true,
    state() {
        return {

        }
    },
    actions: {
        async addArticle({commit, rootGetters}, payload) {
            try {
                // Retrieving the user data from the auth module.
                const user = rootGetters['auth/getUserData'];
                // Creating a new document for each article in the new collection created above.
                const newArticle = doc(artCollection);
                // This is the actual request to set a new document in the database. Putting the document inside the articles collection we've created. Inside the database, in the collection, we put all the information in the payload as an object, the timestamp/created at from the serverTimeStamp library, and the owner info.
                await setDoc(newArticle, {
                    timestamp: serverTimestamp(),
                    owner: {
                        uid: user.uid,
                        firstname: user.firstname,
                        lastname: user.lastname
                    },
                    ...payload
                });

                // Show the success toast when the article is sent to the database successfully.
                msgSuccess(commit, 'Congrats! Article saved!');

                // The admin user gets pushed to the place where all of the articles are held so they can see the new one posted there.
                router.push({name: 'admin_articles'});
            } catch(error) {
                msgError(commit);
                console.log(error);
            }
        }
    }
};


// Exporting the articles module so the store's index file can import it.
export default articlesModule;