import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DEFAULT_PARAMS, facesToPositions, meshFor, stlBytes } from "./clip.js";

const KEYS = [
  "thickness",
  "width",
  "back_length",
  "pinch_gap",
  "hook_inner_r",
  "arm_length",
  "tip_standoff",
  "tip_angle_deg",
];

const UNITS = {
  thickness: "mm",
  width: "mm",
  back_length: "mm",
  pinch_gap: "mm",
  hook_inner_r: "mm",
  arm_length: "mm",
  tip_standoff: "mm",
  tip_angle_deg: "°",
};

function readParams() {
  const p = { ...DEFAULT_PARAMS };
  for (const key of KEYS) {
    const el = document.getElementById(key);
    p[key] = Number(el.value);
  }
  return p;
}

function writeParams(p) {
  for (const key of KEYS) {
    const el = document.getElementById(key);
    el.value = String(p[key]);
    const out = document.getElementById(`${key}-out`);
    const n = Number(p[key]);
    const text = Number.isInteger(n) || el.step === "1" ? n.toFixed(0) : n.toFixed(2);
    out.textContent = `${text} ${UNITS[key]}`;
  }
}

const canvas = document.getElementById("view");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setClearColor(0xd7d2c8, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
camera.up.set(0, 0, 1);
camera.position.set(18, -42, 28);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(18, 6, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const key = new THREE.DirectionalLight(0xffffff, 1.05);
key.position.set(-20, -40, 50);
scene.add(key);
const fill = new THREE.DirectionalLight(0xfff7ed, 0.45);
fill.position.set(40, 20, -10);
scene.add(fill);

const grid = new THREE.GridHelper(80, 16, 0xb0a89c, 0xc9c2b6);
grid.rotation.x = Math.PI / 2;
grid.position.set(20, 0, -12);
scene.add(grid);

const material = new THREE.MeshStandardMaterial({
  color: 0xc4c4c4,
  roughness: 0.55,
  metalness: 0.05,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
scene.add(mesh);

let latest = meshFor();

function applyMesh(result) {
  latest = result;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(facesToPositions(result.faces), 3));
  geo.computeVertexNormals();
  mesh.geometry.dispose();
  mesh.geometry = geo;

  const [sx, sy, sz] = result.bbox.size;
  const stats = document.getElementById("stats");
  stats.innerHTML = `Size <strong>${sx.toFixed(1)} × ${sy.toFixed(1)} × ${sz.toFixed(1)} mm</strong> · ${result.faces.length} tris · ~${((result.volume / 1000) * 1.24).toFixed(1)} g PLA`;
}

function rebuild() {
  applyMesh(meshFor(readParams()));
}

function resize() {
  const stage = canvas.parentElement;
  const w = stage.clientWidth || 1;
  const h = stage.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

function downloadStl() {
  const p = latest.params;
  const buf = stlBytes(latest.faces, "postit_clip");
  const blob = new Blob([buf], { type: "model/stl" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `postit-wall-clip-${Math.round(p.width)}mm.stl`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function setPreset(overrides) {
  writeParams({ ...DEFAULT_PARAMS, ...overrides });
  rebuild();
}

writeParams(DEFAULT_PARAMS);
for (const key of KEYS) {
  document.getElementById(key).addEventListener("input", () => {
    writeParams(readParams());
    rebuild();
  });
}
document.getElementById("preset-original").addEventListener("click", () => setPreset({ width: 20 }));
document.getElementById("preset-wide").addEventListener("click", () => setPreset({ width: 76 }));
document.getElementById("reset").addEventListener("click", () => setPreset({}));
document.getElementById("download").addEventListener("click", downloadStl);

window.addEventListener("resize", resize);
try {
  rebuild();
} catch (err) {
  document.getElementById("stats").textContent = String(err);
  console.error(err);
}
resize();
tick();
