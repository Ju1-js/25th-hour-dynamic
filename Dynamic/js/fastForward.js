var offset = 1;
var volume = 0.2;
var runAnimations = true;

window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    if (properties.volume) {
      volume = properties.volume.value / 100;
      $("audio")[0].volume = parseFloat(volume);
      console.log(volume);
    }

    if (properties.offset) {
      offset = properties.offset.value;
      console.log(offset);
    }

    runAnimations = properties.animations.value;
    if (!runAnimations) {
      $("#landscape .layer11").css(
        "animation",
        "treecolor 86400s linear 2s infinite"
      );
    } else {
      $("#landscape .layer11").css(
        "animation",
        "treesway 60s linear 2s infinite, treecolor 86400s linear 2s infinite"
      );
    }
  },
  setPaused: function (paused) {
    if (paused) $("audio")[0].pause();
    else {
      $("audio")[0].play();
    }
  },
};
