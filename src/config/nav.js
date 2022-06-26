const files = require.context('../router/modules', false, /\.js$/)

let configRoutes = []
/**
 * inject routers
 */
files
  .keys()
  .forEach(key => {
    configRoutes = configRoutes
      .concat(files(key).default)
      .sort((a, b) => (a.sort ? a.sort - b.sort : -1)) // 读取出文件中的default模块
  })

const menus = {
  combined: {
    name: '组合式api',
    icon: 'icon-hanshu'
  },
  newattr: {
    name: '新特性',
    icon: 'icon-zujian'
  },
//   data: {
//     name: '数据',
//     icon: 'icon-82'
//   },
//   dpattern: {
//     name: '设计模式',
//     icon: 'icon-iconset0357'
//   },
//   css: {
//     name: 'css',
//     icon: 'icon-liulanqi'
//   },
//   browser: {
//     name: '浏览器',
//     icon: 'icon-liulanqi'
//   },
//   tool: {
//     name: '工具',
//     icon: 'icon-liulanqi'
//   },
//   vuek: {
//     name: 'vue知识点',
//     icon: 'icon-liulanqi'
//   }
}
const menuArr = Object.keys(menus).map((menu) => {
  const { name, icon } = menus[menu]
  const temp = {
    menu: name,
    icon,
    children: configRoutes.filter((route) => route.modules === menu)
  }
  return temp
})

export default menuArr
