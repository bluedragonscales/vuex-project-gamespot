import { createStore } from "vuex";
import NotificationsMod from "./notifications";
import AuthMod from './auth';
import ArticlesMod from './articles';

// The store that rounds up all the different vuex modules into one place.
const store = createStore({
    modules: {
        notify: NotificationsMod,
        auth: AuthMod,
        articles: ArticlesMod
    }
});

// Exporting the store so that the "main.js" file can use it in the application.
export default store;