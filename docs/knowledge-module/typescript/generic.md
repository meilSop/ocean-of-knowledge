<!--
 * @fileName:
 * @Date: 2023-03-16 18:15:40
 * @Author: manYao.zhu
-->

# 泛型

## 认知

- 我们可以认为泛型就是一个占位符
- 泛型是支持多个的
- 泛型支持默认值

## 方法中使用

- 可以使用泛型的都可以是 any 类型， 但是不建议使用（在方法中） 因为 any 表示任何情况
- 当我们不确定输入的参数类型 以及返回的类型的时候， 就可以使用泛型
- 泛型， 他表示的传入什么类型就返回什么类型

1. 正常一个参数

```ts
// 当我们需要一个接口的参数可以任意类型， 且返回由传入参数组成的数组时
// 如不使用泛型， 我们就需要使用联合类型来定义 或者定义多个方法实现

function show(a: string, b: string): string[] {
  return [a, b]
}
function show(a: number, b: number): number[] {
  return [a, b]
}

// 以上这个情况我们就可以使用泛型定义一个方法即可
function show<T>(a: T, b: T): T[] {
  return [a, b]
}
const data = show<number>(1, 2) // 这里是完整的用法
const data1 = show(1, 2) // 但是在工作我们经常不会去添加类型， ts会制动推论出类型
```

2. 泛型支持多个

```ts
// 当遇到更复杂的情况： 传递的参数的类型不一样， 且参数较多
function show<T, A, B>(a: T, b: A, c: B): (T | A | B)[] {
  return [a, b, c]
}
const data2 = show(1, true, '33') // 作我们经常不会去添加类型， ts会制动推论出类型
```

3. 泛型支持默认值

```ts
// 当遇到更复杂的情况： 传递的参数的类型不一样， 且参数较多
function show<T = string, A = number, B = boolean>(
  a: T,
  b: A,
  c: B
): (T | A | B)[] {
  return [a, b, c]
}
const data2 = show(1, true, '33') // 作我们经常不会去添加类型， ts会制动推论出类型
```

4. 箭头函数中使用泛型

```ts
const show = <T>(a: T): T => {
  return a
}
console.log(show(222))
console.log(show('2222'))
```

4.  接口 + 箭头函数 使用泛型 （对函数参数进行限制）

```ts
interface Fn<T> {
  (a: T): T
}
const show: Fn<T> = (a) => {
  return a
}
console.log(show(222))
```

## 类型别名（type）中使用

```ts
// 基本类型之间的替换
type A<T> = string | number | T
const a: A<boolean> = true
console.log(a) // true

const b: A<null> = null
console.log(b) // null

const c: A<undefined> = 33
console.log(c) // 33

// 与复杂类型混合使用
type Props<T> = { name: string } | T
const obj: Props<number> = { name: '校长' }
console.log(obj) // {name: '校长'}

const obj1: Props<number> = 22
console.log(obj) // 22
```

## 接口 (interface) 中使用

```ts
interface Data<T> {
  name: string
  age: T
}
const data: Data<number> = {
  name: '校长',
  age: 22,
}
console.log(data) // {name: '校长', age: 22}
```

## 泛型约束

- 在泛型后面使用 extends + 一个约束类型
- 之所以要约束， 是因为泛型太灵活， 不约束会导致不需要的报错

- keyof 的作用： 他将会使对象类型的 key 转化成联合类型

```ts
// 这里若不进行约束， 内部的相加就会报错， 因为这里的a和b可以传递任意值，若都是undefined就不行
function add<T>(a: T, b: T) {
  return a + b
}
// 约束方式
function add<T extends number>(a: T, b: T) {
  return a + b
}
```

```ts
// 下面是对对象类型的使用
const obj = {
  name: '张三',
  age: 18,
}
type Key = keyof typeof obj // 这里的 就等于 type Key = 'name' | 'age'

function ob<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
const data = ob(obj, 'name')
console.log(data) // 张三
```

## 泛型使用的案例

```ts
// 封装一个请求接口
const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
      xhr.send(null)
    })
  },
}

interface Data {
  message: string
  status: number
}

axios.get<Data>('./data.json').then((res) => {
  console.log(res)
  console.log(res.message)
})
```

## 泛型的高级用法

- 将我们定义的接口的属性都变成 可选 或 只读

```ts
interface Obj {
  name: string
  age: number
  class: string
}

type Options<T extends object> = {
  [Key in keyof T]?: T[Key]
}

type Props = Options<Obj>
// 等同于
type Props = {
  name?: string
  age?: number
  class?: string
}
```
