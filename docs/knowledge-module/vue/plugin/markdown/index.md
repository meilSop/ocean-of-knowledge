<!--
 * @fileName: markdown集成插件到vue
 * @Date: 2023-03-13 14:35:55
 * @Author: manYao.zhu
-->

# markdown 集成插件

## 简介

- 本文介绍的插件是本人基于 markdown-it + highlight.js 二次封装的插件。
- 该插件主要作用时将 .md 后缀文件集成到 vue 中， vue 可以直接将 .md 文件作为组件是使用。
- 同时在.md 文件内， 也可以引入 vue 组件使用。

## 安装

```ts
  npm install @styleofpicasso/vue-core -S
  // 或
  pnpm install @styleofpicasso/vue-core -S
  // 或
  yarn add @styleofpicasso/vue-core
```

## 在 vite.config.ts 中的配置

```ts
import { MarkdownPlugin } from '@styleofpicasso/vue-core';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    MarkdownPlugin()
  ]
});
```

## 在 ts 的配置文件中 （tsconfig.json）

```ts
// 在配置文件的includes里面添加如下代码
{
  "includes": [
    'src/**/*.md'
  ]
}
```

## 使用方法

- 在项目内创建.md 文件， 按照 markdown 文件的编辑语法编辑即可。
- 注意：

  1. vue 组件如何引入.md 文件, 如何将.md 文件当成组件使用

  - 当成页面使用

  ```ts
  // 直接但当成组件（页面使用） 在router/index.ts中
  export default [
    {
      path: '/md-show',
      name: 'md-show',
      component: () => import('../docs/markdown/md-show/index.md'),
      meta: {
        title: '展示markdown内容'
      }
    }
  ];
  ```

  - 当成组件注册使用

  ```html
  <template>
    <div>
      <test-md></test-md>
    </div>
  </template>
  ```

  ```ts
  <script lang="ts" setup>
    import TestMd from '../docs/markdown/test-md/index.md'
  </script>
  ```

  2. 如何在.md 文件内使用组件

  - 直接直接使用代码模块语法 + vue 即可

  ````ts
  ```vue
    import Case from './components/case/index.vue'
  ```;
  ````
