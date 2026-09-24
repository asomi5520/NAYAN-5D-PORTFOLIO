/* =========================================================
   NAVIGATION
========================================================= */

(() => {

    const menuButton =
        document.querySelector(".menu-btn");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuButton || !navLinks) {
        return;
    }


    /* -----------------------------------------------------
       MOBILE MENU
    ----------------------------------------------------- */

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "open"
            );

            menuButton.classList.toggle(
                "active"
            );

            const spans =
                menuButton.querySelectorAll(
                    "span"
                );

            if (
                menuButton.classList.contains(
                    "active"
                )
            ) {

                spans[0].style.transform =
                    "translateY(7px) rotate(45deg)";

                spans[1].style.opacity =
                    "0";

                spans[2].style.transform =
                    "translateY(-7px) rotate(-45deg)";

            } else {

                spans.forEach((span) => {

                    span.style.transform =
                        "";

                    span.style.opacity =
                        "";
                });
            }
        }
    );


    /* -----------------------------------------------------
       CLOSE MOBILE MENU
    ----------------------------------------------------- */

    const links =
        navLinks.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "open"
                );

                menuButton.classList.remove(
                    "active"
                );

                const spans =
                    menuButton.querySelectorAll(
                        "span"
                    );

                spans.forEach((span) => {

                    span.style.transform =
                        "";

                    span.style.opacity =
                        "";
                });
            }
        );
    });


    /* -----------------------------------------------------
       ACTIVE NAVIGATION
    ----------------------------------------------------- */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        links.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );
                                }
                            }
                        );
                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(section);

        }
    );


    /* -----------------------------------------------------
       NAV BACKGROUND ON SCROLL
    ----------------------------------------------------- */

    const nav =
        document.querySelector(".nav");

    if (nav) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 40) {

                    nav.classList.add(
                        "scrolled"
                    );

                } else {

                    nav.classList.remove(
                        "scrolled"
                    );
                }

            },
            {
                passive: true
            }
        );
    }


    /* -----------------------------------------------------
       ESCAPE CLOSE
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                navLinks.classList.remove(
                    "open"
                );

                menuButton.classList.remove(
                    "active"
                );

                const spans =
                    menuButton.querySelectorAll(
                        "span"
                    );

                spans.forEach((span) => {

                    span.style.transform =
                        "";

                    span.style.opacity =
                        "";
                });
            }
        }
    );

})();
