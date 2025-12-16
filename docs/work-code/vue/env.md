# vue项目中 .env 与 .env.qa 与 .env.prod 文件的作用

## .env的作用

- 在vue项目中， .env 文件的作用主要使用定义项目中使用到的全局变量

- .env.qa 或 .env.uat 主要定义一些测试环境的变量

- .env.prod 主要是用来定义生产环境的全局变量

- env后面的后缀名称是可以自己定义的。 同时在构建的时候需要添加不同的配置

```js
/**
 * vue2 中的构建方式
 */
"serve": "vue-cli-service serve", // 读取 .env
"build": "vue-cli-service build", // 读取 .env
"build-qa": "vue-cli-service build --mode qa" // 读取 .env.qa
"build-prod": "vue-cli-service build --mode prod" // 读取 .env.prod

/**
 * vue3 中的构建方式
 */
"dev": "vite", // 读取 .env
"build": "vue-tsc --noEmit && vite build", // 读取 .env
"build-qa": "vue-tsc --noEmit && vite build --mode=qa", // 读取 .env.qa
"build-prod": "vue-tsc --noEmit && vite build --mode=prod" // 读取 .env.prod
```

## .env 文件配置的详情

- Vue2 的 .env 配置详情

```js
// 环境变量 可以是 VUE_ENV 也可以是 NODE_ENV

// 其余的变量 必须要以 VUE_APP 开头这个是官网的规定
eg: 

VUE_APP_UAA_ADMIN = 'https://sso.sungrow.cn'
```

- vue3 的 .env 配置详情

```js
// 环境变量 与 其他变量 需要以 VITE 开头

eg:
VITE_APP_UAA_ADMIN = 'https://sso.sungrow.cn'
```

## 项目的配置文件如何获取响应文件里的变量

- vue2 项目

```js
//  vue.config.js 文件

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    devServer: {
        port: "8484",
        open: true,
        proxy: {
            // 当本地开发的地址被拼全时，就不需要代理了， 因为不存在跨域
            "/uaa": {
                target: process.env.VUE_APP_WEB_UAA, // 通过 process.env 来获取全局定义的变量
                changeOrigin: true,
            },
        },
    },
})
```

- vue3 项目

```js
// vite.config.ts 文件

import { defineConfig, loadEnv } from 'vite'

export default (param: any) => {  
  const env = loadEnv(param.mode, process.cwd())  // 通过这个获取
  return defineConfig({
    server: {
      host: 'localhost',
      port: 8989,
      proxy: {
        '/uaa': {
          target: env.VITE_APP_WEB_URL,
          changeOrigin: true,
        }
      }
    },
  })
})
```

## 项目内部文件如何获取全局变量

- vue2 项目

```js
// 通过 process.env 获取
eg:
// main.ts
const env = process.env
```
需要注意的是上面的 process.env 不是node 里面的 process.env, 它知识 DefinePlugin 插件在 webpack 打包阶段做的一些 hash 手段， 知识为了语义化，写成了 process.env

[具体的可查阅： 前端项目里process.env的真面目](https://juejin.cn/post/7068291487972196366#heading-4)

- vue3 项目

```js
// vue3 的项目内通过以下后去
const env = import.meta.env    // 这个是vite 提供的方法
```

## 通过以上方式， 就可以将全局的变量定义在 .env 文件内， 从而满足我们在不同环境中定义不同的变量值的需求 