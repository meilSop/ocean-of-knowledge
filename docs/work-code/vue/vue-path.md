# Vue 给路由地址添加自定义的前缀 （同一个域名地址部署多个 vue 项目）

## 开发的处理

- 开发就按正常的流程开发

## 路由的处理

#### vue3.0 的处理方式

- 在路由总添加自定义的前缀路由

```js
const router = createRouter({
  history: createWebHistory(base: string),  // 添加自定义的前缀
// history: createWebHistopry('/digitday/')  // 这就是个例子
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
```

#### vue2.0 的处理方式

- 在路由总添加自定义的前缀路由

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { ssoRoutes } from './route'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: "/",  // 默认
  base: '/sso/',
  routes: ssoRoutes,
  // 期望滚动条滚动到左上角
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0
      }
    }
  }
})

export default router
```

## 构建配置的处理

#### vue3.0 的配置

- 修改 vite.config.ts 文件 base 字段 与 build.outDir 字段

```js
export default ({ mode }) => {
  return defineConfig({
    base: env.VITE_ENV === 'prod' ? '/digitday' : '/', // 添加的配置信息
    build: {
      outDir: 'digitday'
    }
  })
}
```

#### vue2.0 的配置

- 修改 vue.config.js 文件 publicPath 字段 与 outputDir 字段

```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/sso',
  outputDir: 'sso'
})
```

## 发布 nginx 配置的处理

- 修改 nginx 代理的字段

```js
server {
  listen  8080;
  server_name  localhost;

  location /digitday {
    root html   // html 根目录
    try_files $uri $uri/ /digitday/index.html  // 处理history模式下, 刷新界面时报404
    index index.html index.htm  //  指定页面默认进入index.html 文件
  }
}
```
