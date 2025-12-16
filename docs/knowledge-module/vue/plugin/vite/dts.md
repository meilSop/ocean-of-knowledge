<!--
 * @Date: 2023-08-25 17:28:04
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-08-29 10:27:41
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\vue\plugin\vite\dts.md
-->

# vue3 + vite 打包时生成\*.d.ts 文件

## 1. 安装插件

```js
npm install vite-plugin-dts --save-dev
```

## 2. vite.config.ts 中的配置

```js
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default ({ mode: any }) => {
  return defineConfig({
    plugins: [
      Vue(),
      dts({
        root: 'packages/theme/', // 指定打包基于哪个目录开始生成dts
        outputDir: 'dts', // 指定生成的*.d.ts 文件所在的位置， eg: 'lib/dts' lib包下面生成dts
        tsConfigFilePath: './tsconfig.json', // tsconfig.json文件的路径， 这里的意思是以 packages/theme 目录下的tsconfig.json文件为基础生成 d.ts 文件， 需要注意： 只会用该文件内 include 内包含的文件进行生成 d.ts 文件
        cleanVueFileName: true, // 是否清楚vue文件生成的d.ts文件中的vue字段， eg； *.vue.d.ts   =>  *.d.ts
        staticImport: false, // 生成的d.ts文件中引入文件方式是否用我们常用的方式  =>  eg: 设置为true , import('vue').DefineComponent  =>  import { DefineComponent } from 'vue'
        include: string | string[],  // 哪些文件需要生成 d.ts 文件， 这个范围是以tsconfig.json中的include中的数据为前提
        exclude: string | string[],  // 哪些文件不需要生成 d.ts 文件， 这个也是在tsconfig.json的include中的数据为前提
        bundledPackages: string[], // 这里写入的NPM的名称， 即： 当我们提取lib1中声明时， lib1中引入了lib包2的部分API, 这时在生成d.ts文件时， 也会将lib2单独生成一个文件，【我们将libs添加到这里， 在生成d.ts文件时，就会将lib2的直接生成到lib1中，成为lib1的一部分】
      })
    ]
  });
};
```
