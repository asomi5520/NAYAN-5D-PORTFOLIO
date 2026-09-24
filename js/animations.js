/* =========================================================
   SCROLL + VISUAL ANIMATIONS
========================================================= */

(() => {


    /* -----------------------------------------------------
       REVEAL ELEMENTS
    ----------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${Math.min(index * 40, 300)}ms`;

                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "show"
                );
            }
        );
    }


    /* -----------------------------------------------------
       SCROLL PROGRESS
    ----------------------------------------------------- */

    const progress =
        document.createElement("div");

    progress.id =
        "scroll-progress";

    progress.style.position =
        "fixed";

    progress.style.top =
        "0";

    progress.style.left =
        "0";

    progress.style.width =
        "0%";

    progress.style.height =
        "2px";

    progress.style.background =
        "#00f0ff";

    progress.style.boxShadow =
        "0 0 12px #00f0ff";

    progress.style.zIndex =
        "9999";

    progress.style.pointerEvents =
        "none";

    document.body.appendChild(
        progress
    );


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );

    updateProgress();


    /* -----------------------------------------------------
       HERO MOUSE GLOW
    ----------------------------------------------------- */

    const hero =
        document.querySelector(".hero");

    if (hero) {

        const glow =
            document.createElement("div");

        glow.style.position =
            "absolute";

        glow.style.width =
            "350px";

        glow.style.height =
            "350px";

        glow.style.borderRadius =
            "50%";

        glow.style.pointerEvents =
            "none";

        glow.style.background =
            "radial-gradient(circle, rgba(0,240,255,.09), transparent 70%)";

        glow.style.transform =
            "translate(-50%, -50%)";

        glow.style.zIndex =
            "0";

        hero.appendChild(glow);


        hero.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 900) {
                    return;
                }

                const rect =
                    hero.getBoundingClientRect();

                glow.style.left =
                    `${event.clientX - rect.left}px`;

                glow.style.top =
                    `${event.clientY - rect.top}px`;
            }
        );
    }


    /* -----------------------------------------------------
       RANDOM FLOATING DIGITAL PARTICLES
    ----------------------------------------------------- */

    const particleContainer =
        document.createElement("div");

    particleContainer.className =
        "floating-particles";

    particleContainer.style.position =
        "fixed";

    particleContainer.style.inset =
        "0";

    particleContainer.style.pointerEvents =
        "none";

    particleContainer.style.zIndex =
        "-1";

    document.body.appendChild(
        particleContainer
    );


    const particleCount =
        window.innerWidth < 600
            ? 18
            : 35;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.style.position =
            "absolute";

        particle.style.width =
            `${Math.random() * 3 + 1}px`;

        particle.style.height =
            particle.style.width;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            i % 3 === 0
                ? "#00f0ff"
                : i % 3 === 1
                    ? "#8b5cff"
                    : "#ff2bd6";

        particle.style.opacity =
            `${Math.random() * 0.5 + 0.15}`;

        particle.style.boxShadow =
            "0 0 10px currentColor";

        particle.style.animation =
            `particleFloat
             ${4 + Math.random() * 7}s
             ease-in-out
             ${Math.random() * -5}s
             infinite alternate`;

        particleContainer.appendChild(
            particle
        );
    }


    /* -----------------------------------------------------
       DYNAMIC PARTICLE ANIMATION STYLE
    ----------------------------------------------------- */

    const particleStyle =
        document.createElement("style");

    particleStyle.textContent = `

        @keyframes particleFloat {

            0% {
                transform:
                    translate3d(0, 0, 0)
                    scale(.8);
            }

            50% {
                transform:
                    translate3d(
                        ${Math.random() * 40 - 20}px,
                        ${Math.random() * -60}px,
                        0
                    )
                    scale(1.2);
            }

            100% {
                transform:
                    translate3d(
                        ${Math.random() * -40}px,
                        ${Math.random() * 40}px,
                        0
                    )
                    scale(.7);
            }

        }

        .nav.scrolled {
            background:
                rgba(5, 6, 11, .88);

            border-bottom-color:
                rgba(0, 240, 255, .18);
        }

        .nav-links a.active {
            color: #00f0ff;
        }

        .nav-links a.active::after {
            width: 100%;
        }

    `;

    document.head.appendChild(
        particleStyle
    );


    /* -----------------------------------------------------
       COUNTER HOVER EFFECT
    ----------------------------------------------------- */

    const stats =
        document.querySelectorAll(
            ".mini-stats b"
        );

    stats.forEach((stat) => {

        stat.addEventListener(
            "mouseenter",
            () => {

                stat.style.textShadow =
                    "0 0 20px rgba(0,240,255,.8)";
            }
        );

        stat.addEventListener(
            "mouseleave",
            () => {

                stat.style.textShadow =
                    "";
            }
        );
    });


    /* -----------------------------------------------------
       PAGE VISIBILITY
    ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.body.classList.add(
                    "page-hidden"
                );

            } else {

                document.body.classList.remove(
                    "page-hidden"
                );
            }
        }
    );

})();
