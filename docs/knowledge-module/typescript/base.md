<!--
 * @fileName: 基础类型
 * @Date: 2023-03-15 14:54:49
 * @Author: manYao.zhu
-->

# 基础类型

## 字符串类型声明

```ts
let str: string = 'styleofpicasso'
```

## 数字类型声明

```ts
// 小数、整数都是浮点数， 他们都是number类型，
// 同时支持十进制、十六进制、二进制、八进制类型得声明
let num: number = 6 // 十进制
let num1: number = 0xf00d // 十六进制
let num2: number = 011010 // 二进制
let num3: number = 01744 // 八进制
```

## 布尔类型

```ts
let bool: boolean = true
const show: boolean = false
```

## null 类型声明

```ts
let n: null = null
```

## undefined 类型声明

```ts
let und: undefined = undefined
```

## null 类型 与 undefined 类型可以穿插赋值

- 严格模式下是会报错， 将严格模式关闭将不会报错

```ts
let n: null = null
let a: undefined = undefined

n = a
a = n
```

- 非严格模式下也是可以将 null 类型与 undefined 类型的值赋值给 字符串、数字、布尔等基本类型

```ts
let str: string = '张三'
let num: number = 3
let bool: boolean = true

let n: null = null
let und: undefined = undefined

str = n
num = n
bool = und
```

## void 类型声明

- 该类型通常用来定义一个方法不返回任何值

```ts
function showName(name: string): void {
  console.log(name)
}
```
