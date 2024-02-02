<template>
  <NuxtLayout name="common" :titleList="titleList" :heightTitle="heightTitle">
    <article v-if="detail" ref="Area" class="DetailBox">
      <div class="articleDetail">
        <!-- <div :class="`backgroundImage: url('http://localhost:5200/xiaolu/${detail.ArticleCover}')`" -->
        <div :style="{ backgroundImage: `url(${_imgUrl(detail.ArticleCover)})` }" class="articleBanner">
          <div class="title">
            {{ detail.Title }}
          </div>
        </div>
        <!-- <v-md-preview :text="detail.Content"></v-md-preview> -->
        <div ref="article" class="article" v-html="detail.render"></div>
        <div class="copyrightBox">
          <svg class="copyrightIcon pc" viewBox="0 0 1024 1024">
            <path
              d="M512 16C238.066 16 16 238.066 16 512s222.066 496 496 496 496-222.066 496-496S785.934 16 512 16z m0 896c-221.064 0-400-178.902-400-400 0-221.062 178.902-400 400-400 221.064 0 400 178.902 400 400 0 221.064-178.902 400-400 400z m214.702-202.128c-19.228 19.424-91.06 82.792-208.13 82.792-164.86 0-280.968-122.85-280.968-283.134 0-158.304 120.55-278.802 279.524-278.802 111.062 0 177.476 53.24 195.186 69.558a23.93 23.93 0 0 1 3.872 30.644l-36.31 56.226c-7.682 11.9-23.932 14.564-34.998 5.842-17.19-13.552-63.628-45.076-123.416-45.076-96.606 0-155.832 70.66-155.832 160.164 0 83.178 53.776 167.384 156.554 167.384 65.314 0 113.686-38.078 131.452-54.45 10.54-9.714 27.192-8.078 35.64 3.476l39.73 54.34a23.894 23.894 0 0 1-2.304 31.036z"
              p-id="3505"></path>
          </svg>
          <div class="title">{{ detail.Title }}</div>
          <div class="urlBox">
            <div class="url">{{ articleOrigin }}</div>
          </div>
          <div class="text">
            本站所有文章除特别声明外，均采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="copyrightName--Rz1SYaCDcO" rel="noreferrer">CC BY-NC-SA 4.0</a>许可协议，转载请注明来自<a
              href="http://blog.lubowen.xyz/"
              target="_blank"
              class="copyrightName--Rz1SYaCDcO"
              rel="noreferrer"
              >小鹿</a
            >。
          </div>
        </div>
      </div>
      <div v-if="commentList.length" class="CommentList" style="margin-top: 1rem">
        <div class="ListMain">
          <div class="ListItem" v-for="item in commentList">
            <div class="ItemMain">
              <div class="left">
                <img :src="'/img/' + item.head + '.jpeg'" alt="游客头像" />
              </div>
              <div class="right">
                <span style="display: flex; align-items: center">
                  <span style="margin-right: 10px"> {{ item.userId }}</span>
                  <img src="@/assets/images/position.svg" alt="" />
                  {{ item.city }}</span
                >
                <span v-html="item.content"> </span>
                <span class="DateAnswer">
                  <span> {{ _format('yyyy-MM-dd hh:mm:ss', parseInt(item.publishdate)) }}</span>
                  <span @click="answer(item.userId, item._id)" class="answer">回复</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ArticleDetailContent" style="margin-top: 1rem">
        <div class="ArticleDetailContentTab" style="padding: 1rem; min-height: unset">
          <div class="ArticleDetailCommentFirstLine">
            <div class="UserHeadIcon">
              <img src="@/assets/images/DefaultHeadIcon.9fa68490.jpg" />
            </div>
            <div class="CommentUserInfo">
              <input placeholder="昵称（必填）" v-model="ArticleCommentNickName" />
              <input placeholder="邮箱（可以不填哦）" v-model="ArticleCommentEmail" />
              <input placeholder="网址（可以不填哦）" v-model="ArticleCommentUrl" />
            </div>
          </div>
          <div class="ArticleDetailCommentContent">
            <div v-show="tip" class="tip">
              {{ tip }}
              <div @click="clearComment" class="clear">×</div>
            </div>
            <textarea v-model="MessageText" ref="MessageTextRef" placeholder="欢迎评论吖，鼓励和板砖我都认真听取哦"></textarea>
            <span class="EmotionButton" @click="OpenEmotions()">
              <img src="@/assets/images/face.svg" alt="" />
            </span>
          </div>
          <div class="CommentSubmitLine">
            <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
          </div>
        </div>
      </div>

      <Emotion @AppendInputValue="AppendMessageText"></Emotion>
    </article>
  </NuxtLayout>
</template>

<script setup lang="ts">
import $http from '@/api/index.ts'

import Emotion from '@/components/Emotion.vue'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const $store = useStore.common()
const _format = $format
const _emotionList = $EmotionList
console.log($store.userMessage)

let articleOrigin = ref('')
onMounted(() => {
  articleOrigin.value = window.location.href
  setTimeout(() => {
    createLog({
      moduleType: 'menu',
      operateType: '查看文章',
      operateContent: (detail.value as Blog).Title
    })
  }, 3000)
  let userMessage = $store.userMessage
  if (userMessage) {
    ArticleCommentNickName.value = userMessage.nickName
    ArticleCommentEmail.value = userMessage.email
    ArticleCommentUrl.value = userMessage.url
  }

  // 刷新走这

  getTitle()

  window.addEventListener('scroll', () => {
    // 再次计算位置 图片会影响scrolltop
    getTitle()
    let timeOut: number | null = null
    const absList: number[] = [] // 各个h标签与当前距离绝对值
    titleList.value.forEach((item: TitleMessage) => {
      absList.push(item.height)
    })
    if (timeOut) {
      clearTimeout(timeOut)
    }
    // 频繁操作，一直清空先前的定时器
    timeOut = window.setTimeout(() => {
      // 只执行最后一次事件
      let scrollTop = window.pageYOffset
      console.log(scrollTop)

      for (let i = absList.length - 1; i >= 0; i--) {
        if (scrollTop - 60 > absList[i]) {
          heightTitle.value = i
          return
        }
      }
    }, 500)
  })
})
bus.$on('jump_location', (index: number) => {
  titleList.value[index].dom.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'start'
  })
})
let article = ref()
let titleList = ref<TitleMessage[]>([])
// 当前目录项
let heightTitle = ref()

//获取标题列表
async function getTitle() {
  if (!article.value) {
    console.log(article.value)
    return
  }
  // 使用js选择器，获取对应的h标签，组合成列表
  const anchors = article.value.querySelectorAll('h1,h2,h3,h4,h5,h6')
  // 删除标题头尾的空格
  const titles = Array.from(anchors).filter((title: any) => title.innerText.trim())
  // 当文章h标签为空时，直接返回

  if (!titles.length) {
    titleList.value = []
    return
  }

  // 从h标签属性中，提取相关信息
  const hTags = Array.from(new Set(titles.map((title: any) => title.tagName))).sort()

  titleList.value = titles.map((el: any) => {
    return {
      dom: el,
      title: el.innerText, // 标题内容
      indent: hTags.indexOf(el.tagName), // 标签层级
      height: el.offsetTop // 标签距离顶部距离
    }
  })
  console.log(titleList.value)
}

let route = useRoute()

let detail = ref<Blog | null>(null)

let getBlogsDetail = async () => {
  console.log(route.params.id)
  const { data } = await $http.blogs.getBlogsDetail(route.params.id)
  console.log(data)

  detail.value = data.data
  useHead({
    title: `小鹿|${detail.value!.Title}`
  })
  const { data: data2 } = await $http.blogs.addLook(route.params.id)
  console.log(data2)

  // 页面跳转走这

  getTitle()
}
getBlogsDetail()

let ArticleCommentNickName = ref(''),
  ArticleCommentEmail = ref(''),
  ArticleCommentUrl = ref(''),
  MessageText = ref('')

// console.log(userMessage)

let MessageTextRef = ref()
// 打开表情包弹框
let OpenEmotions = function () {
  bus.$emit('showEmo')
}
// 表情添加到text
bus.$on('AppendMessageText', (value: string) => {
  MessageText.value += value
})
//表情选中后追加在input
let AppendMessageText = function () {
  // // 光标聚焦
  MessageTextRef.value.focus()
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
  let body: any = {
    nickName: ArticleCommentNickName.value,
    email: ArticleCommentEmail.value,
    url: ArticleCommentUrl.value,
    text: MessageText.value,
    cid: route.params.id,
    city: location.city,
    head
  }
  if (answerCommentId.value) {
    body['parentId'] = answerCommentId.value
    body.text = tip.value + '：' + body.text
  }
  const { data } = await $http.blogs.postComment(body)
  console.log(data)
  if (data.status == 0) {
    ElMessage({
      message: '发表成功',
      grouping: true,
      type: 'success',
      offset: 200
    })
    let userMessage = {
      nickName: ArticleCommentNickName.value,
      email: ArticleCommentEmail.value,
      url: ArticleCommentUrl.value
    }
    MessageText.value = ''
    $store.setUserMessage(userMessage)
    getComment()
  }
}
let commentList = ref<any>([])
let answerCommentId = ref('')
let tip = ref('')
// 回复评论
let answer = (userId: string, _id: string) => {
  // // 光标聚焦
  MessageTextRef.value.focus()
  tip.value = '@' + userId
  answerCommentId.value = _id

  // CommentSubmit(_id)
}
// 取消回复
let clearComment = () => {
  tip.value = ''
  answerCommentId.value = ''
  console.log(tip.value)
}
let getComment = async () => {
  const { data } = await $http.blogs.getComment({
    cid: route.params.id
  })
  console.log(data.data)
  const pattern = /\[\[([\u4E00-\u9FA5\w]+)\]\]/g
  const urlBase = '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'
  const urlSuffix = '.gif"/>'

  commentList.value = data.data.map((item: any) => {
    return {
      ...item,
      content: item.content.replace(pattern, function (match: any, p1: any) {
        console.log(_emotionList.indexOf(p1))

        return urlBase + _emotionList.indexOf(p1) + urlSuffix
      })
    }
  })
}
getComment()

/**
 * 核心实现
 */
</script>
<style lang="less">
input {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-color: transparent;
  color: @main-fontcolor;
}

input:focus {
  outline: none;
}

textarea {
  color: @main-fontcolor;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-color: transparent;
  width: 100%;
}

textarea:focus {
  outline: none;
}

.DetailBox {
  .article {
    img {
      max-width: 100%;
    }

    blockquote {
      padding: 1px 23px;
      margin: 22px 0;
      border-left: 4px solid #cbcbcb;
      background-color: @main-bordercolor-gray;
    }

    h2 {
      padding-bottom: 0.75rem;
      border-bottom: 1px solid @main-bordercolor-gray;
    }

    h2,
    h3,
    h4 {
      margin-top: 1.5rem;
    }

    pre {
      background-color: @main-bordercolor-gray;
      border-radius: 5px;
      overflow: auto;
      padding: 10px 15px;
    }

    .hljs-center {
      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.DetailBox {
  overflow: hidden;

  .articleDetail {
    box-sizing: border-box;
    background-color: @main-backgroundcolor;
    width: 100%;
    overflow: hidden;

    .articleBanner {
      height: 24rem;
      background: no-repeat 50% / cover;
      // background-image: -webkit-linear-gradient(left, #1f3747, #293d31);
      display: flex;
      justify-content: center;
      align-items: center;

      .title {
        color: #fff;
        font-size: 2.5rem;
        background: #e32d40;
        padding: 8px 20px;
        border-radius: 5px;
      }
    }

    .article {
      padding: 1rem 2rem 2rem;
      font-size: 1rem;
      line-height: 1.5;
      // word-wrap: break-word;
    }

    .copyrightBox {
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      padding: 14px;
      background-color: @main-bordercolor-gray;
      color: @main-fontcolor;
      margin: 0 2rem 3rem;
      line-height: 1.6rem;

      ::v-deep(a) {
        text-decoration: none;
        color: @main-fontcolor;
      }

      .copyrightIcon {
        height: 8rem;
        width: 8rem;
        position: absolute;
        right: 40px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .title {
        font-size: 1.25rem;
        font-weight: 700;
      }

      .urlBox,
      .text {
        color: @main-fontcolor-gray;
      }
    }
  }

  .CommentList {
    margin: 0 auto;
    background-color: @main-backgroundcolor;
    display: flex;

    .ListMain {
      border: 1px solid @main-bordercolor-gray;
      box-sizing: border-box;
      margin: 50px auto;
      display: flex;
      flex-direction: column;

      .ListItem {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid @main-bordercolor-gray;
        padding: 16px;

        .ItemMain {
          display: flex;

          .left {
            img {
              width: 3rem;
              height: 3rem;
              border-radius: 16px;
            }

            margin-right: 10px;
          }

          .right {
            color: @main-fontcolor;
            line-height: 24px;
            display: flex;
            flex-direction: column;
            font-size: 0.875rem;
            flex: 1;

            img {
              width: 0.75rem;
              height: 12px;
            }

            .DateAnswer {
              display: flex;
              justify-content: space-between;
              // color: #0000006e;
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
          margin: 10px 0%;
        }
      }
    }
  }

  .ArticleDetailContent {
    background-color: @main-backgroundcolor;

    .ArticleDetailCommentFirstLine {
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;

      .UserHeadIcon {
        img {
          width: 2rem;
          height: 2rem;
        }

        margin-right: 20px;
      }

      .CommentUserInfo {
        flex: 1;
        display: flex;
        justify-content: space-between;
        color: @main-fontcolor;

        input {
          box-sizing: border-box;
          border: 1px solid @main-bordercolor-gray;
          height: 32px;
          padding: 0 8px;
          width: 32%;

          &:focus {
            outline: none;
          }
        }
      }
    }

    .ArticleDetailCommentContent {
      margin: 10px auto 0;
      position: relative;

      .tip {
        font-size: 0.875rem;
        margin-bottom: 5px;
        display: flex;
        align-items: center;

        .clear {
          text-align: center;
          line-height: 14px;
          width: 14px;
          height: 14px;
          font-size: 0.625rem;
          background-color: red;
          cursor: pointer;
          color: #fff;
          border-radius: 7px;
          margin-left: 5px;
        }
      }

      textarea {
        box-sizing: border-box;
        min-height: 90px;
        padding: 10px;
        border: 1px solid @main-bordercolor-gray;

        &:focus {
          outline: none;
        }
      }

      .EmotionButton {
        position: absolute;
        right: 7px;
        bottom: 7px;

        img {
          cursor: pointer;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }

    .CommentSubmitLine {
      box-sizing: border-box;
      margin: 10px auto 0;
      display: flex;
      justify-content: flex-end;

      .CommentSubmitButton {
        cursor: pointer;
        padding: 5px 15px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .pc {
    display: none;
  }

  .DetailBox {
    // background-color: #17163e;

    .articleDetail {
      margin: 0 auto 1.25rem;
    }

    .CommentList {
      padding: 0 1rem;

      .ListMain {
        width: 100%;
      }
    }
  }

  .ArticleDetailContent {
    margin: 0 auto 4rem;
    background-color: #fff;

    .ArticleDetailCommentFirstLine {
      .CommentUserInfo {
        flex-direction: column;

        input {
          width: 100% !important;
          margin-top: 0.5rem;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .DetailBox {
    max-width: 60rem;

    .articleDetail {
      margin: 0 auto 1.25rem;
    }

    .CommentList {
      display: flex;
      padding: 0 1rem;

      .ListMain {
        flex: 1;
        // max-width: 50rem;
      }
    }
  }

  .ArticleDetailContent {
    margin: 0 auto 4rem;
    background-color: #fff;
    // .ArticleDetailCommentFirstLine {
    //   width: 50rem;
    // }

    // .ArticleDetailCommentContent {
    //   width: 50rem;

    //   textarea {
    //     width: 50rem;
    //   }
    // }

    // .CommentSubmitLine {
    //   width: 50rem;
    // }
  }
}
</style>
