// https://nuxt.com/docs/api/configuration/nuxt-config
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { resolve } from 'path'
let plugins = []
// if (process.env.NODE_ENV === 'production') {
plugins.push('transform-remove-console')
// }
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
    extractCSS: { allChunks: true },
    build: {
      transpile: ['jinrishici']
    },
    babel: {
      plugins
    }
  },
  buildModules: [
    // 添加 @nuxt/analyze 模块
    '@nuxt/analyze'
  ],
  plugins: ['~/plugins/tsparticles', '~/plugins/VMDPreview'],
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
  server: true, //开启服务端渲染或者预渲染
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
    },
    build: {
      sourcemap: 'inline',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      analyze: {
        filename: 'stats.html', //生成分析网页文件名
        title: 'Rollup Visualizer',
        template: 'treemap',
        // template 图表类型 (string, default treemap) - Which diagram type to use: sunburst, treemap, network, raw-data, list.
        open: true, //在默认用户代理中打开生成的文件
        gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
        brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
      }
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:5200', // 测试
        // target: 'http://admin.lubowen.xyz',
        changeOrigin: true,
        prependPath: true
      },
      '/gd': {
        target: 'https://restapi.amap.com/v3/',
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
      },
      '/gd': {
        //  测试
        proxy: 'https://restapi.amap.com/v3/**',
        rewrite: (path: string) => path.replace(/^\/gd/, '')
      }
    }
  }
}
