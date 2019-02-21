var express = require("express");
var ehbs = require('express-handlebars');
var mongoose = require("mongoose");
var cherio = require("cheerio");
var axios = require("axios");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;

var mongdb_uri = process.env.mongdb_uri || "mongodb://localhost/mongoHeadlines";

mongoose.connect(mongdb_uri);

app.use(express.static("public"));

var databaseUrl = "articles";
var collections = ["componets"];




app.set("view engine", "ehbs");
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views/'));


app.engine(
    "handlebars",
    ehbs({
        defaultLayout: "main",
        partialsDir: path.join(__dirname, "views/partials/")
    })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

axios.get("https://www.digitaltrends.com").then(function (response) {

    var $ = cherio.load(response.data);

    var results = [];

    $("div.m-river--item ").each(function (i, element) {

        // var img = $(element).find("img");
        //var text = $(element).find("m-river--content").text();
        //var link = $(element).find("m-river--thumb").attr("href");

        // console.log(title)
        // Save these results in an object that we'll push into the results array we defined earlier

    });





})



var syncOptions = {
    force: false,
    // logging: console.log
};
db.on("error", function (error) {

    console.log("Database Error:", error);
});


app.listen(3000, function () {
    console.log("App runnning on port 3000");
})