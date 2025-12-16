<!--
 * @Date: 2023-12-23 17:20:33
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-12-23 19:02:01
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\node\babel\vite.md
-->

Vite 默认使用 esbuild 进行构建和转码，而 esbuild 目前并不支持 es6 转 es5。

但是，你可以通过在 Vite 配置文件中指定 Rollup 插件 @rollup/plugin-babel，来使用 Babel 将 ES6 代码转为 ES5。

下面是具体步骤：

安装相关依赖

npm install --save-dev @rollup/plugin-babel @babel/core @babel/preset-env

在项目的根目录下创建一个 .babelrc 文件，并设置 Babel 预设

{
"presets": [
"@babel/preset-env"
]
}

在 vite.config.js 文件中将 @rollup/plugin-babel 指定为 Rollup 插件

import { defineConfig } from 'vite'
import { babel } from '@rollup/plugin-babel'

export default defineConfig({
plugins: [
babel({
exclude: 'node_modules/**',
babelHelpers: 'bundled'
}),
],
})

以上步骤之后，在 Vite 构建包时，就会使用 Babel 将 ES6 代码转换为 ES5。

请注意，这种方式可能会导致构建变慢，因为 Babel 的转换效率没有 esbuild 高。

在发布包含现代 JavaScript 代码的 JavaScript 库或应用时，建议尝试利用 package.json 中的 "module" 字段或 HTTP/2 推送对现代浏览器推送现代 JavaScript，对旧版浏览器的用户推送经过 Babel 转换的代码。
