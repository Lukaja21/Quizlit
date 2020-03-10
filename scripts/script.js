var hiding = false;
var pages;
var maxpage;
var accesibilityHidden = true
var rotation = 0;

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$(document).ready(function() {
  $("#hider").hide()
  $(".less-button").hide()
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
    }
  }, 500);
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

function accesibility() {
  if (accesibilityHidden){
    $("#search-dropdown").show()
    accesibilityHidden = false
  } else {
    $("#search-dropdown").hide()
    accesibilityHidden = true
  }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

$(".accesibility-button").click(function() {
    rotation += 5;
    $(this).rotate(rotation);
});