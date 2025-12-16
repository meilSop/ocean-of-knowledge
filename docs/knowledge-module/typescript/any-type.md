<!--
 * @fileName: 任意类型的声明
 * @Date: 2023-03-15 15:15:15
 * @Author: manYao.zhu
-->

# 任意类型

## any 任意类型声明

```ts
let name: any = '张三'
let num: any = 222
let bool: any = true
let obj: any = {
  name: '张三',
  age: 18,
}
let n: any = null
let und: any = undefined
let symbol: any = Symbol()
...
```

## unknown 不知道的类型声明

```ts
let name: unknown = '张三'
let num: unknown = 222
let bool: unknown = true
let obj: unknown = {
  name: '张三',
  age: 18,
}
let n: unknown = null
let und: unknown = undefined
let symbol: unknown = Symbol()
...
```

## any 类型与 unknown 类型的区别

- any 声明的类型, 可以给任意类型变量赋值; unknown 类型只能给其自身 或 any 赋值

```ts
// any声明的类型, 可以给任意类型变量赋值
let any: any = '222'
let name: string = '张三'
let num: number = 2
let bool: Boolean = true

name = any
num = any
bool = any
```

```ts
// unknown类型只能给其自身 或 any 赋值

let unk: unknown = '111'

let str: string = '1111'
let num: number = 22
let bool: boolean = true
let any: any = '222'
let known: unknown = 555

str = unk // 报错
num = unk // 报错
bool = unk // 报错
any = unk // '111'
known = unk // '111'
```

- unknown 定义的对象没有办法读取任何属性、方法也不可以调用； any 值可以的

```ts
// any 类型
const styleofpicasso: any = {
  name: '朱满要',
  open: () => {
    console.log(`${styleofpicasso.name}真帅`)
  },
}
console.log(styleofpicasso.name) // 朱满要
styleofpicasso.open() // 朱满要真帅
```

```ts
const styleofpicasso: unknown = {
  name: '朱满要',
  open: () => {
    console.log(`${styleofpicasso.name}真帅`) // 报错
  },
}
console.log(styleofpicasso.name) // 报错
styleofpicasso.open() // 报错
```

- unknown 类型 比 any 更加安全

## Object 类型声明

- 这个是对象类型的原型指向的类型， 可以认为是任意类型 —— null 与 undefined 类型除外

```ts
let name: Object = '张三'
let num: Object = 222
let bool: Object = true
let obj: Object = {
  name: '张三',
  age: 18,
}
let symbol: Object = Symbol()
let show: Object = () => {
  console.log('涨三倍')
}
...
```

## object 类型声明

- object 是引用类型， 除基础类型 + Symbol 类型 外的都可以定义

```ts
let obj: object = {
  name: '张三',
  age: 18,
}
let arr: object = ['校长', '老师']
let show: object = () => {
  console.log('涨三倍')
}
```

## {} 声明

- 它的声明基本上和 Object 一致， 唯一不同的是， 它定义的对象没有办法访问属性和方法，
- 不建议使用 {} 声明变量

## 最后， 比较下类型的包含关系

- 以下定义了类型之间的包含关系， 从上到下依次递减
- 有兴趣的可以自己去试一试赋值效果

```ts
1. any 任意类型、unknown 不知道的类型
2. Object 也就是所有类型 对象类型的原型
3. Number、String、Boolean
4. number、string、boolean
5. 1  、 '张三' 、 true
6. never
```
