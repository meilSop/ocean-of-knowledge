<!--
 * @fileName:
 * @Date: 2023-03-23 11:15:34
 * @Author: manYao.zhu
-->

# vue3.0 + vite 实现 svg 自定义 icon 组件

## 创建 svg 文件夹， 并将 svg 文件放入其中

![文件](/img/file/svg.png)

## 将 svg 文件中的 fill + width + height 属性清除

## 安装插件

```
npm install vite-plugin-svg-icons -D
```

## 在 vite.config.ts 文件中修改配置

```ts
import { defineConfig } from 'vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig(() => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        // 执行icon name的格式
        symbolId: 'icon-[name]',
      }),
    ],
  }
})
```

## 在 main.ts 文件中引入

```ts
// svg自定义icon组件的插件引入
import 'virtual:svg-icons-register'
```

## 封装 my-svg 的组件

```html
<template>
  <svg
    aria-hidden="true"
    class="m_svg"
    v-bind="attrs"
    :style="{ width: fontSize + 'px', height: fontSize + 'px' }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>
```

```ts
<script lang="ts">
export default {
  name: 'my-svg',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const attrs = useAttrs()
type Props = {
  icon?: string // 图标Icon
  fontSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  fontSize: 16,
})

const symbolId = computed(() => {
  return `#icon-${props.icon}`
})
</script>
```

## 使用 my-svg 组件

```html
<my-svg icon="police" :fontSize="20"></my-svg>

<script lang="ts" setup>
  import MySvg from '../../my-svg.vue'
</script>
```
