<!--
 * @Date: 2023-08-25 16:36:00
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-08-25 17:26:57
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\vue\plugin\vite\auto-import.md
-->

# Vite + vue3.0 按需自动导入

- 这里说的是 vite + vue3.0 的按需自动导入

## 1. 安装 插件

```js
npm install unplugin-auto-import --save-dev
```

## 在 vite.config.ts 中全局配置

```js
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default ({ mode }) => {
  return defineConfig({
    plugin: [
      Vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'], // 指定那些三方插件需要按需自动导入
        dirs: ['src/**/*.vue', 'src/**/*.ts'], // 指定哪些自己封装的插件也需要按需自动导入
        dts: './auto-import.d.ts', // 指定生成变量申明的文件， 这个需要在tsconfig.json中
        // 这里是用于解决在文件中按需自动导入的方法，能正常使用， 但是在vscode中飘红的问题
        eslintrc: {
          enable: true, // 1、自己的方法有变化是，改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗， 3，生成的文件在.eslintrc.js中引入即可
          filepath: './.eslintrc-auto-import.json' // 指定eslint全局文件的名称
        }
      })
    ]
  });
};
```

## tsconfig.json 文件的添加

```js
{
  "include": [
+   "auto-import.d.ts",
    "src/**/*.vue",  // 解决项目内飘红的问题
    "src/**/*.ts",
  ]
}
```

## .eslintrc.js 文件的修改

```js
module.exports = {
  extends: [
    './.eslintrc-auto-import.json' // 添加这行
  ]
};
```

## unplugin-auto-import 插件的详细说明

- 若想详细了解 [这个插件的配置信息， 我们可以访问改地址查看 configuration](https://www.npmjs.com/package/unplugin-auto-import),

- 当然我们也可以在项目内通过该方法找到其申明的方法，查找变量
