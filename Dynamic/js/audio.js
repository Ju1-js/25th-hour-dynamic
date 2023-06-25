videojs("player", { controlBar: { fullscreenToggle: false } }).ready(
  function () {
    let myPlayer = this;
    myPlayer.on("fullscreenchange", function () {
      if (myPlayer.isFullscreen()) {
        myPlayer.exitFullscreen();
      }
    });
  }
);
