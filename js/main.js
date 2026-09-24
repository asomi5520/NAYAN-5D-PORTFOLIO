document.addEventListener("DOMContentLoaded", () => {

  const loader =
    document.querySelector("#loader");

  const bar =
    document.querySelector(
      ".loader-bar span"
    );

  const percent =
    document.querySelector(
      ".loader-percent"
    );

  let progress = 0;

  const loading =
    setInterval(() => {

      progress +=
        Math.floor(Math.random() * 7) + 2;

      if (progress >= 100) {

        progress = 100;

        clearInterval(loading);

        setTimeout(() => {

          loader.style.transition =
            "opacity .8s ease";

          loader.style.opacity = "0";

          setTimeout(() => {
            loader.remove();
          }, 800);

        }, 400);
      }

      bar.style.width =
        progress + "%";

      percent.textContent =
        progress + "%";

    }, 80);


  /* GLITCH TITLE */

  const title =
    document.querySelector(".hero-title");

  setInterval(() => {

    title.style.transform =
      `translateX(${(Math.random() - .5) * 3}px)`;

    setTimeout(() => {
      title.style.transform = "";
    }, 70);

  }, 4000);


  /* PARALLAX */

  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;

      const hero =
        document.querySelector(
          ".hero-content"
        );

      if (hero && scroll < window.innerHeight) {

        hero.style.transform =
          `translateY(${scroll * .18}px)`;

        hero.style.opacity =
          Math.max(
            0,
            1 - scroll / 700
          );

      }

    },
    { passive: true }
  );

});
