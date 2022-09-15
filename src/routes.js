// ROUTES FILE
/*eslint-disable*/
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import Home from './components/Home/CompHome.vue';

// These are the vue routes to navigate between the different pages/paths of our application.
const routes = createRouter({
    history: createWebHistory(),
    // This is the list of paths for our application.
    routes: [
        // This is the main default path. We've given it a name so we don't have to keep using '/'.
        {path: '/', component: Home, name: 'home'}
    ]
});


// Exporting the routes object to inject it into our application through the main.js file.
export default routes;