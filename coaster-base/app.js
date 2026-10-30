import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  rememberExport,
  rememberSettings,
  rememberVisit,
} from "../shared/library-activity.js";

const APP_ID = "coaster-base";
const FILENAME = "coaster-base-v1.stl";
const params = { legs: "2x" };

const query = new URLSearchParams(location.search);
const shot = query.has("capture") || query.has("shot");
if (shot) document.body.classList.add("capture");
if (!shot) rememberVisit(APP_ID);

const canvas = document.getElementById("view");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0xe6dfd2, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 4000);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 12, 0);

scene.add(new THREE.HemisphereLight(0xfff7ee, 0xc8bba8, 0.9));
const key = new THREE.DirectionalLight(0xffffff, 1.45);
key.position.set(90, 180, 70);
scene.add(key);
const fill = new THREE.DirectionalLight(0xffe4c8, 0.45);
fill.position.set(-120, 60, -80);
scene.add(fill);

const bed = new THREE.Mesh(
  new THREE.CircleGeometry(80, 72),
  new THREE.MeshStandardMaterial({ color: 0xd9d0c2, roughness: 1 }),
);
bed.rotation.x = -Math.PI / 2;
bed.position.y = -0.05;
scene.add(bed);

const VIEWS = {
  angle: new THREE.Vector3(150, 110, 150),
  front: new THREE.Vector3(0, 80, 210),
  top: new THREE.Vector3(0.1, 280, 0.1),
};

function frame(name) {
  camera.position.copy(VIEWS[name] || VIEWS.angle);
  controls.target.set(0, 12, 0);
  controls.update();
}

function resize() {
  const w = canvas.clientWidth || 1;
  const h = canvas.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const stage = canvas.parentElement;
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(resize).observe(stage);
}
resize();
frame("angle");

new STLLoader().load(FILENAME, (geo) => {
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: 0xc4895a,
      roughness: 0.52,
      metalness: 0.02,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);
  const status = document.getElementById("status");
  if (status) status.textContent = "Ready · 112 × 112 × 31 mm";
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((other) => {
      other.classList.toggle("active", other === button);
    });
    frame(button.getAttribute("data-view"));
  });
});

document.getElementById("resetView").addEventListener("click", () => {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-view") === "angle");
  });
  frame("angle");
});

document.getElementById("download").addEventListener("click", () => {
  rememberSettings(APP_ID, params);
  rememberExport(APP_ID, { filename: FILENAME, params });
  const link = document.createElement("a");
  link.href = FILENAME;
  link.download = FILENAME;
  link.click();
});

const panel = document.querySelector(".panel");
pairSlidersWithNumbers(panel);
installUndo({
  panel,
  read: () => params,
  apply: () => {},
});

function draw() {
  resize();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
}
draw();
