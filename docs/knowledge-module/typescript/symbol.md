<!--
 * @fileName:
 * @Date: 2023-03-16 15:35:39
 * @Author: manYao.zhu
-->

# Symbol 类型

## 对 symbol 的认识

- 至 ES6 起，symbol 就成为了一种新的原生类型， 和 number、string、boolean 等一样
- Symbol 的创建是直接使用 Symbol()
- Symbol 的值是唯一的， 因为他们的内存地址是唯一
- Symbol 可以通过 for()方法。 使两个 Symbol 的返回为 true

```ts
// 创建数据
const a: symbol = Symbol() // 他接受的参数是 string|number|undefined
// 唯一性 因为他们的内存地址是唯一
const b: symbol = Symbol(1) // 'symbol(1)'
const b1: symbol = Symbol(1) // 'symbol(1)'
console.log(Symbol(1) === Symbol(1)) // false
console.log(b === b1) // false

// 使用for()方法使 两个symbol返回的为true for方法只能接受 string 类型
// 原理：for 将到全局的 Symbol 里面找有没有注册过这个 key, 若有直接拿过来用， 若没有则会注册
const c = Symbol.for('2') // Symbol(2)
const c = Symbol.for('2') // Symbol(2)
console.log(Symbol.for('2') === Symbol.for('2')) // true
```

## symbol 在对象中的使用

- 可以作为对象属性的键
- 目的是去重， 可以保证不会出现被覆盖的前向

```ts
const a: symbol = Symbol(1)
const b: symbol = Symbol(1)
const obj = {
  name: '张三',
  [a]: '里斯',
  [b]: '王',
}
console.log(obj) // {name: '张三', Symbol(1): '里斯', Symbol(1): '王'}
// for in 无法获取 symbol 的key
for (let key in obj) {
  console.log(key) // 只能打印出name
}
// Object.keys() 也都不到symbol 的key
console.log(Object.keys(obj)) // ['name']
// Object.getOwnPropertyNames() 方法也读不到symbol 的key
console.log(Object.getOwnPropertyNames(obj)) // ['name']
// Object.getOwnPropertySymbols()  只能读到symbol, 一般属性读不到
console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(1), Symbol(1)]
// 反射中的 Reflect.ownKeys() 方法 可以读到所有属性
console.log(Reflect.ownKeys(obj)) // ['name', Symbol(1), Symbol(1)]
```

## 生成器 (Generator)

- 生成器中的 yield 关键字是暂停执行

```ts
function* create() {
  yield Promise.resolve('张三')
  yield '怎么用'
  yield '这样用'
}
const result = create()
// 因为生成器中只写了三个执行暂停 （也就是只有三个执行任务）
console.log(result.next()) // {value: Promise, done: false}
console.log(result.next()) // {value: '怎么用', done: false}
console.log(result.next()) // {value: '这样用', done: false}
console.log(result.next()) // {value: undefined, done: true}

// 由于上面已经执行next()方法， 故这里的定时器就不会有输出
let timer = setInterval(() => {
  const data = result.next()
  if (data.value || !data.done) {
    console.log(data)
  } else {
    clearInterval(timer)
  }
}, 1000)
```

## 迭代器 (Iterator) (Symbol.iterator 它是一个方法)

- map、set、weekMap、weekSet、Array、document.querySelectorAll('div')、函数的 arguments、 String、TypedArray 等都有自己的迭代器 Symbol.iterator
- 对象是没有迭代器的, 不能使用迭代器的语法糖
- 迭代器的语法糖是： for ... of 。 获取这些伪数组/数组的值

```ts
// 迭代器的使用说明
const each = (
  value:
    | Set<any>
    | Map<any, any>
    | number[]
    | NodeListOf<HTMLDivElement>
    | IArguments
) => {
  const it: IterableIterator<any> = value[Symbol.iterator]()
  let next: IteratorResult<any, any> = { value: undefined, done: false }
  const _arr: any = []
  while (!next.done) {
    next = it.next()
    if (!next.done) {
      _arr.push(next.value)
    }
  }
  return _arr
}

const set: Set<any> = new Set([1, 2, 3, 44, 4, 4, 4])
console.log(set) // Set(5) {1, 2, 3, 44, 4}
console.log(each(set)) // [1, 2, 3, 44, 4]

const map: Map<any, any> = new Map([
  ['a', '2222'],
  ['b', '1111'],
])
console.log(map) // Map(2) {'a' => '2222', 'b' => '1111'}
console.log(each(map)) // [['a', '2222'],['b', '1111']]

const arr: number[] = [1, 2, 3, 4]
console.log(arr) // [1, 2, 3, 4]
console.log(each(arr)) // [1, 2, 3, 4]

const dom: NodeListOf<HTMLDivElement> = document.querySelectorAll('div')
console.log(dom) // NodeList(2) [div#app, div.a]
console.log(each(dom)) // [div#app, div.a]

function show(name?: string, ...arg: any[]): void {
  const args: IArguments = arguments
  console.log(args) // Arguments ['效果', callee: (...), Symbol(Symbol.iterator): ƒ]
  console.log(each(args)) // ['效果']
}
show('效果')
```

```ts
// 迭代器的语法糖
const set: Set<any> = new Set([1, 23, '33'])

// 可以获取这些伪数组/数组的值
for (let a of set) {
  console.log(a)
}
```

## 数组解构 + 数组的 ... 的底层原理

- 解构的底层原理： 调用了 iterator 迭代器

```ts
// 解构
const [a, b, c] = [1, 2, 3]
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3

// ...
const set: Set<any> = new Set([1, 2, 3, '333'])
const arr = [...set]
console.log(arr) // [1,2,3,'333']
```

```ts
// 自己简单实现了迭代器底层 （这里对这个对象实现）
const obj = {
  max: 10,
  current: 1,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.current === this.max) {
          return { value: undefined, done: true }
        } else {
          return { value: this.current++, done: false }
        }
      },
    }
  },
}
console.log(obj) // {max: 10, current: 1, Symbol(Symbol.iterator): ƒ}

for (let value of obj) {
  // 迭代器的语法糖
  console.log(value) // 分别是： 1，2，3，4，5，6，7，8，9
}
// ...
console.log([...obj]) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const [a, b, c] = obj // 解构
console.log(a, b, c) // 1,2,3
```
