// ROUTES FILE
/*eslint-disable*/
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";

// These are the vue routes to navigate between the different pages/paths of our application.
const routes = createRouter({
    history: createWebHistory(),
    // This is the list of paths for our application.
    routes: []
});


// Exporting the routes object to inject it into our application through the main.js file.
export default routes;