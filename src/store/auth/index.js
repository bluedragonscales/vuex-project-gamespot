// AUTHENTICATION MODULE INDEX

// This is the authentication module for all the functions needed for the application's authentication.
const authModule = {
    namespaced: true,
    state() {
        return {
            user: '',
            auth: false
        }
    }
};


// Exporting the auth module so the store's index file can import it.
export default authModule;