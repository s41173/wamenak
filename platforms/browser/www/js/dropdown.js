//<![CDATA[
  // Main Menu
  var ww = document.body.clientWidth;
  $(document).ready(function() {
    $(".nav li a").each(function() {
      if ($(this).next().length > 0) {
        $(this).addClass("parent")
      }
    });
    $(".slide-menu").click(function(e) {
      e.preventDefault();
      $(this).toggleClass("active");
      $(".nav").toggle()
    });
    adjustMenu()
  });
  $(window).bind("resize orientationchange", function() {
    ww = document.body.clientWidth;
    adjustMenu()
  });
  var adjustMenu = function() {
    if (ww < 768) {
      $(".slide-menu").css("display", "inline-block");
      if (!$(".slide-menu").hasClass("active")) {
        $(".nav").hide()
      } else {
        $(".nav").show()
      }
      $(".nav li").unbind("mouseenter mouseleave");
      $(".nav li a.parent").unbind("click").bind("click", function(e) {
        e.preventDefault();
        $(this).parent("li").toggleClass("hover")
      })
    } else if (ww >= 768) {
      $(".slide-menu").css("display", "none");
      $(".nav").show();
      $(".nav li").removeClass("hover");
      $(".nav li a").unbind("click");
      $(".nav li").unbind("mouseenter mouseleave").bind("mouseenter mouseleave", function() {
        $(this).toggleClass("hover")
      })
    }
  }
  //]]>