javascript
export function initNavigation() {

    const menuButton =
        document.querySelector(
            ".menu-button"
        );


    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );


    const closeButton =
        document.querySelector(
            ".mobile-menu-close"
        );


    const links =
        document.querySelectorAll(
            ".mobile-menu a"
        );


    if (!menuButton || !mobileMenu) {
        return;
    }


    /* =====================================================
       OPEN
    ====================================================== */

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.add(
                "active"
            );


            gsap.from(
                ".mobile-menu a",
                {

                    y: 60,

                    opacity: 0,

                    duration: .8,

                    stagger: .08,

                    ease: "power4.out"

                }
            );

        }
    );


    /* =====================================================
       CLOSE
    ====================================================== */

    closeButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       LINKS
    ====================================================== */

    links.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       SMOOTH ANCHOR
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    window.scrollTo({

                        top:
                            target.offsetTop,

                        behavior:
                            "smooth"

                    });

                }
            );

        });

}
```

