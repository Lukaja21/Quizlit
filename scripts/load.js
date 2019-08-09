const _MS_PER_DAY = 1000 * 60 * 60 * 24;
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
      var date_diff_indays = function(date1, date2) {
        dt1 = new Date(date1);
        dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      }
      myjson = JSON.parse(myjson);
      testDate = new Date(myjson[setName][4])
      console.log(myjson)
      currentDate = new Date()
      currentMonth = currentDate.getMonth() + 1
      currentDate = currentMonth.toString() + "/" + currentDate.getUTCDate().toString() + "/" + currentDate.getFullYear().toString()
      if (date_diff_indays(currentDate, testDate) > 0) {
        $(".sidebar").append(`<div class="bottom-info">
                                <p>
                                  Time until test: ${date_diff_indays(currentDate, testDate)}
                                </p>
                              </div>`)
      } else if (date_diff_indays(currentDate, testDate)  == 0) {
        $(".sidebar").append(`<div class="bottom-info">
                                <p>
                                  Time until test: It's Today!
                                </p>
                              </div>`)
      } else if (date_diff_indays(currentDate, testDate) < 0) {
        $(".sidebar").append(`<div class="bottom-info">
                                <p>
                                  Time until test: Done!
                                </p>
                              </div>`)
      }
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
//Loads Front Page
$(document).ready(function() {
  $.ajax({
      method: 'GET',
       url: 'https://quizlit.me/data/data.json',
      dataType: 'text',
      success: myjson => {
        myjson = JSON.parse(myjson);
    for (let [key, value] of Object.entries(myjson)) {
      if (myjson[key][0] == "chinese") {
        var thumbnail = "https://asiasociety.org/sites/default/files/styles/1200w/public/C/calligraphy.jpg?itok=aSTzLe_m"
      } else if (myjson[key][0] == "science") {
        var thumbnail = "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/20160627-Grand-Challenges-of-Science-31qtkdbz2aajgveb3em2gw.jpg"
      } else if (myjson[key][0] == "math") {
        var thumbnail = "https://hechingerreport.org/wp-content/uploads/2019/04/pay-937884_1920-800x0-c-default.jpg"
      } else if (myjson[key][0] == "humanities") {
        var thumbnail = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/WL_HumanitiesH.jpg?itok=cGUmbZA0"
      }
      $(".row").append(`
      <div class='col-lg-4 col-sm-6 mb-4'>
        <div class='card h-100'>
          <a href='sets/${myjson[key][0]}/${key.replace(/\s+/g, '').toLowerCase()}.html'><img class='card-img-top' src='${thumbnail}'></a>
          <div class='card-body'>
            <h4 class='card-title'><a href='sets/${myjson[key][0]}/${key.replace(/\s+/g, '').toLowerCase()}.html'>${key}</a></h4>
            <p class='card-text'>${myjson[key][2]}</p>
          </div>
        </div>
      </div>`)
    }
        if (Object.keys(myjson).length <= 6){
          var blanks = 6 - Object.keys(myjson).length
          for (i = 0; i < blanks; i++) {
            $(".row").append("<div class='col-lg-4 col-sm-6 mb-4'><div class='card h-100'><a href='#'><img class='card-img-top' src='https://placehold.it/700x400' alt=''></a><div class='card-body'><h4 class='card-title'><a href='#'>Project Five</a></h4><p class='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p></div></div></div>")
          }
        }
      }
  });
});