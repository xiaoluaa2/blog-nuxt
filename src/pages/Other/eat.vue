<template>
  <NuxtLayout name="noside">
    <div class="zhuanpan">
      <div class="bt">
        <div class="checkbox">
          <label class="cyberpunk-checkbox-label">
            <input
              v-model="showzhushi"
              type="checkbox"
              checked
              class="cyberpunk-checkbox"
            />
            主食</label
          >
          <label class="cyberpunk-checkbox-label">
            <input
              v-model="showshucai"
              type="checkbox"
              checked
              class="cyberpunk-checkbox"
            />
            蔬菜</label
          >
          <label class="cyberpunk-checkbox-label">
            <input
              v-model="showdanbaizhi"
              type="checkbox"
              checked
              class="cyberpunk-checkbox"
            />
            蛋白质</label
          >
          <label class="cyberpunk-checkbox-label">
            <input
              v-model="showshuiguo"
              type="checkbox"
              checked
              class="cyberpunk-checkbox"
            />
            水果</label
          >
        </div>
        <button class="button">
          <span @click="startFun">开始</span>
        </button>
      </div>
      <div class="top">
        <div v-if="showzhushi" class="line">
          <div ref="zhushiRef" class="inner">
            <div class="item" :key="item" v-for="item in zhushi">
              {{ item }}
            </div>
          </div>
        </div>
        <div v-if="showshucai" class="line">
          <div ref="shucaiRef" class="inner">
            <div class="item" :key="item" v-for="item in shucai">
              {{ item }}
            </div>
          </div>
        </div>
        <div v-if="showdanbaizhi" class="line">
          <div ref="danbaizhiRef" class="inner">
            <div class="item" :key="item" v-for="item in danbaizhi">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="line">
          <div v-if="showshuiguo" ref="shuiguoRef" class="inner">
            <div class="item" :key="item" v-for="item in shuiguo">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, nextTick } from 'vue'
let showzhushi = ref(true)
let showshucai = ref(true)
let showdanbaizhi = ref(true)
let showshuiguo = ref(true)
let zhushi = ref([
  '芋头',
  '玉米',
  '红薯',
  '紫薯',
  '土豆',
  '荞麦面',
  '意大利面',
  '芋头',
  '玉米',
  '红薯',
  '紫薯',
  '土豆',
])
let shucai = ref([
  '西兰花',
  '西红柿',
  '芹菜',
  '金针菇',
  '圆生菜',
  '黄瓜',
  '西兰花',
  '西红柿',
  '芹菜',
  '金针菇',
  '圆生菜',
])
let shuiguo = ref([
  '蓝莓',
  '橙子',
  '猕猴桃',
  '草莓',
  '苹果',
  '梨',
  '香蕉',
  '橘子',
  '桃子',
  '蓝莓',
  '橙子',
  '猕猴桃',
  '草莓',
  '苹果',
])
let danbaizhi = ref([
  '鸡蛋',
  '鸡胸肉',
  '牛肉',
  '鸡腿',
  '虾仁',
  '豆腐',
  '牛奶',
  '鸡蛋',
  '鸡胸肉',
  '牛肉',
  '鸡腿',
  '虾仁',
])
let zhushiRef = ref()
let shucaiRef = ref()
let shuiguoRef = ref()
let danbaizhiRef = ref()
let currentOffset = 0
let stoup = () => {
  timeList.forEach((element) => {
    clearInterval(element)
  })
}

let r = function () {
  return Math.floor(Math.random() * 10 + 20)
}
let t = function () {
  return Math.floor(Math.random() * 4000 + 3000)
}
let isclick = ref(true)
let startFun = () => {
  if (!isclick.value) return
  console.log(isclick.value)
  isclick.value = false
  start(r(), t(), zhushiRef.value)
  start(r(), t(), shucaiRef.value)
  start(r(), t(), shuiguoRef.value)
  start(r(), t(), danbaizhiRef.value)
  setTimeout(() => {
    isclick.value = true
  }, 7000)
}
let start = (r, t, dom) => {
  let ss = setInterval(() => {
    if (dom.scrollLeft + dom.clientWidth === dom.scrollWidth) {
      dom.scrollLeft = r
    }
    nextTick(() => {
      dom.scrollLeft += r
    })
  }, 20)
  setTimeout(() => {
    clearInterval(ss)
  }, t)

  // 设置轮播间隔
  // const interval = setInterval(() => {
  //   currentOffset -= 180 // 向左滚动
  //   zhushiRef.value.style.transform = `translateX(${currentOffset}px)`
  //   if (currentOffset <= -zhushiRef.value.offsetWidth / 2) {
  //     currentOffset = 0 // 重置滚动位置
  //   }
  // }, 2000) // 每隔3秒滚动一次，可以根据需要调整间隔时间
}
</script>

<style lang="less" scoped>
.button {
  width: 150px;
  padding: 0;
  margin-bottom: 40px;
  border: none;
  transform: rotate(5deg);
  transform-origin: center;
  font-family: 'Gochi Hand', cursive;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  padding-bottom: 3px;
  border-radius: 5px;
  box-shadow: 0 2px 0 #494a4b;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: #5cdb95;
}

.button span {
  background: #f1f5f8;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #494a4b;
}

.button:active {
  transform: translateY(5px);
  padding-bottom: 0px;
  outline: 0;
}

.zhuanpan {
  display: flex;
  flex-direction: column;
  align-items: center;
  .bt {
    display: flex;
    margin-bottom: 200px;
    align-items: center;
    .checkbox {
      margin-right: 50px;
    }
  }
  .top {
    ::-webkit-scrollbar {
      height: 0px;
    }
    margin-left: 100px;
    position: relative;
    &::after {
      content: '';
      width: 5px;
      height: 150%;
      background: linear-gradient(
        to right,
        #77530a,
        #ffd277,
        #77530a,
        #77530a,
        #ffd277,
        #77530a
      );
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .line {
      overflow: hidden;
      height: 70px;
      width: 70vw;

      margin-block: 5px;
      .inner {
        display: flex;
        width: 100%;
        overflow: scroll;
        .item {
          box-sizing: border-box;
          width: 180px;
          height: 100%;
          flex-shrink: 0;
          text-align: center;
          line-height: 70px;
          margin-right: 5px;
          justify-content: center;
          align-items: center;
          background: #606c88;
          background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
          background: linear-gradient(to right top, #3f4c6b, #606c88);
          color: #fff;
          border-radius: 5px;
        }
      }
    }
  }
}
.cyberpunk-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #30cfd0;
  border-radius: 5px;
  background-color: transparent;
  display: inline-block;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
}

.cyberpunk-checkbox:before {
  content: '';
  background-color: #30cfd0;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}

.cyberpunk-checkbox:checked:before {
  transform: translate(-50%, -50%) scale(1);
}

.cyberpunk-checkbox-label {
  font-size: 18px;
  color: #333;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}
</style>
