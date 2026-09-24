const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

        }

      });

    },
    {
      threshold: .15
    }
  );


document
  .querySelectorAll(
    ".section-heading, .project-card, .terminal-box, .about-text, .skill"
  )
  .forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

  });


const style =
document.createElement("style");

style.textContent = `
.reveal {
  opacity: 0;
  transform: translateY(60px);
  transition:
    opacity 1s cubic-bezier(.16,1,.3,1),
    transform 1s cubic-bezier(.16,1,.3,1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
`;

document.head.appendChild(style);


/* MAGNETIC BUTTONS */

document
  .querySelectorAll(".magnetic")
  .forEach(element => {

    element.addEventListener("mousemove", e => {

      const rect =
        element.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left -
        rect.width / 2;

      const y =
        e.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * .15}px, ${y * .15}px)`;
    });

    element.addEventListener("mouseleave", () => {

      element.style.transform =
        "translate(0,0)";

    });

  });


/* NUMBER COUNTERS */

const counters =
  document.querySelectorAll("[data-count]");

const counterObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const target =
        Number(entry.target.dataset.count);

      let current = 0;

      const interval =
        setInterval(() => {

          current++;

          entry.target.textContent =
            current + "+";

          if (current >= target) {
            clearInterval(interval);
          }

        }, 30);

      counterObserver.unobserve(
        entry.target
      );

    });

  });

counters.forEach(counter =>
  counterObserver.observe(counter)
);
