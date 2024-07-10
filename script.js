import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Load the car and trees models
const loader = new GLTFLoader();

let car;
loader.load('3dModels/car1.glb', function(gltf) {
    car = gltf.scene;
    car.scale.set(1, 1, 1);  // Adjust the scale if needed
    car.position.set(0, 0, 0);  // Initial position of the car
    scene.add(car);
}, undefined, function(error) {
    console.error('An error happened while loading the car model:', error);
});

let background;
loader.load('3dModels/trees1.glb', function(gltf) {
    background = gltf.scene;
    background.scale.set(10, 10, 10);  // Adjust the scale if needed
    background.position.set(0, 0, -50);  // Position it far in the background
    scene.add(background);
}, undefined, function(error) {
    console.error('An error happened while loading the background model:', error);
});

// Camera and controls
camera.position.set(5,2,0)
const controls = new OrbitControls(camera, renderer.domElement);

// Car movement
const carSpeed = 0.5;
function moveCar() {
    document.addEventListener('keydown', function(event) {
        if (car) {
            switch(event.key) {
                case 'ArrowUp':
                    car.position.x -= carSpeed;
                    break;
                case 'ArrowDown':
                    car.position.x += carSpeed;
                    break;
                case 'ArrowLeft':
                    car.position.z += carSpeed;
                    break;
                case 'ArrowRight':
                    car.position.z -= carSpeed;
                    break;
            }
        }
    });
}
moveCar();

// Update camera to follow the car
function updateCamera() {
    
    
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateCamera();
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
