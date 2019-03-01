var API = {

    scraps: function () {
        return $.ajax({
            url: "/scrap",
            type: "GET"
        })
    },

    edit: function () {
        return $.ajax({
            url: "/commentA/",
            type: "POST"
        })
    },
    saveArticle: function (id) {
        return $.ajax({
            url: "/saveA/" + id,
            type: "POST"
        })
    },
    allComment: function (comment) {
        return $.ajax({
            url: "/allcomments/" + comment,
            type: "POST"
        })
    }
};

var scrap = function () {
    console.log("hi")
    API.scraps().then(function (result) {
        alert("Articles have been " + results)
    })
}

var save = function () {

    var idpre = $(this).parent().data();

    var id = idpre.id;
    console.log(id)
    // name = name.replace(/\s*,\s*/g, ",");
    //console.log($(this).parent().children("href").text());
    //console.log($(this).parent().data())
    //  console.log(name)
    API.saveArticle(id).then(function (data) {
        console.log(data)
    })
}

var allC = function () {

    var idpre = $(this).parent().text();


    var text = $(this).parent().data().id;
    console.log(text)
    API.allComment(text).then(function (response) {
        console.log(response)
    })
}



$(".saveS").on("click", save)

$("#scrape").on("click", scrap)
$("#populate").on("click", allC)
//$("#add").on("click", addComment)