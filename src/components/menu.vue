<template>
  <div>
    <div v-if="btnFlag" class="main">
      <div class="up">
        <button @click="changeTheme" class="card1">
          <i class="iconfont">&#xfe89;</i>
        </button>
        <button @click="backTop" class="card2">
          <i class="iconfont">&#xe624;</i>
        </button>
      </div>
      <div class="down">
        <button class="card3">
          <i class="iconfont">&#xe63b;</i>
        </button>
        <button class="card4">
          <i class="iconfont">&#xe61f;</i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
let btnFlag = ref(false)
let scrollTop = ref(0)
const scrollToTop = () => {

  let aftertop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

  if (scrollTop.value > 60 && aftertop - scrollTop.value < 0) {
    btnFlag.value = true
  } else {
    btnFlag.value = false
  }
  scrollTop.value = aftertop
}
let backTop = () => {
  // js平滑滚动
  // let timer = setInterval(() => {
  //   let ispeed = Math.floor(-scrollTop.value / 5)
  //   document.documentElement.scrollTop = document.body.scrollTop = scrollTop.value += ispeed
  //   if (scrollTop.value === 0) {
  //     clearInterval(timer)
  //   }
  // }, 16)
  document.documentElement.scrollTop = 0
}
onMounted(() => {
  window.addEventListener('scroll', scrollToTop)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollToTop)
})

const $store = useStore.common()
let theme = $store.theme
//更改背景

let changeTheme = () => {
  theme = (theme == 'black' ? 'normal' : 'black')
  bus.$emit('changeTheme', theme)
  bus.$emit('changeMessageBg', theme)
  $store.setTheme(theme)
  setTheme(theme)
}

</script>
<style lang="less" scoped>
@media screen and (max-width: 768px) {
  .main {
    display: none !important;
  }
}


.main {
  position: fixed;
  right: 40px;
  bottom: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  i {
    font-size: 2rem;
  }
}

.up {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.down {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.card1 {
  width: 90px;
  height: 90px;
  outline: none;
  border: none;
  background: white;
  border-radius: 90px 5px 5px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.instagram {
  margin-top: 1.5em;
  margin-left: 1.2em;
  fill: #cc39a4;
}

.card2 {
  width: 90px;
  height: 90px;
  outline: none;
  border: none;
  background: white;
  border-radius: 5px 90px 5px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.twitter {
  margin-top: 1.5em;
  margin-left: -.9em;
  fill: #03A9F4;
}

.card3 {
  width: 90px;
  height: 90px;
  outline: none;
  border: none;
  background: white;
  border-radius: 5px 5px 5px 90px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.github {
  margin-top: -.6em;
  margin-left: 1.2em;
}

.card4 {
  width: 90px;
  height: 90px;
  outline: none;
  border: none;
  background: white;
  border-radius: 5px 5px 90px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.discord {
  margin-top: -.9em;
  margin-left: -1.2em;
  fill: #8c9eff;
}

.card1:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #cc39a4;
}

.card1:hover .instagram {
  fill: white;
}

.card2:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #03A9F4;
}

.card2:hover .twitter {
  fill: white;
}

.card3:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: black;
}

.card3:hover .github {
  fill: white;
}

.card4:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #8c9eff;
}

.card4:hover .discord {
  fill: white;
}
</style>
