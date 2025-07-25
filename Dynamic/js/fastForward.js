var offset = 0;

var $sky = $("#sky");
var $reflection = $("#reflection");
var $landscape = $("#landscape");
var $elementsToSync = $("#landscape, .land, #bottom, .stags, .stag, .counter:before, #lensFlare, .sunMask, .clouds svg, .suncrane, .twinkles, .spriteWrap");
var $stars = $("#stars, #starReflection");
var $head = $("head");
var $styleTag = $("#befores");

/**
 * Sets the animation timeline to a specific number of seconds into the day.
 * @param {number} [seconds] - Optional. The number of seconds to set the animation to.
 *                             If not provided, it will be calculated from the current system time.
 */
function setCorrectTime(seconds) {
  if (typeof seconds === "undefined") {
    const now = new Date();
    seconds =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds() +
      offset * 3600;
  }

  var negativeDelay = "-" + seconds + "s";
  
  $sky[0].setCurrentTime(seconds);
  $reflection[0].setCurrentTime(seconds);
  $landscape[0].setCurrentTime(seconds);
  
  $elementsToSync.css("animation-delay", negativeDelay);
  
  $stars.css("animation-delay", negativeDelay);

  var styleContent = '.sun:before{animation-delay:' + negativeDelay + ';} .counter:before{animation-delay:' + negativeDelay + ';}';

  if ($styleTag.length === 0) {
    $styleTag = $('<style id="befores">' + styleContent + '</style>');
    $head.append($styleTag);
  } else {
    $styleTag.html(styleContent);
  }
}

setCorrectTime();

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "visible") {
    setCorrectTime();
  }
});