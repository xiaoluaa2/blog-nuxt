<template>
  <div>
    <Header></Header>
    <slot />
    <img v-if="btnFlag" class="go-top" src="@/assets/images/snowman.jpeg" @click="backTop" />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
let btnFlag = ref(false)
let scrollTop = ref(0)
const scrollToTop = () => {
  let scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  scrollTop.value = scrollT
  if (scrollTop.value > 60) {
    btnFlag.value = true
  } else {
    btnFlag.value = false
  }
}
let backTop = () => {
  let timer = setInterval(() => {
    let ispeed = Math.floor(-scrollTop.value / 5)
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop.value += ispeed
    if (scrollTop.value === 0) {
      clearInterval(timer)
    }
  }, 16)
}
onMounted(() => {
  window.addEventListener('scroll', scrollToTop)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollToTop)
})
</script>
<style lang="less" scoped>
@media only screen and (max-device-width: 768px) {
  .go-top {
    display: none;
  }
}

.go-top {
  position: fixed;
  width: 4rem;
  right: 40px;
  bottom: 150px;
  cursor: pointer;
}
</style>
