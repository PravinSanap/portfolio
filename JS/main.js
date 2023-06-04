const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--open");
  changeToggleIcon();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav__menu--open");
    changeToggleIcon();
  });
});

// change the nav toggle icon
function changeToggleIcon() {
  if (navMenu.classList.contains("nav__menu--open")) {
    navToggle.classList.replace("fa-stream", "fa-times");
  } else {
    navToggle.classList.replace("fa-times", "fa-stream");
  }
}

// Activate nav link on scroll
function addActiveLink() {
  const section = document.querySelectorAll("section[id]");
  section.forEach((section) => {
    const scrollY = window.scrollY,
      sectionTop = section.offsetTop - 100,
      sectionHeight = section.offsetHeight,
      sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.add("nav__link--active");
    } else {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.remove("nav__link--active");
    }
  });
}

window.addEventListener("scroll", addActiveLink);


// Scrolltop
const scrolltop = document.getElementById("scrolltop");

window.addEventListener("scroll", () => {
  if (this.scrollY >= 300) {
    scrolltop.classList.add("scrolltop--show");
  } else {
    scrolltop.classList.remove("scrolltop--show");
  }
});

// Dark theme

// check for selected theme in localStorage
let theme = localStorage.getItem("theme");

const themeToggle = document.getElementById("theme-toggle");

const enableDarkTheme = () => {
  // Add the dark theme class to the body
  document.body.classList.add("dark-theme");
  // change the theme toggle icon
  themeToggle.classList.replace("fa-moon", "fa-sun");
  // update the selected theme in localStorage
  localStorage.setItem("theme", "dark-theme");
};

const disableDarkTheme = () => {
  // remove the dark theme class from the body
  document.body.classList.remove("dark-theme");
  // change the theme toggle icon
  themeToggle.classList.replace("fa-sun", "fa-moon");
  // update the selected theme in localStorage
  localStorage.setItem("theme", null);
};

// check if the user previously enabled the dark theme
// to load the dark theme
if (theme === "dark-theme") {
  enableDarkTheme();
}

// Add toggle theme event
themeToggle.addEventListener("click", () => {
  // get the selected theme
  theme = localStorage.getItem("theme");
  if (theme !== "dark-theme") {
    enableDarkTheme();
  } else {
    disableDarkTheme();
  }
});

// ScrollReveal Animations

const sr = ScrollReveal({
  origin: "top",
  distance: "100px",
  duration: 2500,
  reset: false,
});

sr.reveal(".home__content, .about__img, .service__content, .contact__content", {
  origin: "left",
});

sr.reveal(".home__img, .about__content, .service__info, .contact__form", {
  origin: "right",
});

sr.reveal(
  ".skills__wrapper, .counter__wrapper, .portfolio__wrapper, .testimonial__wrapper, .blog__wrapper, .footer__content",
  {
    origin: "bottom",
  }
);




///// img hover js ///////////
const $circle = document.querySelector('.card__circle');
const $smallCircle = document.querySelector('.card__smallCircle');
const $year = document.querySelector('.card__year');
const $card = document.querySelector('.card');
const $cardOrangeShine = document.querySelector('.card__orangeShine');
const $cardThankYou = document.querySelector('.card__thankyou');
const $cardComet = document.querySelector('.card__cometOuter');

const generateTranslate = (el, e, value) => {
  el.style.transform = `translate(${e.clientX * value}px, ${e.clientY * value}px)`;
}
const cumulativeOffset = (element) => {
  var top = 0, left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left
  };
};
document.onmousemove = (event) => {
  const e = event || window.event;
  const x = (e.pageX - cumulativeOffset($card).left - (350 / 2)) * -1 / 100;
  const y = (e.pageY - cumulativeOffset($card).top - (350 / 2)) * -1 / 100;

  const matrix = [
    [1, 0, 0, -x * 0.00005],
    [0, 1, 0, -y * 0.00005],
    [0, 0, 1, 1],
    [0, 0, 0, 1]
  ];

  generateTranslate($smallCircle, e, 0.03);
  generateTranslate($cardThankYou, e, 0.03);
  generateTranslate($cardOrangeShine, e, 0.09);
  generateTranslate($circle, e, 0.05);
  generateTranslate($year, e, 0.03);
  generateTranslate($cardComet, e, 0.05);

  $card.style.transform = `matrix3d(${matrix.toString()})`;
};


//////// typing script /////////////

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};


///////////// skills set js /////////////

function radial_animate() {
  $('svg.radial-progress').each(function (index, value) {

    $(this).find($('circle.bar--animated')).removeAttr('style');
    // Get element in Veiw port
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      var percent = $(value).data('countervalue');
      var radius = $(this).find($('circle.bar--animated')).attr('r');
      var circumference = 2 * Math.PI * radius;
      var strokeDashOffset = circumference - ((percent * circumference) / 100);
      $(this).find($('circle.bar--animated')).animate({ 'stroke-dashoffset': strokeDashOffset }, 2800);
    }
  });
}
// To check If it is in Viewport 
var $window = $(window);
function check_if_in_view() {
  $('.countervalue').each(function () {
    if ($(this).hasClass('start')) {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).removeClass('start');
        $('.countervalue').text();
        var myNumbers = $(this).text();
        if (myNumbers == Math.floor(myNumbers)) {
          $(this).animate({
            Counter: $(this).text()
          }, {
            duration: 2800,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now) + '%');
            }
          });
        } else {
          $(this).animate({
            Counter: $(this).text()
          }, {
            duration: 2800,
            easing: 'swing',
            step: function (now) {
              $(this).text(now.toFixed(2) + '$');
            }
          });
        }

        radial_animate();
      }
    }
  });
}

$window.on('scroll', check_if_in_view);
$window.on('load', check_if_in_view);




///////////////// education timeline js /////////

(function ($) {
  $(function () {


    $(window).on('scroll', function () {
      fnOnScroll();
    });

    $(window).on('resize', function () {
      fnOnResize();
    });


    var agTimeline = $('.js-timeline'),
      agTimelineLine = $('.js-timeline_line'),
      agTimelineLineProgress = $('.js-timeline_line-progress'),
      agTimelinePoint = $('.js-timeline-card_point-box'),
      agTimelineItem = $('.js-timeline_item'),
      agOuterHeight = $(window).outerHeight(),
      agHeight = $(window).height(),
      f = -1,
      agFlag = false;

    function fnOnScroll() {
      agPosY = $(window).scrollTop();

      fnUpdateFrame();
    }

    function fnOnResize() {
      agPosY = $(window).scrollTop();
      agHeight = $(window).height();

      fnUpdateFrame();
    }

    function fnUpdateWindow() {
      agFlag = false;

      agTimelineLine.css({
        top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
        bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
      });

      f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
    }

    function fnUpdateProgress() {
      var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

      i = agTop + agPosY - $(window).scrollTop();
      a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      n = agPosY - a + agOuterHeight / 2;
      i <= agPosY + agOuterHeight / 2 && (n = i - a);
      agTimelineLineProgress.css({ height: n + "px" });

      agTimelineItem.each(function () {
        var agTop = $(this).find(agTimelinePoint).offset().top;

        (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
      })
    }

    function fnUpdateFrame() {
      agFlag || requestAnimationFrame(fnUpdateWindow);
      agFlag = true;
    }


  });
})(jQuery);




/////// our work  or project carousel js //////////

(function () {
  "use strict";

  var carousel = document.getElementsByClassName('carousel')[0],
    slider = carousel.getElementsByClassName('carousel__slider')[0],
    items = carousel.getElementsByClassName('carousel__slider__item'),
    prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
    nextBtn = carousel.getElementsByClassName('carousel__next')[0];

  var width, height, totalWidth, margin = 20,
    currIndex = 0,
    interval, intervalTime = 10000;

  function init() {
    resize();
    move(Math.floor(items.length / 2));
    bindEvents();

    timer();
  }

  function resize() {
    width = Math.max(window.innerWidth * .25, 275),
      height = window.innerHeight * .5,
      totalWidth = width * items.length;

    slider.style.width = totalWidth + "px";

    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      item.style.width = (width - (margin * 2)) + "px";
      item.style.height = height + "px";
    }
  }

  function move(index) {

    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    currIndex = index;

    for (var i = 0; i < items.length; i++) {
      let item = items[i],
        box = item.getElementsByClassName('item__3d-frame')[0];
      if (i == (index - 1)) {
        item.classList.add('carousel__slider__item--active');
        box.style.transform = "perspective(1200px)";
      } else {
        item.classList.remove('carousel__slider__item--active');
        box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
      }
    }

    slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
  }

  function timer() {
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currIndex);
    }, intervalTime);
  }

  function prev() {
    move(--currIndex);
    timer();
  }

  function next() {
    move(++currIndex);
    timer();
  }


  function bindEvents() {
    window.onresize = resize;
    prevBtn.addEventListener('click', () => { prev(); });
    nextBtn.addEventListener('click', () => { next(); });
  }


  init();

})();




/////////// footer copyright year js /////
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();



//////////// cursor animation /////////////


var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function () {
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})



