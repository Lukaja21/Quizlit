var y;
//Populates sets for the sets pages
$(document).ready(function() {
  var SetContainerNumber = $('.set-container').length;
  if (SetContainerNumber > 10) {
    $(".set-container").slice(10).hide()
    pages = Math.ceil(SetContainerNumber / 10) + 1
    for (i = 2; i < pages; i++) { 
      $(".pagination").append("<li class='page-item'><a class='page-link' onclick='nextpage(" + i.toString() + ");'>" + i.toString() + "</a></li>")
    }
    maxpage = $('.page-item').length;
  } else {
    $(".subject-nav").hide()
    if (SetContainerNumber == 0) {
      $(".subject-container").append("<h1 class='no-sets-warning'>Oops! Looks like there are no study sets for this subject yet.</h1>")
    }
  }
});
//Populates all of the sets for the seacrh bar
$(document).ready(function() {
  var myjson = (function() {
    var myjson = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "https://lukaja21.github.io/Quizlit/data/data.json",
      'dataType': "json",
      'success': function (data) {
          myjson = data;
      }
    });
  return myjson;
})();
    for (var i in myjson) {
      y = i.replace(/\s+/g, '').replace("part", "")
      $(".set-search").append("<li><a style='width: auto;margin: auto' href='https://lukaja21.github.io/Quizlit/sets/" + myjson[i][0] + "/" + y.toLowerCase() + ".html'>" + i + "</a></li>")
      $(".set-search").append("<div class='dropdown-divider'></div>")
  }
})

function GetSetCards(SetName) {
  var myjson = (function() {
    var myjson = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "https://lukaja21.github.io/Quizlit/data/data.json",
      'dataType': "json",
      'success': function (data) {
          myjson = data;
      }
    });
  return myjson;
})();
  return myjson[SetName][1]
}

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".dropdown-menu li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});