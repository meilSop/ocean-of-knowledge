# 变量的解构赋值

## 数组的解构赋值

- 数组解构赋值的案例

```ts
  const [x] = [1]  //  x: 1
  const [x] = [1, 2]  // x: 1
  const [x] = []  // x: undefined
  const [x, [y], z] = [1, [2,3], 4] // x: 1，y: 2, z: 4
  const [x, ...y] = [1,2,3,4] = // x: 1, y: [2,3,4]
```

## 对象的解构赋值

- 变量名与属性名一致

```ts
const { foo, bar } = { foo: '123', bar: '233' } // 左侧的foo是变量名， 右侧的foo是属性名
console.log(foo) // 123
console.log(bar) // 233
```

- 变量名与属性名不一致

```ts
const {foo：abz, bar: abc} = { foo: '123', bar: '233' }  // 这里面的foo是匹配模式； abz才是变量
console.log(abz)  // 123
console.log(abc)  // 233
```

- 嵌套解构赋值

```ts
const obj = {
  p: {
    start: 'since',
    end: [
      'hello',
      middle: '你好'
    ]
  },
}

const {p: {start, end: [x, middle: y]}} = obj
console.log(start) // since
console.log(x) // hello
console.log(y) // 你好
```

- 默认值

```ts
const { x, y = 5 } = { x: 12 }
console.log(x) // 12
console.log(y) // 5

const { x: y = 3 } = {} // 这里的左侧的x知识配置模式，y才是变量
conosle.log(y) // 3

const { x: y = 3 } = { x: 5 } // 这里的左侧的x知识配置模式，y才是变量
console.log(y) // 5
```

## 字符串的解构赋值

- 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```ts
const [a, b, c, d, e] = 'hello'
console.log(a) // h
console.log(b) // e
console.log(c) // l
console.log(d) // l
console.log(e) // o
```

- 类似数组的对象都有一个 length 属性，因此还可以对这个属性解构赋值。

```ts
const { length } = 'hello'
```

## 数字与布尔值的解构赋值

- 数字的解构赋值

```ts
const { toString: s } = 222
console.log(s === Number.prototype.toString) // true
```

- 布尔值的解构赋值

```ts
const { toString: s } = true
console.log(s === Boolean.prototype.toString) // true
```

## 函数参数的解构赋值

- 函数参数的数组方式解构赋值

```ts
function add([x, y]) {
  return x + y
}
console.log(add([1, 3])) // 4
```

- 函数参数的对象像是解构赋值

```ts
function add({ x = 1, y = 3 }) {
  return x + y
}
console.log(add({})) // 4
console.log(add({ x: 3 })) // 6  这里y值没有传递，故取默认值
console.log(add({ x: 2, y: 4 })) // 6

// 第二种解构 （两种解构方式结果不一样）
function add({ x, y } = { x: 1, y: 2 }) {
  return x + y
}
console.log(add()) // 3
console.log(add({ x: 3 })) // NaN, 这里由于y没有传递值， x传递了值， 故不能去默认值， y取得undefined, 故结果为NaN
console.log(add({ x: 2, y: 4 })) // 6
```
