javascript
import { initThreeScene } from "./three-scene.js";
import { initAnimations } from "./animations.js";
import { initCursor } from "./cursor.js";
import { initNavigation } from "./navigation.js";


/* =========================================================
   GLOBAL GSAP
========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initCursor();

        initNavigation();

        initThreeScene();

        initAnimations();

    }
);

