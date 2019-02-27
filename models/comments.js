var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comments: {
        type: String,
        unique: true,
        sparse: true

    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles"
    }
})


var comments = mongoose.model("Comments", commentsSchema);
module.exports = comments;