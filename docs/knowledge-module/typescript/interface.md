<!--
 * @fileName: 安装依赖
 * @Date: 2023-03-13 13:47:30
 * @Author: manYao.zhu
-->

# 接口

## 关键字 interface

- 通过关键字 interface 定义属性类型
- 声明的接口首字母需要大写

```ts
interface Props {
  name: string
}
```

## 同名重合

- 当定义了像个一项的接口， 这个时候就会将两个接口进行重合

```ts
interface Props {
  name: string
}
interface Props {
  age: number
}
// 以上两个接口类型会重合到一块， 如下
interface Props {
  name: string
  age: number
}
```

## 额外的属性检查 （索引签名）【任意属性添加】

- 通过索引签名添加任意属性

```ts
interface Person {
  name: string
  age: number
  [propName: string]: any // 索引签名
}
```

## 可选属性

- 通过在属性后面添加 ? 号来定义可选属性

```ts
interface Person {
  name: string
  age: number
  class?: string // 可选属性
}
```

## 只读属性

- 通过 readonly 来指定只读属性
- 常用于 接口返回的 id 或者 函数

```ts
interface Student {
  readonly name: string
  age: number
  readonly open: () => number
}
```

## 接口继承

- 通过关键字 extends 实现集成， 和类一样

```ts
interface Person {
  name: string
  age: number
}

interface Student extends Person {
  class: string
}
```

## 函数类型定义

```ts
interface ShowFn {
  (name: string, age: number): string
}

const showInfo: ShowFn = function (name, age) {
  return name + ':' + age
}
```

## 类类型定义

```ts
interface Service {
  name: string
  getName: () => string
  setName: (name: string) => void
}

class PersonService implements Service {
  name: string
  constructor() {
    this.name = ''
  }

  getName() {
    return this.name
  }
  setName(name: string) {
    this.name = name
  }
}
```
