// ROUTES FILE
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import Home from './components/Home/CompHome.vue';
import Article from './components/Articles/CompArticle.vue';
import SignIn from './components/User/SignIn.vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import store from './store';
import Dashboard from './components/User/Dashboard/CompIndex.vue';
import MainDash from './components/User/Dashboard/MainDashboard.vue';
import UserProfile from './components/User/Dashboard/userpages/UserProfile.vue';
import AddArticles from './components/User/Dashboard/adminpages/AddArticles.vue';
import ViewArticles from './components/User/Dashboard/adminpages/ViewArticles.vue';
import NotFound from './components/CompError.vue';


// These are the vue routes to navigate between the different pages/paths of our application.
const routes = createRouter({
    history: createWebHistory(),
    // This is the list of paths for our application.
    routes: [
        // This is the main default path. We've given it a name so we don't have to keep using '/'.
        {path: '/', component: Home, name: 'home'},
        // This path has a dynamic variable "id".
        {path: '/article/:id', component: Article, name: 'article'},
        // The meta information on this route means the application has to check if the user is signed in or not to access this route.
        {path: '/signin', component: SignIn, name: 'signin', meta: {signin: true}},
        // This path has multiple children so that the children paths can only be accessed from the main path for the dashboard, which can only be accessed when logged in. The meta information states that the application has to check if the user is already authenticated before entering this route.
        {path: '/user/dashboard', component: Dashboard, meta: {auth: true}, children: [
            {path: '', component: MainDash, name: 'dashboard'},
            {path: 'profile', component: UserProfile, name: 'user_profile'},
            {path: 'articles', component: ViewArticles, name: 'admin_articles'},
            {path: 'articles/add', component: AddArticles, name: 'add_articles'}
        ]},
        // This path catches any articles that don't exist and shows a "not found" page.
        {path: '/notFound(.*)*', component: NotFound, name: '404'}
    ]
});


// Created an instance of the "getAuth" library from firebase.
const routeAuth = getAuth();

// The route guards to guard against using the web domain as a way of getting past authentication.
const validateCheck = (to, from, next) => {
    if(to.meta.auth && !store.getters['auth/getAuthValue']) {
        // If the route meta information states that the user has to be authenticated, but the getter value states that the user is NOT authenticated then they will be pushed to the signin route.
        next('/signin');
    } else if(to.meta.signin && store.getters['auth/getAuthValue']) {
        // If the route meta info states that the user is indicated to be signed in, and the auth value getter states: it's true this user is authenticated/signed in, then the application will avoid the sign in page and push the user to the dashboard instead.
        next('/user/dashboard');
    } else {
        // If all the routes are clear of guards then the user will continue to the route they originally requested.
        next();
    }

    // Because the application is finished loading and finished going through the route guard checks, we set the loader component to false so that the user can use the application.
    store.commit('notify/setLoaderValue', false);
}


// This block of code runs before each path is populated.
routes.beforeEach((to, from, next) => {
    // If this is the first time the application loads - when the path you're coming from is the start location, the very first time something related to the app loads - the "onAuthStateChanged" firebase method will grab the user that populates with the "routeAuth" instance.
    if(from === START_LOCATION) {
        // From the start location, this "onAuthStateChanged" listener will run one check only instead of running every time the application path changes. If it is not the first time the application loads then it will run to the else statement containing the "next()" action.
        const unsubscribe = onAuthStateChanged(routeAuth, user => {
            if(user) {
                // If a user populates because there is a user already authenticated we are going to the store's auth module to use the "autoSignIn" action, filling in the user data populated by the "onAuthStateChanged" listener to fill in the payload. We can use the "then" block because "dispatch" is an async method.
                store.dispatch('auth/autoSignIn', user).then(() => {
                    validateCheck(to, from, next);
                });
            } else {
                // If there is no authenticated user at first loading.
                console.log(user, "We cannot auto sign in with no user.");
                validateCheck(to, from, next);
            }
        });
        
        // It was created above, and now it is called upon to run once with this method call here.
        unsubscribe();
    } else {
        // This will run for all the paths of the application when it is has not just loaded for the first time.
        console.log("Otherwise.")
        validateCheck(to, from, next);
    }
});



// Exporting the routes object to inject it into our application through the main.js file.
export default routes;