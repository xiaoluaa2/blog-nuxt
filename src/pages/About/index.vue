<template>
  <NuxtLayout name="noside">
    <div class="aboutPage">
      <div class="author-main">
        <div class="author-tag-left pc">
          <span class="author-tag">💻 一言不合</span>
          <span class="author-tag">🥣 二话不说</span>
          <span class="author-tag">🕊 三观不和</span>
          <span class="author-tag">🧱 四体不勤</span>
        </div>
        <div class="author-box container">
          <!-- <div class="loader"><span></span></div>
          <div class="loader"><span></span></div>
          <div class="loader"><i></i></div>
          <div class="loader"><i></i></div> -->
          <div class="spinner"></div>
          <div class="author-img">
            <img src="@/assets/images/head.jpg" alt="" />
          </div>


        </div>
        <div class="author-tag-right pc">
          <span class="author-tag">五谷不分 💤</span>
          <span class="author-tag">六亲不认 🤝</span>
          <span class="author-tag">七窍生烟 🔨</span>
          <span class="author-tag">八面玲珑 💢</span>
        </div>
        <div class="image-dot"></div>
      </div>
      <div class="author-title">关于本站</div>
      <div class="author-content">
        <div class="author-content-item myInfo">
          <div class="title1">你好，很高兴认识你👋</div>
          <div class="title2">
            小鹿
            <div class="sharingon">
              <div class="ring">
                <div class="to"></div>
                <div class="to"></div>
                <div class="to"></div>
                <div class="circle"></div>
              </div>
            </div>

          </div>
          <div class="title3">社畜一枚,摸头村村长,唱跳rap打篮球</div>
          <div class="title4">
            <img src="../../assets/images/motou.webp" alt="">
          </div>
        </div>
        <div class="author-content-item aboutsiteTips">
          <div class="author-content-item-tips">追求</div>
          <h2>
            源于
            <br>
            热爱而去学习


            <div ref="mask" class="mask">
              <transition name="mask">
                <span v-show="showIndex == 0" class="first-tips">技术</span>
              </transition>
              <transition name="mask">
                <span v-show="showIndex == 1">生活</span>
              </transition>
              <transition name="mask">
                <span v-show="showIndex == 2">程序</span>
              </transition>
              <transition name="mask">
                <span v-show="showIndex == 3">学习</span>
              </transition>
            </div>


          </h2>

        </div>
      </div>
      <div class="author-content">
        <div class="author-content-item about-statistic">
          <div class="author-content-item-tips">数据</div>
          <span class="author-content-item-title">访问统计</span>
          <div class="statisticc">
            <div>
              <span>今日IP:</span>
              <span class="num">{{ statistics.todayPeople }}</span>
            </div>
            <div>
              <span>今日浏览量(PV):</span>
              <span class="num">{{ statistics.todayVisit }}</span>
            </div>
            <div>
              <span>昨日IP:</span>
              <span class="num">{{ statistics.yesterdayPeople }}</span>
            </div>
            <div>
              <span>昨日浏览量(PV)</span>
              <span class="num">{{ statistics.yesterdayVisit }}</span>
            </div>
            <div>
              <span>总IP:</span>
              <span class="num">{{ statistics.alldayPeople }}</span>
            </div>
            <div>
              <span>总浏览量(PV):</span>
              <span class="num">{{ statistics.alldayVisit }}</span>
            </div>
          </div>


        </div>

        <div class="author-content-item-group mapAndInfo">
          <div class="author-content-item map single"><span class="map-title">我现在住在 <b>中国，河北省</b></span>
          </div>
          <div class="author-content-item selfInfo single">
            <div>
              <span class="selfInfo-title">生于</span>
              <span class="selfInfo-content" style="color:#43a6c6;font-family:'Microsoft YaHei';">2000
              </span>
            </div>
            <div>
              <span class="selfInfo-title">专业</span>
              <span class="selfInfo-content" style="color:#c69043">软件工程</span>
            </div>
            <div>
              <span class="selfInfo-title">现职业</span>
              <span class="selfInfo-content" style="color:#b04fe6">前端开发工程师</span>
            </div>
          </div>
        </div>
      </div>
      <div class="author-content">
        <div class="author-content-item maxim">
          <div class="author-content-item-tips">个性签名</div>
          <span class="maxim-title">
            <span style="opacity:.6;margin-bottom:8px">如果要飞得高，</span>
            <span>
              就该把地平线忘掉。
            </span>
          </span>
        </div>
        <div class="author-content-item myphoto">
          <div class="author-content-item-tips">特长</div>
          <span class="maxim-title">
            <span style="opacity:.6;margin-bottom:8px">随时随地睡觉</span>
            <span>
              偶尔灵魂出窍
            </span>
          </span>
        </div>
      </div>
      <div class="author-content pc">
        <div class="author-content-item chuckle-img">
          <div class="container">
            <div @click="changeImage(1)" class="item" :class="activeHY == 1 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 1" class="text">
                  <div class="tit">植物人</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>

              </div>
            </div>
            <div @click="changeImage(2)" class="item" :class="activeHY == 2 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 2" class="text">
                  <div class="tit">陆地战神</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>
              </div>
            </div>
            <div @click="changeImage(3)" class="item" :class="activeHY == 3 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 3" class="text">
                  <div class="tit">虚化√</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>
              </div>
            </div>
            <div @click="changeImage(4)" class="item" :class="activeHY == 4 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 4" class="text">
                  <div class="tit">杨戬</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>
              </div>
            </div>
            <div @click="changeImage(5)" class="item" :class="activeHY == 5 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 5" class="text">
                  <div class="tit">创立班</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>
              </div>
            </div>
            <div @click="changeImage(6)" class="item" :class="activeHY == 6 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 6" class="text">
                  <div class="tit">黄猿</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>
              </div>
            </div>
            <div @click="changeImage(7)" class="item" :class="activeHY == 7 ? 'active' : ''">
              <div class="shadow"></div>
              <div class="content">
                <div v-if="activeHY == 7" class="text">
                  <div class="tit">sakura</div>
                </div>
                <div v-else class="logo">
                  <img src="@/assets/images/hy_logo.webp" alt="">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="author-content">
        <div class="author-content-item game-lol">
          <div class="card-content">
            <div class="author-content-item-tips">爱好游戏</div><span class="author-content-item-title">英雄联盟</span>
            <div class="content-bottom">
              <div class="icon-group">
                <img src="@/assets/images/top.png" alt="">
                <img src="@/assets/images/sup.png" alt="">
              </div>
              <div class="tips">扭曲丛林</div>
            </div>
          </div>
        </div>
        <div class="author-content-item game-wolf pc">
          <div class="card-content">
            <div class="author-content-item-tips">Astartes</div>
            <!-- <span class="author-content-item-title">星际战士</span> -->
            <div class="card-box">
              <card-1>
                <template v-slot:front>
                  <img src="@/assets/images/astt1.jpg" alt="">
                </template>
                <template v-slot:back>
                  <img src="@/assets/images/astt6.jpg" alt="">
                </template>
              </card-1>
              <card-1>
                <template v-slot:front>
                  <img src="@/assets/images/astt3.jpg" alt="">
                </template>
                <template v-slot:back>
                  <img src="@/assets/images/astt4.jpg" alt="">
                </template>
              </card-1>
              <card-1>
                <template v-slot:front>
                  <img src="@/assets/images/astt7.jpg" alt="">
                </template>
                <template v-slot:back>
                  <img src="@/assets/images/astt8.jpg" alt="">
                </template>
              </card-1>
              <card-1>
                <template v-slot:front>
                  <img src="@/assets/images/astt2.jpg" alt="">
                </template>
                <template v-slot:back>
                  <img src="@/assets/images/astt5.jpg" alt="">
                </template>
              </card-1>
            </div>
          </div>
        </div>

      </div>
      <div class="author-content">
        <div class="create-site-post author-content-item ">
          <span class="author-content-item-title">建站原因</span>
          <p>大学时尝试过搭自己的网站,功能比较简单。服务器到期后也没有续费，最近一段时间利用空闲时间重构了一下以前的网站并新增了一些功能，由于本人审美有限，页面样式参考了许多小伙伴的，后边会贴出地址。</p>
          <p>
            为什么喜欢前端？因为所见所得，相较于后端更能欣赏自己的成果，为其美化，因为想要大家看到更美好的东西。当然也离不开后端的支持，目标成为全栈工程师！
          </p>
          <div class="footer">
            <div class="technology">
              <p>本博客纯手工编写，未使用第三方建站或流量统计工具。本博客已具备各种父子组件、数据缓存、防抖节流、用户轨迹、首屏优化、访问数据分析等功能</p>
              <p>本博客搭建的技术栈</p>
              <p>前端</p>
              <div class="box">
                主要技术栈为<span class="link">Nuxt3</span>+<span class="link">TS</span><br>
                <span class="link">
                  Pinia
                </span>状态管理<br>
                <span class="link">Mitt</span>通信<br>
                <span class="link"> ThreeJS</span>， <span class="link">Nprogress</span>， <span
                  class="link">v-md-editor</span>等其他工具库<br>
              </div>
              <p>后端</p>
              <div class="box">
                主要技术栈为<span class="link">Nest.js</span><br>
                数据库使用<span class="link">Mongoose</span><br>
                部署在阿里云服务器
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang='ts'>
useHead({
  title: '开心小羊|关于',
})
import $http from '@/api/index.ts';
import { onMounted, ref } from 'vue';
let mask = ref()
// 乐趣来源
let showIndex = ref(0)
setInterval(() => {
  if (showIndex.value == 3) {
    showIndex.value = 0
  } else {
    showIndex.value += 1
  }
}, 2000);
onMounted(() => {
  createLog({
    moduleType: 'menu',
    operateType: '选择菜单',
    operateContent: '关于'
  })
})
// 
let activeHY = ref(1)
let changeImage = (index: number) => {
  activeHY.value = index
}
let statistics = ref({
  alldayPeople: 0,
  alldayVisit: 0,
  todayPeople: 0,
  todayVisit: 0,
  yesterdayPeople: 0,
  yesterdayVisit: 0
})
let showStatistics = async () => {
  const { data } = await $http.other.showStatistics()
  statistics.value = data.data
}
showStatistics()
</script>
<style lang='less' scoped>
.aboutPage {
  text-align: center;
  margin-bottom: 10rem;

  .author-main {
    // width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // user-select: none;
    // -khtml-user-select: none;
    // -moz-user-select: none;

    .author-box {
      position: relative;

      .author-img {
        z-index: 999;
        flex-shrink: 0;
        width: 180px;
        height: 180px;
        background: rgba(253, 253, 253, 0.8);
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
        }
      }

    }

    .author-tag-left,
    .author-tag-right {
      display: flex;
      flex-direction: column;

      .author-tag {
        box-sizing: border-box;
        // width: 100%;
        display: flex;
        padding: 6px 8px;
        background: @main-backgroundcolor;
        color: @main-fontcolor;
        border: 1px solid #e3e8f7a6;
        border-radius: 40px;
        margin-top: 6px;
        font-size: 0.875rem;
        font-weight: 700;
        box-shadow: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
        animation: 6s ease-in-out 0s infinite normal none running floating;
      }
    }

    @keyframes floating {
      0% {
        transform: translateY(-4px);
      }

      50% {
        transform: translateY(4px);
      }

      100% {
        transform: translateY(-4px);
      }


    }

    .author-tag-right {
      margin-left: 2rem;
      align-items: flex-start;

      :nth-child(1) {
        margin-left: 0;
      }

      :nth-child(2) {
        margin-left: 1rem;
        animation-delay: 0.6s;
      }

      :nth-child(3) {
        margin-left: .5rem;
        animation-delay: 1.2s;
      }

      :nth-child(4) {
        margin-left: 0;
        animation-delay: 1.8s;
      }
    }

    .author-tag-left {
      margin-right: 2rem;
      align-items: flex-end;

      :nth-child(1) {
        margin-right: 0;
      }

      :nth-child(2) {
        margin-right: 1rem;
        animation-delay: 0.6s;
      }

      :nth-child(3) {
        margin-right: .5rem;
        animation-delay: 1.2s;
      }

      :nth-child(4) {
        margin-right: 0;
        animation-delay: 1.8s;
      }
    }

  }

  .author-title {
    font-size: 2.7rem;
    font-weight: 700;
    margin: .5rem;
    letter-spacing: 6px;
    -webkit-background-clip: text;
    background-color: #333;
    display: inline-block;
    color: transparent;
    text-stroke: 2px #3fdaee;
    -webkit-text-stroke: 1px #bccbe4;
  }

  .author-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;

    .author-content-item {
      width: 49%;
      border-radius: 24px;
      background: @main-backgroundcolor;
      color: @main-fontcolor;
      position: relative;
      padding: 1.5rem 2.5rem;
      overflow: hidden;
      border: 1px solid #e3e8f7a6;
    }

    .author-content-item-group {
      width: 59%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .author-content-item {
        width: 100%;
      }
    }

    .author-content-item-tips {
      font-size: .625rem;
      margin-bottom: .5rem;
    }

    .author-content-item-title {
      font-size: 2.25rem;
    }

    .myInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: var(--heo-white);
      background: linear-gradient(130deg, #3134f3cc 0, #00dbebcc 80%);
      background-size: 200%;
      animation: gradient 15s ease infinite;
      width: 59%;
      color: #fff;
      position: relative;

      .title1 {
        font-size: 17px;
        text-align: left;
      }

      .title2 {
        position: relative;
        font-size: 36px;
        text-align: left;
        padding: .3rem 0;
      }

      .title3 {
        font-size: 17px;
        text-align: left;
      }

      .title4 {
        position: absolute;
        right: 20px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100px;
          height: 100px;
        }
      }
    }

    .aboutsiteTips {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: 39%;
      text-align: left;



      .mask {
        display: flex;
        flex-direction: column;
        height: 36px;
        position: relative;
        overflow: hidden;
        margin-top: 4px;

        span {
          &:nth-child(1) {
            color: #07a6f1;
          }

          &:nth-child(2) {
            color: #18e198;
          }

          &:nth-child(3) {
            color: #8a7cfb;
          }

          &:nth-child(4) {
            color: #fa7671;
          }
        }

        .mask-enter-active {
          animation: bound-in .5s;
        }

        @keyframes bound-in {
          0% {
            transform: translateY(40px);
          }

          100% {
            transform: translateY(0);
          }
        }
      }
    }

    .about-statistic {
      min-height: 380px;
      width: 39%;
      background: url(@/assets/images/bg27.jpg) no-repeat 50% / cover;
      background-size: cover;
      color: rgb(255, 253, 253, 0.92);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 1rem 2rem;
      text-align: left;

      .statisticc {
        font-size: 16px;
        border-radius: 15px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 1rem;
        margin-bottom: 2rem;

        div {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: 50%;
          margin-bottom: 0.5rem;
          font-size: .6rem;

          .num {
            font-size: 2.125rem;
          }
        }
      }

      .post-tips {
        color: #999;
        font-size: 0.875rem;
        position: absolute;
        bottom: 2rem;
        left: 2rem;

        a {
          color: #999;
        }
      }
    }

    .map {
      background: url(@/assets/images/sjz.jpg) no-repeat 50% / cover;
      background-position-x: 0;
      background-position-y: 100%;
      background-size: 100%;
      min-height: 200px;
      max-height: 400px;
      position: relative;
      overflow: hidden;
      height: 59%;
      border: 1px;
      transition: 1s ease-in-out;

      .map-title {
        text-align: left;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: @main-backgroundcolor;
        opacity: .6;
        padding: 0.5rem 2rem;
        backdrop-filter: saturate(180%) blur(2px);
        -webkit-backdrop-filter: blur(20px);
        transition: 1s ease-in-out;
        font-size: 20px;
        color: @main-fontcolor;
        font-weight: 700;
      }

      &:hover {
        transition: 4s ease-in-out;
        background-size: 120%;
        background-position-x: 80%;
        background-position-y: 90%;

        .map-title {
          top: -100%;
        }
      }
    }

    .selfInfo {
      display: flex;
      min-height: 100px;
      max-height: 400px;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      height: -webkit-fill-available;
      height: 39%;

      div {
        display: flex;
        flex-direction: column;
        text-align: left;

        .selfInfo-title {
          font-size: .6rem;
        }

        .selfInfo-content {

          font-size: 2.125rem;
        }
      }
    }

    .maxim {
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1.1;
      display: flex;
      color: rgb(255, 253, 253, 0.95);
      background: url(@/assets/images/bg31.jpg) no-repeat;
      background-size: cover;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      width: 53%;

      .maxim-title {

        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .myphoto {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      background: url(@/assets/images/bg32.jpg) no-repeat;
      color: rgb(255, 253, 253, 0.95);
      font-size: 2.25rem;
      height: 60%;
      background-size: 100%;
      transition: 1s ease-in-out;
      position: relative;
      min-height: 200px;
      max-height: 400px;
      border: 1px;
      overflow: hidden;
      width: 45%;

      .maxim-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .chuckle-img {
      height: auto;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle at top center, #29323cd0, #1C1C1Cd4);

      .container {
        display: flex;
        width: 90vw;
        max-width: auto;
        height: 350px;
        overflow: hidden;

        .active {
          flex: 1;
          margin: 0;
          border-radius: 40px;


          &:nth-child(3) {
            background: url(@/assets/images/hy3.jpg) no-repeat 80%/cover !important;
          }

          &:nth-child(4) {
            background: url(@/assets/images/hy4.jpg) no-repeat 90%/cover !important;
          }

          &:nth-child(5) {
            background: url(@/assets/images/hy5.jpg) no-repeat 65%/cover !important;
          }

          &:nth-child(6) {
            background: url(@/assets/images/hy6.jpg) no-repeat 80%/cover !important;
          }

        }

        .item {
          height: 100%;
          position: relative;
          width: 60px;
          margin: 10px;
          cursor: pointer;
          border-radius: 30px;
          background-size: cover;
          background-position: center;
          transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
          overflow: hidden;
          cursor: pointer;

          .content {
            display: flex;
            position: absolute;
            width: 100%;
            bottom: 10px;
            transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);

            .logo {
              width: 100%;
              display: flex;
              justify-content: center;

              img {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
              }
            }

            .text {
              text-align: left;
              margin-left: 10px;
              color: #fff;
              width: 100%;
              font-weight: bold;
              font-size: 18px;

              .tit {
                font-family: DaoLiTi;
              }
            }
          }

          &:nth-child(1) {
            background: url(@/assets/images/hy1.jpg) no-repeat 50%/cover;
          }

          &:nth-child(2) {
            background: url(@/assets/images/hy2.jpg) no-repeat 60%/cover;
          }

          &:nth-child(3) {
            background: url(@/assets/images/hy3.jpg) no-repeat 50%/cover;
          }

          &:nth-child(4) {
            background: url(@/assets/images/hy4.jpg) no-repeat 59%/cover;
          }

          &:nth-child(5) {
            background: url(@/assets/images/hy5.jpg) no-repeat 42%/cover;
          }

          &:nth-child(6) {
            background: url(@/assets/images/hy6.jpg) no-repeat 52%/cover;
          }

          &:nth-child(7) {
            background: url(@/assets/images/hy7.jpg) no-repeat 50%/cover;
          }
        }
      }
    }

    .card-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .content-bottom {
        width: 100%;
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon-group {
          display: flex;

          img {
            width: 22px;
            height: 22px;
            margin-right: .5rem;
          }
        }

      }
    }

    .game-lol {
      background: url(@/assets/images/nuoshou.jpg) no-repeat top;
      background-size: cover;
      min-height: 300px;
      overflow: hidden;
      width: 42%;
      border: 1px;
      color: #fff;


    }

    .game-wolf {
      color: #fff;
      border: 1px;
      width: 56%;
      background-size: cover;
      min-height: 300px;
      overflow: hidden;
      color: var(--heo-white);
      background-color: @main-backgroundcolor;

      .card-box {
        display: flex;
        justify-content: space-evenly;
        width: 100%;

        img {
          border-radius: .5rem;
          width: 100%;
          height: 100%;
        }
      }
    }

    .create-site-post {
      width: 100%;
      text-align: left;

      .footer {
        display: flex;

        .technology {
          margin-bottom: 6rem;

          .box {
            line-height: 2rem;
          }

          .link {
            border-radius: .2rem;
            padding: .2rem;
            background: linear-gradient(320deg, rgba(0, 140, 255, 0.678), rgba(128, 0, 128, 0.308));
          }
        }
      }
    }
  }




  // 写轮眼
  .sharingon {
    scale: .15;
    position: absolute;
    top: -76px;
    width: 6em;
    height: 6em;
    background-color: red;
    border: 6px solid black;
    animation: rot 1s ease-in-out infinite;
  }

  .ring {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    width: 3.5em;
    height: 3.5em;
    border: 4px solid rgb(110, 13, 13, 0.5);
    transform: translate(-50%, -50%);
  }

  .sharingon,
  .ring,
  .to,
  .circle {
    border-radius: 50%;
  }

  .to,
  .circle {
    position: absolute;
    content: "";
    width: 0.9em;
    height: 0.9em;
    background-color: black;
  }

  .to:nth-child(1) {
    top: -0.5em;
    left: 50%;
    transform: translate(-40%);
  }

  .to::before {
    content: "";
    position: absolute;
    top: -0.5em;
    right: -0.2em;
    width: 1.1em;
    height: 0.9em;
    box-sizing: border-box;
    border-left: 16px solid black;
    border-radius: 100% 0 0;
  }

  .to:nth-child(2) {
    bottom: 0.5em;
    left: -0.35em;
    transform: rotate(-120deg);
  }

  .to:nth-child(3) {
    bottom: 0.5em;
    right: -0.35em;
    transform: rotate(120deg);
  }

  .circle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px 1px;
    width: 1em;
    height: 1em;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }


  .container {
    position: relative;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-box-reflect: below 0 linear-gradient(transparent, transparent, #0005);
  }

  .spinner {
    position: absolute;
    width: 13.2rem;
    height: 13.2rem;
    display: grid;
    border: 4.5px solid #0000;
    border-radius: 50%;
    border-color: #dbdcef #0000;
    animation: spinner-e04l1k 1s infinite linear;
  }

  .spinner::before,
  .spinner::after {
    content: "";
    grid-area: 1/1;
    margin: 2.2px;
    border: inherit;
    border-radius: 50%;
  }

  .spinner::before {
    border-color: #474bff #0000;
    animation: inherit;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }

  .spinner::after {
    margin: 8.9px;
  }

  @keyframes spinner-e04l1k {
    100% {
      transform: rotate(1turn);
    }
  }

  // .container .loader {
  //   position: absolute;
  //   width: 200px;
  //   height: 200px;
  //   border-radius: 50%;
  //   animation: animate 2s linear infinite;
  // }

  // .container .loader:nth-child(2),
  // .container .loader:nth-child(4) {
  //   animation-delay: -1s;
  // }

  // @keyframes animate {
  //   0% {
  //     transform: rotate(0deg);
  //     filter: hue-rotate(360deg);
  //   }

  //   100% {
  //     transform: rotate(360deg);
  //     filter: hue-rotate(0deg);
  //   }
  // }

  // .container .loader:nth-child(1)::before,
  // .container .loader:nth-child(2)::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 50%;
  //   height: 100%;
  //   background: linear-gradient(to top, transparent, rgba(0, 255, 249, 0.4));
  //   background-size: 100px 180px;
  //   background-repeat: no-repeat;
  //   border-top-left-radius: 100px;
  //   border-bottom-left-radius: 100px;
  // }

  // .container .loader i {
  //   position: absolute;
  //   top: 0;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   width: 20px;
  //   height: 20px;
  //   background: #00fff9;
  //   border-radius: 50%;
  //   z-index: 100;
  //   box-shadow: 0 0 10px #00fff9,
  //     0 0 30px #00fff9,
  //     0 0 40px #00fff9,
  //     0 0 50px #00fff9,
  //     0 0 60px #00fff9,
  //     0 0 70px #00fff9,
  //     0 0 80px #00fff9,
  //     0 0 90px #00fff9,
  //     0 0 100px #00fff9;
  // }

  // .container .loader span {
  //   position: absolute;
  //   inset: 20px;
  //   background: #e8e8e8;
  //   border-radius: 50%;
  //   z-index: 1;
  // }

}

@media screen and (max-width: 768px) {
  .author-content-item {
    width: 100% !important;
    margin-top: 1rem;
  }

  .author-content-item-group {
    width: 100% !important;
  }

  .pc {
    display: none !important;
  }

  .card-box {
    flex-wrap: wrap;
  }
}
</style>