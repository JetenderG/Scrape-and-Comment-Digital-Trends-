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
    allComment: function (id) {
        return $.ajax({
            url: "/allcomments/" + id,
            type: "GET"
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

    API.saveArticle(id).then(function (data) {
        console.log(data)
    })
}

var allC = function () {
    var text = $(this).parent().data().id;
    console.log(text)
    API.allComment(text).then(function (response) {
        console.log(response[0].comments[0].comments);
        //var results= $("<p></p>").text(response.comments);
        console.log(response[0].comments.length)
        for (var i = 0; i < response[0].comments.length; i++) {

            $("body").append(response[0].comments[i].comments);
            var commentSection = $(".commSection");
            commentSection.empty();
            var text = $("<p></p>").addClass("commentTextS").text(response[0].comments[i].comments);
            var row = $("<div></div>").addClass(".row")

            row.append(text);
            commentSection.append(row)

        }


    })
}



$(".saveS").on("click", save)

$("#scrape").on("click", scrap)
$("#populate").on("click", allC)
//$("#add").on("click", addComment)