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