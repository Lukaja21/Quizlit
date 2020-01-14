const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}
//Populates all of the sets for the search bar----------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
  setTimeout(function(){
    var myjson = (function() {
      var myjson = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': "https://api.jsonbin.io/b/5d5b704d6c4cac3e3c27fb4a/latest",
        'dataType': "json",
        'success': function (data) {
            myjson = data;
        }
      });
      return myjson;
    })();
    for (var i in myjson) {
      y = i.replace(/\s+/g, '')
      $("#myDropdown").append("<a href='https://quizlit.me/sets/flashcard.html?name=" + titleCase(i) + "'>" + i + "</a>")
    }
  }, 500);
});
//Populates subject pages----------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
  if(window.location.href.indexOf("subjects") > -1) {
       $.ajax({
          method: 'GET',
          url: 'https://api.jsonbin.io/b/5d5b704d6c4cac3e3c27fb4a/latest',
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
                $(".subject-container").append(`<a href="../sets/flashcard.html?name=${titleCase(key)}">
                  <div class="set-container">
                    <p class="set-container-text">
                      <img class="set-thumbnail" src="${thumbnail}">
                      <span class="text-divider"></span>
                    ${key}</p>
                  </div>
                </a>`)
              }
            }
            if (subject == "all") {
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
                console.log(key)
                $(".subject-container").append(`<a href="../sets/flashcard.html?name=${titleCase(key)}">
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
//Populates Flashcard pages----------------------------------------------------------------------------------------------------------------------------------------------------------
function GetSetCards(setName, cb){
  $.ajax({
    method: 'GET',
    url: 'https://api.jsonbin.io/b/5d5b704d6c4cac3e3c27fb4a/latest',
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
        $(".vocab-words").append(`<li>
                                    <span class="fa-li">
                                      <i class="fas fa-circle"></i>
                                    </span>${myjson[setName][1][i][0]} - ${myjson[setName][1][i][1]}
                                  </li>`)
      }
      for (var i in myjson[setName][3][1]) {
        $(".tips").append(`<li>
                            <span class="fa-li">
                              <i class="fas fa-circle"></i>
                            </span>${myjson[setName][3][1][i]}
                          </li>`)
      }
      $("flashcard-text").text(myjson[setName][1][0][0])
      $(".pricing").hide()
      cb(myjson[setName][1]);
    }
  })
}
//Loads Front Page----------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
  if(window.location.pathname == "/" || window.location.pathname == "/index.html") {
    $.ajax({
        method: 'GET',
         url: 'https://api.jsonbin.io/b/5d5b704d6c4cac3e3c27fb4a/latest',
        dataType: 'text',
        success: myjson => {
          myjson = JSON.parse(myjson);
          console.log(myjson)
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
                <a href='sets/flashcard.html?name=` + titleCase(key) + `'><img class='card-img-top' src='${thumbnail}'></a>
                <div class='card-body'>
                  <h4 class='card-title'><a href='sets/flashcard.html?name=` + titleCase(key) + `'>${key}</a></h4>
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
  }
});

//Load Feed on Feed Page--------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
  if(window.location.href.indexOf("feed") > -1) {
    $.ajax({
      method: 'GET',
      url: 'https://api.jsonbin.io/b/5d5b68416c4cac3e3c27f828/latest',
      dataType: 'text',
      success: myjson => {
        myjson = JSON.parse(myjson);
        console.log(myjson)
        for (var i of myjson) {
          $(".subject-container").append(`
            <div class="feed-container">
              <div class="feed-header">
                <img src="data:image/png;base64,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" class="float-left profile">
                <p class="set-container-text-medium">${i[1]}</p>
                <p class="set-container-text-small">${i[0]}</p>
              </div>
              <div class="feed-content">
                <p class="feed-text">${i[2]}</p>
                <p class="set-container-text-bottom">${i[3]}</p>
              </div>
            </div>
            `)
        }
      }
    })
  }
})
