<template>
  <div class="music">
    <button class="button">
      <div @click="showList = !showList" class="bloom-container">

        <div v-show="issuspend" class="button-container-main">
          <div class="button-inner">
            <div class="back"></div>
            <div class="front">
              <svg t="1701070286445" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21570"
                width="40" height="40">
                <path
                  d="M516.257 293.63c0-122.447-97.891-221.705-218.647-221.705-120.756 0-218.647 99.259-218.647 221.705 0 70.809 32.859 133.718 83.828 174.307h-0.287l353.753 252.299 353.588-252.15h-0.314c51.077-40.581 84.02-103.557 84.02-174.455 0-122.447-97.891-221.705-218.647-221.705-120.755-0.002-218.647 99.257-218.647 221.704"
                  fill="#F7A09F" p-id="21571"></path>
                <path
                  d="M440.673 322.883l413.9-46.73v512.39c-0.02 0.2-0.02 0.41-0.02 0.61 0 22.76-9.17 45.77-25.82 64.8-18.13 20.73-43.53 35.29-73.46 42.12-32.02 7.31-64.11 4.95-90.34-6.65-25.1-11.1-41.69-29.36-46.73-51.43-9-39.42 21.78-83.12 73.19-103.91 0.06-0.02 0.12-0.05 0.18-0.07 1.18-0.47 2.37-0.93 3.66-1.41l99.66-38.47c4.37-1.69 7.25-5.89 7.25-10.58v-286.32a11.331 11.331 0 0 0-12.72-11.25l-281.62 34.66c-5.69 0.7-9.96 5.52-9.96 11.25v394.25c-0.01 0.29-0.01 0.57-0.01 0.85 1.11 43.37-41.82 86.07-99.86 99.32-32.02 7.31-64.11 4.94-90.34-6.66-25.1-11.1-41.69-29.36-46.73-51.42-9.18-40.21 22.49-84.27 75.24-104.73 0.04-0.02 0.1-0.04 0.14-0.05 5.39-2.08 61.78-17.48 96.06-26.71 5.72-1.54 9.25-7.21 8.21-12.96-1.5-14.75-0.77-243.67 0.12-400.9z"
                  fill="#B8D6C8" p-id="21572"></path>
                <path
                  d="M873.463 255.014a11.359 11.359 0 0 0-8.83-2.81l-436.51 49.28c-5.71 0.64-10.04 5.46-10.07 11.2-0.01 1.01-0.59 102.1-0.88 203.04-0.39 135.44-0.03 183.62 0.45 201.5-24.94 6.74-82.62 22.4-89.47 25.06-0.05 0.02-0.1 0.03-0.14 0.05-29.94 11.61-55.41 30.71-71.72 53.78-17.12 24.2-23.33 51.61-17.5 77.16 6.67 29.22 27.86 53.06 59.67 67.12 19.12 8.46 40.76 12.75 63.24 12.75 13.59 0 27.48-1.57 41.32-4.72 33.12-7.56 63.16-23.86 84.6-45.89 21.72-22.31 33.39-49.1 32.9-75.51v-261.32l258.95-31.16v141.23l-92.32 35.64c-1.33 0.5-2.67 1.01-3.99 1.54l-0.11 0.04c-0.16 0.07-0.32 0.13-0.48 0.2-29.14 11.85-53.85 30.88-69.62 53.6-16.62 23.97-22.61 51.05-16.86 76.25 6.67 29.22 27.86 53.05 59.67 67.12 30.67 13.56 67.81 16.41 104.56 8.02 34.61-7.9 64.17-24.95 85.48-49.3 20.11-22.98 31.25-51.04 31.42-79.07 0.02-0.22 0.02-0.43 0.02-0.65v-525.7c0-3.231-1.37-6.301-3.78-8.45z m-352.94 287.839v-100.93l258.95-31.87v101.64l-258.95 31.16z m334.05 245.69c-0.02 0.2-0.02 0.41-0.02 0.61 0 22.76-9.17 45.77-25.82 64.8-18.13 20.73-43.53 35.29-73.46 42.12-32.02 7.31-64.11 4.95-90.34-6.65-25.1-11.1-41.69-29.36-46.73-51.43-9-39.42 21.78-83.12 73.19-103.91 0.06-0.02 0.12-0.05 0.18-0.07 1.18-0.47 2.37-0.93 3.66-1.41l99.66-38.47c4.37-1.69 7.25-5.89 7.25-10.58v-286.32a11.331 11.331 0 0 0-12.72-11.25l-281.62 34.66c-5.69 0.7-9.96 5.52-9.96 11.25v394.25c-0.01 0.29-0.01 0.57-0.01 0.85 1.11 43.37-41.82 86.07-99.86 99.32-32.02 7.31-64.11 4.94-90.34-6.66-25.1-11.1-41.69-29.36-46.73-51.42-9.18-40.21 22.49-84.27 75.24-104.73 0.04-0.02 0.1-0.04 0.14-0.05 5.39-2.08 61.78-17.48 96.06-26.71 5.72-1.54 9.25-7.21 8.21-12.96-1.5-14.75-0.77-243.67 0.12-400.9l413.9-46.73v512.39zM379.013 150.323c-1.06-5.53-6.03-9.44-11.67-9.18l-124.9 5.89c-4.66 0.22-8.71 3.27-10.21 7.69l-49.75 147.06c-10.85-3.33-22.64-4.59-34.68-3.66-19.81 1.53-38.11 8.88-51.51 20.69-14.31 12.62-21.48 28.77-20.19 45.48 1.29 16.72 10.86 31.58 26.94 41.84 13.11 8.37 29.37 12.83 46.44 12.83 2.53 0 5.08-0.1 7.64-0.3 34.01-2.63 62.74-22.85 70.03-49.22l50.83-150.67 22.09-2.15c32.15-1.17 55.12-10.11 68.25-26.57 14.6-18.31 10.86-38.86 10.69-39.73z m-28.419 25.59c-8.74 10.95-26.6 17.19-51.66 18.06-0.24 0-0.48 0.02-0.71 0.04l-29.74 2.9c-4.45 0.44-8.22 3.44-9.65 7.66l-53.27 157.94c-0.08 0.22-0.15 0.45-0.21 0.68-4.6 17.16-25.62 30.98-49.98 32.86-14.94 1.16-29.19-2.05-40.13-9.04-9.93-6.33-15.8-15.021-16.53-24.46-0.73-9.45 3.73-18.94 12.57-26.72 9.74-8.59 23.33-13.95 38.27-15.1 1.92-0.15 3.84-0.23 5.75-0.23 10.44 0 20.62 2.2 29.15 6.35 2.92 1.43 6.33 1.53 9.33 0.27a11.3 11.3 0 0 0 6.37-6.82l51.08-150.98 104.9-4.95c-0.821 3.55-2.441 7.65-5.54 11.54z"
                  fill="#3D464B" p-id="21573"></path>
                <path
                  d="M356.134 164.373c-0.82 3.55-2.44 7.65-5.54 11.54-8.74 10.95-26.6 17.19-51.66 18.06-0.24 0-0.48 0.02-0.71 0.04l-29.74 2.9c-4.45 0.44-8.22 3.44-9.65 7.66l-53.27 157.94c-0.08 0.22-0.15 0.45-0.21 0.68-4.6 17.16-25.62 30.98-49.98 32.86-14.94 1.16-29.19-2.05-40.13-9.04-9.93-6.33-15.8-15.021-16.53-24.46-0.73-9.45 3.73-18.94 12.57-26.72 9.74-8.59 23.33-13.95 38.27-15.1 1.92-0.15 3.84-0.23 5.75-0.23 10.44 0 20.62 2.2 29.15 6.35 2.92 1.43 6.33 1.53 9.33 0.27a11.3 11.3 0 0 0 6.37-6.82l51.08-150.98 104.9-4.95z"
                  fill="#B8D6C8" p-id="21574"></path>
                <path
                  d="M222.803 575.133c-27.16 0-49.25 22.09-49.25 49.24 0 27.16 22.09 49.25 49.25 49.25 27.15 0 49.24-22.09 49.24-49.25 0-27.149-22.09-49.24-49.24-49.24z m0 75.81c-14.65 0-26.57-11.92-26.57-26.57s11.92-26.56 26.57-26.56 26.57 11.91 26.57 26.56-11.92 26.57-26.57 26.57z"
                  fill="#3D464B" p-id="21575"></path>
                <path
                  d="M249.373 624.373c0 14.65-11.92 26.57-26.57 26.57s-26.57-11.92-26.57-26.57 11.92-26.56 26.57-26.56 26.57 11.911 26.57 26.56z"
                  fill="#B8D6C8" p-id="21576"></path>
                <path
                  d="M162.283 789.813c-5.95-23.42-29.84-37.64-53.27-31.69-23.42 5.94-37.64 29.84-31.7 53.26 5.03 19.83 22.91 33.06 42.49 33.06 3.56 0 7.17-0.44 10.78-1.36 19.82-5.03 33.05-22.92 33.05-42.5a43.91 43.91 0 0 0-1.35-10.77z m-24.31 21.61c-2.89 4.85-7.5 8.29-12.97 9.68-11.31 2.87-22.84-3.99-25.71-15.3-2.87-11.3 3.99-22.83 15.3-25.7 1.74-0.45 3.479-0.66 5.2-0.66 9.45 0 18.08 6.39 20.51 15.96 1.39 5.47 0.56 11.16-2.33 16.02z"
                  fill="#3D464B" p-id="21577"></path>
                <path
                  d="M137.973 811.423c-2.89 4.85-7.5 8.29-12.97 9.68-11.31 2.87-22.84-3.99-25.71-15.3-2.87-11.3 3.99-22.83 15.3-25.7 1.74-0.45 3.479-0.66 5.2-0.66 9.45 0 18.08 6.39 20.51 15.96 1.39 5.47 0.56 11.16-2.33 16.02z"
                  fill="#F7A09F" p-id="21578"></path>
              </svg>
            </div>
          </div>
          <div class="button-glass">
            <div class="back"></div>
            <div class="front"></div>
          </div>
        </div>
        <div v-show="!issuspend" class="poster">
          <img :src="nowMusic.cover" :alt="nowMusic.name">
        </div>


        <div class="bloom bloom1"></div>
        <div class="bloom bloom2">
        </div>


      </div>
    </button>
    <div v-show="showList" class="list-box">
      <div class="list">
        <div :class="item.id == nowMusic.id ? 'actice' : ''" @click="changeMusic(item)" v-for="item  in musiclist"
          class="item">
          <div class="index">{{ item.id }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="singer">{{ item.artist }}</div>
        </div>
      </div>
      <div class="aplayer-info" style="display: block;">
        <div class="aplayer-music">
          <div>
            <span class="aplayer-title">{{ nowMusic.name }}</span>
            <span class="aplayer-author"> - {{ nowMusic.artist }}</span>
          </div>
          <div class="aplayer-icon ">
            <span @click="beforMusic" class="iconfont  icon-shangyiqu"></span>
            <span @click="play" v-if="issuspend" class="iconfont aplayer-icon  icon-zanting"></span>
            <span @click="play" v-else class="iconfont     icon-bofangzhong"></span>
            <span @click="nextMusic" class="iconfont icon-xiayiqu"></span>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="time-bar">
          <!-- 音频播放 -->
          <audio class="music" ref="audio" :src="nowMusic.url" preload="none"></audio>
          <div class="text">{{ CurrentTime || '00:00' }}</div>
          <div class="time-bar-pro">
            <el-slider :show-tooltip="false" @change="progressChange" v-model="slider" />
          </div>
          <div class="text">{{ EndTime || '00:00' }}</div>
          <div class="flex-end">
            <div class="volume">
              <el-slider @change="volumeChange" v-model="volume" vertical height="40px" />
              <div class="iconfont icon-yinliang"></div>
            </div>
            <div v-if="playType == 0" @click="changePlayType" class="iconfont  icon-liebiaoxunhuan"></div>
            <div v-if="playType == 1" @click="changePlayType" class="iconfont  icon-suijibofang"></div>
            <div v-if="playType == 2" @click="changePlayType" class="iconfont  icon-danquxunhuan"></div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang='ts'>
// import poster9 from '@/assets/images/LASTSTARDUST.jpg';
// import poster10 from '@/assets/images/drama.jpg';
// import poster5 from '@/assets/images/交换余生.jpg';
// import poster12 from '@/assets/images/后来的我们.jpg';
// import poster6 from '@/assets/images/对等关系.jpg';
// import poster8 from '@/assets/images/曹操.jpg';
// import poster3 from '@/assets/images/生生.jpg';
// import poster4 from '@/assets/images/空虚的心.jpg';
// import poster7 from '@/assets/images/达尔文.jpg';
// import poster2 from '@/assets/images/途中.jpg';
// import poster1 from '@/assets/images/重拾快乐.jpg';
// import music11 from '@/assets/mp3/7千3百多天.mp3';
// import music9 from '@/assets/mp3/LASTSTARDUST.mp3';
// import music10 from '@/assets/mp3/drama.mp3';
// import music5 from '@/assets/mp3/交换余生.mp3';
// import music12 from '@/assets/mp3/后来的我们.mp3';
// import music6 from '@/assets/mp3/对等关系.mp3';
// import music8 from '@/assets/mp3/曹操.mp3';
// import music3 from '@/assets/mp3/生生.mp3';
// import music4 from '@/assets/mp3/空虚的心.mp3';
// import music1 from '@/assets/mp3/谢幕.mp3';
// import music7 from '@/assets/mp3/达尔文.mp3';
// import music2 from '@/assets/mp3/途中.mp3';
import { nextTick, onMounted, ref } from 'vue';
interface Music {
  id: number,
  name: string,
  artist: string,
  lrc: string,
  url: string,
  cover: string
}

let issuspend = ref(true)
let slider = ref(0)
let audio = ref()
let volume = ref(50)
let CurrentTime = ref('')
let EndTime = ref('')
let showList = ref(false)
// 播放模式
let playType = ref(0)
let changePlayType = () => {
  if (playType.value == 2) {
    playType.value = 0
    return
  }
  playType.value++
}

// 元数据加载完成 ***********************************     博客素材  flag  解决 点击进度条 闪烁又回去
let timeupdate = () => {
  if (audio.value.duration) {
    if (flag) {
      return
    } else {
      EndTime.value = convertSecondsToMinutesAndSeconds(parseInt(audio.value.duration))
      CurrentTime.value = convertSecondsToMinutesAndSeconds(parseInt(audio.value.currentTime))
      slider.value = audio.value.currentTime * 100 / audio.value.duration
    }

  }
}
// 进度

let flag = false
let progressChange = (e: any) => {
  //鼠标抬起触发
  if (issuspend.value) {
    issuspend.value = false
    audio.value.play()
    setTimeout(() => {
      audio.value.currentTime = e * audio.value.duration / 100
      flag = false
    }, 200);
  } else {
    console.log('拖动进度');
    audio.value.currentTime = e * audio.value.duration / 100
    flag = false
  }
}
// 结束
let ended = () => {
  console.log('ended');
  if (playType.value == 0) {
    if (nowMusic.value.id == musiclist.value.length) {
      nowMusic.value = musiclist.value[0]
    } else {
      nowMusic.value = musiclist.value[nowMusic.value.id]
    }
    nextTick(() => {
      issuspend.value = false
      audio.value.play()
    })
  } else if (playType.value == 1) {
    let next = nowMusic.value.id
    while (next == nowMusic.value.id) {
      next = Math.floor(Math.random() * musiclist.value.length)
    }
    nowMusic.value = musiclist.value[next]
    nextTick(() => {
      issuspend.value = false
      audio.value.play()
    })
  } else if (playType.value == 2) {
    nextTick(() => {
      issuspend.value = false
      audio.value.play()
    })
  }
}
onMounted(() => {
  audio.value.addEventListener('timeupdate', timeupdate)
  audio.value.addEventListener('ended', ended)
  document.querySelector('.el-slider')!.addEventListener('mousedown', () => {
    //鼠标按下
    console.log('mousedown');
    flag = true
  })


})

function convertSecondsToMinutesAndSeconds(seconds: number) {
  var minutes = Math.floor(seconds / 60).toString().length == 1 ? '0' + Math.floor(seconds / 60) : Math.floor(seconds / 60);
  var remainingSeconds = (seconds % 60).toString().length == 1 ? '0' + seconds % 60 : seconds % 60;
  return minutes + ':' + remainingSeconds;
}


// 播放暂停
let play = () => {
  issuspend.value = !issuspend.value
  if (issuspend.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }

}
// 点击歌曲
let changeMusic = (music: Music) => {
  nowMusic.value = music
  nextTick(() => {
    issuspend.value = false
    audio.value.play()
  })

}
// 上一首
let beforMusic = () => {

  if (nowMusic.value.id == 1) {
    nowMusic.value = musiclist.value[musiclist.value.length - 1]
  } else {
    nowMusic.value = musiclist.value[nowMusic.value.id - 2]
  }
  nextTick(() => {
    issuspend.value = false
    audio.value.play()
  })
}
// 下一首
let nextMusic = () => {
  if (nowMusic.value.id == musiclist.value.length) {
    nowMusic.value = musiclist.value[0]
  } else {
    nowMusic.value = musiclist.value[nowMusic.value.id]
  }

  nextTick(() => {
    issuspend.value = false
    audio.value.play()
  })
}

// 音量
let volumeChange = (e: any) => {
  audio.value.volume = e / 100
}
let nowMusic = ref<Music>({ id: 1, name: '为霜', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/60103.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20180330/20180330222216412111.jpg' })
const musiclist = ref<Music[]>([
  // { id: 1, name: '谢幕', artist: '林俊杰', lrc: '', url: music1, cover: poster1 },
  // { id: 2, name: '途中', artist: '张叶蕾', lrc: '', url: music2, cover: poster2 },
  // { id: 3, name: '生生', artist: '林俊杰', lrc: '', url: music3, cover: poster3 },
  // { id: 4, name: 'カラノココロ', artist: 'Anly', lrc: '', url: music4, cover: poster4 },
  // { id: 5, name: '交换余生', artist: '林俊杰', lrc: '', url: music5, cover: poster5 },
  // { id: 6, name: '对等关系', artist: '李荣浩 / 张惠妹', lrc: '', url: music6, cover: poster6 },
  // { id: 7, name: '达尔文', artist: '林俊杰', lrc: '', url: music7, cover: poster7 },
  // { id: 8, name: '曹操', artist: '林俊杰', lrc: '', url: music8, cover: poster8 },
  // { id: 9, name: 'LASTSTARDUST', artist: 'Aimer', lrc: '', url: music9, cover: poster9 },
  // { id: 10, name: 'drama', artist: 'Hannie / HICARI / Isaiah Dreads', lrc: '', url: music10, cover: poster10 },
  // { id: 11, name: '7千3百多天', artist: '林俊杰', lrc: '', url: music11, cover: poster1 },
  // { id: 12, name: '后来的我们', artist: '五月天', lrc: '', url: music12, cover: poster12 },

  { id: 1, name: '为霜', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/60103.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20180330/20180330222216412111.jpg' },
  { id: 2, name: '花火が瞬く夜に', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/54323.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170622/20170622214007481858.jpg' },
  { id: 4, name: 'Windy Hill', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/53896.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170815/20170815070007812976.jpg' },
  { id: 5, name: '也许是天意', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/75787.mp3', cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20201110/20201110004118192.jpg' },
  {
    id: 6, name: '瞬间的永恒', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/53702.mp3', cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20201110/20201110004118192.jpg',

  }, // 播放这首歌曲时的主题色},
  { id: 7, name: '夜空的寂静', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/75788.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { id: 8, name: '秋的思念', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/47097.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { id: 9, name: '红豆', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/78229.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { id: 10, name: '安静的午后', artist: '高至豪', lrc: '', url: 'https://www.ytmp3.cn/down/76204.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20190121/20190121191448339234.jpg' },
  { id: 11, name: 'River Flows in You', artist: '米歇尔很甜', lrc: '', url: 'https://www.ytmp3.cn/down/76694.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20210727/20210727132932390942.jpg' },
  { id: 12, name: '夜的钢琴曲五', artist: 'Caxey', lrc: '', url: 'https://www.ytmp3.cn/down/76887.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20211120/20211120100105497430.jpg' },
  { id: 13, name: '时代を超える想い2（穿越时空的思念）', artist: '和田薫', lrc: '', url: 'https://www.ytmp3.cn/down/54475.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20201111/20201111230549290345.jpg' },
  { id: 14, name: '鸟の诗', artist: 'TAMUSIC', lrc: '', url: 'https://www.ytmp3.cn/down/78502.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20220810/20220810060304757664.jpg' },
  { id: 15, name: '風の住む街', artist: '磯村由紀子', lrc: '', url: 'https://www.ytmp3.cn/down/78495.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20220628/20220628120801520056.jpg' },
  { id: 16, name: '卡农(钢琴)', artist: '纯音乐', lrc: '', url: 'https://www.ytmp3.cn/down/47043.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20211015/20211015211704185932.jpg' },
  { id: 17, name: '城南花已开', artist: '三亩地', lrc: '', url: 'https://www.ytmp3.cn/down/47675.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20181102/20181102115543498345.jpg' },
  // { id: 18, name: '斑马斑马', artist: '房东的猫', url: 'https://www.ytmp3.cn/down/38748.mp3', cover: 'http://p2.music.126.net/YHQAc3DTAD-wt2P2CTAUqg==/7893393976219952.jpg' },
  // { id: 19, name: '花海(KTV版伴奏)', artist: '周杰伦', lrc: '', url: 'https://www.ytmp3.cn/down/70577.mp3', cover: 'https://img1.kuwo.cn/star/starheads/500/8/10/2150960774.jpg' },
  // { id: 20, name: '夜曲', artist: '周杰伦', lrc: '', url: 'https://www.ytmp3.cn/down/69953.mp3', cover: 'https://img1.kuwo.cn/star/starheads/500/8/10/2150960774.jpg' },
  // { id: 21, name: '南山南', artist: '马頔', url: 'https://www.ytmp3.cn/down/34439.mp3', cover: 'https://gimg3.baidu.com/yule/src=http%3A%2F%2Fgips3.baidu.com%2Fit%2Fu%3D3821660248%2C722443707%26fm%3D3007%26app%3D3007%26f%3DJPEG%3Fw%3D500%26h%3D500&refer=http%3A%2F%2Fwww.baidu.com&app=2019&size=w931&n=0&g=0n&q=75&fmt=auto?sec=1679245200&t=ae7ba3ede889673d8ad6da9f464ec95d' },
])
</script>
<style lang='less' scoped>
.music {
  position: fixed;
  left: 0;
  top: 70%;
  display: flex;
  align-items: center;

  .button {
    cursor: pointer;
    background: none;
    border: none;



    @keyframes bound-in {
      0% {
        opacity: 0;
      }

      50% {
        opacity: 50;
      }

      100% {
        opacity: 100;
      }
    }



    .poster {
      width: 3.3rem;
      height: 3.3rem;
      border: 5px solid #000;
      border-radius: 50%;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        animation: rotateAnimation 10s linear infinite;
      }

      @keyframes rotateAnimation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }

    .bloom-container {
      width: 3.3rem;
      height: 3.3rem;
      position: relative;
      transition: all 0.2s ease-in-out;
      border: none;
      background: none;


      .button-container-main {
        width: 3.4rem;
        aspect-ratio: 1;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        display: grid;
        place-content: center;
        border-right: 5px solid white;
        border-left: 5px solid rgba(128, 128, 128, 0.147);
        transform: rotate(-45deg);
        transition: all 0.5s ease-in-out;

        .button-inner {
          height: 1.875rem;
          aspect-ratio: 1;
          border-radius: 50%;
          position: relative;
          box-shadow: rgba(100, 100, 111, 0.5) -10px 5px 10px 0px;
          transition: all 0.5s ease-in-out;

          .back {

            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: linear-gradient(60deg, rgb(1, 85, 103) 0%, rgb(147, 245, 255) 100%);
          }

          .front {
            position: absolute;
            inset: 5px;
            border-radius: 50%;
            background: linear-gradient(60deg, rgb(0, 103, 140) 0%, rgb(58, 209, 233) 100%);
            display: grid;
            place-content: center;

            svg {
              transform: rotate(45deg);
            }
          }
        }

        .button-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.888) 100%);
          transform: translate(0%, -50%) rotate(0deg);
          transform-origin: bottom center;
          transition: all 0.5s ease-in-out;
        }

      }

      .bloom {
        height: 1px;
        width: 1px;
        position: absolute;
        background: white;
      }

      .bloom1 {
        top: 5px;
        right: 10px;
        box-shadow: rgb(255, 255, 255) 0px 0px 5px 5px, rgb(255, 255, 255) 0px 0px 10px 10px;
      }

      .bloom2 {
        bottom: 5px;
        left: 10px;
        box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 5px 5px, rgba(255, 255, 255, 0.5) 0px 0px 15px 20px;
      }

    }
  }

  .list-box {

    position: absolute;
    left: 2.5rem;
    width: 22.5rem;
    height: 18.75rem;
    background-color: @main-backgroundcolor;
    color: @main-fontcolor;
    transform: translateX(2rem);
    overflow: hidden;
    border: 1px solid @main-bordercolor;
    border-radius: 1rem;


    .list {
      overflow-y: scroll;
      height: 75%;
      width: calc(100%-5px);
      font-size: .75rem;
      padding: 0 2px;


      .item {
        padding: 0 1rem;
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid @main-bordercolor;
        display: flex;
        cursor: pointer;

        .index {
          color: @main-fontcolor-gray;
          margin-right: .75rem;
          width: .9rem;
        }


        .singer {
          color: @main-fontcolor-gray;
          flex: 1;
          text-align: right;
        }
      }

      .actice {
        background-color: #978989;

        .index {
          width: 1.3rem;
        }
      }


      /* 修改垂直滚动条 */
      &::-webkit-scrollbar {
        width: 5px;
        /* 修改宽度 */
      }

      /* 修改滚动条轨道背景色 */
      &::-webkit-scrollbar-track {
        background-color: rgba(73, 177, 245, .2);
      }

      /* 修改滚动条滑块颜色 */
      &::-webkit-scrollbar-thumb {
        background-color: #43d9ff;
      }

      /* 修改滚动条滑块悬停时的颜色 */
      // &::-webkit-scrollbar-thumb:hover {
      //   background-color: rgb(51, 38, 165);
      // }
    }

    .aplayer-info {
      padding: 1rem;
      border-top: 1px solid @main-bordercolor;
      height: 25%;

      .aplayer-music {
        display: flex;
        justify-content: space-between;

        .aplayer-icon {
          span {
            cursor: pointer;
            margin: .3rem;
          }
        }

        .aplayer-title {
          font-size: .875rem;
        }

        .aplayer-author {
          font-size: .75rem;
          color: #666;
        }
      }

      .time-bar {
        display: flex;
        font-size: 11px;
        align-items: center;

        .time-bar-pro {
          width: 10rem;
          margin: 0 .5rem;
        }

        .text {
          width: 2rem;
        }

        .flex-end {
          flex: 1;
          justify-content: flex-end;
          display: flex;
          align-items: center;

          .iconfont {
            font-size: .8rem !important;
            cursor: pointer;
          }


          .volume {
            padding: .5rem;
            position: relative;
            // padding-top: 5px;

            &:hover {
              .el-slider {
                display: inline-flex;
              }
            }


            .el-slider {
              display: none;
              position: absolute;
              top: -30px;
              // transform: translateX(50%);
              left: 50%;
              transform: translateX(-50%);


              ::v-deep(.el-tooltip__trigger) {
                width: 0;
                height: 0;
              }

              ::v-deep(.el-slider__runway) {
                margin: 10px;
              }


            }
          }
        }
      }

    }

  }




  &:hover {
    .button {
      .bloom-container {
        transform: scale(1.1);
      }
    }

  }

  .button .bloom-container:hover .button-container-main .button-glass {
    transform: translate(0%, -40%);
  }

  .button .bloom-container:hover .button-container-main .button-inner .front .svg {
    opacity: 1;
    filter: drop-shadow(0 0 10px white);
  }

  .button .bloom-container:active {
    transform: scale(0.7);
  }

  .button .bloom-container:active .button-container-main .button-inner {
    transform: scale(1.2);
  }

}

@media screen and (max-width: 768px) {
  .music {
    display: none;
  }
}
</style>