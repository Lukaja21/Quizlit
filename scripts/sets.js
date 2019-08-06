

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
$(document).ready(function() {
  if(window.location.href.indexOf("sets") > -1) {
       $.ajax({
          method: 'GET',
          url: 'https://lukaja21.github.io/Quizlit/data/data.json',
          dataType: 'text',
          success: myjson => {
            if (window.location.href.indexOf("chinese") > -1) {
              subject = "chinese"
            } else if (window.location.href.indexOf("chinese") > -1) {
              subject = "science"
            }  else if (window.location.href.indexOf("chinese") > -1) {
              subject = "math"
            }
            for set in myjson:
              if set[0] = ""
      }
    })
  }
})
