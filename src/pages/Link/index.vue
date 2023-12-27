<template>
  <NuxtLayout name="noside">
    <div class="linkPage">
      <h2>『友链』[{{ friendList.length }}]</h2>
      <div class="flink-desc">对博客搭建有帮助的大佬以及一起玩博客的小伙伴</div>
      <div class="site-card-group">
        <div @click="goLink(item.author_link)" v-for="item in friendList" class="site-card">
          <card-2>
            <template v-slot:front>
              <div class="frot">
                <img :src="item.author_avatar" :alt="item.author_name">
                <div class="auth-name">{{ item.author_name }}</div>
                <div class="auth-content"> {{ item.author_descr }}</div>
              </div>

            </template>
            <template v-slot:back>
              <div class="back">
                <img :src="item.author_siteshot" :alt="item.author_descr">
              </div>

            </template>
          </card-2>
        </div>
      </div>

      <h2>『收藏网站』[{{ toolList.length }}]</h2>
      <div class="flink-desc">一些有趣的网站</div>
      <div class="site-card-group">
        <div @click="goLink(item.author_link)" v-for="item in toolList" class="site-card">
          <card-2>
            <template v-slot:front>
              <div class="frot">
                <img :src="item.author_avatar" :alt="item.author_name">
                <div class="auth-name">{{ item.author_name }}</div>
                <div class="auth-content"> {{ item.author_descr }}</div>
              </div>

            </template>
            <template v-slot:back>
              <div class="back">
                <img :src="item.author_siteshot" :alt="item.author_descr">
              </div>

            </template>
          </card-2>
        </div>
      </div>

      <figure class="plaintext">
        <div class="highlight-tools "><i class="fas fa-angle-down expand"></i>
          <div class="code-lang">
            PLAINTENT
            <svg @click="copy" t="1700721041298" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="2735" width="200" height="200">
              <path
                d="M866.304 907.264H461.824l-40.96-40.96V664.576h81.92v160.768h322.56V502.784H664.576v-81.92h201.728l40.96 40.96v404.48z"
                fill="#437DFF" p-id="2736"></path>
              <path
                d="M334.39744 377.86624L377.856 334.4384 421.2736 377.856 377.856 421.31456zM434.83136 478.03392l43.43808-43.44832 43.44832 43.44832-43.44832 43.44832zM535.25504 578.2016l43.44832-43.44832 43.43808 43.44832-43.43808 43.43808z"
                fill="#63F7DE" p-id="2737"></path>
              <path
                d="M359.424 603.136H157.696l-40.96-40.96V157.696l40.96-40.96h404.48l40.96 40.96v201.728h-81.92V198.656H198.656v322.56h160.768z"
                fill="#437DFF" p-id="2738"></path>
            </svg>
          </div>

          <div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>
        </div>
        <figcaption style="display: block;padding: .5rem 0;"><span>我的信息:</span></figcaption>
        <div ref="messageDom" class="message">
          <div class="line">
            <div class="num">1</div>
            <div class="box"> name: 小鹿</div>
          </div>
          <div class="line">
            <div class="num">2</div>
            <div class="box"> link: https://www.qcqx.cn</div>
          </div>
          <div class="line">
            <div class="num">3</div>
            <div class="box"> avatar: https://www.qcqx.cn/head.webp</div>
          </div>
          <div class="line">
            <div class="num">4</div>
            <div class="box"> descr: 吃饭睡觉</div>
          </div>
          <div class="line">
            <div class="num">5</div>
            <div class="box"> siteshot: https://www.qcqx.cn/qcqx.webp</div>
          </div>
        </div>
      </figure>
    </div>
  </NuxtLayout>
</template>

<script setup lang='ts'>
useHead({
  title: '小鹿|友链',
})
import $http from '@/api/index.ts';
import { onMounted, ref } from 'vue';
onMounted(() => {
  createLog({
    moduleType: 'menu',
    operateType: '选择菜单',
    operateContent: '友链'
  })
})
let messageDom = ref()
let copy = () => {
  console.log(messageDom.value.innerHTML);

  // 复制结果
  let copyResult = true
  // 创建一个input元素
  let inputDom = document.createElement('textarea');
  // 设置为只读 防止移动端手机上弹出软键盘  
  inputDom.setAttribute('readonly', 'readonly');
  // 给input元素赋值
  inputDom.value = 'name: 小鹿\nlink: https://www.qcqx.cn\navatar: https://www.qcqx.cn/head.webp\ndescr: 吃饭睡觉\nsiteshot: https://www.qcqx.cn/qcqx.webp';
  // 将创建的input添加到body
  document.body.appendChild(inputDom);
  // 选中input元素的内容
  inputDom.select();
  // 执行浏览器复制命令
  // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签中的内容）
  // Input要在正常的编辑状态下原生复制方法才会生效
  const result = document.execCommand('copy')
  // 判断是否复制成功
  if (result) {
    console.log('复制成功');
  } else {
    console.log('复制失败');
    copyResult = false
  }
  // 复制操作后再将构造的标签 移除
  document.body.removeChild(inputDom);
  // 返回复制操作的最终结果
  return copyResult;

}
let friendList = ref<FriendLink[]>([])
let toolList = ref<FriendLink[]>([])

// 
let goLink = (link: string) => {
  window.open(link)
}
// 友链列表
let getLinkList = async () => {
  const { data } = await $http.other.getLinkList()
  console.log(data);
  friendList.value = data.data.data.filter((item: FriendLink) => {
    return item.type == '1'
  })
  toolList.value = data.data.data.filter((item: FriendLink) => {
    return item.type == '2'
  })

}
getLinkList()
</script>
<style lang='less' scoped>
.linkPage {
  // border: 2px solid rgba(0, 255, 255, .6);
  font-size: 15.5px;
  font-weight: 700;
  background: @main-backgroundcolor;
  animation: slide-in .5s .1s backwards;
  -webkit-animation: slide-in .5s .1s backwards;
  border-radius: 18px;
  padding: 10px 35px;

  h2 {
    margin: 1rem 0;
  }

  .flink-desc {
    font-weight: 700;
    margin: .5rem 0;
  }

  .site-card-group {
    display: flex;
    flex-wrap: wrap;

    .site-card {



      .frot {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }

        .auth-name {
          font-size: 1.25rem;
        }

        .auth-content {
          font-size: .875rem;
          color: #999;
        }
      }

      .back {
        width: 100%;
        height: 100%;


        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .plaintext {
    margin: 2rem 0;
    border-radius: 7px;
    background-color: #282c34;
    color: #eff;
    font-size: .875rem;
    padding: 1rem;

    .code-lang {
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
      }
    }

    .message {
      .line {
        display: flex;
        align-items: center;
        padding: .2rem 0;
        flex-wrap: wrap;

        .num {
          color: rgba(238, 255, 255, 0.5);
          margin-right: 1rem;
        }
      }
    }
  }


}

@media screen and (min-width: 768px) {
  .linkPage {
    padding: 10px 15px;

    .site-card {
      width: 13rem;
      height: 8.3rem;
      margin: .5rem;
    }
  }

}

@media screen and (max-width: 768px) {
  .linkPage {
    padding: 10px 15px;

    .site-card-group {
      justify-content: space-between;

      .site-card {
        width: 49%;
        height: 8.3rem;
        margin-bottom: .5rem;

      }
    }

  }

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