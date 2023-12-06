<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import formatjs from '../../utils/format'
import data from '../static/lrc'

const rhythmlist = ref(Array.from({ length: 28 }).map(() => Math.floor(Math.random() * 70)));
let process = ref<number>(0);
const musiclist = ref([
  { name: 'Somnambulating', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/46190.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20180410/20180410122319206458.jpg' },
  { name: '为霜', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/60103.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20180330/20180330222216412111.jpg' },
  { name: '花火が瞬く夜に', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/54323.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170622/20170622214007481858.jpg' },
  { name: 'Windy Hill', artist: '羽肿', lrc: '', url: 'https://www.ytmp3.cn/down/53896.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170815/20170815070007812976.jpg' },
  { name: '也许是天意', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/75787.mp3', cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20201110/20201110004118192.jpg' },
  {
    name: '瞬间的永恒', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/53702.mp3', cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20201110/20201110004118192.jpg',
    theme: "rgb(127, 218, 180)"
  }, // 播放这首歌曲时的主题色},
  { name: '夜空的寂静', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/75788.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { name: '秋的思念', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/47097.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { name: '红豆', artist: '赵海洋', lrc: '', url: 'https://www.ytmp3.cn/down/78229.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20170507/20170507115833669586.jpg' },
  { name: '安静的午后', artist: '高至豪', lrc: '', url: 'https://www.ytmp3.cn/down/76204.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20190121/20190121191448339234.jpg' },
  { name: 'River Flows in You', artist: '米歇尔很甜', lrc: '', url: 'https://www.ytmp3.cn/down/76694.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20210727/20210727132932390942.jpg' },
  { name: '夜的钢琴曲五', artist: 'Caxey', lrc: '', url: 'https://www.ytmp3.cn/down/76887.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20211120/20211120100105497430.jpg' },
  { name: '时代を超える想い2（穿越时空的思念）', artist: '和田薫', lrc: '', url: 'https://www.ytmp3.cn/down/54475.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20201111/20201111230549290345.jpg' },
  { name: '鸟の诗', artist: 'TAMUSIC', lrc: '', url: 'https://www.ytmp3.cn/down/78502.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20220810/20220810060304757664.jpg' },
  { name: '風の住む街', artist: '磯村由紀子', lrc: '', url: 'https://www.ytmp3.cn/down/78495.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20220628/20220628120801520056.jpg' },
  { name: '卡农(钢琴)', artist: '纯音乐', lrc: '', url: 'https://www.ytmp3.cn/down/47043.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20211015/20211015211704185932.jpg' },
  { name: '城南花已开', artist: '三亩地', lrc: '', url: 'https://www.ytmp3.cn/down/47675.mp3', cover: 'https://imgessl.kugou.com/stdmusic/20181102/20181102115543498345.jpg' },
  { name: '斑马斑马', artist: '房东的猫', lrc: data['斑马斑马'], url: 'https://www.ytmp3.cn/down/38748.mp3', cover: 'http://p2.music.126.net/YHQAc3DTAD-wt2P2CTAUqg==/7893393976219952.jpg' },
  { name: '花海(KTV版伴奏)', artist: '周杰伦', lrc: '', url: 'https://www.ytmp3.cn/down/70577.mp3', cover: 'https://img1.kuwo.cn/star/starheads/500/8/10/2150960774.jpg' },
  { name: '夜曲', artist: '周杰伦', lrc: '', url: 'https://www.ytmp3.cn/down/69953.mp3', cover: 'https://img1.kuwo.cn/star/starheads/500/8/10/2150960774.jpg' },
  { name: '南山南', artist: '马頔', lrc: data['南山南'], url: 'https://www.ytmp3.cn/down/34439.mp3', cover: 'https://gimg3.baidu.com/yule/src=http%3A%2F%2Fgips3.baidu.com%2Fit%2Fu%3D3821660248%2C722443707%26fm%3D3007%26app%3D3007%26f%3DJPEG%3Fw%3D500%26h%3D500&refer=http%3A%2F%2Fwww.baidu.com&app=2019&size=w931&n=0&g=0n&q=75&fmt=auto?sec=1679245200&t=ae7ba3ede889673d8ad6da9f464ec95d' },
])
const name = ref(musiclist.value[0].name)
const author = ref(musiclist.value[0].artist)
const time = ref({ duration: '00:00', current: '00:00' })
const circleshow = ref(true);
const stopshow = ref(true);
const loading = ref(false)
const imgurl = ref(musiclist.value[0].cover)
const lrc = ref('')
let curmusic = new Audio(musiclist.value[0].url);
type TimerType = NodeJS.Timeout
let timer = ref<TimerType>()
const full = ref(false)
const defvolume = ref(0.2 * 100)
const muted = ref(false)
const lrcTimer = ref<TimerType>()
onMounted(async () => {
  time.value.duration = curmusic.duration ? formatjs.secondsminute(curmusic.duration) : '02:45'
  time.value.current = formatjs.secondsminute(curmusic.currentTime)
  init();
})
// 初始化
const init = () => {
  const status = getstatus()
  curmusic.loop = false
  if (curmusic && status === 'playing') {
    stopshow.value = false
  }
}
// 歌曲时长
const format = (val: number) => {
  // 根据百分比获取当前播放时间
  time.value.current = formatjs.secondsminute(Math.ceil(formatjs.minuteseconds(time.value.duration) * (val / 100)))
  return val
}
// 切换音乐
const changeMusic = async (item) => {
  if (item.name === name) return
  if (!curmusic.paused) curmusic.pause();
  playMusic(item);
}
// 暂停
const stop = () => {
  curmusic.pause();
  console.log(curmusic, curmusic.paused);
  stopshow.value = true
  setstatus('stop')
  clearTimeout(timer.value);
  // clearTimeout(lrcTimer.value);
}
// 播放
const play = async () => {
  if (curmusic.paused) {
    loading.value = true
    await curmusic.play();
    stopshow.value = false
    loading.value = false
    setstatus('playing');
    clearTimeout(timer.value);
    timeInterval();
    console.log(curmusic, curmusic.paused);
  }
}
// 实时获取当前播放时间
const timeInterval = () => {
  timer.value = setInterval(getCurrent, 1000);
}
// 循环播放
const circle = () => {
  curmusic.loop = false
  circleshow.value = true
  console.log(curmusic.loop);
}
// 单曲循环
const single = () => {
  curmusic.loop = true
  circleshow.value = false
  console.log(curmusic.loop);
}
// 下一首
const next = () => {
  const index = musiclist.value.findIndex(item => item.name === name.value)
  curmusic.pause();
  if (index === musiclist.value.length - 1) {
    playMusic(musiclist.value[0])
  } else {
    playMusic(musiclist.value[index + 1])
  }
}
// 上一首
const before = () => {
  const index = musiclist.value.findIndex(item => item.name === name.value)
  curmusic.pause();
  if (index > 0) {
    playMusic(musiclist.value[index - 1]);
  } else {
    playMusic(musiclist.value[musiclist.value.length - 1]);
  }
}
// 播放音乐
const playMusic = (music?) => {
  if (music) {
    curmusic = new Audio(music.url);
  } else {  // 否则默认播放第一首
    curmusic = new Audio(musiclist.value[0].url)
  }
  return new Promise(async (resolve, rej) => {
    try {
      loading.value = true
      stopshow.value = true
      await curmusic.play();
      curmusic.preload = 'auto'
      time.value.duration = curmusic.duration ? formatjs.secondsminute(String(Math.round(curmusic.duration))) : '3:45'
      time.value.current = formatjs.secondsminute(String(curmusic.currentTime))
      name.value = music.name;
      author.value = music.artist;
      imgurl.value = music.cover;
      lrc.value = music.lrc;
      circleshow.value ? curmusic.loop = true : curmusic.loop = false
      stopshow.value = false
      loading.value = false
      setstatus('playing');
      clearTimeout(timer.value);
      timeInterval();
      // lrcInterval();// 歌词滚动需要每一句歌词返回对应的时间点
      console.log('Playing...');
      resolve(true)
    } catch (err) {
      rej(err)
      console.log('Failed to play...' + err);
    }
  })
}
// 获取当前时间
const getCurrent = () => {
  time.value.current = formatjs.secondsminute(Math.round(curmusic.currentTime))
  process.value = Math.floor((100 * curmusic.currentTime) / curmusic.duration)
  console.log(curmusic.currentTime, curmusic.duration);
  if (circleshow.value && curmusic.duration - curmusic.currentTime < 1) {
    next();
  }
}
// 音量控制
const volume = (e) => {
  defvolume.value = 100 * e.offsetX / 80
  console.log(defvolume.value);
  curmusic.volume = e.offsetX / 80
}
// 静音
const Mute = () => {
  curmusic.volume = 0.0
  muted.value = true
}
// 开启声音
const openvolume = () => {
  curmusic.volume = defvolume.value / 100
  muted.value = false
}
// 本地保存音乐播放状态
const setstatus = (e) => {
  return localStorage.setItem('musicstatus', e)
}
// 获取本地保存音乐播放状态
const getstatus = () => {
  return localStorage.getItem('musicstatus')
}
// 全屏
const fullScreen = () => {
  if (document.documentElement['RequestFullScreen']) {
    document.documentElement.RequestFullScreen();
  }
  //兼容火狐
  console.log(document.documentElement['mozRequestFullScreen'])
  if (document.documentElement['mozRequestFullScreen']) {
    document.documentElement.mozRequestFullScreen();
  }
  //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
  if (document.documentElement['webkitRequestFullScreen']) {
    document.documentElement.webkitRequestFullScreen();
  }
  //兼容IE,只能写msRequestFullscreen
  if (document.documentElement['msRequestFullscreen']) {
    document.documentElement.msRequestFullscreen();
  }
  full.value = true
}
// 退出全屏
const quitScreen = () => {
  if (document['exitFullScreen']) {
    document.exitFullscreen()
  }
  //兼容火狐
  if (document['mozCancelFullScreen']) {
    document.mozCancelFullScreen()
  }
  //兼容谷歌等
  if (document['webkitExitFullscreen']) {
    document.webkitExitFullscreen()
  }
  //兼容IE
  if (document['msExitFullscreen']) {
    document.msExitFullscreen()
  }
  full.value = false
}
// 歌词滚动
const lrcscroll = () => {
  const scroll = document.getElementById('scroll-list-id')
  if (scroll) {
    let height = scroll.scrollHeight
    curmusic.currentTime * height / curmusic.duration
    scroll.style.top = - + curmusic.currentTime * height / curmusic.duration + 'px'
  }
}
const lrcInterval = () => {
  lrcTimer.value = setInterval(lrcscroll, 2400);
}
</script>
<style scoped>