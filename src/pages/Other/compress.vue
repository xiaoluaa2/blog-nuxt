<!--  -->
<template>
  <NuxtLayout name="noside">
    <div class="compress">
      <h1>JPG 图片在线压缩</h1>
      <div class="paste-area">
        <textarea ref="drop" cols="30" rows="10"></textarea>
        <p class="tip">可将图片拖放至此区域 或 点击后直接粘贴图片</p>
      </div>
      <p><input ref="inp" type="file" accept="image/*" /></p>
      <label>
        压缩质量：
        <span @click="subtract(0.1)" class="pointer">{{ '<' }}</span>
        <span @click="subtract(0.01)" class="pointer">-</span>
        {{ quality }}
        <span class="pointer" @click="add(0.01)">+</span>
        <span class="pointer" @click="add(0.1)">{{ '>' }}</span>
      </label>
      <p>质量：范围0-1(默认压缩质量是0.92)</p>

      <table v-if="compressed_jpg && compressed_webp">
        <thead>
          <tr>
            <th>原图</th>
            <th>压缩后(jpg) <span id="download">下载</span></th>
            <th>压缩后(webp) <span id="download">下载</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img v-if="origin" :src="origin" alt="原图" /></td>
            <td><img v-if="compressed_jpg" :src="compressed_jpg" alt="压缩后图片" /></td>
            <td><img v-if="compressed_webp" :src="compressed_webp" alt="压缩后图片" /></td>
          </tr>
          <tr>
            <td v-if="originWidth" id="origin-size">{{ originWidth }}M</td>
            <td v-if="compressedWidth_jpg" id="compressed-size" style="color: green">
              {{ compressedWidth_jpg }}M
              <span>
                体积减少：<span id="compression-percentage">{{ (1 - compressedWidth_jpg / originWidth).toFixed(2) }}</span
                >%
              </span>
            </td>
            <td v-if="compressedWidth_webp" id="compressed-size" style="color: green">
              {{ compressedWidth_webp }}M
              <span>
                体积减少：<span id="compression-percentage">{{ (1 - compressedWidth_webp / originWidth).toFixed(2) }}</span
                >%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="compressed_jpg && compressed_webp" class="info">
        <div class="refresh">
          <span style="margin-right: 20px" @click="refresh">刷新</span>
          <span style="margin-right: 20px" @click="download">下载png</span>
          <span @click="download2"> 下载webp</span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { onBeforeUnmount, onMounted, ref } from 'vue'
let inp = ref()
let drop = ref()
let origin = ref('')
let compressed_jpg = ref('')
let compressed_webp = ref('')
let originWidth = ref()
let compressedWidth_jpg = ref()
let compressedWidth_webp = ref()
let quality = ref(0.92)
let subtract = (num: number) => {
  let res = _.round(quality.value - num, 2)
  if (res < 0) return
  quality.value = res
}
let add = (num: number) => {
  let res = _.round(quality.value + num, 2)
  if (res >= 1) return
  quality.value = res
}
let file_cache: File
function pasteEvent(e: ClipboardEvent) {
  e.preventDefault()
  const target = e.clipboardData
  console.log(target)

  if (target!.files && target!.files.length > 0) {
    const file = target!.files[0]
    file_cache = file
    compress(file)
  }
}
function dropEvent(e: DragEvent) {
  e.preventDefault()
  const target = e.dataTransfer
  if (target!.files && target!.files.length > 0) {
    const file = target!.files[0]
    file_cache = file
    compress(file)
  }
}
onMounted(() => {
  drop.value.addEventListener('drop', dropEvent)
  drop.value.addEventListener('paste', pasteEvent)
  inp.value.addEventListener('change', function (e: Event) {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files[0]
      file_cache = file
      compress(file)
    }
  })
})
// 刷新
let refresh = () => {
  compress(file_cache)
}
// 下载
let download = () => {
  downloadBase64Image(base64_cache_jpg, file_name)
}
let download2 = () => {
  downloadBase64Image(base64_cache_webp, file_name.replace('.jpg', '.webp'))
}
let file_name = '',
  base64_cache_jpg = '',
  base64_cache_webp = ''
function compress(file: File) {
  file_name = file.name
  originWidth.value = toMB(file.size)
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = e => {
    console.log(e.target?.result)
    let res = e.target?.result
    let canvas = document.createElement('canvas')
    const drawer = canvas.getContext('2d')
    const img = new Image()
    img.src = res as string
    origin.value = res as string
    //方法可以将canvas画布上的信息转换为base64(DataURL)格式的图像信息，纯字符的图片表示形式。该方法接收2个参数：
    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height
      drawer!.drawImage(img, 0, 0, img.width, img.height)
      const base64_jpg = canvas.toDataURL(file.type, quality.value)
      base64_cache_jpg = base64_jpg
      compressed_jpg.value = base64_jpg
      const base64_webp = canvas.toDataURL('image/webp', quality.value)
      base64_cache_webp = base64_webp
      compressed_webp.value = base64_webp

      let blob_jpg = getBase64ImageSize(base64_jpg)
      let blob_webp = getBase64ImageSize(base64_webp)
      compressedWidth_jpg.value = toMB(blob_jpg.size)
      compressedWidth_webp.value = toMB(blob_webp.size)
    }
  }
}
function toMB(blogSize: number) {
  return (blogSize / 1024 / 1024).toFixed(2)
}
function getBase64ImageSize(base64String: string) {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

onBeforeUnmount(() => {
  drop.value.removeEventListener('drop', dropEvent)
  drop.value.removeEventListener('change', pasteEvent)
})
</script>
<style lang="less" scoped>
.compress {
  border-radius: 20px;
  padding: 50px;
  background-color: @main-backgroundcolor;
}
.pointer {
  cursor: pointer;
}
h1 {
  text-align: center;
}
.paste-area {
  position: relative;
  border: 1px dashed #666;
  margin-top: 20px;
}
textarea {
  caret-color: transparent;
  color: transparent;
  text-shadow: 0 0 0 black;
  color: white;
}
.paste-area .tip {
  color: red;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  pointer-events: none;
  margin: 0;
}

details {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 10px;
}
input[type='number'] {
  width: 50px;
}
input[type='checkbox'] {
  margin-left: 5px;
}
button {
  margin-top: 10px;
}

#cv {
  width: 100%;
}

#file {
  display: block;
  margin: 10px auto;
}
img {
  width: 100%;
  cursor: pointer;
}
table,
tbody,
thead,
tr {
  display: block;
}

table {
  margin: 0 auto;
  max-width: 1200px;
}
th,
td {
  display: inline-block;
  padding: 8px;
  box-sizing: border-box;
}
th,
td {
  width: 32%;
  text-align: center;
}
.info {
  margin-top: 2rem;
  text-align: center;
  .refresh {
    cursor: pointer;
    margin-bottom: 10px;

    span {
      padding: 5px 10px;
      border: 2px solid #18b4f1;
      border-radius: 5px;
    }
  }
}

#download {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  visibility: hidden;
}

.github {
  text-align: right;
}
.github a {
  margin-right: 20px;
}
</style>
