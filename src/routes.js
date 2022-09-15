// ROUTES FILE
/*eslint-disable*/
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import Home from './components/Home/CompHome.vue';
import Article from './components/Articles/CompArticle.vue';
import SignIn from './components/User/SignIn.vue';

// These are the vue routes to navigate between the different pages/paths of our application.
const routes = createRouter({
    history: createWebHistory(),
    // This is the list of paths for our application.
    routes: [
        // This is the main default path. We've given it a name so we don't have to keep using '/'.
        {path: '/', component: Home, name: 'home'},
        // This path has a dynamic variable "id".
        {path: '/article/:id', component: Article, name: 'article'},
        {path: '/signin', component: SignIn, name: 'signin'}
    ]
});


// Exporting the routes object to inject it into our application through the main.js file.
export default routes;