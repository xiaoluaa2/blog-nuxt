import VMdPreview from '@kangc/v-md-editor/lib/preview.js'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import hljs from 'highlight.js'
VMdPreview.use(githubTheme, {
  Hljs: hljs
})
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VMdPreview)
})
