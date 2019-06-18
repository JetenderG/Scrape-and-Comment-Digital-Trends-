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
    allComment: function (title) {
        return $.ajax({
            url: "/allcomments/" + title,
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

    var submitid = $(".idpopS");
    var text = $(this).closest('.articlerow').find('.titleS').text();
    var id = $(this).parent().data().id
    console.log("Data from div" + text + id)
    API.allComment(id).then(function (response) {
        //  console.log(response[0].comments[0].comments);
        //var results= $("<p></p>").text(response.comments);
        //  console.log("daaaaaaaaaaaaaaaaa        "+response[0].comments[0].comments)
        console.log("comments     :" + response)

        for (var i = 0; i < response[0].comments.length; i++) {
            console.log(response)
            $("body").append(response[0].comments[i].comments);
            var commentSection = $("." + id + "S");
            // commentSection.empty();
            commentSection.empty();
            var text = $("<p></p>").addClass("commentTextS").text(response[0].comments[i].comments);
            var row = $("<div></div>").addClass(".row")
            var col1 = $("<div></div>").addClass(".col");
            var col2 = $("<div></div>").addClass(".col ");
            var deletebtn = $("<button></button>").addClass("deletebtn");
            col2.append(deletebtn);
            row.append(col1, col2)
            col1.append(text);
            commentSection.append(row)

        }


    })
}



$(".saveS").on("click", save)

$("#scrape").on("click", scrap)
$(".populate").on("click", allC)
//$("#add").on("click", addComment)