<!--
 * @fileName:
 * @Date: 2023-03-15 18:56:46
 * @Author: manYao.zhu
-->

# 内置对象

## ecma (ECMAScript 的内置对象)

- 以 new 创建实例的类型， 都是原型名称

```ts
const num: Number = new Number(11)
const str: String = new String('2222')
const bool: Boolean = new Boolean(true)
const reg: RegExp = new RegExp(/\s/)
...
```

## dom 元素的内置对象

```ts
const dom: HTMLDivElement | null = document.querySelector('div')
const dom1: HTMLInputElement | null = document.querySelector('input')
const dom2: HTMLElement | null = document.querySelector('header')
const dom3: HTMLElement | null = document.querySelector('section')
const dom4: NodeListOf<HTMLDivElement | HTMLElement | HTMLInputElement> =
  document.querySelectorAll('div')
...
```

## bom (浏览器 window 的内置对象)

```ts
const local: Location = window.location
const store: Storage = window.localStorage
let promise: Promise<string> = new Promise((r) => r('2222'))
const cookie: string = document.cookie
```
