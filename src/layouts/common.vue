<template>
  <div :class="isDark ? 'dark' : 'bright'" class="common">
    <div v-if="titleList" class="catalogue_button">
      <i @click='shiowCatalogue' class="iconfont icon-mulu"></i>
      <div v-show="showCatalogue" class="card-widget">
        <div class="catalogue shadow-box">
          <div class="catalogue_title">
            <i class="iconfont icon-mulu"></i>
            目录
          </div>

          <div class="catalogue_item" v-for="(item, index) in  titleList " :key="item.indent">
            <div v-if="item.indent == 1" class="two_catalogue">
              <div @click="jump_location(index)" :class="heightTitle == index ? 'active_catalogue' : ''"
                class="two_catalogue_inner">
                {{ item.title }}
              </div>
            </div>
            <div v-if="item.indent == 2" @click="jump_location(index)"
              :class="heightTitle == index ? 'active_catalogue' : ''" class="catalogue_content">
              {{ item.title }}
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="placeholder"></div>
    <transition name="common">
      <div class="main">
        <div class="blogsSide pc">
          <div class="mine shadow-box">
            <div class="mine_bg"></div>
            <div class="mine_head">
              <img src="@/assets/images/head.jpg" alt="小鹿" />
            </div>
            <div class="mine_m">
              <span>小鹿</span>
              <a target="_blank" href="https://github.com/xiaoluaa2" class="mine_source">GitHub</a>
            </div>
            <div class="mine_footer">
              <div class="mine_footer_item">
                <span class="mine_footer_num">{{ ArticleNum }}</span>
                <span>博客文章</span>
              </div>
              <div class="mine_footer_item">
                <span class="mine_footer_num">{{ CommentNum }}</span>
                <span>博文评论</span>
              </div>
              <div class="mine_footer_item">
                <span class="mine_footer_num">{{ LeaveMessageNum }}</span>
                <!-- <span>留言量</span> -->
                <span>博文点击量</span>
              </div>
            </div>
          </div>
          <div class="hot announcement">

            <!-- <div class="announcement_title">
              <i class="iconfont">&#xe64b;</i>
              公告
            </div> -->
            <div class="content">

            </div>
            <div class="gif">
              <div class="vader">
                <div class="shadow"></div>
                <div class="head">
                  <div class="helmet"><span class="left"></span><span class="right"></span></div>
                  <div class="eyes"><span class="left"></span><span class="right"></span></div><span class="grill"><span
                      class="left"></span><span class="center"></span><span class="right"></span></span><span
                    class="mask"><span class="top"></span><span class="left"></span><span class="center"></span><span
                      class="right"></span></span><span class="line"></span>
                </div>
                <div class="torso"><span class="neck"><span class="left"></span><span class="center"></span><span
                      class="right"></span><span class="bottom"></span></span><span class="belt"><span
                      class="center"></span></span>
                  <div class="plate"><span class="red_top"></span><span class="red_center"></span><span
                      class="red_bottom"></span><span class="blue"></span><span class="gray"></span></div>
                </div>
                <div class="hand left"><span class="hand"></span></div>
                <div class="hand right animation-right"><span class="hand"></span></div>
                <div class="legs"><span class="left"></span><span class="right"></span></div>
                <div class="boots"><span class="left"></span><span class="right"></span></div>
                <div class="sword animation-left"><span class="handle"></span><span class="light"></span></div>
              </div>

            </div>
          </div>
          <div v-if="titleList" class="stick_box">
            <div class="catalogue shadow-box">
              <div class="catalogue_title">
                <i class="iconfont icon-mulu"></i>
                目录
              </div>

              <div class="catalogue_item" v-for="( item, index ) in  titleList " :key="item.indent">
                <div v-if="item.indent == 2" class="three_catalogue">
                  <div @click="jump_location(index)" :class="heightTitle == index ? 'active_catalogue' : ''"
                    class="three_catalogue_inner">
                    {{ item.title }}
                  </div>
                </div>
                <div v-else-if="item.indent == 1" class="two_catalogue">
                  <div @click="jump_location(index)" :class="heightTitle == index ? 'active_catalogue' : ''"
                    class="two_catalogue_inner">
                    {{ item.title }}
                  </div>
                </div>
                <div @click="jump_location(index)" :class="heightTitle == index ? 'active_catalogue' : ''" v-else
                  class="catalogue_content">
                  {{ item.title }}
                </div>


              </div>
            </div>
            <div class="hot shadow-box">
              <div class="hot_title">
                <i class="iconfont">&#xe666;</i>
                推荐文章
              </div>
              <div @click="blogDetail(item._id)" class="hot_item" v-for="( item, index ) in  hotList " :key="item._id">
                <div class="article__image">
                  <img :src="_imgUrl(item.ArticleCover)" :alt="item.title">
                </div>
                <div class="article__title">
                  {{ item.title }}
                </div>
                <div class="article__date">
                  <i class="iconfont">&#xe6d9;</i>
                  {{ format('yyyy-MM-dd', Date.parse(item.CreateDate)) }}
                </div>

              </div>
            </div>
            <div class="tag shadow-box">
              <div class="tag_title">
                <i class="iconfont">&#xe60b;</i>
                标签分类
              </div>
              <div class="hot_item" v-for="( item, index ) in  typeList " :key="item._id">
                <div @click="goTagPage(item.TagName)" class="tag_item">
                  <div class="text">{{ item.TagName }} ({{ item.blogs }}篇)</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="stick_box">
            <div class="hot shadow-box">
              <div class="hot_title">
                <i class="iconfont">&#xe666;</i>
                推荐文章
              </div>
              <div @click="blogDetail(item._id)" class="hot_item" v-for="( item, index ) in  hotList " :key="item._id">
                <div class="article__image">
                  <img :src="_imgUrl(item.ArticleCover)" :alt="item.title">
                </div>
                <div class="article__title">
                  {{ item.title }}
                </div>
                <div class="article__date">
                  <i class="iconfont">&#xe6d9;</i>
                  {{ format('yyyy-MM-dd', Date.parse(item.CreateDate)) }}
                </div>

              </div>
            </div>
            <div class="tag shadow-box">
              <div class="tag_title">
                <i class="iconfont">&#xe60b;</i>
                标签分类
              </div>
              <div class="hot_item" v-for="( item, index ) in  typeList " :key="item._id">
                <div @click="goTagPage(item.TagName)" class="tag_item">
                  <div class="text">{{ item.TagName }} ({{ item.blogs }}篇)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slot_box">
          <slot />
        </div>
        <div class="blogsSide h5">
          <div class="mine shadow-box">
            <div class="mine_bg"></div>
            <div class="mine_head">
              <img src="@/assets/images/head.jpg" alt="小鹿" />
            </div>
            <div class="mine_m ">
              <span>小鹿</span>
              <a target="_blank" href="https://github.com/xiaoluaa2" class="mine_source"> GitHub</a>
            </div>
            <div class="mine_footer">
              <div class="mine_footer_item">
                <span class="mine_footer_num">{{ ArticleNum }}</span>
                <span>博客文章</span>
              </div>
              <div class="mine_footer_item">
                <span class="mine_footer_num">{{ CommentNum }}</span>
                <span>博文评论</span>
              </div>
              <div class="mine_footer_item">
                <span class="mine_footer_num">{{ LeaveMessageNum }}</span>
                <!-- <span>留言量</span> -->
                <span>博文点击量</span>
              </div>
            </div>
          </div>
          <div class="hot announcement">

            <!-- <div class="announcement_title">
              <i class="iconfont">&#xe64b;</i>
              公告
            </div> -->
            <div class="content">

            </div>
            <div class="gif">
              <div class="vader">
                <div class="shadow"></div>
                <div class="head">
                  <div class="helmet"><span class="left"></span><span class="right"></span></div>
                  <div class="eyes"><span class="left"></span><span class="right"></span></div><span class="grill"><span
                      class="left"></span><span class="center"></span><span class="right"></span></span><span
                    class="mask"><span class="top"></span><span class="left"></span><span class="center"></span><span
                      class="right"></span></span><span class="line"></span>
                </div>
                <div class="torso"><span class="neck"><span class="left"></span><span class="center"></span><span
                      class="right"></span><span class="bottom"></span></span><span class="belt"><span
                      class="center"></span></span>
                  <div class="plate"><span class="red_top"></span><span class="red_center"></span><span
                      class="red_bottom"></span><span class="blue"></span><span class="gray"></span></div>
                </div>
                <div class="hand left"><span class="hand"></span></div>
                <div class="hand right animation-right"><span class="hand"></span></div>
                <div class="legs"><span class="left"></span><span class="right"></span></div>
                <div class="boots"><span class="left"></span><span class="right"></span></div>
                <div class="sword animation-left"><span class="handle"></span><span class="light"></span></div>
              </div>

            </div>
          </div>
          <div class="stick_box">
            <div class="hot shadow-box">
              <div class="hot_title">
                <i class="iconfont">&#xe666;</i>
                推荐文章
              </div>
              <div @click="blogDetail(item._id)" class="hot_item" v-for="( item, index ) in  hotList " :key="item._id">
                <div class="article__image">
                  <img :src="_imgUrl(item.ArticleCover)" :alt="item.title">
                </div>
                <div class="article__title">
                  {{ item.title }}
                </div>
                <div class="article__date">
                  <i class="iconfont">&#xe6d9;</i>
                  {{ format('yyyy-MM-dd', Date.parse(item.CreateDate)) }}
                </div>

              </div>
            </div>
            <div class="tag shadow-box">
              <div class="tag_title">
                <i class="iconfont">&#xe60b;</i>
                标签分类
              </div>
              <div class="hot_item" v-for="( item, index ) in  typeList " :key="item._id">
                <div @click="goTagPage(item.TagName)" class="tag_item">
                  <div class="text">{{ item.TagName }} ({{ item.blogs }}篇)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <Footer></Footer>
    <Menu></Menu>
  </div>
</template>
<script setup lang="ts">
import $http from '@/api/index.ts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const format = $format
let ArticleNum = ref(0)
let CommentNum = ref(0)
let LeaveMessageNum = ref(0)



interface Props {
  titleList: TitleMessage[]
  heightTitle: number
}
let props = defineProps<Props>()


onMounted(() => {
  // setTimeout(() => {
  //   loaded.value = true
  // }, 500);


})
// 移动端目录
let showCatalogue = ref(false)
let shiowCatalogue = () => {
  showCatalogue.value = !showCatalogue.value
}
let blogsSum = async () => {
  const { data } = await $http.blogs.blogsSum()
  if (data.status == 0) {
    ArticleNum.value = data.data.Blogs
    CommentNum.value = data.data.Comments
    LeaveMessageNum.value = data.data.Hits
  }
}
let blogDetail = async (id: number) => {
  router.push({
    path: `/BlogDetail/${id}`
  })
}
let goTagPage = (tag: string) => {
  router.push({
    path: `/Tags/${tag}`
  })
}
const $store = useStore.common()
let isDark = ref($store.theme == 'black')
bus.$on('changeTheme', (theme: string) => {
  isDark.value = (theme == 'black')
}
)

let init = async () => {
  await blogsSum()
  // getIPCity()
  let ArticleNum2 = ArticleNum.value
  let CommentNum2 = CommentNum.value
  let LeaveMessageNum2 = LeaveMessageNum.value
  ArticleNum.value = 0
  CommentNum.value = 0
  LeaveMessageNum.value = 0
  let timeA = (3000 / ArticleNum2) < 10 ? 10 : (3000 / ArticleNum2)
  let numA = (3000 / ArticleNum2) < 10 ? ArticleNum2 / 300 + 1 : 1
  let timeC = (3000 / CommentNum2) < 10 ? 10 : (3000 / CommentNum2)
  let numC = (3000 / CommentNum2) < 10 ? CommentNum2 / 300 + 1 : 1
  let timeL = (3000 / LeaveMessageNum2) < 10 ? 10 : (3000 / LeaveMessageNum2)
  let numL = (3000 / LeaveMessageNum2) < 10 ? LeaveMessageNum2 / 300 + 1 : 1
  console.log(numA);
  console.log(numC);
  console.log(numL);


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
let hotList = ref<hotList[]>([

])
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

// 点击目录
let jump_location = (index: number) => {
  bus.$emit('jump_location', index)
}
</script>
<style lang="less" scoped>
.bright {
  background: url(@/assets/images/bg3.jpg) no-repeat 100%/cover;
}

.dark {
  background: url(@/assets/images/bg10.jpg) no-repeat 100%/cover;
}



.common-enter-active {
  animation: bound-in .5s backwards;
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

.main {
  position: relative;
}

.common {
  color: @main-fontcolor;
  min-height: 100vh !important;
  background-attachment: fixed;

  .hot,
  .tag,
  .catalogue,
  .announcement {
    border-radius: 10px;
    background-color: @main-backgroundcolor;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 14px;
    cursor: pointer;

    .gif {
      position: relative;
      height: 16rem;

      // img {
      //   border-radius: 0.5rem;
      //   margin: 1rem 0 2rem;
      //   width: 100%;
      //   height: 15rem;
      // }
      ::-moz-selection {
        background: #2D3363;
        color: #FAEECF
      }

      ::selection {
        background: #2D3363;
        color: #FAEECF
      }

      .text {
        position: absolute;
        bottom: 20px;
        left: 25px;
        color: black;
        font-family: Arial, sans-serif;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 28px;
        font-weight: bold;
        letter-spacing: 2px;
        z-index: 99
      }

      a {
        color: #6172BA;
        text-decoration: none;
        cursor: pointer
      }

      a:hover {
        text-decoration: underline
      }

      .vader {
        position: relative;
        top: 50%;
        left: 50%;
        display: inline-block;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
      }

      .vader .head {
        position: relative;
        width: 100px;
        height: 100px;
        margin-bottom: -10px;
        z-index: 1
      }

      .vader .helmet {
        position: absolute;
        top: 0;
        left: 5px;
        width: 90px;
        height: 80px;
        background: #222222;
        border-radius: 80px 80px 0 0
      }

      .vader .helmet::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 50%;
        width: 50px;
        height: 8px;
        margin-left: -25px;
        background: #040507;
        border-radius: 25px 25px 0 0 / 8px 8px 0 0
      }

      .vader .helmet::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 8px;
        left: 50%;
        margin-left: -25px;
        height: 0;
        width: 0;
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        border-top: 24px solid #040507
      }

      .vader .helmet span {
        position: absolute;
        top: 50%;
        width: 35px;
        height: 55px;
        background: #040507
      }

      .vader .helmet .left {
        left: -6px;
        -webkit-transform: rotate(25deg);
        transform: rotate(25deg)
      }

      .vader .helmet .right {
        right: -6px;
        -webkit-transform: rotate(-25deg);
        transform: rotate(-25deg)
      }

      .vader .helmet span::before {
        content: '';
        position: absolute;
        top: -5px;
        width: 8px;
        height: 55px;
        background: #222222
      }

      .vader .helmet .left::before {
        left: 0
      }

      .vader .helmet .right::before {
        right: 0
      }

      .vader .line {
        position: absolute;
        top: -3px;
        left: 50%;
        width: 6px;
        height: 38px;
        margin-left: -3px;
        background: #343434
      }

      .vader .line::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: -4px;
        bottom: 0;
        width: 4px;
        height: 12px;
        background: #040507
      }

      .vader .line::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: -4px;
        bottom: 0;
        width: 4px;
        height: 12px;
        background: #040507
      }

      .vader .mask {
        position: absolute;
        bottom: 19px;
        left: 50%
      }

      .vader .mask span {
        position: absolute;
        top: 0;
        width: 4px;
        height: 4px;
        border-radius: 1px;
        background: #C6C6C6
      }

      .vader .mask .top {
        left: 50%;
        margin-top: -16px;
        margin-left: -2px
      }

      .vader .mask .top::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: -7px;
        top: -2px;
        width: 4px;
        height: 24px;
        background: #040507;
        border-radius: 4px;
        -webkit-transform: rotate(40deg);
        transform: rotate(40deg)
      }

      .vader .mask .top::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: -7px;
        top: -2px;
        width: 4px;
        height: 24px;
        background: #040507;
        border-radius: 4px;
        -webkit-transform: rotate(-40deg);
        transform: rotate(-40deg)
      }

      .vader .mask .left {
        left: 12px
      }

      .vader .mask .center {
        left: 50%;
        margin-top: -16px;
        margin-left: -2px
      }

      .vader .mask .right {
        right: 12px
      }

      .vader .grill {
        position: absolute;
        bottom: 20px;
        left: 50%;
        width: 20px;
        margin-left: -10px
      }

      .vader .grill span {
        position: absolute;
        bottom: -5px;
        width: 2px;
        margin-left: -1px;
        background: #C6C6C6
      }

      .vader .grill .left {
        left: 4px;
        height: 10px
      }

      .vader .grill .center {
        left: 50%;
        height: 17px
      }

      .vader .grill .right {
        right: 2px;
        height: 10px
      }

      .vader .eyes {
        position: absolute;
        top: 35px;
        left: 10px;
        width: 80px;
        height: 40px;
        border-radius: 40px;
        background: #343434
      }

      .vader .eyes::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 33px;
        left: 5px;
        height: 0;
        width: 0;
        border-left: 35px solid transparent;
        border-right: 35px solid transparent;
        border-top: 30px solid #343434
      }

      .vader .eyes span {
        position: absolute;
        top: 5px;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        background: #010000;
        -webkit-transition: background .3s ease-in-out;
        transition: background .3s ease-in-out
      }

      .vader .eyes .left {
        left: 7px
      }

      .vader .eyes .right {
        right: 7px
      }

      .vader .torso {
        position: relative;
        width: 60px;
        height: 80px;
        border-radius: 50px 50px 0 0;
        margin: 0 auto;
        background: #222222
      }

      .vader .torso::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: -20px;
        top: -15px;
        width: 100px;
        height: 115px;
        border-radius: 50px 50px 0 0;
        margin: 0 auto;
        background: #040507;
        z-index: -1
      }

      .vader .belt {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 10px;
        background: #040507
      }

      .vader .belt span::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 20px;
        height: 10px;
        border-radius: 10px;
        margin-left: -10px;
        background: #C6C6C6
      }

      .vader .neck {
        position: absolute;
        left: 6px;
        top: 3px;
        width: 48px;
        height: 8px;
        background: #010000;
        z-index: 5
      }

      .vader .neck::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 8px;
        width: 32px;
        height: 10px;
        background: #222222;
        border-radius: 0 0 4px 4px
      }

      .vader .neck::after {
        content: '';
        position: absolute;
        top: -8px;
        left: 8px;
        width: 32px;
        height: 1px;
        background: #666666
      }

      .vader .neck span {
        position: absolute;
        top: 0;
        width: 6px;
        height: 125%;
        margin-left: -3px;
        background: #434343
      }

      .vader .neck .left {
        left: 6px;
        -webkit-transform: rotate(30deg);
        transform: rotate(30deg);
        border-radius: 5px 0 0 0
      }

      .vader .neck .center {
        left: 50%;
        top: 2px
      }

      .vader .neck .right {
        right: 3px;
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
        border-radius: 0 5px 0 0
      }

      .vader .neck .bottom {
        position: absolute;
        top: 8px;
        left: 4px;
        width: 46px;
        height: 5px;
        background: #222222
      }

      .vader .plate {
        position: absolute;
        left: 15px;
        top: 25px;
        width: 30px;
        height: 32px;
        background: #343434
      }

      .vader .plate .red_top {
        position: absolute;
        left: 2px;
        top: 2px;
        width: 12px;
        height: 18px;
        background: #d81f27
      }

      .vader .plate .red_top::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: rgba(0, 0, 0, 0.2)
      }

      .vader .plate .red_top::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #343434
      }

      .vader .plate .red_center {
        position: absolute;
        right: 2px;
        top: 12px;
        width: 12px;
        height: 8px;
        background: #d81f27
      }

      .vader .plate .red_center::before {
        content: '';
        position: absolute;
        left: 0;
        top: 4px;
        width: 100%;
        height: 4px;
        background: rgba(0, 0, 0, 0.2)
      }

      .vader .plate .red_center::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 0;
        width: 2px;
        height: 100%;
        background: #343434
      }

      .vader .plate .red_bottom {
        position: absolute;
        right: 2px;
        bottom: 2px;
        width: 4px;
        height: 8px;
        background: #d81f27
      }

      .vader .plate .blue {
        position: absolute;
        right: 2px;
        top: 2px;
        width: 12px;
        height: 8px;
        background: #455caa
      }

      .vader .plate .blue::before {
        content: '';
        position: absolute;
        top: 3px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #343434
      }

      .vader .plate .gray {
        position: absolute;
        left: 2px;
        bottom: 2px;
        width: 20px;
        height: 8px;
        background: #9f9fa1
      }

      .vader .plate .gray::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 0;
        width: 2px;
        height: 100%;
        background: #343434
      }

      .vader .plate .gray::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 100%;
        background: rgba(0, 0, 0, 0.2)
      }

      .vader .legs {
        position: relative;
        width: 50px;
        height: 20px;
        margin: 0 auto;
        background: #222222
      }

      .vader .legs::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 20px;
        height: 100%;
        margin-left: -10px;
        background: #040507
      }

      .vader .boots {
        position: absolute;
        bottom: 0;
        left: 50%
      }

      .vader .boots span {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        width: 30px;
        height: 10px;
        background: #040507
      }

      .vader .boots .left {
        left: 10px;
        border-radius: 0 15px 0 0
      }

      .vader .boots .right {
        right: 10px;
        border-radius: 15px 0 0 0
      }

      .vader .hand {
        position: absolute;
        top: 60%;
        z-index: 2
      }

      .vader .hand.left {
        left: -2px;
        top: 82%
      }

      .vader .hand.right {
        right: -20px
      }

      .vader .hand .hand {
        position: absolute;
        top: 0;
        width: 11px;
        height: 22px;
        margin-top: -12px;
        margin-left: -12px;
        background: #040507
      }

      .vader .hand.left .hand {
        left: 0;
        border-radius: 22px 0 0 22px
      }

      .vader .hand.right .hand {
        right: 0;
        width: 22px;
        border-radius: 22px
      }

      .vader .sword {
        position: absolute;
        top: 50%;
        left: -20px;
        z-index: 10
      }

      .vader .sword .handle {
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 30px;
        margin-left: -3px;
        background: #343434
      }

      .vader .sword .handle::before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        width: 100%;
        height: 5px;
        background: #888888
      }

      .vader .sword .handle::after {
        content: '';
        position: absolute;
        right: 4px;
        top: 5px;
        width: 4px;
        height: 5px;
        background: #343434
      }

      .vader .sword .light {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 20px;
        height: 120px;
        margin-left: -10px;
        background: rgba(248, 80, 50, 0);
        background: -moz-linear-gradient(left, rgba(248, 80, 50, 0) 10%, rgba(247, 67, 37, 0) 20%, rgba(246, 41, 12, 0.67) 40%, rgba(255, 176, 166, 1) 50%, rgba(246, 41, 12, 0.67) 60%, rgba(236, 51, 30, 0) 80%, rgba(231, 56, 39, 0) 90%);
        background: -webkit-gradient(left top, right top, color-stop(10%, rgba(248, 80, 50, 0)), color-stop(20%, rgba(247, 67, 37, 0)), color-stop(40%, rgba(246, 41, 12, 0.67)), color-stop(50%, rgba(255, 176, 166, 1)), color-stop(60%, rgba(246, 41, 12, 0.67)), color-stop(80%, rgba(236, 51, 30, 0)), color-stop(90%, rgba(231, 56, 39, 0)));
        background: -webkit-linear-gradient(left, rgba(248, 80, 50, 0) 10%, rgba(247, 67, 37, 0) 20%, rgba(246, 41, 12, 0.67) 40%, rgba(255, 176, 166, 1) 50%, rgba(246, 41, 12, 0.67) 60%, rgba(236, 51, 30, 0) 80%, rgba(231, 56, 39, 0) 90%);
        background: -o-linear-gradient(left, rgba(248, 80, 50, 0) 10%, rgba(247, 67, 37, 0) 20%, rgba(246, 41, 12, 0.67) 40%, rgba(255, 176, 166, 1) 50%, rgba(246, 41, 12, 0.67) 60%, rgba(236, 51, 30, 0) 80%, rgba(231, 56, 39, 0) 90%);
        background: -ms-linear-gradient(left, rgba(248, 80, 50, 0) 10%, rgba(247, 67, 37, 0) 20%, rgba(246, 41, 12, 0.67) 40%, rgba(255, 176, 166, 1) 50%, rgba(246, 41, 12, 0.67) 60%, rgba(236, 51, 30, 0) 80%, rgba(231, 56, 39, 0) 90%);
        background: linear-gradient(to right, rgba(248, 80, 50, 0) 10%, rgba(247, 67, 37, 0) 20%, rgba(246, 41, 12, 0.67) 40%, rgba(255, 176, 166, 1) 50%, rgba(246, 41, 12, 0.67) 60%, rgba(236, 51, 30, 0) 80%, rgba(231, 56, 39, 0) 90%);
      }

      .vader .sword .light::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 3px;
        height: 120px;
        margin-left: -1px;
        background: rgba(248, 80, 50, 1);
        z-index: -1
      }

      .vader .shadow {
        position: absolute;
        bottom: -17px;
        left: -25px;
        display: block;
        width: 150px;
        height: 14px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 50%
      }

      .animation-right {
        -webkit-animation: animationHandRight 1.5s linear infinite;
        animation: animationHandRight 1.5s linear infinite
      }

      @-webkit-keyframes animationHandRight {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg)
        }

        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg)
        }
      }

      @keyframes animationHandRight {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg)
        }

        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg)
        }
      }

      .animation-left {
        -webkit-animation: animationHandLeft 3s ease-in-out infinite;
        animation: animationHandLeft 3s ease-in-out infinite
      }

      @-webkit-keyframes animationHandLeft {

        0%,
        100% {
          -webkit-transform: translateX(0) rotate(-25deg);
          transform: translateX(0) rotate(-25deg)
        }

        50% {
          -webkit-transform: translateX(150px) rotate(25deg);
          transform: translateX(150px) rotate(25deg)
        }
      }

      @keyframes animationHandLeft {

        0%,
        100% {
          -webkit-transform: translateX(0) rotate(-25deg);
          transform: translateX(0) rotate(-25deg)
        }

        50% {
          -webkit-transform: translateX(150px) rotate(25deg);
          transform: translateX(150px) rotate(25deg)
        }
      }

      .vader:hover .eyes .left {
        background: #d81f27
      }

      .vader:hover .eyes .right {
        background: #455caa
      }
    }

    .hot_title,
    .announcement_title,
    .catalogue_title,
    .tag_title {
      display: flex;
      align-items: center;
      font-size: 1rem;
      padding-bottom: 10px;
    }

    .tag_item {
      width: 100%;
      padding: 10px 0;
      font-size: 0.875rem;

      .text {
        transition: all .5s ease-out;
      }

      .text:hover {
        color: orange;
        transform: translateX(5px);
      }
    }

    .hot_item {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;

      .article__image {
        border-radius: 3px;
        height: 3.75rem;
        overflow: hidden;
        width: 6rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .article__title {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-wrap: break-word;
        display: -webkit-box;
        flex: 1;
        font-size: 0.875rem;
        height: 3.3125rem;
        overflow: hidden;
        padding-left: 10px;
        text-align: justify;
        text-overflow: ellipsis;
        word-break: break-all;
      }

      .article__date {
        display: flex;
        color: @main-fontcolor-gray;
        margin-top: 10px;
        width: 100%;
      }
    }

    .catalogue_item {
      .active_catalogue {
        color: #fff;
        background-color: #00c4b6;
      }

      .catalogue_content {
        font-size: 1rem;
        padding: .5rem .25rem;
        border-radius: 8px;



      }

      .two_catalogue {
        font-size: 1rem;
        border-left: 1px solid @main-bordercolor;
        margin-left: 10px;
        padding-left: 10px;

        .two_catalogue_inner {
          padding: .5rem .25rem;
          border-radius: 8px;
        }
      }

      .three_catalogue {

        border-left: 1px solid @main-bordercolor;
        margin-left: 10px;
        padding-left: 10px;

        .three_catalogue_inner {
          font-size: .8rem;
          padding: .4rem 1.5rem;
          border-radius: 8px;
        }
      }
    }

  }


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
    height: 10rem;
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

@media screen and (max-width: 1245px) {
  .main {
    padding: 0 20px;
    // background: url(@/assets/images/bg_phone.jpg) no-repeat 50%/cover;
    display: flex;
    flex-direction: column;
  }

  .common {
    z-index: 0;
  }

  .catalogue_button {
    z-index: 100;
    position: fixed;
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #49b1f5;
    border: 2px solid rgba(56, 211, 203, 0.8);
    border-radius: .625rem;
    right: .5rem;
    top: 70%;


    .iconfont {
      font-size: 25px;
    }
  }

  .card-widget {
    min-width: 23rem;
    position: fixed;
    right: 4rem;
    bottom: 2rem;
  }

  .pc {
    display: none;
  }

  .h5 {
    margin-bottom: 6rem;
  }
}

@media screen and (min-width: 1245px) {
  .catalogue_button {
    display: none;
  }

  .h5 {
    display: none;
  }

  .main {

    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 0 1rem;
    // width: 1680px;

    .slot_box {
      flex: 1;
      max-width: 60rem;
    }

    .blogsSide {

      margin-right: 2.5rem;
      width: 30%;
      max-width: 300px;

      .stick_box {
        height: fit-content;
        position: sticky;
        top: 1rem;
      }
    }

    .catalogue_item {
      .catalogue_content {
        &:hover {
          color: #fff;
          background-color: #2abeeb7e;
        }
      }

      .two_catalogue {
        .two_catalogue_inner {
          &:hover {
            color: #fff;
            background-color: #2abeeb7e;
          }
        }
      }

      .three_catalogue {
        .three_catalogue_inner {
          &:hover {
            color: #fff;
            background-color: #2abeeb7e;
          }
        }
      }
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
