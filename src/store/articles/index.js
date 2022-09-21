// ARTICLES MODULE INDEX
/* eslint-disable */
import {msgError, msgSuccess} from '@/tools/vuex.js';
import {db} from '@/firebase.js';
import router from '@/routes.js';
import {doc, setDoc, collection, serverTimestamp, query, limit, orderBy, startAfter, getDocs} from 'firebase/firestore';



// Start an object that will be a collection of articles and use the collection library from firebase to show that we want to put this collection on the "db" database. The new collection on the database will be called "articles" now. 
let artCollection = collection(db, 'articles');


// This is the articles module for all the functions needed for the application's articles.
const articlesModule = {
    namespaced: true,
    state() {
        return {
            adminArticles: '',
            adminLastVisible: ''
        }
    },
    getters: {
        getAdminArticles(state) {
            return state.adminArticles;
        },
        getAdminLastVisible(state) {
            return state.adminLastVisible;
        }
    },
    mutations: {
        setAdminArticles(state, articlesPayload) {
            state.adminArticles = articlesPayload;
        },
        setAdminLastVisible(state, payload) {
            state.adminLastVisible = payload;
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
        },
        async requestAdminArticles({commit}, payload) {
            // Here we are retrieving the articles so the admin can view all of the articles.
            try {
                // First we create the query. Through the query method of the firebase library, we first tell firestore that we want to go to the collection called articles through the already created query "artCollection". The second parameter is telling the response how to order the received articles: by timestamp, latest posts first. The third param is putting a limit on how many articles are retrieved at a time.
                const articleQuery = query(artCollection, orderBy('timestamp', 'desc'), limit(payload.limit));

                // Now we make the request to the database with the "getDocs" method from the firestore library.
                const querySnapshot = await getDocs(articleQuery);

                // We store the last place article so we can mark where to start off on the next three articles retrieved. Retrieving the last doc in the array of docs received.
                const lastVisibleArticle = querySnapshot.docs[querySnapshot.docs.length - 1];

                // Now we map the articles that were retrieved from the database so that we get the relevant information.
                const dbArticles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Committing the placeholder for last visible article.
                commit('setAdminLastVisible', lastVisibleArticle);
                // Committing the limited retrieved articles to a state variable.
                commit('setAdminArticles', dbArticles);

                console.log(dbArticles);
                console.log(lastVisibleArticle);
            } catch(error) {
                msgError(commit);
                console.log(error);
            }
        }
    }
};


// Exporting the articles module so the store's index file can import it.
export default articlesModule;