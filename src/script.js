import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(15); // to position camera on z axis

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') // selecting where to render 
})
renderer.setPixelRatio(window.devicePixelRatio)  // to set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // to make it full screen

// Lights
const spotLight = new THREE.SpotLight(0xffffff) // lightsup the whole scene equally 
spotLight.position.set(-5,12,-14);
spotLight.intensity = 0.4
scene.add(spotLight)

// Text
const text = 'THE ALPHA AGENCY';
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 1.3,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 10,
    letterSpacing: 0.2
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(-9, 0.3, -5);
  scene.add(textMesh);
});

// Model
const loader = new GLTFLoader()
let moonModel;
loader.load(
  '/moon.gltf',
  function (gltf) {
    gltf.scene.position.set(0,-5,10)
    moonModel = gltf.scene
    scene.add(moonModel);
  },
  function (error) {
    console.log('An error happened',error);
  }
);
renderer.render(scene, camera)

// Animation
function animate() { // to initiate a infinite loop 
  requestAnimationFrame(animate)
  moonModel.rotation.x -= 0.001;
  renderer.render(scene, camera)
}
animate()