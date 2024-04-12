<template>
  <div @click="blogDetail(blog._id)" class="BlogItem shadow-box">
    <div v-if="index % 2 == 0" class="img">
      <img loading="lazy" v-if="blog.ArticleCover" :src="_imgUrl(blog.ArticleCover)" :alt="blog.Title" />
    </div>
    <div class="main">
      <div class="time flex">
        <i class="iconfont">&#xe6d9;</i>
        <span> 发布于{{ _format('yyyy-MM-dd', Date.parse(blog.CreateDate)) }}</span>
      </div>
      <div class="title">{{ blog.Title }}</div>
      <div class="footer">
        <div class="flex">
          <i class="iconfont">&#xe657;</i>
          <span>{{ blog.hits }}阅读</span>
        </div>
        <div class="flex">
          <i class="iconfont">&#xe606;</i>
          <span>{{ blog.CommentNum }}条评论</span>
        </div>
      </div>
      <div class="brief">
        {{ blog.Summary }}
      </div>
      <div class="tag">
        <span class="tagContent flex">
          <i class="iconfont">&#xe71f;</i>
          <span>{{ blog.TagName }}</span>
        </span>
      </div>
    </div>
    <div v-if="index % 2 != 0" class="img"><img v-if="blog.ArticleCover" loading="lazy" :src="_imgUrl(blog.ArticleCover)" :alt="blog.Title" /></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const _format = $format

let router = useRouter()

interface Props {
  blog: Blog
  index: number
}
let props = defineProps<Props>()

let blogDetail = async (id: string) => {
  router.push({
    path: `/BlogDetail/${id}`
  })
}
</script>

<style lang="less" scoped>
.BlogItem {
  display: flex;
  margin-top: 2.5rem;
  border-radius: 10px;

  .img {
    flex-shrink: 0;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: all 0.5s ease;
    }

    img:hover {
      transform: scale(1.2);
      transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
    }
  }

  .main {
    padding: 20px 35px;
    display: flex;
    flex-direction: column;
    color: @main-fontcolor;

    .icon {
      margin-right: 0.3rem;
    }

    .time {
      font-size: 0.75rem;
      color: @main-fontcolor-gray;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .footer {
      display: flex;
      margin-bottom: 1rem;
      color: @main-fontcolor-gray;
      font-size: 0.75rem;

      div {
        margin-right: 0.9rem;
      }
    }

    .brief {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 0.94rem;
      line-height: 1.7;
      text-align: justify;

      margin-bottom: 1rem;
    }

    .flex {
      display: flex;
    }

    .tag {
      .tagContent {
        background-color: @main-bordercolor-gray;
        border-radius: 3px;
        color: @main-fontcolor-gray;
        cursor: pointer;
        font-size: 14px;
        padding: 3px 10px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .BlogItem {
    // width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    // border: 1px solid @main-bordercolor-1;
    background-color: @main-backgroundcolor;

    .img {
      width: 100%;
      height: 195px;
    }

    .main {
      // .time {
      //   color: #fff;
      // }

      // .title {
      //   color: #fff;
      // }

      // .footer {
      //   color: #fff;
      // }

      // .brief {
      //   color: #fff;
      // }

      .tag {
        .tagContent {
          // background-color: #eee;
          border-radius: 3px;
          color: @main-fontcolor-gray;
          cursor: pointer;
          font-size: 14px;
          padding: 3px 10px;
        }
      }
    }
  }

  .left {
    img {
      width: 100%;
      height: 11.5rem;
    }
  }
}

@media screen and (min-width: 768px) {
  .BlogItem {
    display: flex;
    margin-top: 2.5rem;
    border-radius: 10px;
    cursor: pointer;
    // transition: 0.3s ease-in;
    // background: linear-gradient(0, #01aaed 1px, #01aaed 0) no-repeat, linear-gradient(-90deg, #01aaed 1px, #01aaed 0) no-repeat, linear-gradient(-180deg, #01aaed 1px, #01aaed 0) no-repeat, linear-gradient(-270deg, #01aaed 1px, #01aaed 0) no-repeat;
    // background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    // background-size: 0 1px, 1px 0, 0 1px, 1px 0;
    height: 18.75rem;
    overflow: hidden;
    background-color: @main-backgroundcolor;

    // &:hover {
    //   cursor: pointer;
    //   background-size: 100% 1px, 1px 100%, 100% 1px, 1px 100%;
    // }

    .img {
      width: 50%;
    }

    .main {
      width: 50%;
    }
  }
}
</style>
