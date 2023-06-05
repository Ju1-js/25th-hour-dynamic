jQuery(document).ready(function ($) {
  // Slow load in
  setTimeout(function () {
    $("body").addClass("loaded");
  }, 2000);

  // close modal
  $("a.closeModal").on("click", function (event) {
    event.preventDefault();
    $(".modal").addClass("close");
  });
});
function controlsleft() {
  livelyPropertyListener("controls-location", 0);
}
function controlsright() {
  livelyPropertyListener("controls-location", 1);
}
