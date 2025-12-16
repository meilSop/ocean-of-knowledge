<!--
 * @fileName:
 * @Date: 2023-03-15 17:07:36
 * @Author: manYao.zhu
-->

# 数组类型 （声明方式）

## 直接用 [] 声明数组

- 普通数组

```ts
const arr: number[] = [1, 2, 3, 4, 6, 9]
const arr1: string[] = ['1', '你好']
const arr2: boolean[] = [true, false, true]
const arr3: any[] = [{ name: '张三' }, 3, 'hello']
```

## 用 Array<> 声明数组

- 普通数组

```ts
const arr: Array<number> = [1, 2, 3, 4, 6, 9]
const arr1: Array<string> = ['1', '你好']
const arr2: Array<boolean> = [true, false, true]
const arr3: Array<any> = [{ name: '张三' }, 3, 'hello']
```

## 与 interface（接口）定义对象数组

```ts
interface Student {
  name: string
  age: number
}

const students: Student[] = [
  { name: '张萨满', age: 111 },
  { name: '张萨满', age: 10 },
]
// 等于
const student: Array<Student> = [
  { name: '张萨满', age: 111 },
  { name: '张萨满', age: 10 },
]
```

## 二维数组 或 多维数组

- 当多层的时候， 就使用下面哪种套娃的方式一层一层向下套

```ts
const arr: number[][] = [
  [1, 2],
  [3, 5, 6],
]
// 等于
const arr: Array<Array<number>> = [
  [1, 2],
  [3, 5, 6],
]
```

## 混合类型数组 （使用 any 或 使用 元组）

- 使用 any

```ts
const arr: any[] = [{ name: '1111' }, 1, '3', true]
```

- 使用元组

```ts
const arr: [object, number, string, boolean] = [{ name: '1111' }, 1, '3', true]
```

## 函数剩余参数的定义

```ts
function show(...arg: string[]): void {
  console.log(arg)

  const a: IArguments = arguments // 对arguments类型的定义
  console.log(a)
}

show('1', '2')
```

## 元组类型 （它是数组类型声明的一种方式）

- 定义一个数组内每一项的类型
- 数组不能被修改 (数组都是通用的， 用 readonly 修饰符)
- 可以定义一项是否可以要

```ts
// 定义每一项
// 这个数组在初始化时，不能被添加第三项， 但是任然可以用push 添加
const arr: [string, number] = ['122', 45]
arr.push(33) // 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型

// 可以用readonly, 使数组无法修改 (只能初始化赋值)
const _arr: readonly [string, number] = ['222', 88]

// 可以用变量声明数组
const array: [x: number, y: string] = [12122, '2222']

// type 与 元组之间的用处
type a = typeof array['length']
const num: a = 2

type b = typeof arr[0]
const num1: b = '111'

type c = typeof _arr[1]
const num2: c = 3333
```
