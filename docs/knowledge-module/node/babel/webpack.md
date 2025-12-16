<!--
 * @Date: 2023-12-23 17:20:17
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-12-23 18:59:57
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\node\babel\webpack.md
-->

npm install --save-dev @babel/core @babel/preset-env babel-loader

这里：

@babel/core 是 Babel 编译器核心，用于代码转换

@babel/preset-env 是 Babel 插件集，用于将 ES6 代码转换为 ES5

babel-loader 是 Webpack 的加载器，用于将 Babel 与 Webpack 融合

创建.babelrc 文件，将其放在项目的根目录下，并填入以下代码：

{
"presets": ["@babel/env"]
}

这使 Babel 知道你想使用预设@babel/env，此预设包含了将 ES6 转换为 ES5 的所有插件。

在你的 webpack.config.js 文件中，你需要包含一个模块规则来使用 babel-loader：

module.exports = {
module: {
rules: [
{
test: /\.m?js$/,
exclude: /(node_modules|bower_components)/,
use: {
loader: 'babel-loader',
options: {
presets: ['@babel/preset-env']
}
}
}
]
}
};

这里的规则告诉 Webpack，对所有的 JavaScript 文件（除了 node_modules 和 bower_components 目录），使用 babel-loader。babel-loader 将指导 Webpack 使用 Babel 进行转译。

这样，现在只要你运行 Webpack，所有的 ES6 代码就会被转化成 ES5 代码。

以上步骤适用于 Babel 7 和 Webpack 4，如果你正在使用的是 Babel 6 和 Webpack 3，@babel/core 和 @babel/preset-env 应分别替换为 babel-core 和 babel-preset-env，并在你的 webpack 配置中替换为 babel。
