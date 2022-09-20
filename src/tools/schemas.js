import * as yup from 'yup';


const addArticleSchema = {
    game: yup.string()
        .required("The name of the game is required."),
    title: yup.string()
        .required("The title of the article is required.")
        .min(10, "Make the title bigger.")
        .max(70, "Now the title is too long."),
    excerpt: yup.string()
        .required("The excerpt of the game is required.")
        .min(100, "Make the excerpt bigger.")
        .max(350, "The excerpt is too long."),
    editor: yup.string()
        .required("Content for the article is required.")
        .min(100, "Please make the article longer.")
        .max(1500, "The content is too long."),
    rating: yup.string()
        .required("A rating for the game is required.")
        .notOneOf(['Select a rating'], "The rating should be a number."),
    img: yup.string()
        .url("Is this a valid url?")
        .required("An image is required.")
};



export {
    addArticleSchema
};