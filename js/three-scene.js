import * as THREE from "three";

const canvas = document.querySelector("#three-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const group = new THREE.Group();
scene.add(group);


/* MAIN WIREFRAME OBJECT */

const geometry = new THREE.IcosahedronGeometry(2, 2);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff88,
  wireframe: true,
  transparent: true,
  opacity: .35
});

const core = new THREE.Mesh(geometry, material);

group.add(core);


/* INNER CORE */

const innerGeometry = new THREE.IcosahedronGeometry(1.15, 2);

const innerMaterial = new THREE.MeshBasicMaterial({
  color: 0x00eaff,
  wireframe: true,
  transparent: true,
  opacity: .22
});

const inner = new THREE.Mesh(
  innerGeometry,
  innerMaterial
);

group.add(inner);


/* PARTICLES */

const particleCount = 1800;

const positions = new Float32Array(
  particleCount * 3
);

for (let i = 0; i < particleCount; i++) {

  const radius = 8;

  positions[i * 3] =
    (Math.random() - .5) * radius;

  positions[i * 3 + 1] =
    (Math.random() - .5) * radius;

  positions[i * 3 + 2] =
    (Math.random() - .5) * radius;
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
    size: .018,
    transparent: true,
    opacity: .6
  });

const particles =
  new THREE.Points(
    particleGeometry,
    particleMaterial
  );

scene.add(particles);


/* MOUSE */

const mouse = {
  x: 0,
  y: 0
};

window.addEventListener("mousemove", e => {

  mouse.x =
    (e.clientX / window.innerWidth) * 2 - 1;

  mouse.y =
    -(e.clientY / window.innerHeight) * 2 + 1;
});


/* ANIMATION */

const clock = new THREE.Clock();

function animate() {

  requestAnimationFrame(animate);

  const elapsed =
    clock.getElapsedTime();

  core.rotation.x =
    elapsed * .18;

  core.rotation.y =
    elapsed * .3;

  inner.rotation.x =
    -elapsed * .25;

  inner.rotation.y =
    -elapsed * .2;

  particles.rotation.y =
    elapsed * .015;

  group.rotation.y +=
    (mouse.x * .35 - group.rotation.y) * .025;

  group.rotation.x +=
    (mouse.y * .25 - group.rotation.x) * .025;

  group.position.x +=
    (mouse.x * .25 - group.position.x) * .015;

  group.position.y +=
    (mouse.y * .15 - group.position.y) * .015;

  renderer.render(scene, camera);
}

animate();


/* RESIZE */

window.addEventListener("resize", () => {

  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );
});
