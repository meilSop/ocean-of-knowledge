# 手撸原子化 CSS 用到的插件

## fast-glob [用于匹配文件和目录]

- 安装

```js
npm install fast-glob --save-dev
```

- 主要使用方法

```js
const fg = require('fast-glob')

1. fg.sync(array, option) // 这三个方法的作用相同， 匹配指定的文件
2. fg.glob(array. option)
3. fg.async(array, option)

4. fg.generateTasks(array) // 返回模式的内部表示形式（Task是按基本目录组合模式的任务）。

// 其中 array是匹配的路径： array = ['src/**/*.{ts,js,vue,jsx,tsx}', './index.html']
// option值作用参数{absolute: 是否是绝对路径， doc: 是否以.开头的文件，cmd: 当前路径， deep： 指定层级，onlyDirectories： 是否匹配文件夹}

```

- 使用案例

```js
fs.sync(['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'])[
  // 打印出来
  ('./index.html',
  './src/App.vue',
  './src/main.ts',
  './src/api/client.model.ts',
  './src/api/client.ts',
  './src/api/index.ts',
  './src/store/index.ts',
  './src/views/about.vue',
  './src/views/home.vue',
  './src/router/guard.ts',
  './src/router/index.ts',
  './src/router/route.ts',
  './src/utils/index.ts',
  './src/api/modules/common.api.ts',
  './src/store/modules/counter.ts',
  './src/utils/hooks/index.ts',
  './src/utils/hooks/common/use_cache_store.ts',
  './src/utils/hooks/common/use_cryptojs.ts',
  './src/utils/hooks/common/use_indexeddb_store.ts')
]

fs.generateTasks(['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'])[
  // 打印出来
  ({
    dynamic: false,
    positive: ['./index.html'],
    negative: [],
    base: '.',
    patterns: ['./index.html']
  },
  {
    dynamic: true,
    positive: [
      './src/**/*.js',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.tsx',
      './src/**/*.vue'
    ],
    negative: [],
    base: './src',
    patterns: [
      './src/**/*.js',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.tsx',
      './src/**/*.vue'
    ]
  })
]
```

[option 的具体配置，可以查看该网址](https://www.npmjs.com/package/fast-glob#options-3)

## lilconfig [读取、解析配置文件， 这个是 cosmiconfig 的替代品]

- 它能够方便地读取 npm 包、JavaScript 模块、JSON 文件、.yaml 文件等各种格式的配置文件， 功能与 cosmiconfig 包一样

[lilconfig 的详细说明](https://www.npmjs.com/package/lilconfig)

[cosmiconfig 的详细说明](https://www.npmjs.com/package/cosmiconfig) [博客地址](http://www.javascriptcn.com/post/155334)

- 安装

```js
npm install lilconfig -save-dev
```

- 基本方法

```ts
const { lilconfig, lilconfigSync } = require('lilconfig')

// lilconfig 方法是异步读取配置文件
// 返回的是promise
lilconfig(configName).search() // 根据配置文件名称读取配置文件， 注意配置文件必须是 xxx.config.{ts, js, cjs}
// eg: postcss.config.{js, ts, cjs}   linconfig('postcss').search()

// 返回的是配置数据
lilconfig().load(configFilePath) // 根据配置文件的路径读取配置文件
// eg postcss.config.{js, ts, cjs}   lilconfig().load(path.resolve(postcss.config.js))

// lilconfigSync 方法是同步读取配置文件

lilconfigSync(configName).search()

lilconfigSync().load(filePath)
```

- 使用案例

```js
const { lilconfig, lilconfigSync } = require('lilconfig')
const path = require('ath')

// 异步操作
lilconfig('postcss')
  .search()
  .then((res: any) => {})

// 同步操作
const result = lilconfigSync().load(path.resolve('postcss.config.js'))
```

## postcss-load-config [postcss-load-config 则是一个在 PostCSS 中加载配置文件的插件，它可以帮助我们更便捷地管理 PostCSS 的配置]


## postcss-selector-parser [css 选择器的解析器]

- 安装

```js
npm install postcss-selector-parser --save-dev
```
