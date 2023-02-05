const mongoose = require('mongoose');
let postSchema  = mongoose.Schema({
    Question: {
        type: String,
        required: true
    },
    Question_heading  :{
        type: String,
        required: true
    },
    Question_type:{
        type: String,
        required: true
    }
});

let Post = module.exports = mongoose.model('Post' ,postSchema);