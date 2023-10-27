// import { defineStore } from "pinia"

// export const common = defineStore("common", {
//   state: () => {
//       return {
//         education_menu: "1",
//         hr_menu: "1",
//         avatar:'',
//         username:"",
//         token:"",
//         autoChecked:'',
//         status:"",
//         phone:"",
//       }
//   },
//   actions: {
//     updateEducationMenu(education_menu:string) {
//       this.education_menu=education_menu
//     },
//     updateHRMenu(hr_menu:string) {
//       this.hr_menu=hr_menu
//     },
//     setAvatar(avatar:string) {
//       this.avatar=avatar
//     },
//     setUsername(username:string) {
//       this.username=username
//     },
//     setToken(token:string) {
//       this.token=token
//     },
//     setAutoChecked(autoChecked:string) {
//       this.autoChecked=autoChecked
//     },
//     setStatus(status:string) {
//       this.status=status
//     },
//     setPhone(phone:string) {
//       this.phone=phone
//     },

//   },
//   persist: true,
// })

import { defineStore } from 'pinia'

//参数1：定义一个仓库的唯一id名，Pinia会将所有的容器挂载到根容器；参数2：选项对象
const location = defineStore('location', {
  state: () => {
    //state必须是函数，是避免在服务端渲染时的交叉请求导致的状态数据污染；必须是箭头函数，为了更好的TS类型推导
    return {
      address: {}
    }
  },
  getters: {
    Address(): any {
      //在TS文件下，getters使用了this,则必须指定类型，否则会导致推导错误
      if (this.address) {
        return this.address as any
      }
    }
  },
  actions: {
    setAddress(address: any) {
      console.log(address)
      this.address = address
    }
  },
  persist: true
})
export default location
