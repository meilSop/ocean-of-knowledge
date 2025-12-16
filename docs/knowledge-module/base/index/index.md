<!--
 * @fileName:
 * @Date: 2023-03-15 18:08:25
 * @Author: manYao.zhu
-->

# js 基础片段

## js 实现 布尔类型的强转

```ts
let num = 0
!!num // false
let num = 1
!!num // true

let str = ''
!!str // false
let str = '111'
!!str // true

let n = null
!!n // false

let und = undefined
!!und // false

let obj = {}
!!obj // true

let arr = []
!!arr // true
```

## 双问号 ?? 与 双竖线 || 运算符的区别

- 双问号运算符 ?? （空值合并运算符）

注意： 但是这个运算符只处理变量为 null 或者 undefined 时的两种情况

```js
const name = '' ?? 'default name'  // ''
const name = null ?? 'default name'  // default name
const name = undefined ?? 'default name'  // default name
const name = false ?? 'default name'  // false
const name = 'hello' ?? 'default name'  // hello
const name = 0 ?? 'default number'  // 0
```

- 双竖线运算符 ||  （空值合并运算符）

注意： 这个运算符处理的是 fasly 值的情况，即：在条件表达式中被视为假（false）的值

```js
const name = '' || 'default'  // default
const name = 0 || 'default'  // default
const name = false || 'default'  // default
const name = null || 'default'  // default
const name = undefined || 'default'  // default
const name = NaN || 'default'  // default
```