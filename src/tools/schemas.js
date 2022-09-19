import * as yup from 'yup';


const addArticleSchema = {
    game: yup.string(),
    title: yup.string(),
    excerpt: yup.string(),
    editor: yup.string(),
    ratiing: yup.string(),
    img: yup.string()
};



export {
    addArticleSchema
};