document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const bar = document.querySelector(".loader-bar span");
    const percent = document.querySelector(".loader-percent");

    if (!loader || !bar || !percent) {
        console.error("Loader elements not found!");
        return;
    }

    let progress = 0;

    const loading = setInterval(() => {

        progress += Math.floor(Math.random() * 8) + 4;

        if (progress >= 100) {
            progress = 100;
        }

        bar.style.width = progress + "%";
        percent.textContent = progress + "%";

        if (progress >= 100) {

            clearInterval(loading);

            setTimeout(() => {

                loader.style.opacity = "0";
                loader.style.pointerEvents = "none";

                setTimeout(() => {
                    loader.style.display = "none";
                }, 800);

            }, 500);
        }

    }, 100);


    // HERO GLITCH

    const title = document.querySelector(".hero-title");

    if (title) {

        setInterval(() => {

            title.style.transform =
                `translateX(${(Math.random() - 0.5) * 4}px)`;

            setTimeout(() => {
                title.style.transform = "";
            }, 80);

        }, 3000);
    }


    // SCROLL PARALLAX

    window.addEventListener("scroll", () => {

        const hero = document.querySelector(".hero-content");

        if (!hero) return;

        const scroll = window.scrollY;

        if (scroll < window.innerHeight) {

            hero.style.transform =
                `translateY(${scroll * 0.15}px)`;

            hero.style.opacity =
                Math.max(0, 1 - scroll / 600);
        }

    });

});
