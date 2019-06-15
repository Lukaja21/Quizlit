var hiding = false;
$(document).ready(function() {
    $("#hider").hide()
    $(".ad").hide()
    $(".less-button").hide()
    $(".pricing").hide()
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
      $("link[rel=icon]").attr("href", "https://lukaja21.github.io/Quizlit/favicon-32x32.png");
    }
  } else {
    $("title").text("PowerSchool Learning : Portal");
    $("link[rel=icon]").attr("href", "https://cais.learning.powerschool.com/favicon.png?1494045990");
  }
});

function hidead() {
	$(".ad").hide();
	$(".ad-contentt").hide()
	$(".btn-default").hide()
}

function showmore() {
  $(".less-button").show()
  $(".pricing").show()
  $(".more-button").hide()
  window.scrollTo(0,1000)
}

function showless() {
  $(".less-button").hide()
  $(".pricing").hide()
  $(".more-button").show()
  window.scrollTo(0,-100)
}

function ExpandBlock(block) {
  var func = "ShrinkBlock(" + "'" + block + "'" + ")"
  var block = ".block-" + block
  var button = block + "-button"
  $(".block-one").hide()
  $(".block-two").hide()
  $(".block-three").hide()
  $(block).show()
  $(block).removeClass("col-lg-4")
  $(block).addClass("col-lg-12")
  $(button).text("Shrink")
  $(button).attr("onclick",func)
}

function ShrinkBlock(block) {
  var func = "ExpandBlock(" + "'" + block + "'" + ")"
  var block = ".block-" + block
  var button = block + "-button"
  $(".block-one").show()
  $(".block-two").show()
  $(".block-three").show()
  $(block).addClass("col-lg-4")
  $(block).removeClass("col-lg-12")
  $(button).text("Expand")
  $(button).attr("onclick", func)
}