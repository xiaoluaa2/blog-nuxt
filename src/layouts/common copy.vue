<template>
  <div :class="isDark ? 'dark' : 'bright'" class="common">
    <transition name="common">
      <div class="main">
        <div class="slot_box">
          <slot />
        </div>
      </div>
    </transition>
    <Footer></Footer>
    <Menu></Menu>
  </div>

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
</template>
<script setup lang="ts">
import $http from '@/api/index.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let ArticleNum = ref(0)
let CommentNum = ref(0)
let LeaveMessageNum = ref(0)
let loaded = ref(false)
onMounted(() => {
  loaded.value = true
})
let blogsSum = async () => {
  const { data } = await $http.blogs.blogsSum()
  if (data.status == 0) {
    ArticleNum.value = data.data.Blogs
    CommentNum.value = data.data.Comments
    LeaveMessageNum.value = data.data.Hits
  }
}

const $store = useStore.common()
let isDark = ref($store.theme == 'black')
let x = ref(0),
  y = ref(0),
  radius = ref('150%')
bus.$on('changeTheme', (theme: any) => {
  // $store.setTheme(theme.type)
  const transition = document.startViewTransition(() => {
    isDark.value = theme.type == 'black'
    $store.setTheme(theme.type)
    setTheme(theme.type)
    theme.type == 'black' ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
  })
  const clipPath = [`circle(0% at ${theme.x} ${theme.y})`, `circle(${theme.radius} at ${theme.x} ${theme.y})`]
  // 设置过渡的动画效果
  transition.ready.then(() => {
    console.log(isDark.value)
    console.log(clipPath)

    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath : clipPath.reverse()
      },
      {
        duration: 1000,
        // pseudoElement
        // 设置过渡效果的伪元素，这里设置为根元素的伪元素
        // 这样过渡效果就会作用在根元素上
        pseudoElement: isDark.value ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    )
  })
})

let init = async () => {
  await blogsSum()
  // getIPCity()
  let ArticleNum2 = ArticleNum.value
  let CommentNum2 = CommentNum.value
  let LeaveMessageNum2 = LeaveMessageNum.value
  ArticleNum.value = 0
  CommentNum.value = 0
  LeaveMessageNum.value = 0
  let timeA = 3000 / ArticleNum2 < 10 ? 10 : 3000 / ArticleNum2
  let numA = 3000 / ArticleNum2 < 10 ? ArticleNum2 / 300 + 1 : 1
  let timeC = 3000 / CommentNum2 < 10 ? 10 : 3000 / CommentNum2
  let numC = 3000 / CommentNum2 < 10 ? CommentNum2 / 300 + 1 : 1
  let timeL = 3000 / LeaveMessageNum2 < 10 ? 10 : 3000 / LeaveMessageNum2
  let numL = 3000 / LeaveMessageNum2 < 10 ? LeaveMessageNum2 / 300 + 1 : 1
  var NumInterval1 = window.setInterval(function () {
    ArticleNum.value += Math.trunc(numA)
    if (ArticleNum.value >= ArticleNum2) {
      ArticleNum.value = ArticleNum2
      clearInterval(NumInterval1)
    }
  }, timeA)
  var NumInterval2 = window.setInterval(function () {
    CommentNum.value += Math.trunc(numC)
    if (CommentNum.value >= CommentNum2) {
      CommentNum.value = CommentNum2
      clearInterval(NumInterval2)
    }
  }, timeC)
  var NumInterval3 = window.setInterval(function () {
    LeaveMessageNum.value += Math.trunc(numL)
    if (LeaveMessageNum.value >= LeaveMessageNum2) {
      LeaveMessageNum.value = LeaveMessageNum2
      clearInterval(NumInterval3)
    }
  }, timeL)
}
init()
type hotList = {
  title: string
  _id: number
  ArticleCover: string
  CreateDate: string
}
let hotList = ref<hotList[]>([])
//标签分类
let typeList = ref<Array<any>>([1])
let getTypeList = async () => {
  const { data } = await $http.blogs.getTypeList()
  console.log(data)
  typeList.value = data.data
  console.log(typeList.value)
}
getTypeList()
//热门
let getHotList = async () => {
  const { data } = await $http.blogs.getHotList()
  console.log(data)
  hotList.value = data.data
}
getHotList()
</script>
<style>
/* .bright {
 
  background: var(--bright-image) no-repeat 100% / cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -3;
}
.dark {
 
  background: var(--dark-image) no-repeat 100% / cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -2;
} */
</style>
<style lang="less" scoped>
.common-enter-active {
  animation: bound-in 0.5s backwards;
}

@keyframes bound-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 100%;
    transform: translateY(0px);
  }
}

.common {
  color: @main-fontcolor;
  min-height: 100vh !important;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;

  .mine {
    background-color: @main-backgroundcolor;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    .mine_bg {
      height: 8rem;
      background-image: url(@/assets/images/bg2.jpg);
      background-position: 50%;
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .mine_head {
      width: 6rem;
      height: 6rem;
      border-radius: 100%;
      border: 5px solid hsla(0, 0%, 100%, 0.5);
      margin: 0 auto;
      margin-top: -4.5rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    @keyframes animate {
      0% {
        background-position: 0%;
      }

      100% {
        background-position: 400%;
      }
    }

    .mine_m {
      margin: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .mine_source {
        color: #fff;
        width: 8rem;
        border-radius: 0.3rem;
        padding: 0.5rem;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        margin-top: 1rem;
        background: linear-gradient(90deg, #2bc97a, #f441a5, #03a9f4, #2bc97a);
        background-size: 400%;

        &:hover {
          animation: animate 8s linear infinite;
        }
      }
    }

    .mine_footer {
      color: @main-fontcolor-gray;
      padding: 1.5rem 0 1rem;
      border-top: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-around;

      .mine_footer_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.8rem;

        .mine_footer_num {
          font-size: 1.2rem;
        }
      }
    }
  }

  .placeholder {
    // height: 10rem;
    height: 6rem;
  }
}

@media screen and (max-width: 768px) {
  .main {
    padding: 0 20px;
    // background: url(@/assets/images/bg_phone.jpg) no-repeat 50%/cover;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-width: 768px) {
  .main {
    position: relative;
    flex: 1;
    // margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 0 1rem;
    // width: 1680px;

    .slot_box {
      flex: 1;
      max-width: 80rem;
    }
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
