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
      url: `weather/weatherInfo`,
      method: 'get',
      baseURL: '/gd',
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
      url: `ip`,
      method: 'post',
      baseURL: '/gd',
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
  }
}
export default explore
