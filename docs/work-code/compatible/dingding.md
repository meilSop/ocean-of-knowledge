# 开发项目时，集成钉钉时，不兼容现象的处理

## 现象

- 开发的 H5 应用，在集成到钉钉时，出现 iOS 可以正常访问， 安卓、鸿蒙不能访问的问题 + rem 单位不能正常使用的问题

## 原因

- 开发 H5 应用， 使用了 ESM 规范， 即 ES6 的导入规范， 低版本浏览器不支持
- 钉钉安卓的 UC 浏览器内核版本太低， 没有做兼容处理（IOS 是正常的），且其对 rem 单位转换时， 根元素 font-size 为 1px 时，它无法识别， 需要使用其他的尺寸【这里认为它与 PC 端浏览器相似，默认识别最小尺寸为 12px, 故我们为了方便可以将根元素的 fong-size 设置为 100px; 即： 我们转换的时候 1px = 0.01rem】

## 解决方法

#### 针对无法正常加载的的处理

- 使用 @vitejs/plugin-legacy 插件解决低版本浏览器兼容问题

- 安装

```js
pnpm add @vitejs/plugin-legacy
```

- 使用

```js
// vite.config.ts

import legacy from '@vitejs/plugin-legacy'
import { defineConfig, loadEnv } from 'vite'

export default (param) => {
  return defineConfig({
    plugins: [
      legacy({
        targets: ['chrome 49'], // 需要兼容的目标列表，可以设置多个、
        // 也可使用 polyfills
        modernPolyfills: [
          'es.global-this' // 解决浏览器端 globalThis is not defined 报错
          // 其他配置， 这里用不到
          // 'es.symbol',
          // 'es.promise',
          // 'es.promise.finally',
          // 'es/map',
          // 'es/set',
          // 'es.array.filter',
          // 'es.array.for-each',
          // 'es.array.flat-map',
          // 'es.object.define-properties',
          // 'es.object.define-property',
          // 'es.object.get-own-property-descriptor',
          // 'es.object.get-own-property-descriptors',
          // 'es.object.keys',
          // 'es.object.to-string',
          // 'web.dom-collections.for-each',
          // 'esnext.global-this',
          // 'esnext.string.match-all'
        ]
      })
    ]
  })
}
```

#### 针对 rem 单位失效问题的解决

- 原因

低版本浏览器对 rem 单位转换时， 根元素 font-size 为 1px 时，它无法识别，这里认为它与 PC 端浏览器相似，默认识别最小尺寸为 12px

- 解决方案

使用其他的尺寸，为了方便可以将根元素的 fong-size 设置为 100px; 即： 我们转换的时候 1px = 0.01rem
