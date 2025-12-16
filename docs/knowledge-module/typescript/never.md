<!--
 * @fileName:
 * @Date: 2023-03-16 15:08:33
 * @Author: manYao.zhu
-->

# never

## never 类型表示的是那些永不存在的值的类型

```ts
type num = string & number // 这里的num就是never, 英文不存在一个即是字符串又是数字的值
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}

// 返回never的函数必须存在无法达到的终点 （死循环）
function infiniteLoop(): never {
  while (true) {}
}
```

## 在联合类型中， never 将会被忽略

```ts
type a = number | void | never // 这里的never由于在最底层， 这里会被忽略

let num: number | string | never = '2'
```

## never 的使用场景 1， 联合 switch 实现兜底逻辑

```ts
type Type = 'add' | 'edit' | 'view' // 当我们在这里在添加别的字符串， 底部就会报错（用于提醒）
function showInfo(type: Type) {
  let t: string = ''
  switch (type) {
    case 'add':
    case 'edit':
    case 'view':
      t = type
      break
    default:
      // 兜底逻辑
      let err: never = type
      break
  }
  return t
}
```
