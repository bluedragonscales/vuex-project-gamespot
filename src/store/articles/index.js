// ARTICLES MODULE INDEX
/* eslint-disable */
import {msgError, msgSuccess} from '@/tools/vuex.js';
import {db} from '@/firebase.js';
import router from '@/routes.js';
import {doc, setDoc, collection, serverTimestamp, query, limit, orderBy, startAfter, getDocs, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';



// Start an object that will be a collection of articles and use the collection library from firebase to show that we want to put this collection on the "db" database. The new collection on the database will be called "articles" now. 
let artCollection = collection(db, 'articles');


// This is the articles module for all the functions needed for the application's articles.
const articlesModule = {
    namespaced: true,
    state() {
        return {
            adminArticles: '',
            adminLastVisible: '',
            mainHomeArticles: ''
        }
    },
    getters: {
        getAdminArticles(state) {
            return state.adminArticles;
        },
        getAdminLastVisible(state) {
            return state.adminLastVisible;
        },
        getHomeArticles(state) {
            return state.mainHomeArticles;
        }
    },
    mutations: {
        setAdminArticles(state, articlesPayload) {
            state.adminArticles = articlesPayload;
        },
        setAdminLastVisible(state, payload) {
            state.adminLastVisible = payload;
        },
        setHomeArticles(state, payload) {
            state.mainHomeArticles = payload;
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

                // The admin user gets pushed to the place where all of the articles are held so they can see the new one posted there. The params creates a "soft" reload of the database information that shows on the front-end.
                router.push({name: 'admin_articles', params: {reload: true}});
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

                // Committing the limited retrieved articles to a state variable.
                commit('setAdminArticles', dbArticles);

                // Committing the placeholder for last visible article.
                commit('setAdminLastVisible', lastVisibleArticle);

            } catch(error) {
                msgError(commit);
                console.log(error);
            }
        },
        async loadMoreAdminArticles({commit, getters}, payload) {
            try {
                // If there is a visible article, get all the articles that are visible and store them in the "oldArticles" variable.
                if(getters.getAdminLastVisible) {
                    let oldArticles = getters.getAdminArticles;

                    // Start a new query object for more articles that aren't already in the old articles object by starting after the last visible article and limiting the new articles by three.
                    const newArticlesQuery = query(
                        artCollection,
                        orderBy('timestamp', 'desc'),
                        startAfter(getters.getAdminLastVisible),
                        limit(payload.limit)
                    );

                    // Make the new query for more articles to the database.
                    const newQuerySnapshot = await getDocs(newArticlesQuery);

                    // Get the new last visible article (because there are more now).
                    const lastVisibleArticle = newQuerySnapshot.docs[newQuerySnapshot.docs.length - 1];

                    // Store the new articles into this object and convert them to readable by mapping them.
                    const newArticles = newQuerySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    // Add the new articles to the old articles.
                    commit('setAdminArticles', [
                        ...oldArticles,
                        ...newArticles
                    ]);

                    // Committing the placeholder for new last visible article.
                    commit('setAdminLastVisible', lastVisibleArticle);

                }
            } catch(error) {
                console.log(error);
                msgError(commit);
            }
        },
        async removeById({commit, state}, payload) {
            try {
                // Using the "deleteDoc" from the firebase library. The argument passed in is firebase's "doc" method to get the document, specifying it's from the database, in the collection called "articles", and receiving the payload that will be the id.
                await deleteDoc(doc(db, 'articles', payload));

                // Instead of creating another request to the database, we're removing the id of the deleted article from the saved list that shows on the front-end via ES6's filter function.
                const newArticleList = state.adminArticles.filter(x => {
                    // Accessing the list of articles in the state variable "adminArticles" and once the function arrives at the deleted id, it will leave it out of the list.
                    return x.id != payload;
                });

                // Committing the new list of articles and showing a success message.
                commit('setAdminArticles', newArticleList);
                msgSuccess(commit, "Article successfully deleted.");

            } catch(error) {
                msgError(commit, error);
            }
        },
        async mainGetArticles({commit}, payload) {
            try {
                // Creating the query parameters.
                const homeQuery = query(artCollection, orderBy('timestamp', 'desc'), limit(payload.limit));

                // Make the query request.
                const homeQuerySnapshot = await getDocs(homeQuery);

                // Map the response to the correct information needed for the front-end.
                const homeArticles = homeQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Commit these main home articles to the state variable "mainHomeArticles" with a mutation.
                commit('setHomeArticles', homeArticles);

            } catch(error) {
                msgError(commit, error);
            }
        },
        async requestArticle({commit}, payload) {
            try {
                // To get a single article, we format the query to get a single doc from the "articles" collection. The payload will be the article id.
                const singleDoc = await getDoc(doc(db, 'articles', payload));

                // If the document requested from the database exists, then return the document data. If not, then return null.
                if(singleDoc.exists()) {
                    return singleDoc.data();
                } else {
                    return null;
                }
            } catch(error) {
                msgError(commit);
            }
        },
        async updateArticle({commit}, payload) {
            try {
                const articleRef = doc(db, 'articles', payload.id);

                await updateDoc(articleRef, {
                    ...payload.values
                });

                msgSuccess(commit, 'Article updated successfully.');
                
            } catch(error) {
                msgError(commit, error);
            }
        }
    }
};


// Exporting the articles module so the store's index file can import it.
export default articlesModule;