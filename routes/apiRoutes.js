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
                    newArticle.title = $(element).find($(".m-river--title")).text().replace(/(\r\n|\n|\t|\n\t\t\t)/gm," ").trim();
                    newArticle.summary = $(element).find($(".m-river--content")).text().replace(/(\r\n|\n|\t|\n\t\t\t)/gm," ").trim();
                    newArticle.link = $(element).find($(".m-river--thumb")).children().attr("href");
              //      console.log(newArticle)
                    db.Article.create(
                        newArticle
                    ).then(function (added) {
              //          console.log(added)

                    })
                        .catch(function (err) {
               //             console.log(err);
                        })
                });
            });

        });



        app.post("/newcomment", function (req, res) {
            var text = req.body.text;
            var id = req.body.id;
            console.log(req.body)
            var newcomment ={};
            var newcomment ={
                comments: req.body.comments
            }
            console.log("dddddddddddddddddddddd           "+JSON.stringify(newcomment))

            db.Comments.create(newcomment).then(function (comment) {
                console.log("efsfsfsefsfsefsfsesf   " + comment)
                console.log("id        "+ id);
                return db.Article.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { new: true });
            }).then(function (results) {
                console.log("WAFWAFFFFFF        " + results)
                // If the Library was updated successfully, send it back to the client
                res.alert("comment added")

            }).catch(function (err) {
                    // If an error occurs, send it back to the client
                    res.send(err);
                    console.log("Wrong")
                });

        })

        app.get("/allcomments/:title", function (req, res) {
          //  console.log("EGHEESGSEG       " + req.params.title)
            db.Article.find({ "title": req.params.title })
                // Specify that we want to populate the retrieved libraries with any associated books
                .populate("comments")
                .then(function (data) {
          //  console.log(data);
                    res.send(data);
            
               //   console.log("FSEFSFSFSFEFSSFESF"+data)  // If any Libraries are found, send them to the client with any associated Books
                })
                .catch(function (err) {
                    // If an error occurs, send it back to the client
                    res.json(err);
                });
        });

        app.delete("/deletecomment")


    }