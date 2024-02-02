<template>
  <div class="car-box">
    <div ref="canvasDom" class="car-page"></div>
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
        <span v-if="!runing" @click="run" style="margin-right: 2rem;">RUN</span>
        <span v-else @click="stop" style="margin-right: 2rem;">STOP</span>
        <span style="margin-right: 2rem;" @click="nextCar">下一辆</span>

        <span v-if="!isLight" @click="openLight">开灯</span>
        <span v-else @click="closeLight" style="margin-right: 2rem;">关灯</span>
      </h2>
      <div v-if="loading" class="load-box">
        <div class="text">模型加载中 {{ percent }}</div>
        <div class="loader">

          <svg xml:space="preserve" viewBox="0 0 254.532 254.532" xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" class="wheel">
            <g>
              <path d="M127.267,0C57.092,0,0,57.091,0,127.266s57.092,127.266,127.267,127.266c70.174,0,127.266-57.091,127.266-127.266
				S197.44,0,127.267,0z M127.267,217.656c-49.922,0-90.391-40.468-90.391-90.39s40.469-90.39,90.391-90.39
				c49.92,0,90.39,40.468,90.39,90.39S177.186,217.656,127.267,217.656z" id="tire"></path>
              <path
                d="M127.267,48.578c-43.39,0-78.689,35.299-78.689,78.688c0,43.389,35.3,78.688,78.689,78.688
				c43.389,0,78.688-35.299,78.688-78.688C205.955,83.877,170.655,48.578,127.267,48.578z M195.878,122.249h-38.18
				c-0.78-4.825-2.686-9.275-5.435-13.079l26.954-26.954C188.679,93.112,194.771,106.996,195.878,122.249z M132.204,58.648
				c15.244,1.087,29.123,7.156,40.025,16.591l-26.948,26.949c-3.804-2.748-8.253-4.653-13.077-5.433V58.648z M122.329,58.648v38.106
				c-4.824,0.78-9.274,2.685-13.078,5.434L82.302,75.24C93.204,65.805,107.085,59.735,122.329,58.648z M75.313,82.217l26.955,26.954
				c-2.749,3.803-4.654,8.253-5.434,13.077h-38.18C59.761,106.996,65.853,93.113,75.313,82.217z M58.643,132.123h38.192
				c0.779,4.824,2.685,9.274,5.434,13.078l-27.029,27.029C65.788,161.308,59.714,147.398,58.643,132.123z M122.329,195.884
				c-15.285-1.09-29.197-7.188-40.113-16.666l27.035-27.035c3.804,2.749,8.254,4.654,13.078,5.434V195.884z M122.329,147.459v0.072
				c-2.131-0.518-4.131-1.36-5.953-2.474l0.047-0.047c-2.85-1.738-5.244-4.132-6.982-6.983l-0.046,0.046
				c-1.114-1.822-1.956-3.821-2.474-5.952h0.071c-0.385-1.585-0.611-3.233-0.611-4.937c0-1.704,0.227-3.352,0.611-4.937h-0.071
				c0.518-2.13,1.359-4.129,2.474-5.951l0.046,0.046c1.738-2.85,4.133-5.245,6.982-6.982l-0.047-0.047
				c1.822-1.114,3.822-1.957,5.953-2.474v0.072c1.586-0.385,3.233-0.612,4.938-0.612s3.352,0.227,4.938,0.612v-0.072
				c2.131,0.518,4.13,1.359,5.951,2.473l-0.047,0.047c2.851,1.737,5.245,4.132,6.983,6.982l0.046-0.046
				c1.115,1.822,1.957,3.822,2.475,5.953h-0.071c0.385,1.585,0.611,3.233,0.611,4.937c0,1.704-0.227,3.352-0.611,4.937h0.071
				c-0.518,2.131-1.359,4.131-2.475,5.953l-0.046-0.046c-1.738,2.85-4.133,5.244-6.983,6.982l0.047,0.046
				c-1.821,1.114-3.82,1.956-5.951,2.474v-0.072c-1.586,0.385-3.233,0.612-4.938,0.612S123.915,147.845,122.329,147.459z
				M132.204,195.884v-38.267c4.824-0.78,9.273-2.685,13.077-5.433l27.034,27.034C161.4,188.696,147.488,194.794,132.204,195.884z
				M179.292,172.23l-27.028-27.028c2.749-3.804,4.654-8.254,5.435-13.079h38.191C194.818,147.398,188.745,161.308,179.292,172.23z"
                id="rim"></path>
            </g>
          </svg>
          <div class="road"></div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup lang='ts'>

// import texture from '/texture/floor/Wood067_1K-JPG_Color.jpg';
// import doorHeightTexture from '@/public/texture/floor/Wood067_1K-JPG_Displacement.jpg';
// import normalMap from '@/public/texture/floor/Wood067_1K-JPG_NormalDX.jpg';
// import roughnessTexture from '@/public/texture/floor/Wood067_1K-JPG_Roughness.jpg';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, ref } from "vue";

let controls: any;
let scene: any, camera: any, renderer: any
let canvasDom = ref()
let loading = ref(true)
const render = () => {
  renderer.render(scene, camera);
  controls && controls.update();
  //更新补间动画
  TWEEN.update();
  console.log('2222');

  requestAnimationFrame(render);
};
let gridHelper: any, animationId: any
let runing = ref(false)
//车灯
let isLight = ref(false)
let car_light_sphere: any[] = [], car_light_spotLight: any[] = []




let openLight = () => {
  car_light_sphere.forEach((item: any) => {
    item.intensity = .2

  })
  car_light_spotLight.forEach((item: any) => {
    item.angle = Math.PI / 6;
  })


  // renderer.render(scene, camera);
  isLight.value = true
}

let closeLight = () => {
  car_light_sphere.forEach((item: any) => {
    item.intensity = 0
  })
  car_light_spotLight.forEach((item: any) => {
    item.angle = 0
  })

  console.log('zzzzzzzzzzzzzz');
  isLight.value = false
}

let run = () => {
  // 车轮模拟滚动

  road.visible = true;
  runing.value = true
  const time = - performance.now() / 1000;
  console.log(wheels);
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = -time * Math.PI * 2;
  }
  for (let i = 0; i < wheels2.length; i++) {
    wheels2[i].rotation.x = time * Math.PI * 2;
  }

  console.log(road);
  // 网格移动 与 车轮模拟滚动 ，从而制造车子向前移动的效果
  road.children[1].position.x = (time) % 1 + .5


  renderer.render(scene, camera);
  controls && controls.update();
  animationId = requestAnimationFrame(run);




}
function stop() {
  road.visible = false;
  runing.value = false
  cancelAnimationFrame(animationId);
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



let carList = ['/model/car5_0108.glb', '/model/car3-pipeline.glb', '/model/car6-pipeline.glb',]
let activeCar = 0

let cheshen = [[8, 10, 34, 36, 38, 90, 88, 238, 451, 454, 457, 460, 36, 92, 'Object_139_10', 'Object_155_11'], [2, 4, 8, 10, 12, 26, 30, 34, 36], [56, 60, 62, 64, 66, 68, 70, 58],]
let lungu = [[409, 411, 419, 412, 414, 421, 422, 424, 433, 431, 434, 436, 441, 436, 446, 447,], [160, 158, 156, 154, 162, 168, 171, 165], [4, 8, 9, 22, 17, 31, 41, 21, 30, 31, 37, 41, 13, 45, 46, 52]]
let lungu2 = [[421, 422, 424, 443, 448, 444], [], [],]

let flag = false
let nextCar = () => {
  if (loading.value || flag) {
    return
  }
  flag = true
  stop()
  closeLight()
  nextCarCirculation()
}

let nextCarCirculation = () => {
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
    carLoad.position.x += 0.1
    requestAnimationFrame(nextCarCirculation);
  }
}
let loader: any, dracoLoader, carLoad: any
let percent = ref('0')

let door = {
  left: {
    open: false,
    list: [] as any[]
  },
  right: {
    open: false,
    list: [] as any[]
  }
}

// 定义放大动画函数
function zoomInOut(object: any) {
  const scaleStart = object.scale.y; // 获取当前比例值作为起点
  const scaleEnd = scaleStart === 1.5 ? 1 : 1.5; // 根据当前比例值判断目标比例值（如果已经是最大比例则变小）
  const duration = 1000; // 持续时间为1秒

  let tween = new TWEEN.Tween({ y: scaleStart })
    .to({ y: scaleEnd }, duration)
    .onUpdate((obj: any, duration: any) => {
      object.scale.y = obj.y; // 更新物体的比例值
      object.scale.x = obj.y; // 更新物体的比例值
      object.scale.z = obj.y; // 更新物体的比例值
      if (duration == 1) {
        zoomInOut(object)
      }
    })
    .start();


  // zoomInOut(object)
}

// 添加gltf汽车模型
let loadCar = () => {
  scene.remove(carLoad)
  loader = new GLTFLoader();
  dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  loader.setDRACOLoader(dracoLoader);
  loading.value = true
  loader.load(carList[activeCar],
    (gltf: any) => {
      carLoad = gltf.scene;
      console.log(gltf);
      carLoad.traverse((child: any) => {
        if (activeCar == 0) {

          if (child.name.includes("Object_139")) {

            door.right.list.push(child)
          }
          if (child.name == "Object_139_10") {
            const geometry = new THREE.SphereGeometry(0.05, 32, 16);
            const material = new THREE.MeshStandardMaterial({ color: 0x080899, emissive: 0x80899, metalness: 0, roughness: 5, });
            const sphere = new THREE.Mesh(geometry, material);



            const sunRundGeo = new THREE.SphereGeometry(0.07, 32, 32)
            const rundSun = new THREE.ShaderMaterial({
              vertexShader: sunRundVertexTexture,
              fragmentShader: sunRundFragmentTexture,
              side: THREE.BackSide,
              uniforms: {
                uTime: { value: 0 },
                uPerlin: { value: null }
              }
            })
            const texturedSunRund = new THREE.Mesh(sunRundGeo, rundSun)


            const group = new THREE.Group();
            group.add(sphere);
            group.add(texturedSunRund);
            sphere.name = 'right_door_tip'
            texturedSunRund.name = 'right_door_tip_o'
            group.position.set(-0.1, -0.3, -0.05);
            zoomInOut(group)
            child.add(group)

          }
          if (child.name == "Object_155_11") {
            const geometry = new THREE.SphereGeometry(0.05, 32, 16);
            const material = new THREE.MeshStandardMaterial({ color: 0x080899, emissive: 0x80899, metalness: 0, roughness: 5, });
            const sphere = new THREE.Mesh(geometry, material);

            const sunRundGeo = new THREE.SphereGeometry(0.07, 32, 32)
            const rundSun = new THREE.ShaderMaterial({
              vertexShader: sunRundVertexTexture,
              fragmentShader: sunRundFragmentTexture,
              side: THREE.BackSide,
              uniforms: {
                uTime: { value: 0 },
                uPerlin: { value: null }
              }
            })
            const texturedSunRund = new THREE.Mesh(sunRundGeo, rundSun)


            const group = new THREE.Group();
            group.add(sphere);
            group.add(texturedSunRund);
            sphere.name = 'left_door_tip'
            texturedSunRund.name = 'left_door_tip_o'
            group.position.set(0.1, -0.3, -0.05);
            zoomInOut(group)
            child.add(group)
          }
          if (child.name.includes("Object_155")) {
            door.left.list.push(child)
          }
          if (child.name == "Object_118" || child.name == "Object_118001") {
            // if (child.isMesh && child.name.includes("118")) {
            console.log(child);

            const spotLight = new THREE.SpotLight(0xffffff);
            // const spotLight = new THREE.PointLight(0xffffff);
            spotLight.position.set(0, 0, 0);
            spotLight.castShadow = true;
            spotLight.intensity = 2;
            // 设置阴影贴图模糊度
            spotLight.shadow.radius = 20;
            // 设置阴影贴图的分辨率
            spotLight.shadow.mapSize.set(512, 512);
            // spotLight.angle = Math.PI / 6;
            spotLight.angle = 0;
            spotLight.distance = 0;
            // spotLight.penumbra = 0;
            spotLight.decay = 0;
            // 透明的box
            var geom = new THREE.BoxGeometry(0.1, 1, 0.1) // 创建几何对象geom
            var material = new THREE.MeshBasicMaterial({ color: 0xffffff }) // 创建材质对象material.
            material.transparent = true;
            material.opacity = 0
            material.visible = false
            var cube = new THREE.Mesh(geom, material) // 创建网格对象cube
            cube.position.set(10, 0, 0);
            spotLight.target = cube;
            scene.add(cube);
            // 点光源
            var material2 = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10 }) // 创建材质对象material.
            const pointLight = new THREE.PointLight(0xffffff, 0);
            pointLight.castShadow = true
            let sphereGeometry = new THREE.SphereGeometry(0.02, 32, 32) // 创建几何对象geom
            let sphere = new THREE.Mesh(sphereGeometry, material2) // 创建网格对象cube
            sphere.position.set(0, 0.01, 0);
            sphere.add(pointLight)


            car_light_sphere.push(pointLight)
            car_light_spotLight.push(spotLight)

            child.add(sphere)
            child.add(spotLight)






            // carBody = child;
            // carBody.material = bodyMaterial;
          }

          // const material = new THREE.MeshPhysicalMaterial()
          // child.material = material;
          // 投射阴影
          child.castShadow = true

        }
        // console.log(child.name);



        // if (child.isMesh && child.name == 'Object_139') {
        // if (child.isMesh && child.name.includes("92")) {
        //   console.log(child.name);

        //   carBody = child;
        //   carBody.material = bodyMaterial;
        // }

        // 判断是否是轮毂
        if (child.isMesh && lungu[activeCar].indexOf(parseInt(child.name.substring(7))) > -1) {
          // if (child.isMesh && child.name.includes("165")) {
          // console.log(child.name);

          // child.material = wheelsMaterial;
          wheels.push(child);
        }
        if (child.isMesh && lungu2[activeCar].indexOf(parseInt(child.name.substring(7))) > -1) {
          wheels2.push(child);
        }

        // 判断是否是车身 
        //  17 31 41 21 30 31 37 41 13 45 46 52
        if (child.isMesh && (cheshen[activeCar].indexOf(parseInt(child.name.substring(7))) > -1 || cheshen[activeCar].indexOf(child.name) > -1)) {
          carBody = child;
          carBody.material = bodyMaterial;
        }


      });
      scene.add(carLoad);
      carLoad.position.x = -10
      carLoad.rotation.y = Math.PI / 2



      carLoad.receiveShadow = true
      carAppear()
      loading.value = false
      door.left.open = false
      door.right.open = false


      // 



    }, (xhr: any) => {
      console.log(xhr.loaded / xhr.total * 100);
      percent.value = (xhr.loaded / xhr.total * 100).toFixed(2) + '%'
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
    flag = false
    return
  } else {
    carLoad.position.x += 0.1
    requestAnimationFrame(carAppear);
  }
}
// 创建射线检测器
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function onDocumentMouseDown(event: any) {

  event.preventDefault();


  // 计算鼠标在canvas中的坐标
  // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  mouse.x = ((event.clientX - canvasDom.value.offsetLeft) / canvasDom.value.clientWidth) * 2 - 1; // dom.offsetLeft -- dom元素距离浏览器左侧的距离   dom.clientWidth -- dom元素宽度
  mouse.y = -((event.clientY - canvasDom.value.offsetTop) / canvasDom.value.clientHeight) * 2 + 1; // dom.offsetTop -- dom元素距离浏览器顶部的距离    dom.clientHeight -- dom元素高度

  // 把鼠标坐标转换为three.js中的坐标
  raycaster.setFromCamera(mouse, camera);
  console.log(raycaster);
  // 计算射线和立方体的交点
  var intersects = raycaster.intersectObjects(scene.children, true);
  console.log(intersects);
  // 处理点击事件
  if (intersects.length > 0) {
    for (let i = 0; i < intersects.length; i++) {
      console.log(intersects[i].object);

      if (intersects[i].object.name.includes('Object_139') || intersects[i].object.name.includes('right_door_tip')) {


        if (door.right.open) {
          door.right.list.forEach((obj: any) => {
            const time = - performance.now() / 1000;
            //补间动画
            const tween = new TWEEN.Tween({ value: -60 });
            tween.to({ value: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function (lastLocation: any) {
              // obj.rotation.z = -.1 * Math.PI * 2;
              obj.rotation.z = THREE.MathUtils.degToRad(lastLocation.value)
            });

            //启动补间动画
            tween.start();
          })
        } else {
          door.right.list.forEach((obj: any) => {

            //补间动画

            const tween = new TWEEN.Tween({ value: 0 });
            tween.to({ value: -60 }, 1000).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function (lastLocation: any) {
              obj.rotation.z = THREE.MathUtils.degToRad(lastLocation.value)
            });


            //启动补间动画
            tween.start();
          })
        }

        door.right.open = !door.right.open
        return


      }
      else if (intersects[i].object.name.includes('Object_155') || intersects[i].object.name.includes('left_door_tip')) {

        if (door.left.open) {
          door.left.list.forEach((obj: any) => {
            const time = - performance.now() / 1000;

            //补间动画

            const tween = new TWEEN.Tween({ value: 60 });
            console.log(tween);

            tween.to({ value: 0 }, 1000).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function (lastLocation: any) {
              obj.rotation.z = THREE.MathUtils.degToRad(lastLocation.value)
            });


            //启动补间动画
            tween.start();
          })
        } else {
          door.left.list.forEach((obj: any) => {
            const time = - performance.now() / 1000;
            //补间动画
            const tween = new TWEEN.Tween({ value: 0 });
            tween.to({ value: 60 }, 1000).easing(TWEEN.Easing.Cubic.InOut).onUpdate(function (lastLocation: any) {
              obj.rotation.z = THREE.MathUtils.degToRad(lastLocation.value)
            });


            //启动补间动画
            tween.start();
          })
        }


        door.left.open = !door.left.open
        return


      }
    }
  }
}
const road = new THREE.Group();
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
  camera.position.set(0, 2, 6);
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true
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
  // light1.castShadow = true
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  // light2.castShadow = true
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  // light3.castShadow = true
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  // light4.castShadow = true
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  // light5.castShadow = true
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5, 10, 0);
  // light6.castShadow = true
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0, 10, 5);
  // light7.castShadow = true
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0, 10, -5);
  // light8.castShadow = true
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5, 10, 0);
  // light9.castShadow = true
  scene.add(light9);
  const light = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(light);
  // 添加网格地面
  gridHelper = new THREE.GridHelper(4, 10);
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  gridHelper.position.set(1.7, 0.02, 0.02);
  const planeGeometry2 = new THREE.PlaneGeometry(5, 4)
  const material2 = new THREE.MeshBasicMaterial({
    color: '#ccc'
  })
  let floor2 = new THREE.Mesh(planeGeometry2, material2)
  floor2.rotation.x = -Math.PI / 2;
  floor2.position.set(0.02, 0.02, 0.02);

  road.add(floor2).add(gridHelper);



  road.visible = false;
  road.rotation.x = Math.PI / 2;


  let textureLoader = new THREE.TextureLoader
  let texture = textureLoader.load('/texture/floor/Wood067_1K-JPG_Color.jpg')
  // 法向贴图 
  var normalMap = textureLoader.load('/texture/floor/Wood067_1K-JPG_NormalDX.jpg');
  // 粗糙度纹理
  const roughnessTexture = textureLoader.load('/texture/floor/Wood067_1K-JPG_Roughness.jpg')
  // 导入置换贴图
  const doorHeightTexture = textureLoader.load('/texture/floor/Wood067_1K-JPG_Displacement.jpg')


  const material = new THREE.MeshPhysicalMaterial(
    {
      map: texture,
      normalMap: normalMap,
      // normalScale: new THREE.Vector2(1, 1),
      // 设置粗糙度
      roughness: 1,
      // 改变材质的粗糙度
      roughnessMap: roughnessTexture,
      // 置换贴图
      displacementMap: doorHeightTexture,
      // 影响程度（5cm）
      displacementScale: 0.05,
      // 允许透明
      transparent: true,
      // 透明度贴图
      // alphaMap: alphaMap,
    }
  )
  // const material = new THREE.MeshBasicMaterial()
  const planeGeometry = new THREE.PlaneGeometry(25, 8)




  let floor = new THREE.Mesh(planeGeometry, material)
  floor.add(road);
  floor.rotation.x = -Math.PI / 2;


  // 接受阴影
  floor.receiveShadow = true
  scene.add(floor);



  window.addEventListener("mousedown", onDocumentMouseDown, false);




  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
      //   双击控制屏幕进入全屏，退出全屏
      // 让画布对象全屏
      renderer.domElement.requestFullscreen();
    } else {
      //   退出全屏，使用document对象
      document.exitFullscreen();
    }
  });

});


const sunRundVertexTexture =
  `
void main()
{
    gl_Position = projectionMatrix  * modelViewMatrix * vec4(position, 1.0);
}`

const sunRundFragmentTexture =
  `

void main()
{
gl_FragColor = vec4(0.0,0.0,0.0,0.0);

}`




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
  top: 4.3rem;
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








.load-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    font-weight: 700;
    margin-bottom: 15px;
    color: rgb(204, 90, 90);
  }
}

.loader {
  position: relative;
  overflow: hidden;
}

.wheel {
  fill: rgb(204, 90, 90);
  font-size: 100px;
  width: 100px;
  height: 100px;
  border-radius: 6em;
  text-align: center;
  animation: rolling 1s linear infinite;
}

#rim {
  fill: rgb(204, 90, 90);
}

#tire {
  fill: rgb(219, 64, 64);
}

.road {
  position: absolute;
  margin-top: -4px;
  width: 100%;
  height: 8px;
  border-radius: 5em;
  background-color: rgb(204, 90, 90);
  animation: road-move 2s linear infinite;
}

@keyframes rolling {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes road-move {
  from {
    transform: translateX(-140%);
  }

  to {
    transform: translateX(100%);
  }
}
</style>