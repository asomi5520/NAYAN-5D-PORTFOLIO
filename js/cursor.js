/* =========================================================
   CUSTOM GAMING CURSOR
========================================================= */

(() => {

    const cursor =
        document.getElementById("cursor");

    const ring =
        document.getElementById("cursor-ring");

    if (!cursor || !ring) {
        return;
    }


    /* -----------------------------------------------------
       CURSOR POSITION
    ----------------------------------------------------- */

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;
        }
    );


    /* -----------------------------------------------------
       SMOOTH RING
    ----------------------------------------------------- */

    function animateRing() {

        ringX +=
            (mouseX - ringX) * 0.15;

        ringY +=
            (mouseY - ringY) * 0.15;

        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateRing
        );
    }

    animateRing();


    /* -----------------------------------------------------
       INTERACTIVE ELEMENTS
    ----------------------------------------------------- */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, .skill-card, .project-card, .video-card"
        );


    interactiveElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );
                }
            );
        }
    );


    /* -----------------------------------------------------
       CLICK EFFECT
    ----------------------------------------------------- */

    document.addEventListener(
        "click",
        (event) => {

            const ripple =
                document.createElement("span");

            ripple.style.position =
                "fixed";

            ripple.style.left =
                `${event.clientX}px`;

            ripple.style.top =
                `${event.clientY}px`;

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.border =
                "1px solid #00f0ff";

            ripple.style.borderRadius =
                "50%";

            ripple.style.pointerEvents =
                "none";

            ripple.style.zIndex =
                "9997";

            ripple.style.transform =
                "translate(-50%, -50%)";

            ripple.style.transition =
                "all .5s ease";

            document.body.appendChild(
                ripple
            );


            requestAnimationFrame(() => {

                ripple.style.width =
                    "70px";

                ripple.style.height =
                    "70px";

                ripple.style.opacity =
                    "0";
            });


            setTimeout(() => {

                ripple.remove();

            }, 550);

        }
    );

})();
