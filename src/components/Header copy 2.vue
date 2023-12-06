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
        <el-menu-item index="/about">关于</el-menu-item>
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


        <i @click="showMenu" v-if="scrollTop > 84" class="iconfont">&#xfe8a;</i>
        <i @click="showMenu" v-else class="iconfont">&#xe602;</i>

      </div>
    </div>
  </transition>

  <div :style="OpenMobileMenu ? '' : 'display: none;'" class="mobile_menu_box">
    <div class="mobile_menu_detail">
      <div class="menu_list">
        <i @click="OpenMobileMenu = false" class="iconfont">&#xe6ca;</i>
        <div @click="checkMenu(item)" :class="menu_checked == item.id ? 'active' : ''" v-for="item in menuList"
          :key="item.id" class="menu_item">
          <div class="button-borders">
            <div class="inner">
              {{ item.title }}
            </div>
          </div>
        </div>
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
  { title: '博客', id: '1', route: '/' },
  { title: '留言', id: '2', route: '/MessageBoard' },
  { title: '关于', id: '3', route: '/about' },
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
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
// @font-face {
//   font-family: 'iconfont';
//   /* Project id 4304967 */
//   src:
//     url('//at.alicdn.@font-facecom/t/c/font_4304967_okvhbm8dvin.woff2?t=1698635578330') format('woff2');
// }

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
@media screen and (max-width: 768px) {
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
        font-size: 2rem;
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

  // .mobile_menu_detail {
  //   background-color: rgba(0, 0, 0, 0.7);
  //   z-index: 99999;
  //   position: fixed;
  //   top: 4.3rem;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;

  // }
  .mobile_menu_box {
    background: #07182E;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
  }

  .mobile_menu_detail {
    height: 100%;
    display: flex;
    place-content: center;
    place-items: center;
    overflow: hidden;
    border-radius: 20px;

    position: relative;



    .menu_list {

      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60%;
      z-index: 1;
      padding: 4rem 2rem;
      background-color: #fff;
      position: relative;

      i {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
      }




      .menu_item {
        .inner {
          width: 4rem;
          font-family: 'Ropa Sans', sans-serif;
          display: flex;
          align-items: center;
          /* font-family: 'Valorant', sans-serif; */
          color: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 0.05rem;
          border: 1px solid #0E1822;
          padding: 0.8rem 2.1rem;
          background-color: #0E1822;
          background-size: 200%;
          background-position: 200%;
          background-repeat: no-repeat;
          transition: 0.3s ease-in-out;
          transition-property: background-position, border, color;
          position: relative;
        }

        z-index: 1;
        display: flex;
        align-items: center;
        margin-bottom: 4rem;

        &:last-child {
          margin-bottom: 0;
        }

        .iconfont {
          margin-left: 5px;
        }

      }

      .active {
        border: 1px solid #FF4655;
        color: white;
        background-position: 40%;

        .inner {
          background-color: #FF4655;

          &:after {
            content: "";
            background-color: #fff;
          }

          &:before {
            content: "";
            background-color: #fff;
          }
        }
      }

      .inner:before {
        content: "";
        position: absolute;

        width: 0.2rem;
        height: 0.2rem;
        top: -1px;
        left: -1px;
        transition: background-color 0.15s ease-in-out;
      }

      .inner:after {
        content: "";
        position: absolute;
        background-color: #FF4655;
        width: 0.3rem;
        height: 0.3rem;
        bottom: -1px;
        right: -1px;
        transition: background-color 0.15s ease-in-out;
      }

      .button-borders {
        position: relative;
        width: fit-content;
        height: fit-content;
      }

      .button-borders:before {
        content: "";
        position: absolute;
        width: calc(100% + 0.5em);
        height: 50%;
        left: -0.3em;
        top: -0.3em;
        border: 1px solid #0E1822;
        border-bottom: 0px;
        /* opacity: 0.3; */
      }

      .button-borders:after {
        content: "";
        position: absolute;
        width: calc(100% + 0.5em);
        height: 50%;
        left: -0.3em;
        bottom: -0.3em;
        border: 1px solid #0E1822;
        border-top: 0px;
        /* opacity: 0.3; */
        z-index: 0;
      }

      .shape {
        fill: #0E1822;
      }

    }
  }

  .mobile_menu_detail::before {
    content: '';
    position: absolute;
    width: 100px;
    background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .mobile_menu_detail::after {
    content: '';
    position: absolute;
    background: #07182E;
    ;
    inset: 5px;
    border-radius: 15px;
  }
}

@media screen and (min-width: 768px) {
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
