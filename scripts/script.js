var hiding = false;
var pages;
var maxpage;

$(document).ready(function() {
  $("#hider").hide()
  $(".ad").hide()
  $(".less-button").hide()
  $(".pricing").hide()
});

$(document).ready(function() {
  setTimeout(function(){
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
  }, 100);
});

function nextpage(page) {
  page = page - 1
  if (page != maxpage) {
    $(".set-container").slice(0).hide()
    $('.page-item').slice(0).removeClass("active")
    page += 1
    $(".set-container").slice(page*10-10, page*10).show()
    $('.page-item').slice(page - 1, page).addClass("active")
    window.scrollTo(0,-100)
  }
}

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
      $("link[rel=icon]").attr("href", "https://quizlit.me/favicon-32x32.png");
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