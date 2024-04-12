<template>
  <NuxtLayout name="common">
    <div class="blogs">
      <div class="pc">
        <Particles v-if="initParticles" :particlesInit="particlesInit" id="tsparticles" :options="particles" />
      </div>
      <div class="blogMain">
        <div class="notice">愿你一生有山可靠，有树可栖。与心爱之人，春赏花，夏纳凉。秋登山，冬扫雪。</div>
        <div class="random_box">
          <div @click="getBlogsRandom" class="random">随机文章</div>
        </div>
        <div class="tags_box">
          <el-skeleton style="width: 100%" :loading="tagsList.length ? false : true" animated :count="1">
            <template #template>
              <div class="tags_box_inner">
                <div class="icon"><i class="iconfont">&#xe60b;</i></div>
                <div class="tags_list">
                  <el-skeleton-item class="tags_item" v-for="itme in 4" variant="text" style="width: 15%" />
                </div>
              </div>
            </template>

            <template #default>
              <el-scrollbar style="width: 100%">
                <div class="tags_box_inner">
                  <div class="icon"><i class="iconfont">&#xe60b;</i></div>
                  <div class="tags_list">
                    <div @click="changeTag(item.TagName)" v-for="item in tagsList" class="tags_item">
                      {{ item.TagName }}
                      <span class="tag_mark">{{ item.blogs }}</span>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </template>
          </el-skeleton>
        </div>

        <div class="blogsList">
          <!-- <el-skeleton style="width: 100%" :loading="blogsList.length ? true : true" animated :count="1">
            <template #template>
              <el-skeleton-item class="tags_item" v-for="itme in 3" variant="text" style="width: 100%; height: 18.75rem" />
            </template>

            <template #default>
              <el-scrollbar style="width: 100%">
                <BlogsItem v-for="(item, index) in blogsList" :blog="item" :index="index" :key="item._id"></BlogsItem>
              </el-scrollbar>
            </template>
          </el-skeleton> -->
          <BlogsItem v-for="(item, index) in blogsList" :blog="item" :index="index" :key="item._id"></BlogsItem>
          <el-pagination :hide-on-single-page="true" @current-change="pageChange" :current-page="pageNum" :page-size="6" background layout="prev, pager, next" :total="total" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import $http from '@/api/index.ts'
import BlogsItem from '@/components/BlogItem.vue'
import { particles } from '@/config/particles-config2.ts'
import { loadFull } from 'tsparticles'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// useSeoMeta({
//   title: '我的神奇网站',
//   ogTitle: '我的神奇网站',
//   description: '这是我的神奇网站，让我来告诉你关于它的一切。',
//   ogDescription: '这是我的神奇网站，让我来告诉你关于它的一切。',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// })
let router = useRouter()

let initParticles = ref(false)
onMounted(() => {
  console.log($store.location)
  createLog({
    moduleType: 'menu',
    operateType: '选择菜单',
    operateContent: '博客'
  })
  setTimeout(() => {
    initParticles.value = true
  }, 600)
})
// const GetLocation = proxy.GetLocation
const $store = useStore.common()
console.log($store)

const particlesInit = async (engine: any) => {
  await loadFull(engine)
}
// 随机文章
let getBlogsRandom = async () => {
  const { data } = await $http.blogs.getBlogsRandom()
  router.push({
    path: `/BlogDetail/${data.data[0]._id}`
  })
}
// https://particles.js.org/samples/index.html#imageMask 背景粒子库
// 博客

let blogsList = ref<Blog[]>([])

let pageNum = ref(1)
// 分页
let scrollTop = ref(0)
let pageChange = async (page: number) => {
  pageNum.value = page
  await getBlogsList()
  document.documentElement.scrollTop = 0
}
let total = ref(0)
// 标签列表
let getBlogsList = async () => {
  const { data } = await $http.blogs.getBlogsList({
    pageNum: pageNum.value
  })
  console.log(data)
  blogsList.value = data.data.list
  total.value = data.data.total
}
getBlogsList()
// 切换
let changeTag = (tag: string) => {
  router.push({
    path: `/Tags/${tag}`
  })
}

//标签分类
let tagsList = ref<Array<any>>([])
let getTypeList = async () => {
  const { data } = await $http.blogs.getTypeList()
  console.log(data)
  tagsList.value = data.data
  console.log(tagsList.value)
}
getTypeList()
// 博文，评论，点击总数

type Shift<T extends unknown[], U extends unknown[] = []> = [] extends T ? U : T extends [infer L, ...infer R] ? Shift<R, [L, ...U]> : U

type I8 = Shift<['a', 2, 3, 'da']> // J
</script>

<style lang="less" scoped>
.blogs {
  // display: flex;
  justify-content: center;
  padding-bottom: 4rem;

  .blogMain {
    .notice {
      font-family: DaoLiTi;
      align-items: center;
      border-radius: 0.625rem;
      // color: #fff;
      display: flex;
      padding: 22px;
      text-align: justify;
      color: @main-fontcolor;
      background-color: @main-backgroundcolor;
      margin-bottom: 2rem;
    }

    .random_box {
      background: url(@/assets/images/bg23.jpg) no-repeat 50% / cover;
      height: 10rem;
      border-radius: 0.625rem;
      margin-bottom: 2rem;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        .random {
          display: block;
        }
      }

      .random {
        display: none;
        width: 100%;
        height: 100%;
        background-color: #0084ff;
        transition: 0.5s;
        opacity: 0.7;
        color: #fff;
        padding: 3rem 0 0 3rem;
        font-size: 2rem;
      }
    }

    .tags_box {
      height: 2.7rem;
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      border-radius: 0.5rem;
      background-color: @main-backgroundcolor;
      border: 1px solid @main-bordercolor-gray;
      padding: 0.4rem 0.8rem;

      .tags_box_inner {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 0.5rem;
          display: flex;
        }

        .tags_list {
          flex: 1;
          height: 100%;
          display: flex;
          font-size: 0.875rem;
          justify-content: space-around;

          .active {
            background-color: #00c4b6f1;
            color: #fff;
          }

          .tags_item {
            padding: 0.2rem 0.4rem 0.3rem;
            border-radius: 0.5rem;
            text-align: center;
            cursor: pointer;

            .tag_mark {
              font-size: 0.6563rem;
              position: relative;
              top: -0.3rem;
            }

            // #00c4b6f1
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .pc {
    display: none;
  }

  .blogs {
    padding-top: 3rem;
  }
}

@media screen and (max-width: 600px) {
  .tags_box {
    .tags_box_inner {
      width: 35rem;
    }
  }
}

@media screen and (max-width: 1245px) {
  .blogs {
    .blogMain {
      min-height: 0 !important;
    }
  }
}

@media screen and (min-width: 1245px) {
  .blogs {
    .blogMain {
      // max-width: 60rem;
      box-sizing: border-box;
      // margin: 0 auto 40px;
      width: 100%;
      min-height: 52rem;
    }
  }
}
</style>
