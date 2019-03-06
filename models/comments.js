var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comments: {
        type: String,
    }
})



var Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;