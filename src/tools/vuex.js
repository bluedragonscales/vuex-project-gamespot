// MISC TOOLS

// This arrow function handles all the logic for the error messages and commits it to the mutation for setting the toast message.
const msgError = (commit, msg = 'Oops! Try again!') => {
    // The return value is the commit to the mutation and the payload which is the message param "msg". If the "msg" param is not set, then the default message will remain "Thank you!". Both "msg" and "type" need to be there because those values were set in the original state in the notification module.
    return commit('notify/setToastMsg', {
        msg: msg,
        type: 'error'
        // Defined an additional object inside the commit so that this function can find the notify module by going back to the root.
    }, {root: true});
};


// This is a similar function, but it handles the success messages.
const msgSuccess = (commit, msg = 'Thank you!') => {
    return commit('notify/setToastMsg', {
        msg: msg,
        type: 'success'
    }, {root: true});
};


export {
    msgError,
    msgSuccess
};