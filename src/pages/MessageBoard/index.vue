<template>
  <div class="messageMain">
    <div :class="isDark ? 'dark' : 'bright'" class="bg_img"></div>
    <div ref="Area" class="show pc">
      <div class="poetry">
        <div class="hitokoto">
          {{ poetry.hitokoto }}
        </div>
        <div class="from">
          {{ poetry.from }}
        </div>

      </div>
      <div class="wave-1"></div>
      <div class="wave-2"></div>
      <div class="glide">
        <img src="@/assets/images/glide.png" alt="" />
      </div>
    </div>
    <div class="show h5">

      <div class="wave-1"></div>
      <div class="wave-2"></div>
    </div>
    <div class="mainBox">
      <div class="ContentBox">
        <div v-if="flag" class="unactiveArticleDetailContent">
          <div @click="showEditBox" class="ArticleDetailContentTab shadow-box" style="padding: 1rem; min-height: unset">
            <div class="UserHeadIcon">
              <img src="@/assets/images/DefaultHeadIcon.png" />
            </div>
            <div class="box">来都来啦，留个脚印吧</div>
          </div>
        </div>
        <div ref="divToHide" v-else class="ArticleDetailContent">
          <div class="ArticleDetailContentTab shadow-box" style="padding: 1rem; min-height: unset">
            <div class="UserHeadIcon">
              <img src="@/assets/images/DefaultHeadIcon.png" />
            </div>
            <div class="ArticleMain">
              <div class="ArticleDetailCommentContent">
                <textarea v-model="MessageText" ref="MessageTextRef" placeholder="输入留言"></textarea>
                <span class="EmotionButton" @click="OpenEmotions()">
                  <img src="@/assets/images/face.svg" alt="" />
                </span>
              </div>
              <div class="CommentUserInfo">
                <input placeholder="来将留名" v-model="ArticleCommentNickName" />
                <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main">
        <div class="CommentList shadow-box">
          <div class="ListMain">
            <div class="ListItem" v-for="item in commentList">
              <div class="ItemMain">
                <div class="left">
                  <img :src="'/img/' + item.head + '.jpeg'" :alt="item.userId" />
                </div>
                <div class="right">
                  <span style="display: flex; align-items: center">
                    <span style="margin-right: 10px"> {{ item.userId }}</span>
                    <img src="@/assets/images/position.svg" alt="" />
                    {{ item.city }}</span>
                  <span v-html="item.content"> </span>
                  <span class="DateAnswer">
                    <span> {{ _format('yyyy-MM-dd hh:mm:ss', parseInt(item.publishdate)) }}</span>
                    <span @click="answer(item.userId, item._id)" class="answer">回复</span>
                  </span>
                </div>
              </div>
              <div v-for="child in item.son" class="child">
                <div class="left">
                  <img :src="'/img/' + item.head + '.jpeg'" :alt="item.userId" />
                </div>
                <div class="right">
                  <span style="display: flex; align-items: center">
                    <span style="margin-right: 10px"> {{ child.userId }}</span>
                    <img src="@/assets/images/position.svg" alt="" />
                    {{ child.city }}</span>
                  <span v-html="child.content"> </span>
                  <span class="DateAnswer">
                    <span> {{ _format('yyyy-MM-dd hh:mm:ss', parseInt(child.publishdate)) }}</span>
                    <span @click="answer(child.userId, item._id)" class="answer">回复</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img class="sun pc" src="@/assets/images/sun.png" alt="" />
        <div class="rightBox pc">
          <div class="xiaoluInf shadow-box">
            <div class="mine_head">
              <img src="@/assets/images/head.jpg" alt="" />
            </div>
            <div class="mine_m">

              <span>小鹿</span>
              <a target="_blank" href="https://github.com/xiaoluaa2" class="mine_source">Follow Me</a>
            </div>
          </div>
          <div v-if="watherList" class="watherMain">
            <div class="TitleFontLine weathTitle">
              <span class="citySpan">{{ watherList.city }}</span>天气
            </div>
            <div class="BlogStatistic">
              <div class="BlogStatisticItem borderRight" v-for="(item, i) in watherList.casts" v-bind:key="i">
                <div class="weathWeek">
                  {{ item.week }}
                  <span style="font-size: 12px" v-if="i == 0">(今天)</span>
                </div>

                <div class="weathDay">{{ item.date }}</div>
                <div class="weathIcon">
                  <i class="iconfont" :class="item.dayweatherIcon"></i>
                </div>
                <div class="weathChinese" :title="item.dayweather">{{ item.dayweather }}</div>
                <div class="temperature">{{ item.nighttemp }} ~ {{ item.daytemp }}°C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog :lock-scroll="false" v-model="dialogVisible">
        <div class="ArticleDetailContent">
          <div class="ArticleDetailContentTab" style="min-height: unset">
            <div class="UserHeadIcon">
              <img src="@/assets/images/DefaultHeadIcon.png" />
            </div>
            <div class="ArticleMain">
              <div class="ArticleDetailCommentContent">
                <div v-show="tip" class="tip">
                  {{ tip }}
                </div>
                <textarea v-model="MessageText" ref="DiaMessageTextRef" placeholder="输入留言"></textarea>

                <span class="EmotionButton" @click="OpenEmotions()">
                  <img src="@/assets/images/face.svg" alt="" />
                </span>
              </div>
              <div class="CommentUserInfo">
                <input placeholder="来将留名" v-model="ArticleCommentNickName" />
                <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>

      <Emotion @AppendInputValue="AppendMessageText"></Emotion>
      <Footer></Footer>
    </div>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: '开心小羊|留言板',
})
import $http from '@/api/index.ts';
import { weatherMap, weekMap } from '@/tool.ts';
import { ElMessage } from 'element-plus';
import * as THREE from 'three';
import BIRDS from 'vanta/src/vanta.birds';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
interface UserComment {
  nickName: string
  text: string
  city: string
  head: string
  parentId?: string
}


const $store = useStore.common()


const _format = $format
const _emotionList = $EmotionList
// const GetLocation = proxy.GetLocation
// const setLCookie = proxy.setLCookie
// const getLCookie = proxy.getLCookie

//使用ref引用挂载区域
const Area = ref(null)
//创建一个全局的变量来使用vanta.js
/**
 *因为在vue2中，是使用this.vantaEffect来创建指定的3d动画模板的
 *但是vue3 setup中是没有this，所以要另外创建一个
 **/
let vantaEffect: any = null
//在两个生命周期钩子内创建vantaEffect
let userMessage = ref()
let poetry = ref({
  hitokoto: '',
  from: ''
})
onMounted(() => {
  createLog({
    moduleType: 'menu',
    operateType: '选择菜单',
    operateContent: '留言'
  })
  userMessage.value = $store.userMessage

  console.log(userMessage.value);

  window.addEventListener('scroll', handleScroll)
  vantaEffect = BIRDS({
    el: Area.value,
    THREE: THREE,
    //如果需要改变样式，要写在这里
    //因为这里vantaEffect是没有setOptions这个方法的
    color1: 0x4985e1,
    color2: 0xb5ded8,
    backgroundAlpha: 0.1
  })
  initList()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll, true)
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})


const handleScroll = () => {
  const innerHeight = window.innerHeight // 可视窗口高度
  const scrollTop = document.documentElement.scrollTop // 滚动高度
  const scrollHeight = document.documentElement.scrollHeight // 页面总高度
  console.log(innerHeight);
  console.log(scrollTop);
  console.log(scrollHeight);
  if (scrollTop + innerHeight >= scrollHeight - 50) {
    if (end.value) {
      return
    }
    getComment()
  }
}
// 更改背景

let isDark = ref($store.theme == 'black')
bus.$on('changeTheme', (theme: string) => {
  isDark.value = (theme == 'black')
}
)

let divToHide = ref()
let handleClickOutside = (event: MouseEvent) => {
  console.log(flag.value)
  if (flag.value) {
    return
  }
  if (divToHide && !divToHide.value.contains(event.target)) {
    flag.value = true
    document.removeEventListener('click', handleClickOutside)
  }
}

let route = useRoute()

let ArticleCommentNickName = ref(''),
  MessageText = ref('')
let flag = ref(true)
let showEditBox = () => {
  if (!flag) {
    return
  }
  if (userMessage.value) {
    ArticleCommentNickName.value = userMessage.value.nickName
  }
  flag.value = false
  console.log(flag.value)
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside)
  }, 0)
}

let tip = ref('')
let MessageTextRef = ref()
// 打开表情包弹框
let OpenEmotions = function () {
  bus.$emit('showEmo')
}
// 表情添加到text
bus.$on('AppendMessageText', (value: string) => {
  MessageText.value += value
  AnswerText.value += value
})

//表情选中后追加在input
let AppendMessageText = function () {
  // // 光标聚焦
  MessageTextRef.value.focus()
}
let commentList = ref<CommentF[]>([])
// 回复评论
let answerCommentId = ref('')
let dialogVisible = ref(false)
let DiaMessageTextRef = ref()
let AnswerText = ref('')
let answer = (userId: string, _id: string) => {
  dialogVisible.value = true
  if (userMessage.value) {
    ArticleCommentNickName.value = userMessage.value.nickName
  }
  nextTick(() => {
    // 光标聚焦
    DiaMessageTextRef.value.focus()
  })

  tip.value = '@' + userId
  console.log(tip.value)

  answerCommentId.value = _id
  // CommentSubmit(_id)
}

/**
 * 本方法用于提交评论
 *
 * 提交评论功能业务逻辑比较多：
 * 1.先获取用户的定位信息，然后携带定位信息提交新增评论接口。
 * 2.再刷新页面文章下的评论列表
 * 3.再修改该评论id对应的文章数据的评论量字段
 * 4.再将用户昵称存在浏览器
 */


let CommentSubmit = async function () {
  console.log(MessageText.value)
  if (!MessageText.value) {
    return
  }
  if (!ArticleCommentNickName.value) {
    console.log(44)
    ElMessage({
      message: '请填写昵称',
      grouping: true,
      offset: 200
    })
    return
  }
  let head
  if ($store.head) {
    head = $store.head
  } else {
    head = 'head' + Math.floor(Math.random() * 5)
    $store.setHead(head)
  }
  let location = await GetLocation()
  let body: UserComment = {
    nickName: ArticleCommentNickName.value,
    text: MessageText.value,
    city: location.city,
    head
  }


  if (answerCommentId.value) {
    body['parentId'] = answerCommentId.value
    body.text = tip.value + '：' + body.text
  }
  const { data } = await $http.blogs.postMessage(body)
  console.log(data)
  if (data.status == 0) {
    ElMessage({
      message: '发表成功',
      grouping: true,
      type: 'success',
      offset: 200
    })
    MessageText.value = ''
    AnswerText.value = ''
    dialogVisible.value = false
    answerCommentId.value = ''
    let userMessage = {
      ...$store.userMessage,
      nickName: ArticleCommentNickName.value
    }
    $store.setUserMessage(userMessage)
    Skip.value = 0
    Limit.value = 8
    commentList.value = []
    end.value = false
    // getComment()
    console.log('djwaiodjiwoajdioawjdoi');
    getComment()
  }
}


let initList = () => {
  nextTick(() => {
    const innerHeight = window.innerHeight // 可视窗口高度
    const scrollTop = document.documentElement.scrollTop // 滚动高度
    const scrollHeight = document.documentElement.scrollHeight // 页面总高度
    if (scrollTop + innerHeight < scrollHeight) {
      getComment()
    }
  })
}

let Skip = ref(0)
let Limit = ref(8)



// 获取留言列表
let end = ref(false)
let getComment = async () => {
  // const { data } = await $http.blogs.getMessageList()
  console.log(Skip.value);

  const { data } = await $http.blogs.getMessageListTiert(
    {
      Skip: Skip.value,
      Limit: Limit.value
    }
  )
  console.log(data)
  Skip.value += Limit.value
  const pattern = /\[\[([\u4E00-\u9FA5\w]+)\]\]/g
  const urlBase = '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'
  const urlSuffix = '.gif"/>'
  let data1 = data.data.map((item: CommentF) => {
    return {
      ...item,
      content: item.content.replace(pattern, function (match: string, p1: string) {
        return urlBase + _emotionList.indexOf(p1) + urlSuffix
      })
    }
  })
  data1.forEach((item: CommentF) => {
    if (item.son.length >= 1) {
      item.son = item.son.map((i: Comment) => {
        return {
          ...i,
          content: i.content.replace(pattern, function (match: string, p1: string) {
            console.log(_emotionList.indexOf(p1))
            return urlBase + _emotionList.indexOf(p1) + urlSuffix
          })
        }
      })
    }
  })
  if (data1.length != Limit.value) {
    end.value = true
  }
  commentList.value = commentList.value.concat(data1)
  console.log('-------------------')
  console.log(commentList.value)


  //
}
// getComment()

// 天气预报模块
let watherList = ref<Wather>()
let setWeathe = () => {
  nextTick(async () => {
    let locationCookie = getLCookie('LBlogWeather')
    if (locationCookie) {
      console.log(JSON.parse(locationCookie))
      watherList.value = JSON.parse(locationCookie)
    } else {
      console.log('esle');
      const { data } = await $http.other.getWather(130110)
      console.log(data)
      setLCookie('LBlogWeather', JSON.stringify(data.forecasts[0]), 3)
      watherList.value = data.forecasts[0]
    }
    if (watherList.value) {
      watherList.value.casts = watherList.value.casts.slice(0, 3)
      watherList.value.casts.forEach((item: any) => {
        console.log(item);
        item.week = weekMap[item.week]
        item.dayweatherIcon = weatherMap[item.dayweather]
        item.date = item.date.split('-')[1] + '月' + item.date.split('-')[2] + '日'
      })
    }

  })


}
setWeathe()

let yiyan = async () => {
  const { data } = await $http.other.yiyan()
  poetry.value = {
    hitokoto: data.hitokoto,
    from: data.from,
  }
  console.log(data.hitokoto);

}
yiyan()
// htt
</script>

<style scoped lang="less">
::v-deep(.el-dialog) {
  background-color: @main-backgroundcolor;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  gap: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  .el-dialog__header {
    width: 0;
    padding: 0;
    margin: 0;
  }
}


.box,
input,
textarea {

  // background-color: #eee;
  background-color: @main-bordercolor-gray;
  border: none;
  padding: 1rem;
  font-size: .75rem;
  width: 13em;
  border-radius: 1rem;
  box-shadow: 0 0.4rem #dfd9d9;
  color: @main-fontcolor;
  cursor: pointer;
}


textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 5.625rem;
  padding: 0.625rem;
}

input {
  color: lightcoral;
}

input:focus {
  outline-color: lightcoral;
}


.CommentSubmitButton {
  cursor: pointer;
  background: #FBCA1F;
  font-family: inherit;
  padding: 0.6em 1.3em;
  font-weight: 900;
  font-size: 1rem;
  border: 3px solid black;
  border-radius: 0.4em;
  box-shadow: 0.1em 0.1em;
}

.CommentSubmitButton:hover {
  transform: translate(-0.05em, -0.05em);
  box-shadow: 0.15em 0.15em;
}

.CommentSubmitButtonCommentSubmitButton:active {
  transform: translate(0.05em, 0.05em);
  box-shadow: 0.05em 0.05em;
}

.messageMain {
  .bg_img {
    // height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    // width: 100%;
    z-index: -1;

    overflow-y: auto;
  }

  .bright {
    background: url(@/assets/images/bg16.jpg) no-repeat 50% / cover;
  }

  .dark {
    background: url(@/assets/images/bg9.jpg) no-repeat 50% / cover;
  }

  .show {
    height: 100vh;
    width: 100%;
    // background-color: #000;
    z-index: -1;
    position: relative;
    overflow: hidden;

    .poetry {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-family: DaoLiTi;

      .hitokoto {
        font-size: 2rem;
      }

      .from {
        text-align: right;
        font-size: 1rem;
      }
    }

    // background: url(@/assets/images/xueshan.jpg) no-repeat 50%/cover;
    .wave-1 {
      animation: wave 100s linear infinite;
      bottom: 0;
      left: 0;
      position: absolute;
      background: url(@/assets/images/wave1.png);
      height: 84px;
      width: 200%;
      z-index: 10;
    }

    .wave-2 {
      background: url(@/assets/images/wave2.png);
      height: 100px;
      width: 400%;
      z-index: 5;
      animation: wave 100s linear infinite;
      bottom: 0;
      left: 0;
      position: absolute;
    }

    .glide {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);

      // margin-top: 100px;
      img {
        animation: up 2s linear infinite;
      }

      @keyframes up {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(40px);
        }

        100% {
          transform: translateY(0px);
        }
      }
    }

    @keyframes wave {
      0% {
        transform: translate(0);
      }

      50% {
        transform: translate(-50%);
      }

      100% {
        transform: translate(0);
      }
    }
  }

  .ArticleDetailContent {
    // width: 44.5rem;
    padding: 1rem;
    background-color: @main-backgroundcolor;
    display: flex;
    overflow: hidden;


    .ArticleDetailContentTab {
      background-color: @main-backgroundcolor;
      border: 1px solid @main-bordercolor-gray;
      width: 100%;
      padding: 1rem;

      .UserHeadIcon {
        margin-bottom: .5rem;

        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.3125rem;
        }

        margin-right: 1rem;
      }


      .ArticleMain {
        flex: 1;

        .ArticleDetailCommentContent {

          position: relative;

          // textarea {
          //   width: 100%;
          //   border: 1px solid #01aaed;
          //   box-sizing: border-box;
          //   min-height: 5.625rem;
          //   padding: 0.625rem;
          // }

          .tip {
            font-size: 0.875rem;
            margin-bottom: 0.3125rem;
            display: flex;
            align-items: center;

            .clear {
              text-align: center;
              line-height: 0.875rem;
              width: 0.875rem;
              height: 0.875rem;
              font-size: 0.625rem;
              background-color: red;
              cursor: pointer;
              color: #fff;
              border-radius: 0.4375rem;
              margin-left: 0.3125rem;
            }
          }

          .EmotionButton {
            position: absolute;
            right: 0.4375rem;
            bottom: 0.4375rem;

            img {
              cursor: pointer;
              width: 1.625rem;
              height: 1.625rem;
            }
          }
        }

        .CommentUserInfo {
          display: flex;
          justify-content: space-between;

          input {
            margin-top: 0.9375rem;
          }

          .CommentSubmitButton {
            margin-top: 0.9375rem;
          }
        }
      }
    }
  }

  .mainBox {
    background-color: @main-backgroundcolor;
    opacity: 0.95;
    padding-top: 5rem;

    .ContentBox {

      height: 15rem;

      .unactiveArticleDetailContent {
        padding: 1rem;
        background-color: @main-backgroundcolor;

        .ArticleDetailContentTab {
          display: flex;
          background-color: @main-backgroundcolor;
          border-radius: 5px;
          border: 1px solid @main-bordercolor-gray;

          .UserHeadIcon {
            img {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 0.3125rem;
            }

            margin-right: 20px;
          }

          .box {

            display: flex;
            align-items: center;
            width: 100%;
            border: 1px solid #ccc;
            box-sizing: border-box;
            height: 5.625rem;
            padding: 0.625rem;
            font-size: 0.875rem;
          }
        }
      }
    }





    .main {
      display: flex;
      // margin: 6.25rem auto 0;
      // width: 68rem;

      justify-content: space-around;
      position: relative;

      .sun {
        position: absolute;
        width: 4.5rem;
        height: 4.5rem;
        left: 48.5rem;
        top: -2.6rem;
      }

      .CommentList {
        // overflow: hidden;
        // width: 49rem;
        background-color: @main-backgroundcolor;


        .ListMain {
          border: 1px solid @main-bordercolor-gray;
          box-sizing: border-box;

          display: flex;
          flex-direction: column;

          .ListItem {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid @main-bordercolor-gray;
            padding: 1rem;
            color: @main-fontcolor;

            .child {
              padding-left: 3.625rem;
              margin-top: 1rem;
            }

            .ItemMain,
            .child {
              display: flex;

              .left {
                img {
                  width: 3rem;
                  height: 3rem;
                  border-radius: 1rem;
                }

                margin-right: 0.625rem;
              }

              .right {
                line-height: 24px;
                display: flex;
                flex-direction: column;
                font-size: 0.875rem;
                flex: 1;

                span {
                  display: flex;
                  flex-wrap: wrap;

                }

                img {
                  width: 0.75rem;
                  height: 0.75rem;
                }

                .DateAnswer {
                  display: flex;
                  justify-content: space-between;
                  color: @main-fontcolor-gray;

                  .answer {
                    cursor: pointer;
                  }
                }
              }
            }

            .reply {
              color: #1693c4;
              text-align: end;
              cursor: pointer;
              margin: 0.625rem 0%;
            }
          }
        }
      }

      .rightBox {
        position: sticky;
        top: .5rem;
        height: 100%;
        width: 16.5rem;



        .watherMain {
          text-align: center;
          font-size: 0.9rem;
          padding: 1rem;
          background: linear-gradient(@gradient-1);
          background-size: 200% 300%;
          color: @main-fontcolor;
          // background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%)
          //   /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
          //   , #FFFFFF;
          box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
          border-radius: 1.4rem;
          transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
          cursor: pointer;

          &:hover {
            transform: scale(1.05);
          }


          .BlogStatistic {
            display: flex;
            align-items: center;
            padding: 1.25rem 0;

            .BlogStatisticItem {
              flex: 1;
              border-right: 1px solid #e9e9e9;

              .weathWeek {
                font-size: 0.875rem;
                padding-bottom: 0.3rem;
              }

              .weathDay {
                color: @main-fontcolor-gray;
                padding-bottom: 0.3rem;
                font-size: 0.9rem;
                opacity: 0.5;
              }

              .temperature {
                font-size: 0.8rem;
                padding-bottom: 0.3rem;
              }

              .weathChinese {
                padding-bottom: 0.3rem;
              }

              .weathIcon {
                padding-bottom: 0.3rem;
                font-size: 2.2rem;
              }

              &:last-child {
                border: none;
              }
            }
          }
        }

        .xiaoluInf {

          // width: 18.75rem;
          height: 20rem;
          align-items: center;
          color: @main-fontcolor;
          background: linear-gradient(@gradient-1);
          background-size: 200% 300%;
          margin-bottom: 2rem;
          overflow: hidden;
          border-radius: 1.4rem;
          transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
          cursor: pointer;

          &:hover {
            transform: scale(1.05);
          }

          .mine_head {
            width: 6rem;
            height: 6rem;
            border-radius: 100%;
            border: 5px solid hsla(0, 0%, 100%, 0.5);
            margin: 2rem auto 0;

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
            margin: 1rem;
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
              background: linear-gradient(90deg, #d2e4db, #41acf4, #2d20d8, #d2e4db);
              background-size: 400%;

              &:hover {
                animation: animate 8s linear infinite;
              }
            }
          }
        }
      }
    }
  }


}

@media screen and (max-width: 1245px) {
  ::v-deep(.el-dialog) {
    width: calc(100% - 2rem) !important;
    margin-left: 1rem;
    margin-right: 1rem;

    .el-dialog__body {
      width: 100%;
    }
  }

  .CommentUserInfo {
    flex-wrap: wrap;
  }

  .messageMain {
    .pc {
      display: none;
    }

    .mainBox {
      padding-top: 1rem;

      input {
        width: 100% !important;
      }

      .ContentBox {
        .ArticleDetailContent {
          // margin: auto 1rem;
          flex: 1;

          .ArticleDetailContentTab {
            width: 100%;

            .ArticleMain {
              flex: 1;
              margin-right: 1rem;

            }
          }
        }
      }



      .main {
        margin: 0 1rem;
        padding-bottom: 3rem;

        .CommentList {
          // overflow: hidden;
          // width: 49rem;
          width: 100%;

          .ListMain {
            width: 100%;
          }
        }

      }
    }


  }
}


// @media screen and (max-width: 1245px) {}

@media screen and (min-width: 1245px) {
  ::v-deep(.el-dialog__body) {
    flex: 1;
  }

  .el-dialog {
    .ArticleDetailContent {
      width: 100% !important;
    }
  }



  .messageMain {
    .h5 {
      display: none;
    }


    .mainBox {
      .ContentBox {
        .unactiveArticleDetailContent {
          width: 44.5rem;
          margin: 0 auto;
          height: 170px;

          // .ArticleDetailContentTab {
          //   border-radius: 5px;
          //   justify-content: flex-start;
          //   padding: 20px;
          //   gap: 10px;

          // }
        }

        .ArticleDetailContent {
          width: 44.5rem;
          margin: 0 auto;

          // .ArticleDetailContentTab {
          //   border-radius: 5px;
          //   justify-content: flex-start;
          //   padding: 20px;
          //   gap: 10px;
          //   flex: 1;

          //   .ArticleMain {
          //     flex: 1;
          //   }
          // }
        }
      }

      .ArticleDetailContent {
        width: 44.5rem;

        .ArticleDetailContentTab {
          padding: 1rem;

          .UserHeadIcon {
            margin-right: 1.25rem;
          }
        }


      }

      .main {
        margin: 6.25rem auto 0;
        width: 68rem;

        .CommentList {
          // overflow: hidden;
          width: 49rem;
          margin-bottom: 3rem;

          &::-webkit-scrollbar {
            width: 0;
            /* 隐藏滚动条 */
          }

          .ListMain {
            width: 49rem;
          }
        }

        .rightBox {}
      }


    }


  }
}
</style>