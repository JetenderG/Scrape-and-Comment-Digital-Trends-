var express = require("express");
var ehbs = require('express-handlebars');
var mongoose = require("mongoose");
var axios = require("axios");
var path = require("path");
var cheerio = require("cheerio")
var db = require("../models/index")



module.exports =
    function (app) {
        app.get("/scrap", function (req, res) {
            console.log("hi")
            axios.get("https://www.digitaltrends.com").then(function (response) {
                var $ = cheerio.load(response.data);
                // console.log(cheerio)
                $("div.m-river--item ").each(function (i, element) {
                    newArticle = {};
                    newArticle.title = $(element).find($(".m-river--title")).text()
                    newArticle.summary = $(element).find($(".m-river--content")).text()
                    newArticle.link = $(element).find($(".m-river--thumb")).children().attr("href");
                    console.log(newArticle)
                    db.article.create(
                        newArticle
                    ).then(function (added) {
                        console.log(added)

                    })
                        .catch(function (err) {
                            console.log(err);
                        })
                });
            });










        })


    }