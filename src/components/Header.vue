<template>
  <transition name="head">
    <div :class="(scrollTop > 84 && showHead) || OpenMobileMenu ? 'header_common_white' : ''" v-show="showHead || OpenMobileMenu" class="header">
      <div class="menu">
        <span @click="goHome" class="logo">
          <div class="xioalu">小鹿</div>
          <i class="iconfont">&#xe65a;</i>
        </span>
        <div class="flex-grow" />
        <div @click="showDialog" class="search">
          <i class="iconfont">&#xe76d;</i>
        </div>
        <div class="theme">
          <theme-swith />
        </div>
        <div v-for="item in menuListPC" :key="item.id" class="menu_item">
          <div @click="checkMenu(item)" class="button-borders">
            <div class="inner">
              {{ item.title }}
            </div>
          </div>
          <div @v-if="item.child" class="child-list">
            <div @click="checkMenu(child)" v-for="child in item.child" class="child-item">
              {{ child.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="MobileMenuSwitch">
        <span class="logo">小鹿</span>
        <div class="menu_h5">
          <div @click="showDialog" class="search">
            <i class="iconfont">&#xe76d;</i>
          </div>
          <theme-swith />
          <i @click="showMenu" v-if="scrollTop > 84" class="iconfont">&#xfe8a;</i>
          <i @click="showMenu" v-else class="iconfont">&#xfe8b;</i>
        </div>
      </div>
    </div>
  </transition>

  <div v-if="OpenMobileMenu" class="mobile_menu_box">
    <div class="dialog-box">
      <div class="menu_inner_box">
        <div class="close">
          <i @click="OpenMobileMenu = false" class="iconfont">&#xe6ca;</i>
        </div>
        <div class="menu_list">
          <div @click="checkMenu(item)" :class="menu_checked == item.id ? 'active' : ''" v-for="item in menuListH5" :key="item.id" class="menu_item">
            <div class="button-borders">
              <div class="inner">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <transition name="search">
    <div v-if="searchBox" class="searchDialog">
      <div class="search-box">
        <div class="dialog-box">
          <div class="search-main">
            <div class="search-dialog-header">
              <div class="close">
                <i @click="closeSearchDialog" class="iconfont">&#xe6ca;</i>
              </div>
              <input autocomplete="off" v-model="searchText" @input="select" type="text" placeholder="搜索文章" name="text" class="input" />
            </div>

            <div class="blog-list">
              <div class="blog-item" v-for="item in blogList">
                <button @click="goBlog(item._id)" class="learn-more">GO</button>

                <div class="blog-main">
                  <div v-html="item.Title" class="title"></div>
                  <div v-html="item.Summary" class="summary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-mask"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import $http from '@/api/index.ts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
type Menu = {
  title: string
  id: string
  route?: string
  child?: Menu[]
}
let router = useRouter()
let menuListPC = ref<Menu[]>([
  { title: '博客', id: '1', route: '/' },
  { title: '留言', id: '2', route: '/MessageBoard' },
  { title: '关于', id: '3', route: '/about' },
  { title: '友链', id: '4', route: '/link' },
  {
    title: '其他',
    id: '5',
    child: [{ title: 'ThreeDemo', id: '51', route: '/other/car' }]
  }
])
let menuListH5 = ref<Menu[]>([
  { title: '博客', id: '1', route: '/' },
  { title: '留言', id: '2', route: '/MessageBoard' },
  { title: '关于', id: '3', route: '/about' },
  { title: '友链', id: '4', route: '/link' }
])
const $store = useStore.common()
let menu_checked = ref($store.menu)
onMounted(() => {
  //给页面绑定滑轮滚动事件
  if (document.addEventListener) {
    //firefox
    document.addEventListener('scroll', scrollFunc, false)
  }
})

// 移动端导航
let OpenMobileMenu = ref(false)
let showMenu = () => {
  OpenMobileMenu.value = !OpenMobileMenu.value
  console.log(OpenMobileMenu.value)
}
let checkMenu = (item: Menu) => {
  menu_checked.value = item.id
  router.push(item.route)
  nextTick(() => {
    $store.setMenu(item.id)
  })
  OpenMobileMenu.value = false
}

let showHead = ref(true)
let scrollTop = ref(0)
let scrollFunc = function () {
  var aftertop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop //兼容
  if (aftertop - scrollTop.value > 0) {
    showHead.value = false
  } else {
    showHead.value = true
  }
  scrollTop.value = aftertop
}

// 搜索框
let searchBox = ref(false)

let documentTop = 0
let showDialog = () => {
  documentTop = document.scrollingElement!.scrollTop
  searchBox.value = true
  document.body.style.position = 'fixed'
  document.body.style.top = -documentTop + 'px'
  document.body.style.left = '0'
  document.body.style.right = '0'
}
let closeSearchDialog = () => {
  searchBox.value = false
  document.body.style.position = 'static'
  document.body.style.top = 'auto'
  document.scrollingElement!.scrollTop = documentTop
}

// 搜索
let searchText = ref('')
let blogList = ref<Blog[]>([])
let select = async () => {
  console.log(searchText.value)
  const { data } = await $http.blogs.searchBlog({
    text: searchText.value
  })
  console.log(data.data)
  const regex = new RegExp(`${searchText.value}`, 'g')
  blogList.value = data.data.map((item: Blog) => {
    return {
      Title: item.Title.replace(regex, '<strong>' + searchText.value + '</strong>'),
      Summary: item.Summary.replace(regex, '<strong>' + searchText.value + '</strong>'),
      _id: item._id
    }
  })
}
let goBlog = (id: string) => {
  searchBox.value = false
  router.push({
    path: `/BlogDetail/${id}`
  })
}

// 首页
let goHome = () => {
  router.push({
    path: '/'
  })
}
</script>
<style lang="less">
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

  .el-menu--horizontal > .el-menu-item.is-active {
    color: orange !important;
    border: none;
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
    .menu {
      display: none;
    }

    .MobileMenuSwitch {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 2rem;

      .menu_h5 {
        display: flex;
        align-items: center;

        i {
          margin-left: 1rem;
        }
      }

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

  // .dialog-box {
  //   background-color: rgba(0, 0, 0, 0.7);
  //   z-index: 99999;
  //   position: fixed;
  //   top: 4.3rem;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;

  // }
  .mobile_menu_box {
    background: #333;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;

    .menu_inner_box {
      height: 100%;
      width: 100%;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;

      .close {
        width: 100%;
        text-align: end;
      }

      .menu_list {
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60%;
        margin-top: 15%;

        padding: 4rem 2rem;
        background-color: @main-backgroundcolor-2;
        position: relative;

        i {
          position: absolute;
          right: 1.5rem;
          top: 1.5rem;
        }

        .menu_item {
          .inner {
            width: 100%;
            font-family: 'Ropa Sans', sans-serif;
            display: flex;
            align-items: center;
            /* font-family: 'Valorant', sans-serif; */
            color: @main-backgroundcolor-2;
            cursor: pointer;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 0.05rem;
            border: 1px solid #0e1822;
            padding: 0.8rem 2.1rem;
            // background-color: #0e1822;
            background-color: @main-bordercolor;
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
          margin-bottom: 3rem;

          &:last-child {
            margin-bottom: 0;
          }

          .iconfont {
            margin-left: 5px;
          }
        }

        .active {
          border: 1px solid #ff4655;
          color: white;
          background-position: 40%;

          .inner {
            background-color: #ff4655;

            &:after {
              content: '';
              background-color: #fff;
            }

            &:before {
              content: '';
              background-color: #fff;
            }
          }
        }

        .inner:before {
          content: '';
          position: absolute;

          width: 0.2rem;
          height: 0.2rem;
          top: -1px;
          left: -1px;
          transition: background-color 0.15s ease-in-out;
        }

        .inner:after {
          content: '';
          position: absolute;
          background-color: #ff4655;
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
          content: '';
          position: absolute;
          width: calc(100% + 0.5em);
          height: 50%;
          left: -0.3em;
          top: -0.3em;
          // border: 1px solid #0e1822;
          border: 1px solid @main-bordercolor;
          border-bottom: 0px;
          /* opacity: 0.3; */
        }

        .button-borders:after {
          content: '';
          position: absolute;
          width: calc(100% + 0.5em);
          height: 50%;
          left: -0.3em;
          bottom: -0.3em;
          // border: 1px solid #0e1822;
          border: 1px solid @main-bordercolor;
          border-top: 0px;
          /* opacity: 0.3; */
          z-index: 0;
        }

        .shape {
          fill: #0e1822;
        }
      }
    }
  }

  .searchDialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    background-color: #333;
    // background: @main-backgroundcolor;

    .search-box {
      animation: change 0.5s;
      color: @main-fontcolor;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 18px;

      .search-main {
        padding: 0.5rem;
        overflow: scroll;
        box-sizing: border-box;
        z-index: 999999;
        // width: 100%;
        height: 100%;

        .close {
          text-align: right;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        .input {
          box-sizing: border-box;
          width: 100%;
          border-radius: 10px;
          outline: 2px solid #febf00;
          border: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: @main-bordercolor-gray;
          color: @main-fontcolor;
          outline-offset: 3px;
          padding: 10px 1rem;
          transition: 0.25s;
        }

        .input:focus {
          outline-offset: 5px;
        }

        .blog-list {
          display: flex;
          flex-direction: column;
          font-size: 0.875rem;
          color: @main-fontcolor;

          .blog-item {
            display: flex;
            margin-top: 1rem;
            align-items: center;

            .blog-main {
              display: flex;
              flex-direction: column;
              margin-left: 1rem;

              .title {
                margin-bottom: 0.5rem;
                font-weight: 700;
              }

              .summary {
                font-size: 0.75rem;
              }
            }

            button {
              position: relative;
              display: inline-block;
              cursor: pointer;
              outline: none;
              border: 0;
              vertical-align: middle;
              text-decoration: none;
              font-family: inherit;
            }

            button.learn-more {
              font-weight: 600;
              color: #382b22;
              text-transform: uppercase;
              padding: 0.5rem;
              background: #fff0f0;
              border: 2px solid #b18597;
              border-radius: 0.75em;
              -webkit-transform-style: preserve-3d;
              transform-style: preserve-3d;
              -webkit-transition: background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
              transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
            }

            button.learn-more::before {
              position: absolute;
              content: '';
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #f9c4d2;
              border-radius: inherit;
              -webkit-box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
              box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
              -webkit-transform: translate3d(0, 0.75em, -1em);
              transform: translate3d(0, 0.75em, -1em);
              transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
            }

            button.learn-more:hover {
              background: #ffe9e9;
              -webkit-transform: translate(0, 0.25em);
              transform: translate(0, 0.25em);
            }

            button.learn-more:hover::before {
              -webkit-box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
              box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
              -webkit-transform: translate3d(0, 0.5em, -1em);
              transform: translate3d(0, 0.5em, -1em);
            }

            button.learn-more:active {
              background: #ffe9e9;
              -webkit-transform: translate(0em, 0.75em);
              transform: translate(0em, 0.75em);
            }

            button.learn-more:active::before {
              -webkit-box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
              box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
              -webkit-transform: translate3d(0, 0, -1em);
              transform: translate3d(0, 0, -1em);
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .header {
    .MobileMenuSwitch {
      display: none;
    }
  }

  .search-enter-from,
  .search-leave-to {
    opacity: 0;
  }

  .search-enter-to,
  .search-leave-from {
    opacity: 1;
  }

  .search-enter-active,
  .search-leave-active {
    transition: opacity 0.5s ease;
  }

  .searchDialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.9);

    .search-box {
      animation: change 0.5s;
      color: @main-fontcolor;
      position: fixed;
      top: 3.75rem;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 18px;
      width: 37.5rem;

      .search-main {
        padding: 1rem;
        max-height: 60vh;
        overflow: scroll;
        box-sizing: border-box;
        z-index: 999999;

        &::-webkit-scrollbar {
          width: 0;
          /* 隐藏滚动条 */
        }

        width: 100%;
        height: 100%;

        .close {
          text-align: right;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        .input {
          box-sizing: border-box;
          width: 100%;
          border-radius: 10px;
          outline: 2px solid #febf00;
          border: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: @main-bordercolor-gray;
          color: @main-fontcolor;
          outline-offset: 3px;
          padding: 10px 1rem;
          transition: 0.25s;
        }

        .input:focus {
          outline-offset: 5px;
        }

        .blog-list {
          display: flex;
          flex-direction: column;
          font-size: 0.875rem;
          color: @main-fontcolor;

          .blog-item {
            display: flex;
            margin-top: 1rem;
            align-items: center;

            .blog-main {
              display: flex;
              flex-direction: column;
              margin-left: 1rem;

              .title {
                margin-bottom: 0.5rem;
                font-weight: 700;
              }

              .summary {
                font-size: 0.75rem;
              }
            }

            button {
              position: relative;
              display: inline-block;
              cursor: pointer;
              outline: none;
              border: 0;
              vertical-align: middle;
              text-decoration: none;
              font-family: inherit;
            }

            button.learn-more {
              font-weight: 600;
              color: #382b22;
              text-transform: uppercase;
              padding: 0.5rem;
              background: #fff0f0;
              border: 2px solid #b18597;
              border-radius: 0.75em;
              -webkit-transform-style: preserve-3d;
              transform-style: preserve-3d;
              -webkit-transition: background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
              transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
            }

            button.learn-more::before {
              position: absolute;
              content: '';
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #f9c4d2;
              border-radius: inherit;
              -webkit-box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
              box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
              -webkit-transform: translate3d(0, 0.75em, -1em);
              transform: translate3d(0, 0.75em, -1em);
              transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
            }

            button.learn-more:hover {
              background: #ffe9e9;
              -webkit-transform: translate(0, 0.25em);
              transform: translate(0, 0.25em);
            }

            button.learn-more:hover::before {
              -webkit-box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
              box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
              -webkit-transform: translate3d(0, 0.5em, -1em);
              transform: translate3d(0, 0.5em, -1em);
            }

            button.learn-more:active {
              background: #ffe9e9;
              -webkit-transform: translate(0em, 0.75em);
              transform: translate(0em, 0.75em);
            }

            button.learn-more:active::before {
              -webkit-box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
              box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
              -webkit-transform: translate3d(0, 0, -1em);
              transform: translate3d(0, 0, -1em);
            }
          }
        }
      }
    }
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
  color: #fff;

  &:hover {
    background-color: #00000050;
  }

  // box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.09);
  z-index: 10000;
  width: 100%;
  background-color: #ffffff00;

  .logo {
    cursor: pointer;
    color: #fff;
    font-size: 1.2rem;
    font-family: DaoLiTi;
    width: 5rem;
    border-radius: 0.5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .iconfont {
      // transition: all 2s, height 1s ease-in-out;
      animation-name: example;
      animation-duration: 1s;
      font-size: 1.5rem;
      display: none;
    }

    @keyframes example {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    &:hover {
      background-color: #1dbfff;

      .xioalu {
        display: none;
      }

      .iconfont {
        display: block;
      }
    }
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

  .search {
    margin-right: 1rem;
    cursor: pointer;

    i {
      font-size: 25px;
    }
  }

  .theme {
    margin-right: 1rem;
  }
}

.menu {
  background-color: #ffffff00;
  align-items: center;
  width: 100%;
  padding: 0 5rem;
  margin: 0 auto;
  display: flex;

  .menu_item {
    cursor: pointer;
    margin-right: 3rem;
    position: relative;
    padding: 0.5rem 0;

    &:hover {
      .child-list {
        display: flex !important;
      }
    }
  }

  .child-list {
    display: none;
    position: absolute;
    background-color: @main-backgroundcolor;
    color: @main-fontcolor;
    border-radius: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    // display: flex;
    flex-direction: column;
    box-sizing: border-box;
    top: 100%;

    .child-item {
      padding: 0.5rem 1rem;
    }
  }

  .active {
    color: #ebbf47;
  }
}

.header_common_white {
  background-color: #fff !important;
  box-shadow: 0px 0px 25px 4px rgba(71, 71, 71, 0.12);

  .logo {
    color: #333 !important;
  }

  .menu {
    background-color: #ffffff00;
    align-items: center;
    width: 100%;
    padding: 0 5rem;
    margin: 0 auto;

    .menu_item {
      color: #333 !important;
    }

    .active {
      color: orange !important;
    }
  }
}

.head-enter-active {
  animation: bound-in 0.5s;
}

.head-leave-active {
  animation: bound-out 0.5s;
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

.dialog-box {
  padding: 1rem;
  height: 100%;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  background-color: #000 !important;
  position: relative;
}

.dialog-box::before {
  content: '';
  position: absolute;
  width: 100px;
  background-image: linear-gradient(180deg, #00b7ff, #ff30ff);
  height: 400%;
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

.dialog-box::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0.2rem;
  background: @main-backgroundcolor-2;
  // background: #fff;
  // inset: 5px;
  border-radius: 15px;
}

.searchDialog {
  .search-main {
    padding-top: 5.5rem !important;

    .search-dialog-header {
      background: @main-backgroundcolor;
      z-index: 99999999;
      opacity: 1;
      left: 2rem;
      right: 2rem;
      top: 1rem;
      position: fixed;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-bottom: 1.5rem;
    }
  }
}
</style>
