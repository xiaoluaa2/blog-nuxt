// composables/getData.ts
import { ElMessage } from 'element-plus'
//文件位置：/composables/useRequest.ts
type Response = {
  url: string
  body: any
  status: number
  type: string
  statusText?: string
  _data?: any
  headers?: object
  ok?: boolean
  redirected?: boolean
  bodyUsed?: boolean
}
type ResponseData = {
  code: number
  msg: string
  data: any
}

export const getFetchData = async (options: any) => {
  const router = useRouter()
  //此处是引入了pinia进行状态管理，大家可以根据自己需求进行重写
  //const store = useMainStore();
  // const $store = useStore.common()
  let headers = {}
  // headers = {
  //   token: $store.token || null
  // }
  headers = {
    token: null
  }
  const defaultOptions: object = {
    //baseURL也可以在nuxt.config.ts中定义然后此处引入
    baseURL: '/api',
    // headers: headers,
    //响应拦截
    onResponse({ response }: { response: Response }) {
      console.log('response', response)
      const res = response._data
      console.log(res)
      //后端返回code=0时弹出错误信息，此处采用了element-plus
      if (res.code == 0) {
        ElMessage.error(res.msg)
      }
    },
    //响应错误拦截
    onResponseError({ response }: { response: Response }) {
      console.log('response-error', response)
      const res = response._data
      //后端返回401时导航到登录界面
      switch (response.status) {
        case 400:
          ElMessage({
            message: '信息校验失败',
            grouping: true,
            type: 'error'
          })
          // ElMessage.error('信息校验失败')
          break
        case 401:
          router.replace('/login')
          ElMessage.error('认证失败,请先登录')
          break
        case 403:
          ElMessage({
            message: '没有权限',
            grouping: true,
            type: 'error'
          })
          // ElMessage.error('没有权限')
          break
        case 404:
          ElMessage({
            message: '请求资源不存在',
            grouping: true,
            type: 'error'
          })
          // ElMessage.error('请求资源不存在')
          break
        default:
          ElMessage({
            message: '出错惹',
            grouping: true,
            type: 'error'
          })
          // ElMessage.error(other)
          break
      }
      // if (response.status == 401) {
      //   router.replace("/login");
      //   //store.logout()
      // }
    }
  }
  let url = options.url
  delete options.url
  const newOptions: object = { ...defaultOptions, ...options }

  //采用element-plus进行请求时的加载
  //const loadingInstance = ElLoading.service({fullscreen:false});
  console.log(newOptions)
  console.log(url)
  const { data, pending, refresh } = await useFetch(url, newOptions)
  console.log(data)
  console.log(data.value)

  if (!pending.value) {
    //loadingInstance.close();
  }

  return { data: data.value, refresh }

  // console.log(url);
  // const { data } = await useFetch(url,options)
  // console.log(data);
  // return data
}
