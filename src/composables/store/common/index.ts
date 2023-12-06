import { defineStore } from 'pinia'

export const common = defineStore('common', {
  state: () => {
    return {
      location: {},
      userMessage: {
        nickName: '',
        email: '',
        url: ''
      },
      head: '',
      theme: 'normal',
      menu: '1'
    }
  },
  actions: {
    setLocation(location: any) {
      this.location = location
    },
    setUserMessage(userMessage: any) {
      this.userMessage = userMessage
    },
    setHead(head: any) {
      this.head = head
    },
    setTheme(theme: string) {
      this.theme = theme
    },
    setMenu(menu: string) {
      this.menu = menu
    }
  },
  persist: true
})
