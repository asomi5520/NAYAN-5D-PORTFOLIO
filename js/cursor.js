const cursor = document.querySelector("#cursor");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {

  currentX += (mouseX - currentX) * .15;
  currentY += (mouseY - currentY) * .15;

  cursor.style.left = currentX + "px";
  cursor.style.top = currentY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();


document
  .querySelectorAll("a, button, .magnetic")
  .forEach(element => {

    element.addEventListener("mouseenter", () => {
      ring.style.transform = "scale(1.8)";
    });

    element.addEventListener("mouseleave", () => {
      ring.style.transform = "scale(1)";
    });

  });
