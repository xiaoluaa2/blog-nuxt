<template>
  <div class="app">
    <div class="load_main" v-if="!loaded">
      <div class="spinner-container">
        <div class="spinner">
          <div class="spinner">
            <div class="spinner">
              <div class="spinner">
                <div class="spinner">
                  <div class="spinner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive v-show="loaded" max="10">
      <NuxtLayout>
        <NuxtPage />
        <LuMusic></LuMusic>
      </NuxtLayout>
    </keep-alive>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '小鹿',
  meta: [
    { hid: 'keywords', name: 'keywords', content: '小鹿的个人博客,lubowen,个人网站,个人博客,开源博客' },
    { hid: 'description', name: 'description', content: '小鹿的个人博客-独立开源、全栈开发、多端自适应、nuxt3+nestjs+vue3、功能完善' }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
import { onMounted } from 'vue'
let loaded = ref(false)
onMounted(() => {
  const $store = useStore.common()
  let theme = $store.theme
  if (theme) {
    initTheme(theme)
  }
  loaded.value = true
})
// import Header from '@/components/Header.vue';
</script>
<style lang="less" scoped>
.app {
  position: relative;
}
</style>
<style lang="less">
.load_main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(@/assets/images/bg13.jpg) no-repeat 100% / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;

  .spinner-container {
    width: 150px;
    height: 150px;
    position: relative;
    margin: 30px auto;
    overflow: hidden;
  }

  .spinner {
    position: absolute;
    width: calc(100% - 9.9px);
    height: calc(100% - 9.9px);
    border: 5px solid transparent;
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.79) infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
