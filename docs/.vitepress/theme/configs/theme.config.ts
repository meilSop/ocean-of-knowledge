/*
 * @fileName: 
 * @Date: 2023-03-15 11:04:15
 * @Author: manYao.zhu
 */
// 主题的配置信息
export const THEME_CONFIG = {
  layout: 'vertical',  // vertical: my-menu-layout: 没有左侧菜单；   horizontal: my-header-layout:  有左侧菜单
  layoutComponent: 'my-menu-layout',  // 布局的组件name; 全屏布局： my-layout   有左侧菜单的布局： my-menu-layout   没有左侧菜单的布局： my-header-layout
  fixedHeader: true,  // 头部是否进行定位
  mode: 'dark',  // 主题模式 （深模式， 浅模式）  dark  / light
  modeColor: '#545c64',  // 深度模式下的菜单颜色
  defaultModeColor: '#545c64',  // 深模式的默认颜色
  modeActiveColor: '#a0adbb',  // 深模式的active 颜色 深模式的颜色 (菜单颜色)
  defaultModeActiveColor: '#a0adbb',  // 深模式的active 默认颜色
  themeColor: '#ff3300',  //  默认的主题颜色
  defaultThemeColor: '#409eff',  // 默认的主题色
  headerColor: '#e7ecf5',  // 头部的背景色
  headerAlign: 'left',  // menu菜单在头部布局对其方式， left: 靠左， center: 居中， right: 靠右
  subHeaderColor: '#fff',  // 二级头部背景色（浏览菜单背景色） 
  fontColor: '#333',  // 主字体的颜色
  placeholderColor: '#a8abb2',  // 占位符颜色
  borderColor: '#dcdfe6',  // 边框颜色
  language: 'zh', // 国际化当前使用的语言
  projectName: '前端框架', // 项目名称
  
  borderRadius: '4px',  // 圆角大小
  maxMenuWidth: '220px',
  minMenuWidth: '66px',
  menuHeight: '45px',
  headerHeight: '66px',
  subHeaderHeight: '45px',

  // 颜色的快捷选择  橘红， 橙色， 柳绿， 松花绿， 紫檀， 炎， 朱红，青碧，紫色
  colors: ['#ff3300', '#ff4c00', '#FF7500', '#fa8c35', '#afdd22', '#48c0a3', '#057748', '#4c221b', '#8B00FF'], 

  bigLogo: './img/logo.png', // 全的logo
  squareLogo: './img/icon.png', // 方形的logo
  defaultUserPicture: './img/user.jpg',
  
  hideProjectName: false, // 是否隐藏项目名称
  hideLanguage: false, // 隐藏语言切换
  hideTips: false, // 隐藏提示信息，
  hideSubHeader: false,  // 隐藏二级头部功能
  hideWatermark: false,  // 是否隐藏水印
  hideSettings: false,  // 隐藏设置功能
  loginBackground: '', // 登录界面的背景
}

// 路由配置信息
export const ROUTER_CONFIG = {
  menuWidth: '220px',  //  左侧菜单的宽度
  path: '',  // 当前页面的路由
  cache: false,  // 是否启用缓存模式 (false时，即时设置了缓存，也无效)
  menuIndex: '1',  // 当前高亮的菜单索引
  collapsed: false,  // 是否收缩
}

export const MENUS = [
  {
    icon: 'home',
    title: '首页',
    path: '/home',
    name: 'home',
  },
  {
    icon: 'api-app',
    title: '案例',
    children: [
      {
        icon: 'bill',
        title: '案例页面',
        path: '/case',
        name: 'case',
      }
    ]
  },
  {
    icon: 'components',
    title: '组件演示',
    children: [
      {
        icon: 'form-one',
        title: '表单组件',
        path: '/form-item',
        name: 'form-item'
      },
      {
        icon: 'chart-pie',
        title: '图表组件',
        path: '/chart',
        name: 'chart'
      },
      {
        icon: 'drag',
        title: '拖拽组件',
        path: '/preview',
        name: 'preview'
      }
    ]
  },
  {
    icon: 'multi-function-knife',
    title: '功能界面',
    children: [
      {
        icon: 'hamburger-button',
        title: 'Icon图标库',
        path: '/icons',
        name: 'icons'
      },
      {
        icon: 'chart-histogram-two',
        title: '创建图表配置',
        path: '/create-chart-config',
        name: 'create-chart-config'
      }
    ]
  }
]