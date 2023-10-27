<template>
  <transition name="head">
    <div :class="(scrollTop > 84 && showHead) || OpenMobileMenu ? 'header_common_white' : ''"
      v-show="showHead || OpenMobileMenu" class="header">
      <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" router :ellipsis="false"
        @select="handleSelect">
        <span class="logo">Lu's Blog</span>
        <div class="flex-grow" />
        <el-menu-item index="/">博客</el-menu-item>
        <el-menu-item index="/MessageBoard">留言</el-menu-item>
        <el-menu-item index="3">访问</el-menu-item>
        <el-menu-item index="/other">其他</el-menu-item>
      </el-menu>
      <div class="MobileMenuSwitch">
        <span class="logo">Lu's Blog</span>
        <!-- <svg v-if="OpenMobileMenu" @click="showMenu" class="icon" aria-hidden="true">
          <use xlink:href="#icon-close-333"></use>
        </svg>
        <svg v-else-if="scrollTop > 84 && !OpenMobileMenu" @click="showMenu" class="icon" aria-hidden="true">
          <use xlink:href="#icon-menu-333"></use>
        </svg>
        <svg v-else @click="showMenu" class="icon" aria-hidden="true">
          <use xlink:href="#icon-menu"></use>
        </svg> -->

        <i v-if="OpenMobileMenu" class="iconfont">&#xe602;</i>
        <i v-else-if="scrollTop > 84 && !OpenMobileMenu" class="iconfont">&#xe602;</i>
        <i v-else class="iconfont">&#xe721;</i>

      </div>
    </div>
  </transition>

  <div :style="OpenMobileMenu ? '' : 'display: none;'" class="mobile_menu_detail">
    <div class="menu_list">
      <div @click="checkMenu(item)" v-for="item in menuList" :key="item.id" class="menu_item">
        {{ item.title }}
        <i class="iconfont">&#xe616;</i>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

type Menu = {
  title: string
  id: string
  route: string
}
let router = useRouter()
let menuList = ref<Menu[]>([
  { title: '博客', id: '1', route: '' },
  { title: '留言', id: '2', route: 'MessageBoard' },
  { title: '访问', id: '3', route: '' },
  { title: '其他', id: '4', route: '' }
])

let menu_checked = ref('1')
onMounted(() => {
  menu_checked.value = sessionStorage.getItem('menu_checked') ? (sessionStorage.getItem('menu_checked') as string) : '1'
  //给页面绑定滑轮滚动事件  
  if (localStorage.getItem('activeIndex')) {
    activeIndex.value = localStorage.getItem('activeIndex') as string
  }
  if (document.addEventListener) {//firefox  
    document.addEventListener('scroll', scrollFunc, false);
  }

})

// 移动端导航
let OpenMobileMenu = ref(false)
let showMenu = () => {
  OpenMobileMenu.value = !OpenMobileMenu.value
  console.log(OpenMobileMenu.value)
}
let checkMenu = (item: Menu) => {
  // sessionStorage.setItem('menu_checked', item.id)
  menu_checked.value = item.id
  router.push(item.route)
  OpenMobileMenu.value = false
}

const activeIndex = ref('blogs')

const handleSelect = (key: string, keyPath: string[]) => {
  localStorage.setItem('activeIndex', key)
}


let showHead = ref(true)
let scrollTop = ref(0)
let scrollFunc = function () {
  var aftertop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;//兼容
  if (aftertop - scrollTop.value > 0) {
    showHead.value = false
  } else {
    showHead.value = true
  }
  scrollTop.value = aftertop;

}





</script>
<style lang="less">
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';
  /* Project id 4304967 */
  src:
    url('//at.alicdn.com/t/c/font_4304967_vj858zqbzmh.woff2?t=1698397255321') format('woff2');
}

.header {

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color: #ffffff00 !important;
  }

  .el-menu--horizontal {
    border: none;

  }

  .el-menu-item {
    font-size: 1.06rem;
  }

  .el-menu--horizontal>.el-menu-item.is-active {
    color: orange !important;
    border: none
  }
}

// .header_common_white {
//   .el-menu {
//     .is-active {
//       color: orange !important;
//       border: none
//     }
//   }

// }
</style>
<style lang="less" scoped>
@media only screen and (max-device-width: 768px) {
  .header {
    .el-menu {
      display: none;
    }

    .MobileMenuSwitch {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 2rem;

      .iconfont {
        font-size: 2.5rem;
      }

      .logo {
        color: #fff;
        margin-left: 20px;
      }

      svg {
        color: #fff;
        margin-right: 20px;
      }
    }
  }

  .mobile_menu_detail {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99999;
    position: fixed;
    top: 4.3rem;
    bottom: 0;
    left: 0;
    right: 0;

    .menu_list {
      background-color: #fff;
      display: flex;
      flex-direction: column;

      .menu_item {
        height: 24px;
        border-bottom: 1px solid #ebedf0;
        margin: 10px 16px;
      }
    }
  }
}

@media only screen and (min-device-width: 768px) {
  .header {
    .MobileMenuSwitch {
      display: none;
    }
  }
}

.header_common_white {
  background-color: #fff !important;
  box-shadow: 0px 0px 25px 4px rgba(71, 71, 71, 0.12);

  .logo {
    color: #333 !important;
  }

  .el-menu {
    background-color: #ffffff00;
    align-items: center;
    width: 100%;
    padding: 0 5rem;
    margin: 0 auto;

    .el-menu-item {
      color: #333 !important;
      padding: 0 1.25rem;
    }

    .is-active {
      color: orange !important;
    }
  }
}

.head-enter-active {
  animation: bound-in .5s;
}

.head-leave-active {
  animation: bound-out .5s;
}

@keyframes bound-in {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 50;
  }

  100% {
    opacity: 100;
  }
}

@keyframes bound-out {
  0% {
    opacity: 100;
  }

  50% {
    opacity: 50;
  }

  100% {
    opacity: 0;
  }
}

.header {
  display: flex;
  align-items: center;
  position: fixed;
  // opacity: 0.9;
  height: 4.3rem;
  left: 0;
  top: 0;

  &:hover {
    background-color: #00000050;
  }

  // box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.09);
  z-index: 10000;
  width: 100%;
  background-color: #ffffff00;

  .logo {
    color: #fff;
    font-size: 1.2rem;
  }

  .el-menu {
    background-color: #ffffff00;
    align-items: center;
    width: 100%;
    padding: 0 5rem;
    margin: 0 auto;

    .el-menu-item {
      color: #fff;
      padding: 0 1.25rem;
    }
  }

  .flex-grow {
    flex-grow: 1;
  }
}
</style>
