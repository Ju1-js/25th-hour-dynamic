var offset = 0;

function setCorrectTime() {
  var date = new Date();
  var seconds =
    date.getHours() * 3600 +
    offset * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds();
  // console.log(`Date: ${date} | Seconds: ${seconds}`);
  $("#sky")[0].setCurrentTime(seconds);
  $("#reflection")[0].setCurrentTime(seconds);
  $("#landscape")[0].setCurrentTime(seconds);
  $(
    "#landscape, .land, #bottom, .stags, .stag, .counter:before, #lensFlare, .sunMask, .clouds svg, .suncrane, .twinkles, .spriteWrap"
  ).css("animation-delay", "-" + seconds + "s");
  $("#stars, #starReflection").css("animation-delay", ":" + seconds * 2 + "s");
  $("head").append(
    '<style id="befores">.sun:before{animation-delay:' +
      "-" +
      seconds +
      "s;} .counter:before{animation-delay:" +
      "-" +
      seconds +
      "s;}</style>"
  );
}

setCorrectTime();
