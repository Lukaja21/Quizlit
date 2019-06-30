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
	if (Object.keys(myjson).length > 5){
		var i;
		for (i = 0; i < 6; i++) { 
			if (myjson[i] == "chinese") {
				var thumbnail = "https://asiasociety.org/sites/default/files/styles/1200w/public/C/calligraphy.jpg?itok=aSTzLe_m"
			} else if (myjson[i][0] == "science") {
				var thumbnail = "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/20160627-Grand-Challenges-of-Science-31qtkdbz2aajgveb3em2gw.jpg"
			} else if (myjson[i][0] == "math") {
				var thumbnail = "https://hechingerreport.org/wp-content/uploads/2019/04/pay-937884_1920-800x0-c-default.jpg"
			} else if (myjson[i][0] == "humanities") {
				var thumbnail = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/WL_HumanitiesH.jpg?itok=cGUmbZA0"
			}
  			$(".row").append("<div class='col-lg-4 col-sm-6 mb-4'><div class='card h-100'><a href='sets/" + myjson[i][0] +"/" + myjson[i] + ".html'><img class='" + thumbnail + "'></a><div class='card-body'><h4 class='card-title'><a href='sets/" + myjson[i][0] +"/" + myjson[i] + ".html'>Chinese Silk Road 4-5</a></h4><p class='card-text'>" + myjson[i][2] + "</p></div></div></div>")
		}
	} else {
		var i;
		for (i = 0; i < Object.keys(myjson).length; i++) {
			if (myjson[i] == "chinese") {
				var thumbnail = "https://asiasociety.org/sites/default/files/styles/1200w/public/C/calligraphy.jpg?itok=aSTzLe_m"
			} else if (myjson[i][0] == "science") {
				var thumbnail = "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/20160627-Grand-Challenges-of-Science-31qtkdbz2aajgveb3em2gw.jpg"
			} else if (myjson[i][0] == "math") {
				var thumbnail = "https://hechingerreport.org/wp-content/uploads/2019/04/pay-937884_1920-800x0-c-default.jpg"
			} else if (myjson[i][0] == "humanities") {
				var thumbnail = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/WL_HumanitiesH.jpg?itok=cGUmbZA0"
			}
			$(".row").append("<div class='col-lg-4 col-sm-6 mb-4'><div class='card h-100'><a href='sets/" + myjson[i][0] +"/" + myjson[i] + ".html'><img class='" + thumbnail + "'></a><div class='card-body'><h4 class='card-title'><a href='sets/" + myjson[i][0] +"/" + myjson[i] + ".html'>Chinese Silk Road 4-5</a></h4><p class='card-text'>" + myjson[i][2] + "</p></div></div></div>")
		}
		var blanks = 6 - Object.keys(myjson).length
		for (i = 0; i < blanks; i++) {
			$(".row").append("<div class='col-lg-4 col-sm-6 mb-4'><div class='card h-100'><a href='#'><img class='card-img-top' src='https://placehold.it/700x400' alt=''></a><div class='card-body'><h4 class='card-title'><a href='#'>Project Five</a></h4><p class='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p></div></div></div>")
		}
	}
});