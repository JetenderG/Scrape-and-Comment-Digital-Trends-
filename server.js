var express = require("express");
var ehbs = require('express-handlebars');
var mongoose = require("mongoose");

var app = express();

//var db = require("./models/index");
var port = process.env.PORT || 3000;

var mongdb_uri = process.env.mongdb_uri || "mongodb://localhost/mongoHeadlines";

mongoose.connect(mongdb_uri)

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));
//app.set('views', path.join(__dirname, 'views/'));


app.engine(
    "handlebars",
    ehbs({
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



var syncOptions = {
    force: false,
    // logging: console.log
};
app.listen(port, function () {
    console.log("App runnning on port " + PORT);
})