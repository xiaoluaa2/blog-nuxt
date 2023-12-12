interface foreendInterface {
  location: string
  fromUrl: string
  time: string
  browser: string
  moduleType: string
  operateType: string
  operateContent: string
}
const explore = {
  //天气
  getWather(city: string) {
    return getFetchData({
      url: `https://restapi.amap.com/v3/weather/weatherInfo`,
      method: 'get',
      baseURL: '',
      params: {
        key: '3add5076d6a4cb4c4424b5a11ebe324b',
        city: city,
        extensions: 'all',
        output: 'JSON'
      }
    })
  },

  // 如果用户多次访问，一周内不会重复请求定位接口
  getLocation() {
    return getFetchData({
      url: `https://restapi.amap.com/v3/ip`,
      method: 'post',
      baseURL: '',
      params: {
        key: '3add5076d6a4cb4c4424b5a11ebe324b'
      }
    })
  },
  // 友链
  getLinkList() {
    return getFetchData({
      url: `/link/linkList`,
      method: 'post',
      body: {
        Skip: 0,
        Limit: 100
      }
    })
  },
  // 统计
  foreend(form: foreendInterface) {
    return getFetchData({
      url: `/statistics/foreend`,
      method: 'post',
      body: form
    })
  },
  showStatistics() {
    return getFetchData({
      url: `/statistics/showStatistics`,
      method: 'post'
    })
  },
  // 一言
  // 参数	  说明
  // a	    动画
  // b	    漫画
  // c	    游戏
  // d	    文学
  // e	    原创
  // f	    来自网络
  // g	    其他
  // h	    影视
  // i	    诗词
  // j	    网易云
  // k	    哲学
  // l	    抖机灵
  yiyan() {
    return getFetchData({
      url: `https://v1.hitokoto.cn/?c=k&c=h`,
      method: 'get',
      baseURL: ''
    })
  }
}
export default explore
