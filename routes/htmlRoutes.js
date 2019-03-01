var db = require("../models/index")
var handlebars = require("handlebars");
module.exports =
    function (app) {
        app.get("/", function (req, res) {
            db.article.find({})
                .then(function (allarticles) {
                    res.render("index", {

                        allarticles: allarticles
                    })
                }).catch(function (err) {

                    console.log(err);
                })
        });

        app.get("/comment", function (req, res) {

            db.article.find({ "_id": { $in: artSaved } }).then(function (savedarticles) {
                console.log(savedarticles)
                res.render("commentA", {
                    savedarticles: savedarticles
                })
            }).catch(function (err) {
                // res.render("commentA")

                console.log(err);


            })

        });

        var artSaved = [];
        app.use("/saveA/:id", function (req, res) {
            console.log("nice")
            var id = req.params.id
            artSaved.push(id)
            console.log(artSaved)
        });


    };