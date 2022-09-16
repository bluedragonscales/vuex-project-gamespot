// NOTIFICATIONS MODULE INDEX

// This is the notifications module for all the functions needed for the application's notifications.
const notificationsModule = {
    namespaced: true,
    state() {
        return {
            // For every toast there will be three parameters to pass: a boolean, the actual message, and the type of message (error, notification, etc).
            toastMsg: [false, '', 'error']
        }
    },
    getters: {
        getToastMsg(state) {
            // So we can get the toast from anywhere in the application.
            return state.toastMsg;
        }
    },
    mutations: {
        setToastMsg(state, payload) {
            // Every time this mutation is triggered, the toast will become true (active) and there will be a message and a type passed in.
            state.toastMsg = [true, payload.msg, payload.type];
        }
    }
};


// Exporting the notifications module so the store's index file can import it.
export default notificationsModule;