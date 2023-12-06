// https://nuxt.com/docs/api/configuration/nuxt-config
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { resolve } from 'path'
export default {
  alias: {
    '@': '/src'
  },

  srcDir: 'src/',
  ssr: true,
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@element-plus/nuxt'],
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
  },
  build: {
    extractCSS: { allChunks: true }
  },
  plugins: ['~/plugins/tsparticles', '~/plugins/VMDPreview'],
  // 字体图标
  css: [
    /**
     * 配置全局 css
     */
    // 'element-plus/dist/index.css',
    // 'wow.js/css/libs/animate.css',
    // 'animate.css',
    '~/assets/css/global.css',
    '~/assets/iconfont/iconfont.css',
    '~/assets/iconfont2/iconfont.css',
    '~/assets/iconfont/font.css'
  ],
  //mode: 'client'
  // server: true, //开启服务端渲染或者预渲染
  vite: {
    plugins: [viteCommonjs()],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/css/index.less";'
        }
      }
    },
    resolve: {
      alias: {
        // 设置文件./src路径为 @
        '@': resolve('./src')
      }
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        // target: 'http://localhost:5200', // 测试
        // target: 'http://tz.tianzerc.com/api',
        target: 'http://admin.lubowen.xyz',
        changeOrigin: true,
        prependPath: true
      },
      '/gd': {
        //  测试
        // target: 'https://restapi.amap.com/v3/',
        // 线上
        target: 'http://8.134.160.8:5200',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/gd/, '')
      }
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:5200/**' // 测试
        // 线上
        // proxy: 'http://admin.lubowen.xyz/**'

        // proxy: 'http://tz.tianzerc.com/api/**' // 测试
      },
      '/gd': {
        //  测试
        proxy: 'https://restapi.amap.com/v3/**',
        rewrite: (path: string) => path.replace(/^\/gd/, '')
      }
    }
  }
}
