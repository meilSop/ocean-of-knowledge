<!--
 * @fileName:
 * @Date: 2023-03-14 10:41:36
 * @Author: manYao.zhu
-->

# 主题

## 更换主题色

- 在更换主题色之前， 我们需要引入基础框架包的样式表 （在组件框架包里，已经做好了处理）
- 这里我们只需要在项目 src 根目录下的 app.config.ts 文件中修改如下配置

```ts
export const THEME_CONFIG = {
  themeColor: '指定想要的颜色',
}
```

## scss 变量

- 在开发过程中,使用样色的变量以及混合方法请查看：

  项目 src/assets/css/shared.scss 与 src/assets/css/mixin.scss 两个文件

## 主题的其他变量

- 主题的配置项主要是在项目 src 目录下的 app.config.ts 中
- 这些配置项在主题包中已经做成了可视化的操作界面
- 以下是项目主题的默认配置， 我们可以针具自己的需求修改配置
- 若是需要添加配置可以联系管理员添加

```ts
// app.config.ts
export const THEME_CONFIG = {
  layout: 'vertical', // vertical: my-menu-layout: 没有左侧菜单；   horizontal: my-header-layout:  有左侧菜单
  layoutComponent: 'my-menu-layout', // 布局的组件name; 全屏布局： my-layout   有左侧菜单的布局： my-menu-layout   没有左侧菜单的布局： my-header-layout
  fixedHeader: true, // 头部是否进行定位
  mode: 'dark', // 主题模式 （深模式， 浅模式）  dark  / light
  modeColor: '#545c64', // 深度模式下的菜单颜色
  defaultModeColor: '#545c64', // 深模式的默认颜色
  modeActiveColor: '#a0adbb', // 深模式的active 颜色 深模式的颜色 (菜单颜色)
  defaultModeActiveColor: '#a0adbb', // 深模式的active 默认颜色
  themeColor: '#ff3300', //  默认的主题颜色
  defaultThemeColor: '#409eff', // 默认的主题色
  headerColor: '#e7ecf5', // 头部的背景色
  subHeaderColor: '#fff', // 二级头部背景色（浏览菜单背景色）
  fontColor: '#333', // 主字体的颜色
  placeholderColor: '#a8abb2', // 占位符颜色
  borderColor: '#dcdfe6', // 边框颜色
  language: 'zh', // 国际化当前使用的语言
  projectName: '前端框架', // 项目名称

  borderRadius: '4px', // 圆角大小
  maxMenuWidth: '220px', // 左侧菜单的最大宽度
  minMenuWidth: '66px', // 左侧菜单的最小宽度
  menuHeight: '45px', // 菜单item的高度
  headerHeight: '66px', // 头部的高度
  subHeaderHeight: '45px', // 二级头的高度

  // 颜色的快捷选择  橘红， 橙色， 柳绿， 松花绿， 紫檀， 炎， 朱红，青碧，紫色
  colors: [
    '#ff3300',
    '#ff4c00',
    '#FF7500',
    '#fa8c35',
    '#afdd22',
    '#48c0a3',
    '#057748',
    '#4c221b',
    '#8B00FF',
  ], // 颜色选择块默认配置的颜色
  bigLogo: './img/logo.png', // 全的logo
  squareLogo: './icon.png?url', // 方形的logo
  defaultUserPicture: './img/user.jpg', // 用户的默认头像
  hideProjectName: false, // 是否隐藏项目名称
  hideLanguage: false, // 隐藏语言切换
  hideTips: false, // 隐藏提示信息，
  hideSubHeader: false, // 隐藏二级头部功能
  hideWatermark: false, // 是否隐藏水印
  hideSettings: false, // 隐藏设置功能
  loginBackground: '', // 登录界面的背景
}
```

## 菜单路由的相关配置信息

- 以下是默认配置

```ts
// 路由配置信息
export const ROUTER_CONFIG = {
  menuWidth: '220px', //  左侧菜单的宽度
  path: '', // 当前页面的路由
  cache: false, // 是否启用缓存模式 (false时，即时设置了缓存，也无效)
  menuIndex: '1', // 当前高亮的菜单索引
  collapsed: false, // 是否收缩
}
```
