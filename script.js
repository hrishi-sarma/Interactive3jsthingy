import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5.5, 18);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Lighting
const directionalLight = new THREE.PointLight(0xffffff, 500);
directionalLight.position.set(-30, 40, 1);
scene.add(directionalLight);

// GLTF Loader
let mesh, building;
const loader = new GLTFLoader();
loader.load('3dModels/stairs.glb', (gltf) => {
    mesh = gltf.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(mesh);
    mesh.position.set(0, 0, 0);
}, undefined, (error) => {
    console.error(error);
});

loader.load('3dModels/building.glb', (gltf2) => {
    building = gltf2.scene;

    building.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(building);
    building.position.set(0, 0, 0);
}, undefined, (error) => {
    console.error(error);
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

const meshSpeed = 1;
const minYPosition = 5.5; // Minimum Y position for the camera
const maxYPosition = 42;

function moveCameraOnScroll() {
    window.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            // Scroll down
            camera.position.y = Math.max(minYPosition, camera.position.y - meshSpeed);
        } else {
            // Scroll up
            camera.position.y = Math.min(maxYPosition, camera.position.y + meshSpeed);
        }
    });
}

moveCameraOnScroll();
animate();
