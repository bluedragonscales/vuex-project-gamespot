// FIREBASE ALERT CODES


// This arrow function uses a switch block to logic out what to do in each of the firebase error codes.
const fbErrors = (code) => {

    // The initial/default variable for the message.
    let msg = 'Sorry, try again.';

    // The switch block that takes in the firebase pre-made error code.
    switch(code) {
        // This case is firebases' "auth/user-not-found" code.
        case 'auth/user-not-found':
            // Making that user-not-found code into a better sentence.
            msg = 'Sorry, the email or password is incorrect.';
            break;
        // A different firebase code.
        case 'auth/email-already-in-use':
            msg = 'Sorry, this email is already in use.';
            break;
        // A different firebase code.
        case 'auth/wrong-password':
            msg = 'Sorry, the email or password is incorrect.';
            break;
        default:
            msg = code;
            break;
    }

    // Returning the message depending on the case it falls under.
    return msg;
};


// Exporting this function so that it can be used in parts of the application that needs error codes.
export default fbErrors;