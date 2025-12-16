<!--
 * @fileName:
 * @Date: 2023-03-15 17:30:20
 * @Author: manYao.zhu
-->

# 函数类型

## 定义函数的参数与返回值类型

```ts
// 有返回值
function showInfo(name: string, age: number): string {
  return `${name}: ${age}`
}

// 没有返回值
function showLog(name: string): void {
  console.log(name)
}
```

## 箭头函数的定义

```ts
const showInfo = (name: string): string => {
  return name
}

const showLog = (name: string): void => {
  console.log(name)
}
```

## 函数的默认值 与 可选参数

```ts
// 默认值
const showName = (name: string = '张三'): void => {
  console.log(name)
}

// 可选参数
const showLog = (name: string = '张三', age?: number) => {
  console.log(`${name}: ${age}`)
}
```

## 参数是对象如何定义

- 集合 interface 定义

```ts
interface Info {
  name: string
  age?: number
}

const showInfo = (info: Info): string => {
  return `${info.name}: ${info.age}`
}

console.log(showInfo({ name: '张三', age: 19 }))
```

## 函数 this 类型 （在对象中的使用）

- ts 中 可以定义 this 的类型 在 js 中是不能这么使用的了, 必须是方法的第一个参数

```ts
interface Info {
  name: string
  show: (this: Info) => void
}

const info: Info = {
  name: '张三',
  show(this: Info) {
    console.log(this.name)
  },
}
info.show()
```

## 函数重载 （根据参数的不同实现不同的功能）

```ts
let info: number[] = [1, 2, 3, 4, 5]

function sumInfo(add: number[]): number[] // 若参数是一个number类型的数组， 将做添加操作
function sumInfo(id: number): number[] // 若参数是一个number参数， 将返回查找到的数字
function sumInfo(): number[] // 若是没有传递参数，将返回所有数据

function sumInfo(id?: number[] | number): number[] {
  if (!id) {
    return info
  }
  if (id && Array.isArray(id)) {
    info = [...info, ...id]
    return info
  }
  if (id && typeof id === 'number') {
    return info.filter((it: number) => it === id)
  }
}
```
