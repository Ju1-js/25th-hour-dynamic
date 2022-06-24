const audio = $("#player");
const controls = $("#controls"); // id="controls"

controls.classList.add("hide");
controls.classList.add("hide");

function livelyPropertyListener(name, val) {
  switch (name) {
    case "volume":
      console.log(val);
      break;
    case "controls-location":
      console.log(val);
      break;
    case "controls-visible":
      console.log(val);
      if (val) {
      }
      break;

    default:
      console.error(`Unknown customization option: ${name}`);
      break;
  }
}
