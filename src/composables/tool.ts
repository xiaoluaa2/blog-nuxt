export const $format = function FormatTime(t: string, date: number) {
  console.log(565)

  var _date = new Date(date)
  var o: any = {
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
  for (var k in o) {
    // 我们在项目中的tsconfig.json文件中添加： "suppressImplicitAnyIndexErrors":true,
    if (new RegExp('(' + k + ')').test(t)) {
      t = t.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return t
}

export const _baseUrl = 'https://img.tzrc.tianzerc.com'

export const debounce = function (fn: any, delay: number) {
  let timer: any = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.call(this, ...arguments)
      clearTimeout(timer)
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
  var expires = 'expires=' + d.toGMTString() // cookie的语法要求是这个标志，和这个时间格式
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

export const GetLocation = function () {
  let locationCookie = getLCookie('LUBlogLocation')
  // 如果用户多次访问，一周内不会重复请求定位接口
  if (locationCookie) {
    return JSON.parse(localStorage.getItem('LUBlogLocation') as string)
  } else
    $http.other
      .getLocation()
      .then(function (resp: any) {
        console.log(resp.data)
        // adcode
        setLCookie('LUBlogLocation', 'xiaolu', 24 * 7) // 相隔一周同一浏览器再次访问时会重新定位
        localStorage.setItem('LUBlogLocation', JSON.stringify(resp.data))
        return resp.data
      })
      .catch()
}
