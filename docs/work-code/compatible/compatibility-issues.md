<!--
 * @Date: 2023-10-12 16:29:11
 * @LastEditors: zhumanyao
 * @LastEditTime: 2024-03-19 09:30:35
 * @FilePath: \ocean-of-knowledge\docs\work-code\compatible\compatibility-issues.md
-->

# 兼容问题

## H5 应用在部分手机中无法正常加载（安卓手机）

- 原因：UC 浏览器版本较低, 不支持 ESM 规范 （即在 package.json 中添加了 "type": "module"）

- 解决方案： [开发项目时，集成钉钉时，不兼容现象的处理](./dingding.md)

## 部分手机浏览器不支持 rem 转换中 跟字体大小为 font-size: 1px

- 原因：手机中浏览器内核版本较低，识别不出根元素为 font-size:1px; 这边认为其与 PC 端浏览器只能识别最低字体大小为 12px;

- 解决方案：为了方便，可以将跟字体设置为 100px

```js
;(function (doc, win) {
  var docEI = doc.documentElement
  var resizeEvt
  if (window.orientationchange) {
    resizeEvt = 'orientataionchange'
  } else {
    resizeEvt = 'resize'
  }
  var recalc = function () {
    var clientWidth = docEI.clientWidth || doc.body.clientWidth || window.innerWidth
    if (!clientWidth) {
      return
    }
    docEI.style.fontSize = (clientWidth / 375) * 100 + 'px' // 这里就见面其设置成了100px
  }

  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
```

## IOS 部分手机在 new Date(time: string) 中返回的结果为 null

- 原因： 部分 ios（eg: ios 12 pro）, 不支持 time 中用 ‘-’ 连接

- 解决方案： 需要将 ‘-’ 替换成 ‘/’

```js
new Date('2023-10-10 20:22:22') // 在部分IOS中为null

new Date('2023/10/10 20:22:22') // 不存在这种现象
```

## tinymce 富文本在 IOS 中出现不渲染的问题

- 原因： tinymce 版本过高导致的， 在 6.xx 版本时， PC 端、安卓手机上都能正常展示， 但是在 IOS 上存在兼容问题

- 解决方案：将 tinymce 的版本降低至 5.xx 版本【我用的是 5.5.1】， 后期可以关注 gitHub 的 issues

## vue 项目在 IE 浏览器的兼容问题

#### vue3.0 版本不再支持 IE 浏览器

vue 官网已经明确说明

#### vue2.0 + vue-cli3.0 兼容 IE 浏览器的兼容处理

- 安装依赖 babel-polyfill

```js
npm install babel-polyfill --save
```

- 在 main.js 中引入 babel-polyfill

```js
import 'babel-polyfill'
```

- 在 vue.config.js 中添加配置

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: (config) => {
    // 解决兼容
    config.entry.app = ['babel-polyfill', './src/main.js']
    // webpack-html-plugin
    config.plugin('html').tap((options) => {
      options[0].title = '统一身份认证'
      options[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
      return options
    })
  }
})
```

- 根目录下创建 .browserslistrc 文件， 添加配置

```js
> 1%
last 2 versions
not dead
ie 10
```

## localStorage 与 sessionStorage 在 IE 浏览器中不兼容问题的处理

- IE 可以通过 cookie 来处理本地储存， 但是需要注意 cookie 的储存量比较小。

- 兼容写法

```js
// cookie 的写法
const useCookie = () => {
  const setCookieItem = (key, value, time) => {
    var days = 60
    if (time || time === 0) {
      days = time
    }
    var date = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = key + '=' + value + ';expires=' + date
  }

  const getCookieItem = (key) => {
    var arr = document.cookie ? document.cookie.split(';') : ''
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] === key) {
        return arr2[1]
      }
    }
    return ''
  }

  const removeCookieItem = (key) => {
    setCookieItem(key, '', 0)
  }

  return {
    setCookieItem,
    getCookieItem,
    removeCookieItem
  }
}

// localstorage 的写法
const useOriginCache = () => {
  // 设置储存
  const setStore = (key, data, bool = true) => {
    if (bool) {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      sessionStorage.setItem(key, JSON.stringify(data))
    }
  }

  // 获取储存数据
  const getStore = (key, bool = true) => {
    if (bool) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return JSON.parse(sessionStorage.getItem(key))
    }
  }

  // 清除储存数据
  const removeStore = (key, bool = true) => {
    if (bool) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
  }

  return {
    setStore,
    getStore,
    removeStore
  }
}

const cookieSrv = useCookie()
const cacheSrv = useOriginCache()

// 兼容
const useCache = () => {
  const setCache = (key, value) => {
    if (window.localStorage) {
      cacheSrv.setStore(key, value)
    } else {
      cookieSrv.setCookieItem(key, value)
    }
  }

  const getCache = (key) => {
    if (window.localStorage) {
      return cacheSrv.getStore(key)
    } else {
      return cookieSrv.getCookieItem(key)
    }
  }

  const removeCache = (key) => {
    if (window.localStorage) {
      cacheSrv.removeStore(key)
    } else {
      cookieSrv.removeCookieItem(key)
    }
  }

  return {
    setCache,
    getCache,
    removeCache
  }
}
```
