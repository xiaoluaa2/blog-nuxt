import $http from '@/api/index.ts'

export const $format = function FormatTime(t: string, date: number) {
  let _date = new Date(date)
  let o = {
    'M+': _date.getMonth() + 1, //月份
    'd+': _date.getDate(), //日
    'h+': _date.getHours(), //小时
    'm+': _date.getMinutes(), //分
    's+': _date.getSeconds(), //秒
    'q+': Math.floor((_date.getMonth() + 3) / 3), //季度
    S: _date.getMilliseconds() //毫秒
  }

  if (/(y+)/.test(t)) {
    t = t.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  type O = keyof typeof o
  let k: O
  for (k in o) {
    // 我们在项目中的tsconfig.json文件中添加： "suppressImplicitAnyIndexErrors":true,
    if (new RegExp('(' + k + ')').test(t)) {
      let str = RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      t = t.replace(RegExp.$1, str as string)
    }
  }
  return t
}

export const _baseUrl = 'http://admin.lubowen.xyz/'
export const _imgUrl = 'http://admin.lubowen.xyz/xiaolu/'

export const debounce = function (fn: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
      clearTimeout(Number(timer))
    }, delay)
  }
}

export const $EmotionList = [
  '微笑',
  '撇嘴',
  '色',
  '发呆',
  '得意',
  '流泪',
  '害羞',
  '闭嘴',
  '睡',
  '大哭',
  '尴尬',
  '发怒',
  '调皮',
  '呲牙',
  '惊讶',
  '难过',
  '酷',
  '冷汗',
  '抓狂',
  '吐',
  '偷笑',
  '可爱',
  '白眼',
  '傲慢',
  '饥饿',
  '困',
  '惊恐',
  '流汗',
  '憨笑',
  '大兵',
  '奋斗',
  '咒骂',
  '疑问',
  '嘘',
  '晕',
  '折磨',
  '衰',
  '骷髅',
  '敲打',
  '再见',
  '擦汗',
  '抠鼻',
  '鼓掌',
  '糗大了',
  '坏笑',
  '左哼哼',
  '右哼哼',
  '哈欠',
  '鄙视',
  '委屈',
  '快哭了',
  '阴险',
  '亲亲',
  '吓',
  '可怜',
  '菜刀',
  '西瓜',
  '啤酒',
  '篮球',
  '乒乓',
  '咖啡',
  '饭',
  '猪头',
  '玫瑰',
  '凋谢',
  '示爱',
  '爱心',
  '心碎',
  '蛋糕',
  '闪电',
  '炸弹',
  '刀',
  '足球',
  '瓢虫',
  '便便',
  '月亮',
  '太阳',
  '礼物',
  '拥抱',
  '强',
  '弱',
  '握手',
  '胜利',
  '抱拳',
  '勾引',
  '拳头',
  '差劲',
  '爱你',
  'NO',
  'OK',
  '爱情',
  '飞吻',
  '跳跳',
  '发抖',
  '怄火',
  '转圈',
  '磕头',
  '回头',
  '跳绳',
  '挥手',
  '激动',
  '街舞',
  '献吻',
  '左太极',
  '右太极'
]

export const setLCookie = function (name: string, value: string, exHour: number) {
  var d = new Date()
  d.setTime(d.getTime() + exHour * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString() // cookie的语法要求是这个标志，和这个时间格式
  document.cookie = name + '=' + value + '; ' + expires
  console.log('种下cookie', name + '=' + value + '; ' + expires)
}

export const getLCookie = function (cookName: string) {
  let name = cookName + '=',
    cookies = document.cookie.split(';')
  console.log(cookies)

  for (let i = 0; i < cookies.length; i++) {
    let cleanItem = cookies[i].trim()
    if (cleanItem.indexOf(name) == 0) {
      return cleanItem.substring(name.length, cookies[i].length)
    }
  }
  return ''
}

export const GetLocation = async function () {
  const $store = useStore.common()
  let locationCookie = getLCookie('LUBlogLocation')
  // 如果用户多次访问，一周内不会重复请求定位接口
  if (locationCookie) {
    return $store.location
  } else {
    let resp = await $http.other.getLocation()
    console.log(resp)
    // adcode
    setLCookie('LUBlogLocation', 'xiaolu', 24 * 7) // 相隔一周同一浏览器再次访问时会重新定位
    // localStorage.setItem('LUBlogLocation', JSON.stringify(resp.data))
    $store.setLocation(resp.data)
    console.log('-*-*-*-**-*-*')
    console.log(resp.data)
    return resp.data
  }
}
interface Log {
  moduleType: string
  operateType: string
  operateContent: string
}
export const createLog = async function (log: Log) {
  let dateString = $format('yyyy-MM-dd', Date.now())
  let LocationCityName = await GetLocation()

  let obj = {
    location: LocationCityName.city,
    fromUrl: document.referrer ? document.referrer : '未知',
    time: dateString,
    browser: browerType(),
    moduleType: log.moduleType,
    operateType: log.operateType,
    operateContent: log.operateContent ? log.operateContent : ''
  }
  $http.other.foreend(obj).then(() => {
    // setLCookie('xiaoluBlog', '统计访问量', 12) // 12个小时内同一个浏览器算一个访问量
  })
}

//获取浏览器
export const browerType = function () {
  var ua = navigator.userAgent.toLocaleLowerCase()
  // 判断是否为IE(第一个是正常的IE，第二个是Edge，第三个是IE11)
  var isIE = (ua.indexOf('compatible') > -1 && ua.indexOf('msie') > -1) || ua.indexOf('edge') > -1 || (ua.indexOf('trident') > -1 && ua.indexOf('rv:11.0') > -1)
  // 判断是否为IE5678，!+[1,] 在IE5678返回true，在IE9、IE10、IE11返回false
  var isLteIE8 = isIE && !+[1]
  // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
  var dm = document['documentMode'],
    isIE5,
    isIE6,
    isIE7,
    isIE8,
    isIE9,
    isIE10,
    isIE11
  if (dm) {
    isIE5 = dm === 5
    isIE6 = dm === 6
    isIE7 = dm === 7
    isIE8 = dm === 8
    isIE9 = dm === 9
    isIE10 = dm === 10
    isIE11 = dm === 11
  } else {
    // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
    isIE5 = isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat')
    // 判断是否为IE6，IE7开始有XMLHttpRequest对象
    isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest
    // 判断是否为IE7，IE8开始有document.documentMode属性
    isIE7 = isLteIE8 && !isIE6 && !document.documentMode
    // 判断是否IE8
    isIE8 = isLteIE8 && document.documentMode
    // 判断IE9，IE9严格模式中函数内部this不为undefined
    isIE9 =
      !isLteIE8 &&
      (function () {
        'use strict'
        return !!this
      })()
    // 判断IE10，IE10开始支持严格模式，严格模式中函数内部this为undefined
    isIE10 =
      isIE &&
      !!document.attachEvent &&
      (function () {
        'use strict'
        return !this
      })()
    // 判断IE11，IE11开始移除了attachEvent属性
    isIE11 = isIE && !document.attachEvent
  }
  // 因为字符串存在覆盖重复原因，判断顺序不可随意修改
  if (isIE5) return 'IE5'
  if (isIE6) return 'IE6'
  if (isIE7) return 'IE7'
  if (isIE8) return 'IE8'
  if (isIE9) return 'IE9'
  if (isIE10) return 'IE10'
  if (isIE11) return 'IE11'
  if (ua.indexOf('green') > -1) return '绿色浏览器'
  if (ua.indexOf('qq') > -1) return 'QQ浏览器'
  if (ua.indexOf('bidu') > -1) return '百度浏览器'
  if (ua.indexOf('lb') > -1) return '猎豹浏览器'
  if (ua.indexOf('world') > -1) return '世界之窗浏览器'
  if (ua.indexOf('2345') > -1) return '2345浏览器'
  if (ua.indexOf('maxthon') > -1) return '傲游浏览器'
  if (ua.indexOf('tao') > -1) return '淘宝浏览器'
  if (ua.indexOf('ubrowser') > -1) return 'UC浏览器'
  if (ua.indexOf('coolnovo') > -1) return '枫叶浏览器'
  if (ua.indexOf('opr') > -1) return 'opera浏览器'
  if (ua.indexOf('se') > -1) return '搜狗浏览器'
  if (ua.indexOf('firefox') > -1) return 'firefox浏览器'
  if (ua.indexOf('safari') > -1 && ua.indexOf('version') > -1) return 'safari浏览器'
  if (window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) return '360浏览器'
  if (ua.indexOf('chrome') > -1 && window.chrome) return 'chrome浏览器'
  return '其他浏览器'
}
