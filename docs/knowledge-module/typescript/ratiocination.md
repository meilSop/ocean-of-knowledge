<!--
 * @fileName:
 * @Date: 2023-03-16 14:36:35
 * @Author: manYao.zhu
-->

# 类型推论 + 类型别名

## 类型推论

- ts 天然支持类型推论 （这个时候就没有必要添加类型）

```ts
let str = '1234567' // 这时候ts就是推断出str 的类型就是 string, 你在去赋值其他类型就会报错

const arr = [1, 2, 3] // 这里ts会自动推断其为 number[] 类型， 这个时候我们可以不去定义类型
```

## 类型别名

- type 关键字
- type 中的 extends 是包含的意思, 左边的值 会作为右边类型的一个子类

```ts
type num = 1 extends number ? 1 : 0 // 这里的num 就为1 ， 因为 number 包含 1
```

## type 与 interface 的不同

- interface 可以继承, type 不可以继承, 它只能使用交叉类型实现合在一起

```ts
interface A {
  name: string
}
interface B extends A {
  age: number
}
type C = {
  class: string
} & A

const obj: B = {
  name: '111',
  age: 12,
}
const obj1: C = {
  name: '222',
  class: '1111',
}
```

- type 可以直接使用联合类型， interface 在外面不能使用， 只能在内部的属性上使用

```ts
type num = number | string

interface A {
  num: number | string
}
```

- interface 定义同名的， 将会自动合并； 但是 type 不会，当取名相同时，就会报错

```ts
interface A {
  name: string
}
interface A {
  age: number
}
const obj: A = {
  name: '张三',
  age: 13,
}

type num = string | number
type num = boolean // 添加这行， 就会导致报错
```
