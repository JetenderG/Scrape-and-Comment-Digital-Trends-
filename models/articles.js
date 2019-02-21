var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articlesSchema = new Schema({

    title: {
        type: String,
        required: true


    },
    summary: {
        type: String,

    },
    link: {
        type: String,

    },
    comments: {
        type: String,


    }
})

b

module.exports = articles