<template>
  <div class="blogs">
    <div class="pc">
      <Particles :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" id="tsparticles"
        :options="particles" />
    </div>
    <div class="blogFlex">
      <div class="blogsSide">
        <div class="mine shadow-box">
          <div class="mine_bg"></div>
          <div class="mine_head">
            <img src="@/assets/images/msn.jpg" alt="" />
          </div>
          <div class="mine_m ">
            <span>小鹿</span>
            <div class="mine_source">博客源码</div>
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
        <div class="hot shadow-box">
          <div class="hot_title">
            <i class="iconfont">&#xe666;</i>
            热门文章
          </div>
          <div @click="blogDetail(item._id)" class="hot_item" v-for="(item, index) in hotList" :key="item._id">
            <div class="article__image">
              <img :src="'/api/xiaolu/' + item.ArticleCover" alt="">
            </div>
            <div class="article__title">
              {{ item.title }}
            </div>
            <div class="article__date">
              <i class="iconfont">&#xe626;</i>
              {{ format('yyyy-MM-dd hh:mm:ss', Date.parse(item.CreateDate)) }}
            </div>

          </div>
        </div>
        <div class="tag shadow-box">
          <div class="tag_title">
            <i class="iconfont">&#xe691;</i>
            标签分类
          </div>
          <div @click="blogDetail(item._id)" class="hot_item" v-for="(item, index) in typeList" :key="item._id">
            <div class="tag_item">
              <div class="text">{{ item.TagName }} ({{ item.blogs }}篇)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="blogMain">
        <div class="notice">
          愿你一生有山可靠，有树可栖。与心爱之人，春赏花，夏纳凉。秋登山，冬扫雪。
        </div>
        <div class="blogsList">
          <BlogsItem v-for="item in blogsList" :blog="item" :key="item.id"></BlogsItem>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import $http from '@/api/index.ts';
import BlogsItem from '@/components/BlogItem.vue';
import { particles } from '@/config/particles-config2.ts';
import { loadFull } from 'tsparticles';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const format = $format
// const GetLocation = proxy.GetLocation
const particlesInit = async (engine: any) => {
  await loadFull(engine)
}
const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container)
}
// https://particles.js.org/samples/index.html#imageMask 背景粒子库
// 博客
type blogsList = {
  id: string
  img: string
  title: string
  explain: string
  type: string
  time: string
  look: number
  comment: number
}
let blogsList = ref<blogsList[]>([])
type hotList = {
  title: string
  _id: number
  ArticleCover: string
  CreateDate: string
}
let hotList = ref<hotList[]>([

])
//
let blogDetail = async (id: number) => {
  router.push({
    name: 'BlogDetail',
    params: {
      id: id
    }
  })
}
//热门
let getHotList = async () => {
  const { data } = await $http.blogs.getHotList()
  console.log(data)
  hotList.value = data.data
}
getHotList()
//标签分类
let typeList = ref<Array<any>>([1])
let getTypeList = async () => {
  const { data } = await $http.blogs.getTypeList()
  console.log(data)
  typeList.value = data.data
  console.log(typeList.value)
}
getTypeList()

//
let ArticleNum = ref(0)
let CommentNum = ref(0)
let LeaveMessageNum = ref(0)

let blogsSum = async () => {
  const { data } = await $http.blogs.blogsSum()
  if (data.status == 0) {
    ArticleNum.value = data.data.Blogs
    CommentNum.value = data.data.Comments
    LeaveMessageNum.value = data.data.Hits
  }
}

let getBlogsList = async () => {
  const { data } = await $http.blogs.getBlogsList()
  blogsList.value = data.data
}


let init = async () => {
  await blogsSum()
  // getIPCity()
  let ArticleNum2 = ArticleNum.value
  let CommentNum2 = CommentNum.value
  let LeaveMessageNum2 = LeaveMessageNum.value
  ArticleNum.value = 0
  CommentNum.value = 0
  LeaveMessageNum.value = 0
  let timeA = 3000 / ArticleNum2
  let timeC = 3000 / CommentNum2
  let timeL = 3000 / LeaveMessageNum2
  var NumInterval1 = window.setInterval(function () {
    ArticleNum.value += 1
    if (ArticleNum.value == ArticleNum2) {
      clearInterval(NumInterval1)
    }
  }, timeA)
  var NumInterval2 = window.setInterval(function () {
    CommentNum.value += 1
    if (CommentNum.value == CommentNum2) {
      clearInterval(NumInterval2)
    }
  }, timeC)
  var NumInterval3 = window.setInterval(function () {
    LeaveMessageNum.value += 1
    if (LeaveMessageNum.value == LeaveMessageNum2) {
      clearInterval(NumInterval3)
    }
  }, timeL)

  getBlogsList()
}
init()
// 博文，评论，点击总数
</script>

<style lang="less" scoped>
.blogs {
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;

  .blogMain {
    .notice {
      align-items: center;
      border-radius: 10px;
      color: #fff;
      display: flex;

      padding: 22px;
      text-align: justify;
    }
  }

}

@media only screen and (max-device-width: 768px) {
  .pc {
    display: none;
  }

  .blogs {
    background: url(@/assets/images/bg_phone.jpg) no-repeat 50%/cover;

    padding-top: 3rem;

    .blogMain {
      .notice {
        border: 1px dashed #e9c1c1;
        margin-top: 2.5rem;
      }
    }

    .blogsSide {

      .hot,
      .tag {
        border: 1px solid #e9c1c1;
        border-radius: 10px;
        background-color: #fff;
        margin-top: 1rem;
        padding: 1rem;
        padding-right: 0.5rem;
        // color: fff;
        font-size: 14px;
        cursor: pointer;

        .hot_title,
        .tag_title {
          font-size: 1.125rem;
          // color: #fff;
          padding-bottom: 10px;
        }

        .tag_item {
          width: 100%;
          padding: 10px 0;

          // color: #fff;
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
            // color: #fff;
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
            // color: #fff;
            margin-top: 10px;
            width: 100%;
          }
        }
      }

      .mine {

        border-radius: 10px;
        overflow: hidden;

        .mine_bg {
          height: 8rem;
          background-image: none;
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
          color: #fff;

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
          display: none;
        }
      }
    }

    .blogFlex {
      display: block;
      width: 100%;
      margin: 0 20px;
      min-height: 100vh;

      .blogsList {
        width: 100%;
      }
    }
  }


}

@media only screen and (min-device-width: 768px) {
  .blogs {
    margin-top: 10rem;

    .blogFlex {

      display: flex;
      position: relative;

      margin: 0 auto;

      display: flex;
      justify-content: center;
      padding: 40px 100px;


      .blogMain {
        width: 850px;
        box-sizing: border-box;
        margin: 0 auto 40px;
        min-height: 52rem;

        .notice {
          border: 1px dashed #ddd;
        }
      }



      .blogsSide {
        margin-right: 2.5rem;
        position: sticky;
        top: 0;
        width: 30%;
        max-width: 300px;
        height: 250px;

        .hot,
        .tag {
          border-radius: 10px;
          background-color: #fff;
          margin-top: 1rem;
          padding: 1rem;
          padding-right: 0.5rem;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          cursor: pointer;

          .hot_title,
          .tag_title {
            font-size: 1.125rem;
            color: #333;
            padding-bottom: 10px;
          }

          .tag_item {
            width: 100%;
            padding: 10px 0;

            color: #555;
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
              color: #555;
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
              color: #888;
              margin-top: 10px;
              width: 100%;
            }
          }
        }

        .mine {
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;

          .mine_bg {
            height: 8rem;
            background-image: url(@/assets/images/bg.jpg);
            background-position: 0 0;
            background-size: 100% 110px;
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
            color: #5e5e5e;
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
      }
    }
  }

}
</style>
