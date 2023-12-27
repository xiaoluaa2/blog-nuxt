<!--  -->
<template>
  <NuxtLayout name="common">
    <div class="tags_page">
      <div class="tags">
        <el-scrollbar v-if="tagsList.length">
          <div class="tags_box">
            <div class="icon"> <i class="iconfont">&#xe60b;</i></div>
            <div class="tags_list">
              <div @click="changeTag(item.TagName)" :class="item.TagName == route.params.tag ? 'active' : ''"
                v-for="item in tagsList" class="tags_item">
                {{ item.TagName }}
                <span class="tag_mark">{{ item.blogs }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>

        <div class="article-sort-title">
          分类 - {{ route.params.tag }}
        </div>
        <div class="blogs_box">
          <div v-for="item in blogsList" class="years">
            <div class="year">{{ item.year }}</div>
            <div class="blog_list">
              <div @click="blogDetail(blog._id)" v-for="blog in item.blogs" class="blog">

                <div class="banner">
                  <img :src="_imgUrl(blog.ArticleCover)" :alt="blog.Title">
                </div>
                <div class="right">
                  <div class="number">{{ blog.number }}</div>
                  <div class="title">{{ blog.Title }}</div>
                  <div class="tags_list">
                    <div class="blog_tag">{{ blog.TagName }}</div>
                  </div>
                  <div class="time"> {{ format('yyyy-MM-dd', Date.parse(blog.CreateDate)) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination :hide-on-single-page="true" @current-change="pageChange" :current-page="pageNum" :page-size="20"
          background layout="prev, pager, next" :total="total" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang='ts'>
useHead({
  title: `小鹿|分类`,
})
import $http from '@/api/index.ts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
interface BlogsList {
  year: string
  blogs: Blog[]

}
let route = useRoute()
let router = useRouter()
let pageNum = ref(1)
let total = ref(0)
const format = $format
//标签分类
let tagsList = ref<Array<BlogTag>>([])
let getTypeList = async () => {
  const { data } = await $http.blogs.getTypeList()
  tagsList.value = data.data
  console.log(tagsList.value)
}
// 切换
let changeTag = (tag: string) => {
  router.push({
    path: `/Tags/${tag}`
  })
}
getTypeList()
let blogsList = ref<BlogsList[]>([])
let getBlogsList = async () => {
  console.log(route.params.tag);
  const { data } = await $http.blogs.getBlogsList({
    tag: route.params.tag,
    pageNum: pageNum.value
  })
  total.value = data.data.total

  let list: BlogsList[] = []
  let m = new Map()
  data.data.list.forEach((item: Blog) => {
    let year = item.CreateDate.slice(0, 4)
    if (m.has(year)) {
      let index = 0
      for (let i = 0; i < list.length; i++) {
        if (list[i].year == year) {
          index = i
          break
        }

      }
      list[index].blogs.push(item)
    } else {
      m.set(year, year)
      list.push({
        year,
        blogs: [item]
      })
    }

  })
  console.log(list);
  blogsList.value = list
}
getBlogsList()
// 分页
let pageChange = (page: number) => {
  pageNum.value = page
  getBlogsList()
}
// 博客
let blogDetail = async (id: string) => {
  router.push({
    path: `/BlogDetail/${id}`
  })
}
</script>
<style lang='less' scoped>
.tags_page {
  height: 100%;
  color: @main-fontcolor;
  margin-bottom: 1rem;

  .tags {
    padding: 2rem 2.1875rem;
    background-color: @main-backgroundcolor;
    border-radius: 1.125rem;

    .tags_box {
      display: flex;
      padding: .4rem .8rem;
      border-radius: .5rem;
      border: 1px solid @main-bordercolor-gray;
      align-items: center;

      .icon {
        margin-right: .5rem;
        display: flex;
      }

      .tags_list {
        flex: 1;
        height: 100%;
        display: flex;
        font-size: .875rem;
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
            font-size: .6563rem;
            position: relative;
            top: -0.3rem;
          }

          // #00c4b6f1
        }

      }
    }


  }

  .article-sort-title {
    font-family: STZhongsong, 'Microsoft YaHei';
    font-size: 2em;
    font-weight: 700;
    margin: 1rem 0 1rem 2rem;
  }

  .blogs_box {

    .years {
      .year {
        font-size: 1.75rem;
        font-weight: 700;
      }

      .blog_list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;

        .blog {
          cursor: pointer;
          border-radius: .75rem;
          box-sizing: border-box;
          padding: .5rem;
          margin: 1rem 0;
          width: 48%;
          min-width: 21.875rem;
          display: flex;
          background-color: @main-bordercolor-gray;

          .banner {
            border-radius: .5rem;
            width: 10rem;
            height: 5.625rem;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;

              &:hover {
                transform: scale(1.2);
                transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
              }
            }

          }

          .right {
            flex: 1;
            padding: 1rem;
            position: relative;

            .number {
              font-family: DaoLiTi;
              position: absolute;
              right: 0;
              top: -.5rem;
              font-size: 2.5rem;
              color: @main-fontcolor-gray;
            }

            .title {
              font-size: 1.0625rem;
              font-weight: 700;

              &:hover {
                color: #00c4b6f1;
                transform: translateX(.6rem);
                transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
              }
            }

            .tags_list {
              .blog_tag {
                font-size: .8rem;
                margin-top: .5rem;
              }
            }

            .time {
              text-align: right;
              font-size: .875rem;
              color: @main-fontcolor-gray;
              bottom: .625rem;
              right: .625rem;
              position: absolute;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .tags_box {
    width: 35rem;
  }

  .blog {
    width: 100% !important;
  }
}

@media screen and (max-width: 1245px) {
  .tags_box {
    width: 35rem;
  }



  .blog {
    width: 100% !important;
  }
}

@media screen and (min-width: 1245px) {
  .tags_page {
    .tags {
      max-width: 60rem;
    }

  }
}
</style>