interface Themes {
  'main-fontcolor': string
  'main-fontcolor-gray': string
  'main-bordercolor': string
  'main-bordercolor-1': string
  'main-backgroundcolor': string
  'main-backgroundcolor-2': string
  'main-bordercolor-gray': string
  'gradient-1': string
}
const themes = {
  black: {
    'main-fontcolor': `#fff`,
    'main-fontcolor-gray': `#b2afb6`,
    'main-bordercolor': `#fff`,
    'main-bordercolor-1': `#22250b`,
    'main-backgroundcolor': `#221f1fdd`,
    'main-backgroundcolor-2': `#221f1f`,
    'main-bordercolor-gray': `#74748366`,
    'gradient-1': '-45deg, #1f2022, #2c64dd, #1f2022, #333, #494950'
  },
  normal: {
    'main-fontcolor': `#333`,
    'main-fontcolor-gray': `#696969`,
    'main-bordercolor': `#221f1f`,
    'main-bordercolor-1': `#22250b`,
    'main-backgroundcolor': `#ffffffdd`,
    'main-backgroundcolor-2': `#ffffff`,
    'main-bordercolor-gray': `#f0f0f2`,
    'gradient-1': '-45deg, #e5ebea, #2c64dd, #a1b8ce, #bdd1f0, #fff'
  }
}

// 修改页面中的样式变量值
const changeStyle = (obj: Themes) => {
  for (let key in obj) {
    document.getElementsByTagName('body')[0].style.setProperty(`--${key}`, obj[key as keyof Themes]) // as keyof typeof obj
  }
}

// 改变主题的方法
export const setTheme = (themeName: keyof typeof themes) => {
  const themeConfig = themes[themeName]
  if (themeConfig) {
    changeStyle(themeConfig) // 改变样式
  }
}
export let initTheme = (themeName: keyof typeof themes) => {
  const themeConfig = themes[themeName]
  changeStyle(themeConfig) // 改变样式
}
