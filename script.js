const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const copy = document.querySelector("#copy");
const bodyColor = document.querySelector("body");

const haxValues = "0123456789ABCDEF";
let randomColor = "#";
let randomPosition;

function getRandomColor() {
  randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomPosition = Math.floor(Math.random() * 16); // this will return a value between 0 and 15 both inclusive.
    randomColor += haxValues[randomPosition];
  }
  return randomColor;
}

let showColors;
let check = false;
start.addEventListener("click", () => {
  check = true;
  copy.disabled = true;
  start.disabled = true;
  showColors = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomColor();
  }, 100);
});

stop.addEventListener("click", () => {
  if (check) {
    clearInterval(showColors);
    reset.style.display = "block";
    copy.style.display = "block";
    copy.disabled = false;
    start.disabled = false;
  }
});

reset.addEventListener("click", () => {
  clearInterval(showColors);
  bodyColor.style.backgroundColor = "#fff";
  reset.style.display = "none";
  copy.style.display = "none";
  check = false;
  start.disabled = false;
});

copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(randomColor)
    .then(() => {
      alert("Color copied to clipboard! 🌈");
    })
    .catch((error) => {
      console.error("Error copying color:", error);
    });
});
// NOTE: There is one more method known as document.execCommand('copy') used to copy text to clipboard, but it did not work with modern browser so we avoid using it.
