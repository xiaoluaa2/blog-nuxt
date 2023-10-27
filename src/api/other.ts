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
  }
}
export default explore
