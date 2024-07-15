import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// GLTF Loader
let car;
const loader = new GLTFLoader();
loader.load('3dModels/car1.glb', (gltf) => {
    car = gltf.scene;
    scene.add(car);
    car.position.set(0, 0, 0);
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

const carSpeed = 0.5;
function moveCar() {
    document.addEventListener('keydown', function(event) {
        if (car) {
            switch(event.key) {
                case 'w':
                    
                    camera.position.z -= carSpeed;
                    break;
                case 's':
                   
                    camera.position.z += carSpeed;
                    break;
                case 'a':
                    
                    camera.position.x -= carSpeed;
                    break;
                case 'd':
                   
                    camera.position.x += carSpeed;
                    break;
            }
        }
    });
}

moveCar();
animate();
