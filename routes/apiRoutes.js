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

        });



        app.post("/newcomment", function (req, res) {
            var text = req.body.text;
            var id = req.body.id;
            console.log(req.body)
            db.comments.create(req.body.text).then(function (comment) {
                console.log("efsfsfsefsfsefsfsesf   " + comment)
                return db.article.findByIdAndUpdate({ id }, { $push: { comments: text } }, { new: true })
            }).then(function (results) {
                console.log("WAFWAFFFFFF        " + results)
                // If the Library was updated successfully, send it back to the client
                res.alert("comment added")

            })
                .catch(function (err) {
                    // If an error occurs, send it back to the client
                    res.json(err);
                });

        })

        app.get("/allcomments/:id", function (req, res) {
            console.log("EGHEESGSEG       " + req.params)
            // Using our Library model, "find" every library in our db and populate them with any associated books
            db.article.find({ _id: req.params.id })
                // Specify that we want to populate the retrieved libraries with any associated books
                .populate("comments")
                .then(function (data) {
                    // If any Libraries are found, send them to the client with any associated Books
                    res.send(data);
                })
                .catch(function (err) {
                    // If an error occurs, send it back to the client
                    res.json(err);
                });
        });


    }