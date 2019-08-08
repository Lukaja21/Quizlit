//Populates all of the sets for the seacrh bar
$(document).ready(function() {
  var myjson = (function() {
    var myjson = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "https://quizlit.me/data/data.json",
      'dataType': "json",
      'success': function (data) {
          myjson = data;
      }
    });
  return myjson;
  })();
  for (var i in myjson) {
    y = i.replace(/\s+/g, '')
    $(".set-search").append("<li><a style='width: auto;margin: auto' href='https://quizlit.me/sets/" + myjson[i][0] + "/" + y.toLowerCase() + ".html'>" + i + "</a></li>")
    $(".set-search").append("<div class='dropdown-divider'></div>")
  }
});
//Populates subject pages
$(document).ready(function() {
  if(window.location.href.indexOf("subjects") > -1) {
       $.ajax({
          method: 'GET',
          url: 'https://quizlit.me/data/data.json',
          dataType: 'text',
          success: myjson => {
            myjson = JSON.parse(myjson);
            if (window.location.href.indexOf("chinese") > -1) {
              var subject = "chinese"
              var thumbnail = "https://asiasociety.org/sites/default/files/styles/1200w/public/C/calligraphy.jpg?itok=aSTzLe_m"
            } else if (window.location.href.indexOf("math") > -1) {
              var subject = "math"
              var thumbnail = "https://hechingerreport.org/wp-content/uploads/2019/04/pay-937884_1920-800x0-c-default.jpg"
            } else if (window.location.href.indexOf("science") > -1) {
              var subject = "science"
              var thumbnail = "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/20160627-Grand-Challenges-of-Science-31qtkdbz2aajgveb3em2gw.jpg"
            } else if (window.location.href.indexOf("humanities") > -1) {
              var subject = "humanities"
              var thumbnail = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/WL_HumanitiesH.jpg?itok=cGUmbZA0"
            } else if (window.location.href.indexOf("other") > -1) {
              var subject = "other"
            } else if (window.location.href.indexOf("all") > -1) {
              var subject = "all"
            }
            for (let [key, value] of Object.entries(myjson)) {
              if (value[0] == subject) {
                $(".subject-container").append(`<a href="../sets/${subject}/${key.replace(/\s+/g, '').toLowerCase()}.html">
                  <div class="set-container">
                    <p class="set-container-text">
                      <img class="set-thumbnail" src="${thumbnail}">
                      <span class="text-divider"></span>
                    ${key}</p>
                  </div>
                </a>`)
              }
            }
            if (subject === "all") {
              for (let [key, value] of Object.entries(myjson)) {
                if (value[0] == "chinese") {
                  var subject = "chinese"
                  var thumbnail = "https://asiasociety.org/sites/default/files/styles/1200w/public/C/calligraphy.jpg?itok=aSTzLe_m"
                } else if (value[0] == "math") {
                  var subject = "math"
                  var thumbnail = "https://hechingerreport.org/wp-content/uploads/2019/04/pay-937884_1920-800x0-c-default.jpg"
                } else if (value[0] == "science") {
                  var subject = "science"
                  var thumbnail = "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/20160627-Grand-Challenges-of-Science-31qtkdbz2aajgveb3em2gw.jpg"
                } else if (value[0] == "humanities") {
                  var subject = "humanities"
                  var thumbnail = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/WL_HumanitiesH.jpg?itok=cGUmbZA0"
                } else if (value[0] == "other") {
                  var subject = "other"
                  var thumbnail = "http://www.accurateglobalreach.com/wp-content/uploads/2019/07/systemic-evaluation.jpg"
                }
                $(".subject-container").append(`<a href="../sets/${subject}/${key.replace(/\s+/g, '').toLowerCase()}.html">
                  <div class="set-container">
                    <p class="set-container-text">
                      <img class="set-thumbnail" src="${thumbnail}">
                      <span class="text-divider"></span>
                    ${key}</p>
                  </div>
                </a>`)
              }
            }
      }
    })
  }
})
//Search Bar Code
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".dropdown-menu li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
//Populates Flashcard pages
function GetSetCards(setName, cb){
  $.ajax({
    method: 'GET',
    url: 'https://quizlit.me/data/data.json',
    dataType: 'text',
    success: myjson => {
      myjson = JSON.parse(myjson);
      $(".sidebar").append(`<p>${myjson[setName][2]}</p>`)
      $(".important-texts").append(`<p>${myjson[setName][3][0]}</p>
                                    <button onclick="ExpandBlock('one')" class="btn btn-block btn-primary text-uppercase block-one-button">Expand</button>`)
      for (var i in myjson[setName][1]) {
        $(".vocab-words").append(`<li><span class="fa-li"><i class="fas fa-circle"></i></span>${myjson[setName][1][i][0]} - ${myjson[setName][1][i][1]}</li>`)
      }
      for (var i in myjson[setName][3][1]) {
        $(".tips").append(`<li><span class="fa-li"><i class="fas fa-circle"></i></span>${myjson[setName][3][1][i]}</li>`)
      }
      $(".pricing").hide()
      cb(myjson[setName][1]);
    }
  })
}