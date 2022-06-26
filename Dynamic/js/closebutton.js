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
