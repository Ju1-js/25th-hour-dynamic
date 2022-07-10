var icon = document.getElementById("icon");
var closecontainer = $(".closecontainer")[0];
//const sleep = ms => new Promise(r => setTimeout(r, ms));

var isMouseHover = false;
icon.onmouseenter = function () {
  isMouseHover = true;
  controls.classList.add("hover");
  if (this.className === "Icon close") {
    this.className = "Icon left";
  }
};
icon.onmouseleave = function () {
  isMouseHover = false;
  controls.classList.remove("hover");
  if (this.className === "Icon left") {
    this.className = "Icon close";
  }
};

icon.onclick = async function () {
  if (this.className === "Icon left") {
    this.className = "Icon right";
    console.log("Closed");
    controls.classList.add("hide");
  } else if (this.className === "Icon right") {
    this.className = "Icon close";
    console.log("Opened");
    controls.classList.remove("hide");
    //await sleep(200);
    if (isMouseHover) {
      this.className = "Icon left";
    }
  }
};

/* $(".Icon.close span").css({
  opacity: "0",
}); */

/*
$(function () {
  var timer;
  var fadeInBuffer = false;
  $(".Icon").mousemove(function () {
    if (timer) {
      console.log("clearTimer");
      clearTimeout(timer);
      timer = 0;
    }

    console.log("fadeIn");
    $(".Icon span").css({
      opacity: "1",
    });

    timer = setTimeout(function () {
      console.log("fadeout");
      $(".Icon span").css({
        opacity: "0",
      });

      fadeInBuffer = true;
    }, 1500); // Time before the X dissapears
  });
}); */
