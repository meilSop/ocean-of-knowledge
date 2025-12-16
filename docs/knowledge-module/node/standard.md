<!--
 * @fileName:
 * @Date: 2023-07-13 17:42:34
 * @Author: manYao.zhu
-->

# CommonJS、UMD、CMD、AMD 以及 ES Module 之间的区别

## CommonJs 规范

- 该规范仅支持服务端（Node.js）, 不支持浏览器端的模块化规范

- 优点：

  每个文件都是一个独立模块，解决了变量的污染。

  通过 module.exports 和 require，实现模块间相互依赖

- 缺点：

  针对于服务器，浏览器端不支持。

  运行时加载，不可以进行 treeShaking。

  同步加载，多模块加载速度慢

- 使用案例：

  common.js (暴露脚本)

  ```js
  const show = (name) => {
    console.log(name)
  }

  module.exports = {
    show,
  }
  ```

  common1.js (使用脚本)

  ```js
  const { show } = require('./common.js')

  show('张三')
  ```

## AMD - (Asynchronous Module Definition) - 异步模块定义

- 异步模块定义 —— 由于 common.js 是同步执行性的，用于服务端，而 AMD 用于浏览器，他的语法类似ＣｏｍｍｏｎＪＳ

- 优点：

  针对于浏览器端

  异步加载。

- 缺点：

  不能实现按需加载

  需要单独引用 require.js ([需要到 requirejs 官网 下载](https://requirejs.org/docs/release/2.3.6/minified/require.js))

- 使用案例

  模块一： common.js

  ```js
  define(() => {
    return {
      sum: (a, b) => {
        return a + b
      },
    }
  })
  ```

  模块二 ： common1.js (使用了模块一， 【模块一与模块二都可以止直接使用】)

  ```js
  define(['./module/common.js'], (fun) => {
    const result = fun.sum(1, 2)
    return {
      result,
    }
  })
  ```

  入口文件 main.js

  ```js
  require.config({
    paths: {
      common: './module/common1',
    },
  })

  require(['common'], function (common) {
    console.log(common) // {result： 3}
    const data = common.result
    console.log(data) // 3
  })
  ```

  html 中的使用

  ```js
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <!-- 这里面的 require.js 必须要使用 -->
    <script src="./module/require.js" data-main="./main"></script>
  </body>
  </html>
  ```

## CMD

- CMD 推崇就近依赖，只有在用到某个模块的时候再去 require。

- 优点：

  针对于浏览器端

  可以实现按需加载

- 缺点：

  需要引入 sea.js， （[在官网下载 sea.js](https://www.zhangxinxu.com/sp/seajs/#downloads)）

- 使用案例

  module.js

  ```js
  define((require, exports, module) => {
    const b = {
      sum(a, b) {
        return a + b
      },
    }
    module.exports = b
  })
  ```

  module1.js

  ```js
  define((require, exports, module) => {
    const b = require('./module.js')
    console.log(b) // a 方法
    const a = b.sum(1, 3)
    module.exports = a
  })
  ```

  html 中使用

  ```js
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <script src="./CMD/sea.js"></script>
      <script>
        seajs.config({
          alias: {
            'module': './CMD/module.js',
            'module1': './CMD/module1.js'
          }
        })

        seajs.use(['module', 'module1'], (m, n) => {
          console.log(m);  // {sum: ƒ}
          console.log(n);  // 4
        })
      </script>
    </body>
  </html>
  ```

## UMD 规范

- 相关

  umd 不能算是一种模块规范，因为它没有模块定义和调用，他结合 AMD 和 CommonJS 规范，保证模块可以被 amd 和 commonjs 调用

  npm 包文件内 umd 文件夹，就是结合了 2 种规范打包后的代码

  UMD 判断是否存在支持 Node.js 的模块(exports)，然后使用 Node.js 模块模式。在判断是否支持 AMD(define 是否存在)时，使用 AMD 加载模块

## ESM 规范 （ES Module）

- ESM（ECMA Script Modules)

  上述引入方式并存了一段时间后，制定 JavaScript 规范的委员会出面，也就是现在的 ES ６规范，通过 import 导入 JS 模块，通过 export 导出模块，也是用的比较多的一种，现在主流浏览器也基本支持了，在 script 标签中使用 type='module'属性即可

- 优点 ：

  针对于浏览器。

  静态编译，值得引用。

  可以进行 tree-shaking。

- 缺点：

  服务器端不支持。

  对浏览器有要求

- 使用案例

  es.js

  ```js
  export const name = '张三'
  export default {
    sum(a, b) {
      return a + b
    },
  }
  ```

  es1.js

  ```js
  import { name } from './es.js'
  import _default from './es.js'
  console.log(name)
  const data = _default.sum(2, 3)
  console.log(data)
  export default {}
  ```

  html 文件

  ```js
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <script type="module" src="./ES/es1.js"></script>
    </body>
  </html>
  ```
