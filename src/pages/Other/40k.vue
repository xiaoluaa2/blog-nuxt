<script setup lang="ts">
// import logo_DarkAngels from '@/assets/images/logo_DarkAngels.png'
import { onMounted, reactive, ref } from 'vue'
// 准备logo数据
const logos = reactive([
  {
    label: 'Dark Angels',
    url: '/img/logo_DarkAngels.png',
    msg: {
      bg: '/img/bg_DA.jpg',
      NO: '第一军团',
      ntroduction:
        '自帝国诞生，军团创建以来，黑暗天使的星际战士们便为敌人所畏惧，为受庇护者所敬畏。黑暗天使们在战斗中顽固而无情，作为第一支被创造的星际战士军团他们以永远的警惕和热诚履行着他们义务，是帝皇最忠实的仆从。但是，一万年来，黑暗天使们深埋着一个凶险的秘密，一项如此恐怖而耻辱的行为，足以威胁黑暗天使全力捍卫的一切，并将他们拖入万劫不复之境。'
    }
  },
  {
    label: 'Space Wolves',
    url: '/img/logo_SpaceWolves.png',
    msg: {
      bg: '/img/bg_SW.jpg',
      NO: '第六军团',
      ntroduction: '帝国创建的那一刻起，太空野狼就一直用它的獠牙和利爪为帝皇奋战．作为星际战士中最有名的战团之一，他们的名号和事迹在整个银河系中被广为传诵．顽固、狂暴，太空野狼是近战专家．他们的战士最关注的就是在战场上赢得荣誉．太空野狼为战而生，死亡并不能使他们畏惧．'
    }
  },
  {
    label: 'Imperial Fists',
    url: '/img/logo_ImperialFists.png',
    msg: {
      bg: '/img/bg_IF.jpg',
      NO: '第七军团',
      ntroduction: '帝国之拳是最受帝国中许多机构尊敬的战团，也被认为是信仰最坚定的战团。这不仅是因为他们对帝皇无比的忠诚，还有因为他们比其它人更努力的维护着帝国的秩序。他们在帝国敌人里的名声也是他们自信的一大来源。'
    }
  },
  {
    label: 'Blood Angels',
    url: '/img/logo_BloodAngels.png',
    msg: {
      bg: '/img/bg_BA.jpg',
      NO: '第九军团',
      ntroduction:
        '大远征时，在基因原体圣吉列斯的带领下，圣血天使曾被公认为阿斯塔特修士中受到无上圣佑的军团，他们继承了基因原体的勇敢无畏及高超战技。但是，荷鲁斯叛变这一事件给他们带来致命的打击，他们天使般的原体牺牲了。他的死亡如此可怖，竟在所有的军团成员灵魂深处刻下了不灭的伤痕。自那深暗之日起，关于圣血天使血脉中流淌着恐怖诅咒的传言，便悄悄地流传开来。'
    }
  },
  {
    label: 'World Eaters',
    url: '/img/logo_WorldEaters.png',
    msg: {
      bg: '/img/bg_WE.jpg',
      NO: '第十二军团',
      ntroduction: '在曾经所有由帝皇一手创立并在大远征时代对银河系展开再次征服的星际战士军团中，最令人恐惧的就是如今恐虐的选民――吞世者。在血腥的侵攻和最为狠毒的战斗中，“吞世者”这个名字无疑是令人不寒而栗的大规模的血腥和恐惧的代名词。'
    }
  },
  {
    label: 'Death Guard',
    url: '/img/logo_DeathGuard.png',
    msg: {
      bg: '/img/bg_DG.jpg',
      NO: '第十四军团',
      ntroduction: '死亡守卫，可怕的瘟疫散布者，失落的被诅咒者，纳垢手下那群令人畏惧的瘟疫战士，对所有帝国子民而言都是一场永无休止的恐怖天灾。但在上万年前，死亡守卫曾是帝皇首批建立的二十支星际战士军团中的第十四军团，他们团结在帝皇和他们可怕的军团长莫塔里安旗下，保卫着全人类的安全。'
    }
  },
  {
    label: 'Thousand Sons',
    url: '/img/logo_ThousandSons.png',
    msg: {
      bg: '/img/bg_TS.jpg',
      NO: '第十五军团',
      ntroduction:
        '千子，是一支人数虽少但是擅长灵能的军团，在大叛乱前由于基因原体马格努斯为了警告帝皇荷鲁斯叛乱，而打破了帝皇为了网道计划设下的灵能屏障。帝皇要求太空野狼军团带回犯了错的基因原体，不料命令被荷鲁斯修改为杀死马格努斯，致使太空野狼毁灭了家园普罗斯佩罗，从而让整支军团都背弃了帝国投靠了巫术和诡计之神奸奇。'
    }
  },
  {
    label: 'Raven Guard',
    url: '/img/logo_RavenGuard.png',
    msg: {
      bg: '/img/bg_RG.jpg',
      NO: '第十九军团',
      ntroduction:
        '暗鸦守卫把部队部署在关键位置来摧毁敌人的能力已经成了传奇，他们掌握迅速部署部队的技术和小队级战术也被许多其他战团所学习。他们在战场上最强大的力量就是灵活的部署部队。跟大部分战团的星际战士一样，都使用登陆仓进行部署，或其他机动兵器，他们能迅速的在交火前评估战斗环境，让他们能够在飞速变化的战场里应变自如。'
    }
  }
])

/** 存储由logos生成的logoImg对象 */
const logoImgs = <LogoImg[]>reactive([])

// 标记激活logo
let activeLogo = ref<{ name: string; src: string; msg: any }>()

// 获取canvas画布
const canvas = ref<HTMLCanvasElement | null>(null)

// 获取上下文
let context = ref<CanvasRenderingContext2D | null>(null)

/** canvas实体对象 */
let particleCanvas = ref<ParticleCanvas>()

// 设置画布大小
const width = 400,
  height = 400

// 设置粒子动画时长
const animateTime = 20
const opacityStep = 1 / animateTime

/** 中心影响的半径 */
const Radius = 40
/** 排斥/吸引 力度 */
const Inten = 0.95

/** 粒子类 */
class Particle {
  x: number // 粒子x轴的初始位置
  y: number // 粒子y轴的初始位置
  totalX: number // 粒子x轴的目标位置
  totalY: number // 粒子y轴的目标位置
  mx?: number // 粒子x轴需要移动的距离
  my?: number // 粒子y轴需要移动的距离
  vx?: number // 粒子x轴移动速度
  vy?: number // 粒子y轴移动速度
  time: number // 粒子移动耗时
  r: number // 粒子的半径
  color: number[] // 粒子的颜色
  opacity: number // 粒子的透明度
  constructor(totalX: number, totalY: number, time: number, color: number[]) {
    // 设置粒子的初始位置x、y，目标位置totalX、totalY，总耗时time
    this.x = (Math.random() * width) >> 0
    this.y = (Math.random() * height) >> 0
    this.totalX = totalX
    this.totalY = totalY
    this.time = time
    // 设置粒子的颜色和半径
    this.r = 1.2
    this.color = [...color]
    this.opacity = 0
  }
  // 在画布中绘制粒子
  draw() {
    context.value!.fillStyle = `rgba(${this.color.toString()})`
    context.value!.fillRect(this.x, this.y, this.r * 2, this.r * 2)
    context.value!.fill()
  }
  /** 更新粒子
   * @param {number} mouseX 鼠标X位置
   * @param {number} mouseY 鼠标Y位置
   */
  update(mouseX?: number, mouseY?: number) {
    // 设置粒子需要移动的距离
    this.mx = this.totalX - this.x
    this.my = this.totalY - this.y
    // 设置粒子移动速度
    this.vx = this.mx / this.time
    this.vy = this.my / this.time
    // 计算粒子与鼠标的距离
    if (mouseX && mouseY) {
      let dx = mouseX - this.x
      let dy = mouseY - this.y
      let distance = Math.sqrt(dx ** 2 + dy ** 2)
      // 粒子相对鼠标距离的比例 判断受到的力度比例
      let disPercent = Radius / distance
      // console.log(disPercent)

      // 设置阈值 避免粒子受到的斥力过大
      disPercent = disPercent > 7 ? 7 : disPercent
      // 获得夹角值 正弦值 余弦值
      let angle = Math.atan2(dy, dx)
      // console.log(angle)
      let cos = Math.cos(angle)
      let sin = Math.sin(angle)
      // 将力度转换为速度 并重新计算vx vy
      let repX = cos * disPercent * -Inten
      let repY = sin * disPercent * -Inten

      // console.log('---------')

      // console.log(repX)
      // console.log(repY)
      // console.log('---------')
      this.vx += repX
      this.vy += repY
      // console.log('************')

      // console.log(this.vx)
      // console.log(this.vy)
      // console.log('************')
    }
    this.x += this.vx
    this.y += this.vy

    if (this.opacity < 1) this.opacity += opacityStep
  }
  // 切换粒子
  change(x: number, y: number, color: number[]) {
    this.totalX = x
    this.totalY = y
    this.color = [...color]
  }
}

/** Logo图片类 */
class LogoImg {
  src: string
  name: string
  msg: any
  particleData: Particle[] // 用于保存筛选后的粒子
  constructor(src: string, name: string, msg: any) {
    this.src = src
    this.name = name
    this.msg = msg
    this.particleData = []
    let img = new Image()
    img.crossOrigin = ''
    img.src = src

    // canvas 解析数据源获取粒子数据
    img.onload = () => {
      // 获取图片像素数据
      const tmp_canvas = document.createElement('canvas') // 创建一个空的canvas
      const tmp_ctx = tmp_canvas.getContext('2d')
      const imgW = width
      const imgH = ~~(width * (img.height / img.width))
      tmp_canvas.width = imgW
      tmp_canvas.height = imgH
      tmp_ctx?.drawImage(img, 0, 0, imgW, imgH) // 将图片绘制到canvas中
      const imgData = tmp_ctx?.getImageData(0, 0, imgW, imgH).data // 获取像素点数据
      tmp_ctx?.clearRect(0, 0, width, height)
      // 筛选像素点
      for (let y = 0; y < imgH; y += 3) {
        for (let x = 0; x < imgW; x += 3) {
          // 像素点的序号
          const index = (x + y * imgW) * 4

          // 在数组中对应的值
          const r = imgData![index]
          const g = imgData![index + 1]
          const b = imgData![index + 2]
          const a = imgData![index + 3]

          const sum = r + g + b + a
          // 筛选条件
          if (sum >= 100) {
            const particle = new Particle(x, y, animateTime, [r, g, b, a])
            this.particleData.push(particle)
          }
        }
      }
    }
  }
}

// 画布类
class ParticleCanvas {
  canvasEle: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  ParticleArr: Particle[]
  mouseX?: number // 鼠标X轴位置
  mouseY?: number // 鼠标Y轴位置
  constructor(target: HTMLCanvasElement) {
    // 设置画布 获取画布上下文
    this.canvasEle = target
    this.ctx = target.getContext('2d') as CanvasRenderingContext2D
    this.width = target.width
    this.height = target.height
    this.ParticleArr = []
    // 监听鼠标移动
    this.canvasEle.addEventListener('mousemove', e => {
      const { left, top } = this.canvasEle.getBoundingClientRect()
      const { clientX, clientY } = e
      this.mouseX = clientX - left
      this.mouseY = clientY - top
    })
    this.canvasEle.onmouseleave = () => {
      this.mouseX = 0
      this.mouseY = 0
    }
  }
  // 改变图片 如果已存在图片则根据情况额外操作
  changeImg(img: LogoImg) {
    if (this.ParticleArr.length) {
      console.log(1)
      // 获取新旧两个粒子数组与它们的长度
      let newPrtArr = img.particleData
      let newLen = newPrtArr.length
      let arr = this.ParticleArr
      let oldLen = arr.length
      // 调用change修改已存在粒子
      for (let idx = 0; idx < newLen; idx++) {
        const { totalX, totalY, color } = newPrtArr[idx]
        if (arr[idx]) {
          // 找到已存在的粒子 调用change 接收新粒子的属性
          arr[idx].change(totalX, totalY, color)
        } else {
          // 新粒子数组较大 生成缺少的粒子
          arr[idx] = new Particle(totalX, totalY, animateTime, color)
        }
      }
      // 新粒子数组较小 删除多余的粒子
      if (newLen < oldLen) this.ParticleArr = arr.splice(0, newLen)
      arr = this.ParticleArr
      let tmp_len = arr.length
      // 随机打乱粒子最终对应的位置 使切换效果更自然
      while (tmp_len) {
        // 随机的一个粒子 与 倒序的一个粒子
        let randomIdx = ~~(Math.random() * tmp_len--)
        let randomPrt = arr[randomIdx]
        let { totalX: tx, totalY: ty, color } = randomPrt
        // 交换目标位置与颜色
        randomPrt.totalX = arr[tmp_len].totalX
        randomPrt.totalY = arr[tmp_len].totalY
        randomPrt.color = arr[tmp_len].color
        arr[tmp_len].totalX = tx
        arr[tmp_len].totalY = ty
        arr[tmp_len].color = color
      }
    } else {
      console.log(img.particleData)
      this.ParticleArr = img.particleData.map(item => new Particle(item.totalX, item.totalY, animateTime, item.color))
      console.log(this.ParticleArr)
    }
  }
  drawCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ParticleArr.forEach((particle, index) => {
      // if (index == 1) {
      particle.update(this.mouseX, this.mouseY)
      particle.draw()
      // }
    })
    window.requestAnimationFrame(() => this.drawCanvas())
  }
}

// 激活logo
function clickLogo(prt_canvas: ParticleCanvas, logoItem: LogoImg) {
  requestAnimationFrame(() => {
    discribe_change.value = false
  })
  prt_canvas.changeImg(logoItem)

  setTimeout(() => {
    activeLogo.value = logoItem
    discribe_change.value = true
  }, 500)
}

onMounted(() => {
  // 将logo数据实例化为logoImg对象
  for (let item of logos) {
    logoImgs.push(new LogoImg(item.url, item.label, item.msg))
  }
  if (canvas.value) {
    context.value = canvas.value.getContext('2d')
    particleCanvas.value = new ParticleCanvas(canvas.value)
    particleCanvas.value.drawCanvas()
  }
})

let discribe_change = ref(false)

let showAllImg = ref(true)
</script>

<template>
  <div class="box">
    <div class="canvas-container">
      <div class="bg">
        <img v-if="activeLogo" :src="activeLogo!.msg.bg" alt="" />
        <div v-if="showAllImg" class="gradient"></div>
      </div>
      <canvas style="z-index: 9" ref="canvas" :width="width" :height="height"></canvas>
      <Transition>
        <div v-if="discribe_change" class="discribe">
          <div class="No">{{ activeLogo!.msg.NO }}</div>
          <div class="name">{{ activeLogo!.name }}</div>
          <div class="ntroduction">{{ activeLogo!.msg.ntroduction }}</div>
        </div>
      </Transition>
    </div>
    <ul class="logo-options-container">
      <li v-for="logoItem in logoImgs" :class="['logo-item', activeLogo === logoItem && 'active']" @click="clickLogo(particleCanvas, logoItem)" data-cursor="pointer">
        <img :src="logoItem.src" class="item-picture" />

        <div class="item-desc">
          {{ logoItem.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.v-enter-active,
.v-enter-active .name,
.v-enter-active .No,
.v-enter-active .ntroduction {
  transition: all 2s;
}
.v-leave-active,
.v-leave-active .name,
.v-leave-active .No,
.v-leave-active .ntroduction {
  transition: all 1s;
}
.v-leave-active .name {
  transition-delay: 0.2s;
}
.v-enter-active .name {
  transition-delay: 0.2s;
}
.v-leave-active .ntroduction {
  transition-delay: 0.4s;
}
.v-enter-active .ntroduction {
  transition-delay: 0.4s;
}

.v-enter-from,
.v-enter-from .name,
.v-enter-from .No,
.v-enter-from .ntroduction {
  opacity: 0;
  transform: translateX(2rem);
}
.v-leave-to,
.v-leave-to .name,
.v-leave-to .No,
.v-leave-to .ntroduction {
  opacity: 0;
  transform: translateX(-2rem);
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  /* background-color: rgb(116, 116, 116); */
  background-color: #000;
}
.canvas-container {
  position: relative;
  display: flex;
  // flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 1680px;
  height: 50vh;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.4);

  canvas {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .discribe {
    position: absolute;
    bottom: 0;
    left: 2rem;
    right: 2rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: start;

    color: #fff;

    .No {
      font-size: 3rem;
    }
    .name {
      font-size: 2rem;
    }
    .ntroduction {
      font-size: 1rem;
      text-align: left;
    }
  }
  .bg {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0 2rem;
    border-top: 2px solid #fff;
    overflow: hidden;
    img {
      width: 100%;
      z-index: 1;
    }
    .gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      z-index: 5;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5) 30%, #000 52%);
    }
  }

  // canvas {
  //   margin: auto;
  // }
}

.logo-options-container {
  padding: 10px;
  margin: 0 auto;
  margin-top: 5vw;
  display: flex;
  // justify-content: space-around;
  max-width: 80vw;
  // height: 15vw;
  border-radius: 8px;
  // border: 1px solid #614949;
  background-color: rgba(0, 0, 0, 0.4);
  list-style-type: none;
  transition: 0.16s linear;
  user-select: none;

  .logo-item {
    max-width: 80px;
    padding: 15px;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    transition: 0.3s linear;

    .item-picture {
      width: 90%;
      // height: 90%;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .item-desc {
      flex: 1;
      color: #eee;
      text-transform: capitalize;
      text-align: center;
    }

    &.active {
      transition: 0.3s linear;
      background-color: rgb(116, 116, 116);
      // background-color: rgba(0, 0, 0, 0.6);
    }
  }

  // box-shadow: 0px 0px 5px #614949;

  &:hover {
    transition: 0.16s linear;
  }
}
</style>
