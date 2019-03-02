var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comments: {
        type: String,
        unique: true,
        sparse: true

    }
})


var Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;