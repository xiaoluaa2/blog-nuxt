<template>
  <div class="car-box">
    <div class="car-page">
      <div ref="canvasDom" class="convas-container"></div>
      <div class="home-content">
        <div class="home-content-title">
          <h1>汽车展示与选配</h1>
        </div>
        <h2>选择车身颜色</h2>
        <div class="select">
          <div class="select-item" v-for="(item, index) in colors" :key="index" @click="selectColor(index)">
            <div class="select-item-color" :style="{ backgroundColor: '#' + item }"></div>
          </div>
        </div>

        <h2>选择贴膜材质</h2>
        <div class="select">
          <div class="select-item" v-for="(item, index) in materials" :key="index" @click="selectMaterial(index)">
            <div class="select-item-text">{{ item.name }}</div>
          </div>
        </div>


        <h2 style="cursor: pointer;">
          <span @click="run" style="margin-right: 2rem;">RUN</span>
          <span @click="nextCar">下一辆</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, ref } from "vue";
let controls: any;
let scene: any, camera: any, renderer: any
let canvasDom = ref()
const render = () => {
  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
};
let gridHelper: any
let run = () => {
  // 车轮模拟滚动
  const time = - performance.now() / 1000;
  console.log(wheels);
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = -time * Math.PI * 2;
  }
  for (let i = 0; i < wheels2.length; i++) {
    wheels2[i].rotation.x = time * Math.PI * 2;
  }

  console.log(time);
  // 网格移动 与 车轮模拟滚动 ，从而制造车子向前移动的效果
  gridHelper.position.x = (time) % 1


  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(run);
}

// 创建材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x990202,
  metalness: 1,
  // 粗糙度
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});


let colors = ["990202", "00008B", "228B22", "C0C0C0", "FFD700", "C71585"];
let wheels: any[] = [];
let wheels2: any[] = [];

let carBody, frontCar, hoodCar, glassCar;
let selectColor = (index: number) => {
  bodyMaterial.color.set(parseInt('0x' + colors[index]));
};

let materials = [
  { name: "磨砂", value: 1 },
  { name: "冰晶", value: 0 },
];
let selectMaterial = (index: number) => {
  bodyMaterial.clearcoatRoughness = materials[index].value;
};



let carList = ['/model/car3.glb', '/model/car5.glb', '/model/car6.glb',]
let activeCar = 0

let cheshen = [[2, 4, 8, 10, 12, 26, 30, 34, 36], [8, 10, 34, 36, 38, 90, 88, 238, 451, 454, 457, 460, 36], [56, 60, 62, 64, 66, 68, 70, 58],]
let lungu = [[160, 158, 156, 154, 162, 168, 171, 165], [409, 411, 419, 412, 414, 421, 422, 424, 433, 431, 434, 436, 441, 436, 446, 447,], [4, 8, 9, 22, 17, 31, 41, 21, 30, 31, 37, 41, 13, 45, 46, 52]]
let lungu2 = [[], [421, 422, 424, 443, 448, 444], [],]
let nextCar = () => {
  const time = - performance.now() / 1000;
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = -time * Math.PI * 2;
  }
  for (let i = 0; i < wheels2.length; i++) {
    wheels2[i].rotation.x = time * Math.PI * 2;
  }
  if (
    carLoad.position.x >= 10
  ) {
    activeCar == carList.length - 1 ? activeCar = 0 : activeCar++
    loadCar()
    return
  } else {
    carLoad.position.x += 0.15
    console.log(carLoad.position.x);

    requestAnimationFrame(nextCar);
  }

}
let loader: any, dracoLoader, carLoad: any
// 添加gltf汽车模型
let loadCar = () => {
  scene.remove(carLoad)
  loader = new GLTFLoader();
  dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/gltf');
  loader.setDRACOLoader(dracoLoader);
  loader.load(carList[activeCar], (gltf: any) => {
    carLoad = gltf.scene;
    console.log(gltf);
    carLoad.traverse((child: any) => {
      // 判断是否是轮毂
      if (child.isMesh && lungu[activeCar].indexOf(parseInt(child.name.substring(7))) > -1) {
        // if (child.isMesh && child.name.includes("165")) {
        // console.log(child.name);

        // child.material = wheelsMaterial;
        console.log(child);
        wheels.push(child);
      }
      if (child.isMesh && lungu2[activeCar].indexOf(parseInt(child.name.substring(7))) > -1) {
        wheels2.push(child);
      }

      // 判断是否是车身 
      //  17 31 41 21 30 31 37 41 13 45 46 52
      if (child.isMesh && cheshen[activeCar].indexOf(parseInt(child.name.substring(7))) > -1) {
        // if (child.isMesh && child.name.includes("92222")) {
        carBody = child;
        console.log(child.name);

        carBody.material = bodyMaterial;
      }
    });
    scene.add(carLoad);
    carLoad.position.x = -10
    carLoad.rotation.y = Math.PI / 2
    carAppear()
  });

}
let carAppear = () => {
  const time = performance.now() / 1000;
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = time * Math.PI * 2;
  }
  for (let i = 0; i < wheels2.length; i++) {
    wheels2[i].rotation.x = -time * Math.PI * 2;
  }
  if (
    carLoad.position.x >= 0
  ) {
    return
  } else {
    carLoad.position.x += 0.15
    console.log(carLoad.position.x);
    requestAnimationFrame(carAppear);
  }
}
onMounted(() => {
  // 创建场景
  scene = new THREE.Scene();
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 8);
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 添加gltf汽车模型
  loadCar()
  // 把渲染器插入到dom中
  // console.log(canvasDom.value);
  canvasDom.value.appendChild(renderer.domElement);
  // 初始化渲染器，渲染背景
  renderer.setClearColor("#000");
  scene.background = new THREE.Color("#ccc");
  (scene.environment as any) = new THREE.Color("#ccc");
  render()
  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();


  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 0, 10);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5, 10, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0, 10, 5);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 10, -5);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5, 10, 0);
  scene.add(light9);
  // 添加网格地面
  gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);


});







</script>
<style lang='less' scoped>
.car-box {
  background-color: #ccc;
  overflow: hidden;
}

.car-page {
  margin-top: 4.3rem;
  position: relative;
}

* {
  margin: 0;
  padding: 0;
}

.home-content {
  position: absolute;
  top: 0;
  right: 20px;
}

.select-item-color {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
}

.select {
  display: flex;

  .select-item {
    cursor: pointer;


    .select-item-text {
      padding: 20px;
    }
  }
}
</style>