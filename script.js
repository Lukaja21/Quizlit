var hiding = false;
$(document).ready(function() {
    $("#hider").hide()
});

$(window).keyup( function (e) {
    if (e.keyCode == 186) {
      window.open("https://cais.learning.powerschool.com", "_blank");
      return false;
    }
});

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState == "visible") {
    if (!hiding){ 
      $("title").text("Quizlit: Study Longer. Study Harder.");
      $("link[rel=icon]").attr("href", "/favicon-32x32.png");
    }
  } else {
    $("title").text("PowerSchool Learning : Portal");
    $("link[rel=icon]").attr("href", "https://cais.learning.powerschool.com/favicon.png?1494045990");
  }
});

$(window).keypress( function (e) {
    if (e.keyCode == 47) {
        if (!hiding) {
            hiding = true;
            $("#hider").show()
            $('link[rel="icon"]').attr("href", "https://cais.learning.powerschool.com/favicon.png?1494045990")
            $('title').text("PowerSchool Learning : Portal")
        }
    }
});
$(window).keypress( function (e) {
    if (e.keyCode == 13) {
        if (hiding) {
            hiding = false;
            $("#hider").hide()
            $('link[rel="icon"]').attr("href", "/favicon-32x32.png")
            $('title').text("Quizlit: Sudy Longer. Study Harder.")
        }
    }
});

function hidead() {
	$(".ad").hide();
	$(".ad-contentt").hide()
	$(".btn-default").hide()
}