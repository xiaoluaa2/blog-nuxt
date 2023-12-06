<!--  -->
<template>
  <div @click="link" class="footer-page">
    『小鹿』冀ICP备2023042342号-1
  </div>
</template>

<script setup lang='ts'>
let link = () => [
  window.open('https://beian.miit.gov.cn')
]
</script>
<style lang='less' scoped>
.footer-page {
  cursor: pointer;
  padding: 30px 20px;
  text-align: center;
  color: #fff;
}
</style>