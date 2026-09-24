import * as THREE from "three";
import { WebGL1Renderer } from "three/addons/renderers/WebGL1Renderer.js";

const canvas = document.querySelector("#three-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 0, 6);


// =====================================================
// WEBGL FALLBACK SYSTEM
// =====================================================

let renderer;

try {

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false
    });

} catch (error) {

    console.warn(
        "WebGL2 unavailable. Switching to WebGL1..."
    );

    renderer = new WebGL1Renderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
}


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


// =====================================================
// MAIN 3D GROUP
// =====================================================

const world = new THREE.Group();

scene.add(world);


// =====================================================
// OUTER ENERGY SPHERE
// =====================================================

const outerGeometry =
    new THREE.IcosahedronGeometry(
        2.15,
        3
    );

const outerMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x00ff88,

        wireframe: true,

        transparent: true,

        opacity: 0.32
    });


const outerSphere =
    new THREE.Mesh(
        outerGeometry,
        outerMaterial
    );

world.add(outerSphere);


// =====================================================
// INNER CYAN CORE
// =====================================================

const innerGeometry =
    new THREE.IcosahedronGeometry(
        1.35,
        2
    );

const innerMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x00eaff,

        wireframe: true,

        transparent: true,

        opacity: 0.3
    });


const innerSphere =
    new THREE.Mesh(
        innerGeometry,
        innerMaterial
    );

world.add(innerSphere);


// =====================================================
// CORE GLOW
// =====================================================

const coreGeometry =
    new THREE.SphereGeometry(
        0.55,
        32,
        32
    );

const coreMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x00ff88,

        transparent: true,

        opacity: 0.08
    });


const core =
    new THREE.Mesh(
        coreGeometry,
        coreMaterial
    );

world.add(core);


// =====================================================
// PARTICLE FIELD
// =====================================================

const particleCount = 2500;

const positions =
    new Float32Array(
        particleCount * 3
    );


for (let i = 0; i < particleCount; i++) {

    const radius = 14;

    positions[i * 3] =
        (Math.random() - 0.5) * radius;

    positions[i * 3 + 1] =
        (Math.random() - 0.5) * radius;

    positions[i * 3 + 2] =
        (Math.random() - 0.5) * radius;
}


const particleGeometry =
    new THREE.BufferGeometry();


particleGeometry.setAttribute(
    "position",

    new THREE.BufferAttribute(
        positions,
        3
    )
);


const particleMaterial =
    new THREE.PointsMaterial({

        color: 0x00ff88,

        size: 0.018,

        transparent: true,

        opacity: 0.75
    });


const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );


scene.add(particles);


// =====================================================
// HORIZONTAL ENERGY RINGS
// =====================================================

const ringGroup =
    new THREE.Group();


world.add(ringGroup);


for (let i = 0; i < 5; i++) {

    const ringGeometry =
        new THREE.TorusGeometry(
            2.4 + i * 0.18,
            0.008,
            8,
            100
        );

    const ringMaterial =
        new THREE.MeshBasicMaterial({

            color:
                i % 2 === 0
                    ? 0x00ff88
                    : 0x00eaff,

            transparent: true,

            opacity: 0.28
        });


    const ring =
        new THREE.Mesh(
            ringGeometry,
            ringMaterial
        );


    ring.rotation.x =
        Math.PI / 2;

    ring.rotation.z =
        i * 0.35;

    ringGroup.add(ring);
}


// =====================================================
// MOUSE INTERACTION
// =====================================================

const mouse = {
    x: 0,
    y: 0
};


const target = {
    x: 0,
    y: 0
};


window.addEventListener(
    "mousemove",
    (event) => {

        mouse.x =
            (event.clientX /
                window.innerWidth) * 2 - 1;

        mouse.y =
            -(event.clientY /
                window.innerHeight) * 2 + 1;

    }
);


// =====================================================
// ANIMATION
// =====================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // -----------------------------------------
    // SMOOTH MOUSE
    // -----------------------------------------

    target.x +=
        (mouse.x - target.x) * 0.025;

    target.y +=
        (mouse.y - target.y) * 0.025;


    // -----------------------------------------
    // OUTER SPHERE
    // -----------------------------------------

    outerSphere.rotation.x =
        time * 0.12;

    outerSphere.rotation.y =
        time * 0.20;


    // -----------------------------------------
    // INNER SPHERE
    // -----------------------------------------

    innerSphere.rotation.x =
        -time * 0.22;

    innerSphere.rotation.y =
        -time * 0.28;


    // -----------------------------------------
    // CORE
    // -----------------------------------------

    const pulse =
        1 +
        Math.sin(time * 2.5) * 0.12;

    core.scale.set(
        pulse,
        pulse,
        pulse
    );


    // -----------------------------------------
    // ENERGY RINGS
    // -----------------------------------------

    ringGroup.rotation.x =
        target.y * 0.5;

    ringGroup.rotation.y =
        time * 0.12;

    ringGroup.rotation.z =
        target.x * 0.4;


    // -----------------------------------------
    // PARTICLES
    // -----------------------------------------

    particles.rotation.y =
        time * 0.012;

    particles.rotation.x =
        time * 0.004;


    // -----------------------------------------
    // MOUSE 3D MOVEMENT
    // -----------------------------------------

    world.rotation.y +=
        (target.x * 0.5 -
            world.rotation.y) * 0.025;

    world.rotation.x +=
        (target.y * 0.35 -
            world.rotation.x) * 0.025;


    world.position.x +=
        (target.x * 0.35 -
            world.position.x) * 0.02;

    world.position.y +=
        (target.y * 0.25 -
            world.position.y) * 0.02;


    // -----------------------------------------
    // CAMERA FLOAT
    // -----------------------------------------

    camera.position.x =
        Math.sin(time * 0.15) * 0.08;

    camera.position.y =
        Math.cos(time * 0.13) * 0.06;


    camera.lookAt(
        0,
        0,
        0
    );


    renderer.render(
        scene,
        camera
    );
}


animate();


// =====================================================
// RESIZE
// =====================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);
