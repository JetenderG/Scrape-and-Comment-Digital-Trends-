var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    summary: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    link: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }
    ]
})


var Articles = mongoose.model("Articles", articlesSchema);
module.exports = Articles;