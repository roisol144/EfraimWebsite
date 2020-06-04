jQuery(function ($) {
  "use strict";

  $(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  var sitePlusMinus = function () {
    $(".js-btn-minus").on("click", function (e) {
      e.preventDefault();
      if ($(this).closest(".input-group").find(".form-control").val() != 0) {
        $(this)
          .closest(".input-group")
          .find(".form-control")
          .val(
            parseInt(
              $(this).closest(".input-group").find(".form-control").val()
            ) - 1
          );
      } else {
        $(this).closest(".input-group").find(".form-control").val(parseInt(0));
      }
    });
    $(".js-btn-plus").on("click", function (e) {
      e.preventDefault();
      $(this)
        .closest(".input-group")
        .find(".form-control")
        .val(
          parseInt(
            $(this).closest(".input-group").find(".form-control").val()
          ) + 1
        );
    });
  };
  // sitePlusMinus();

  var siteIstotope = function () {
    /* activate jquery isotope */
    var $container = $("#posts").isotope({
      itemSelector: ".item",
      isFitWidth: true,
    });

    $(window).resize(function () {
      $container.isotope({
        columnWidth: ".col-sm-3",
      });
    });

    $container.isotope({ filter: "*" });

    // filter items on button click
    $("#filters").on("click", "button", function (e) {
      e.preventDefault();
      var filterValue = $(this).attr("data-filter");
      $container.isotope({ filter: filterValue });
      $("#filters button").removeClass("active");
      $(this).addClass("active");
    });
  };

  siteIstotope();

  var fancyBoxInit = function () {
    $(".fancybox").on("click", function () {
      var visibleLinks = $(".fancybox");

      $.fancybox.open(visibleLinks, {}, visibleLinks.index(this));

      return false;
    });
  };
  fancyBoxInit();

  var stickyFillInit = function () {
    $(window)
      .on("resize orientationchange", function () {
        recalc();
      })
      .resize();

    function recalc() {
      if ($(".jm-sticky-top").length > 0) {
        var elements = $(".jm-sticky-top");
        Stickyfill.add(elements);
      }
    }
  };
  stickyFillInit();

  // site navigation section, let's the user full access for every part of the website with easy to use UI&UX design.
  var OnePageNavigation = function () {
    var navToggler = $(".site-menu-toggle");
    $("body").on(
      "click",
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a",
      function (e) {
        e.preventDefault();

        var hash = this.hash;

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          600,
          "easeInOutCirc",
          function () {
            window.location.hash = hash;
          }
        );
      }
    );
  };
  OnePageNavigation();

  var counterInit = function () {
    if ($(".section-counter").length > 0) {
      $(".section-counter").waypoint(
        function (direction) {
          if (
            direction === "down" &&
            !$(this.element).hasClass("ftco-animated")
          ) {
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(
              ","
            );
            $(".number").each(function () {
              var $this = $(this),
                num = $this.data("number");
              console.log(num);
              $this.animateNumber(
                {
                  number: num,
                  numberStep: comma_separator_number_step,
                },
                7000
              );
            });
          }
        },
        { offset: "95%" }
      );
    }
  };
  counterInit();
});

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
var navbar = document.getElementById("top");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//Start of the function to slide

var $slider = $(".slider"),
  $bullets = $(".bullets");
function calculateHeight() {
  var height = $(".slide.active").outerHeight();
  $slider.height(height);
}

$(window).resize(function () {
  calculateHeight();
  clearTimeout($.data(this, "resizeTimer"));
});

function resetSlides() {
  $(".slide.inactive").removeClass("inactiveRight").removeClass("inactiveLeft");
}

function gotoSlide($activeSlide, $slide, className) {
  $activeSlide.removeClass("active").addClass("inactive " + className);
  $slide.removeClass("inactive").addClass("active");
  calculateHeight();
  resetBullets();
  setTimeout(resetSlides, 300);
}

$(".next").on("click", function () {
  var $activeSlide = $(".slide.active"),
    $nextSlide =
      $activeSlide.next(".slide").length != 0
        ? $activeSlide.next(".slide")
        : $(".slide:first-child");
  console.log($nextSlide);
  gotoSlide($activeSlide, $nextSlide, "inactiveLeft");
});
$(".previous").on("click", function () {
  var $activeSlide = $(".slide.active"),
    $prevSlide =
      $activeSlide.prev(".slide").length != 0
        ? $activeSlide.prev(".slide")
        : $(".slide:last-child");

  gotoSlide($activeSlide, $prevSlide, "inactiveRight");
});
$(document).on("click", ".bullet", function () {
  if ($(this).hasClass("active")) {
    return;
  }
  var $activeSlide = $(".slide.active");
  var currentIndex = $activeSlide.index();
  var targetIndex = $(this).index();
  console.log(currentIndex, targetIndex);
  var $theSlide = $(".slide:nth-child(" + (targetIndex + 1) + ")");
  gotoSlide(
    $activeSlide,
    $theSlide,
    currentIndex > targetIndex ? "inactiveRight" : "inactiveLeft"
  );
});
function addBullets() {
  var total = $(".slide").length,
    index = $(".slide.active").index();
  for (var i = 0; i < total; i++) {
    var $bullet = $("<div>").addClass("bullet");
    if (i == index) {
      $bullet.addClass("active");
    }
    $bullets.append($bullet);
  }
}
function resetBullets() {
  $(".bullet.active").removeClass("active");
  var index = $(".slide.active").index() + 1;
  console.log(index);
  $(".bullet:nth-child(" + index + ")").addClass("active");
}
addBullets();
calculateHeight();
