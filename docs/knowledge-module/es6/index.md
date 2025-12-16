<!--
 * @fileName:
 * @Date: 2023-06-26 15:20:10
 * @Author: manYao.zhu
-->

# 变量声明的命令

## var 与 function 命令

- 这两个命令是 ES5 的方法， 可以声明提前
- 这两个方法定义的全局变量等价于顶层对象 （若在浏览器中被挂载到 window 上，若在 node 中将会被挂载到 global 上）

## let 与 const 命令

- 这两个命令是 ES6 添加的命令
- 这两个命令定义的变量都是块级作用域的， 且不生申明提前

## import 与 class 命令

- ES6 添加的这两命令， 用于申明变量
- 这两个命令定义的变量‘不会’挂载到全局

## 顶层对象的属性

- 浏览器环境的顶层对象是： window; Node 环境的顶层对象： global
- 在 ES5 中顶层对象与全局变量是等价的
- 在 ES6 中有所改动：一方面保持了 ES5 的， var 与 function 定义的全局变量， 依旧是顶层对象的属性；另一方面规定，let、const、class、import 定义的局部变量， 不属于全局变量。

## globalThis 对象

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。
- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
- Node 里面，顶层对象是 global，但其他环境都不支持。
- ES2020 在语言标准的层面，引入 globalThis 作为顶层对象。也就是说，任何环境下，globalThis 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this。
