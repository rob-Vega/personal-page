import * as THREE from "three";
import { randFloat } from "three/src/math/MathUtils";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default class ThreeJSScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.y = 5;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#webgl"),
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.manager = new THREE.LoadingManager();
    this.progressBar = document.querySelector("#progress-bar");
    this.manager.onProgress = (url, loaded, total) => {
      this.progressBar.value = (loaded / total) * 100;
    };
    this.progressBarContainer = document.querySelector(
      ".progress-bar-container"
    );
    this.content = document.getElementById("content");
    this.manager.onLoad = () => {
      this.isLoaded = true;
      this.progressBarContainer.style.display = "none";
      this.content.style.display = "block";
    };

    window.addEventListener("resize", () => this.onWindowResize());
    window.addEventListener("scroll", () => this.onWindowScroll());

    this.initLights();
    this.loadModel();
    this.initObjects();
    this.animate();
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight();
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0x0000ff, 1);
    this.directionalLight.position.set(0, -30, 0);
    this.scene.add(this.directionalLight);

    this.secondDirectionalLight = new THREE.DirectionalLight(0xff0000, 1);
    this.secondDirectionalLight.position.set(0, 30, 20);
    this.scene.add(this.secondDirectionalLight);
  }

  loadModel() {
    this.fatYoshi = null;

    const loader = new STLLoader(this.manager);
    loader.load(
      "models/fatYoshi.stl",
      (geometry) => {
        this.fatYoshi = new THREE.Mesh(
          geometry.center(),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        this.fatYoshi.scale.set(0.1, 0.1, 0.1);
        this.fatYoshi.position.set(6, 10, -20);
        this.fatYoshi.rotation.y = -0.5;
        this.scene.add(this.fatYoshi);
      },
      () => {},
      (error) => {
        console.log(error);
      }
    );
  }

  initObjects() {
    this.color = 0xffffff;

    this.dodecahedrons = Array(50)
      .fill()
      .map(() =>
        this.createObject(
          new THREE.DodecahedronGeometry(1, 0),
          new THREE.MeshStandardMaterial({ color: this.color })
        )
      );

    this.spheres = Array(200)
      .fill()
      .map(() =>
        this.createObject(
          new THREE.SphereGeometry(0.2, 24, 24),
          new THREE.MeshStandardMaterial({ color: this.color })
        )
      );
  }

  createObject(geometry, material) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(
      randFloat(-50, 50),
      randFloat(-50, 50),
      randFloat(-50, 50)
    );
    this.scene.add(object);
    return object;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.dodecahedrons.forEach((box) => {
      box.rotation.x += randFloat(0.001, 0.005);
      box.rotation.y += randFloat(0.001, 0.005);
    });

    if (this.isLoaded) this.fatYoshi.rotation.y -= 0.005;

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onWindowScroll() {
    const top = document.body.getBoundingClientRect().top;
    this.camera.position.z = top * -0.01;
  }
}
