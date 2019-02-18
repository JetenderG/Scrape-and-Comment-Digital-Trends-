var express  = require("express");
var  ehbs = require('express-handlebars');
var mongojs = require("mongojs");
var cherio = require("cheerio");
var axios = require("axios");

var app = express();


app.use(express.static(public));

var databaseUrl = "articles";
var collections = ["componets"];

app.set("view engine","ehbs");

var db = mongojs(databaseUrl,collections);


db.on("error", function (error){

    console.log("Database Error:", error);
});


app.listen(3000,function(){
    console.log("App runnning on port 3000");
})
