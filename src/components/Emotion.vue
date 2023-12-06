<template>
  <div class="EmoticonListCover" v-if="EmotionShow" @click="OpenEmotion()">
    <div class="EmoticonList">
      <div class="PicItem" v-for="(item, i) in EmotionList" @click.stop="ClickEmoticon(i)" :key="i">
        <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + i + '.gif'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const _emotionList = $EmotionList
let showEmo = () => {
  EmotionShow.value = !EmotionShow.value
}
bus.$on('showEmo', showEmo)

let EmotionList = _emotionList
let EmotionShow = ref(false)
// computed: {
//   EmotionShow() {
//     return Store.state.EmotionShow
//   },
// },

//选中表情
let ClickEmoticon = function (EmoticonNo: number) {
  bus.$emit('AppendMessageText', '[[' + EmotionList[EmoticonNo] + ']]')
  showEmo()
}
let OpenEmotion = function () {
  showEmo()
}
</script>

<style scoped lang="less">
.EmoticonListCover {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000000;
}

.EmoticonList {
  // .myflex(center);
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  width: 272px;
  height: 238px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
  // background-color: @fore_color;
  padding: 10px;
  text-align: center;
  // border: 1px solid @BorderColor;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.6);
  /*box-shadow: 3px 0px 2px 2px @BorderColor,-3px 0px 2px 2px @BorderColor,0px 3px 2px 2px @BorderColor,0px -3px 2px 2px @BorderColor*/
  overflow-y: scroll;
}

.PicItem {
  width: 34px;
  text-align: center;
  cursor: pointer;
}

.PicItem img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
}

.Fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.Fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
