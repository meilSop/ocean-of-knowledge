<!--
 * @fileName:
 * @Date: 2023-04-20 10:48:06
 * @Author: manYao.zhu
-->

# ICON 图标库

## icon 图标的来源

- icon 图标主要使用的是 字节跳动的开源图标， 其内容含量大， 包括内容全

[字节跳动图标库地址：https://iconpark.oceanengine.com/home](https://iconpark.oceanengine.com/home)

## icon 图标的使用

- 安装

```
npm install @icon-park/vue-next --save
```

- 使用

  1. 按需引入

```ts
import { Home } from '@icon-park/vue-next'
```

2. 全局安装

```ts
// 第一种方式  （这种注册方式， vue项目可以使用， 但是在vitePress的构建中会报错）

import { install } from '@icon-park/vue/es/all'
import '@icon-park/vue-next/styles/index.css'
import Vue from 'vue'
install(Vue, '自定义的前缀')

// 第二种方式
import { IconPark } from '@icon-park/vue/es/all'
import '@icon-park/vue-next/styles/index.css'
import Vue from 'vue'
Vue.component('icon-park', IconPark)
```

[字节跳动的使用方式地址：https://www.npmjs.com/package/@icon-park/vue](https://www.npmjs.com/package/@icon-park/vue)
