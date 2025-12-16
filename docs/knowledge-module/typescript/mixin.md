<!--
 * @fileName:
 * @Date: 2023-03-15 18:04:35
 * @Author: manYao.zhu
-->

# 联合类型|类型断言|交叉类型

## 联合类型 （| 连接）

```ts
let info: number | string | boolean = '2222'

function returnStatus(type: number | boolean): boolean {
  return !!type // 这里采用强转
}
```

## 交叉类型 （& 连接）

```ts
interface Person {
  name: string
  age: number
}
interface Student {
  class: string
}

const getStudentInfo = (info: Person & Student): Person & Student => {
  return info
}
const info = getStudentInfo({
  name: '张三',
  age: 20,
  class: '高三',
})
console.log(info)
```

## 类型断言 （使用 as 进行断言 或者用<>）

- 通过以下例子可以看出， 类型断言可以欺骗 ts 校验

```ts
const showLen = (num: number | string): void => {
  console.log((num as string).length)
}
// 等于
const showLen = (num: number | string): void => {
  console.log((<string>num).length)
}

showLen('1234') // 4
showLen(1234)(
  // undefined

  // 经常会用到的是window
  window as any
).adc = '123' // 通过断言就不会报错
```
