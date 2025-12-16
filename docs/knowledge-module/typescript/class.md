<!--
 * @fileName:
 * @Date: 2023-03-16 09:19:53
 * @Author: manYao.zhu
-->

# 类 （class）

## 基本用法 (通过关键字 class)

```ts
// 基本用法
class VueService {
  constructor() {} // 构造器
}
```

## 类的约束（通过关键字 implements）

```ts
// 接口定义属性类型
interface VueProps {
  name: string
  init: () => void
}

// 约束类
class VueService implements VueProps {
  name: string
  constructor(name: string) {
    this.name = name
  }
  init() {
    console.log(this.name)
  }
}

const service = new VueService('校长')
service.init()
```

## 类的继承 （通过关键字 extends）

```ts
// 接口定义属性类型  (简单版的虚拟dom)
interface VNode {
  tag: string
  text?: string
  children?: VNode[]
}
interface Dom {
  createElement: (el: string) => HTMLElement
  setText: (el: HTMLElement, text: string) => void
  render: (data: VNode) => HTMLElement
}
class DomService implements Dom {
  constructor() {}
  createElement(el: string) {
    return document.createElement(el)
  }
  setText(el: HTMLElement, text: string) {
    el.textContent = text
  }
  render(data: VNode) {
    const root = this.createElement(data.tag)
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item: any) => {
        const child = this.render(item)
        root.appendChild(child)
      })
    }
    if (data.text) {
      this.setText(root, data.text)
    }
    return root
  }
}

interface Options {
  el: HTMLElement | string
}
interface VueProp {
  option: Options
  init: () => void
}
class Vue extends DomService implements VueProp {
  option: Options
  constructor(option: Options) {
    super()
    this.option = option
    this.init()
  }
  init() {
    const data: VNode = {
      tag: 'div',
      children: [
        {
          tag: 'p',
          text: '我是子节点P',
        },
        {
          tag: 'span',
          text: '我是子节点span',
        },
      ],
    }
    const app = document.querySelector(`#${this.option.el}`)
    const child = this.render(data)
    app?.appendChild(child)
  }
}
new Vue({
  el: 'app',
})
```

## 类的修饰符 （readonly | private | ）

- readonly 表示只读， 不能修改 (只能在构建的是否赋值一次)
- private 添加这个修饰符， 只能在自己内部使用 （自身外部都无法使用） [约束的类型里也不能出现]
- protected 只能给子类 和 自身内部使用 （外部无法使用）
- public 默认就是 public （可以给自身， 子类 以及外部使用）

## super 原理 （父类的 prototype.constructor.call 指向的是父类的原型）

- 案例一

```ts
class Parent {
  constructor() {}
  render() {
    console.log(11111)
  }
}
class Child extends Parent {
  constructor() {
    super() // 父类的prototype.constructor.call  指向的是父类的原型
    this.render()
  }
}
```

-案例二

```ts
class Parent {
  name: string
  constructor(name: string) {
    this.name = name
  }
  render() {
    console.log(11111)
    console.log(this.name)
  }
}
class Child extends Parent {
  constructor(name: string) {
    super(name) // 父类的prototype.constructor.call  指向的是父类的原型
    this.render()
    // super.render()
  }
}
new Child('小可爱')
```

## 静态方法 (通过关键字 static)

- 静态方法中的 this 只能指向静态方法或静态变量
- 静态方法只能用类的原型调用

```ts
class Parent {
  name: string
  static age: number = 1233
  constructor(name: string) {
    this.name = name
  }
  render() {
    console.log(11111)
    console.log(this.name)
  }
  // 静态方法
  static version() {
    console.log('0.0.1')
    console.log(this.age)
  }
  // 静态方法
  static show() {
    this.version()
  }
}
const parents = new Parent('校长')
parents.render()

Parent.show() // 静态方法的调用
```

## get 与 set 方法

- 这两个方法 与 Object.defineProperty() 方法中的 set 与 get 很像
- 可以认为是个拦截器

```ts
interface Person {
  name: string
  age: number
  [propName: string]: any
}

class Student implements Person {
  name: string
  age: number
  class: string
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.class = '一年级'
  }

  get info() {
    return `${this.name}_${this.age}岁_${this.class}`
  }
  set info(newValue) {
    this.class = newValue
  }
}

const students = new Student('战三', 16)
console.log(students.info) // 战三_16岁_一年级
students.info = '高三'
console.log(students.info) // 战三_16岁_高三
```

## 抽象类 (通过 abstract 关键字)

- abstract 所定义的类是抽象类， 不能实例化
- abstract 所定义的方法， 都只是进行一个描述， 无法进行实现
- 可以用 派生类 来继承 抽象类
- 派生类中要实现抽象类中用 abstract 定义的方法
- 派生类可以被实例化

```ts
// 抽象类
abstract class Vue {
  name: unknown
  constructor(name?: string) {
    this.name = name
  }
  showName(): unknown {
    // 这里没有用abstract， 可以正常编译
    return this.name
  }
  abstract init(name: string): void // 这是用到abstract, 他只能进行描述， 无法实现像showName 的代码操作
}

new Vue() // 这里会报错， 不能实例化abstract定义的抽象类
```

```ts
// 抽象类
abstract class Vue {
  name: unknown
  constructor(name?: string) {
    this.name = name
  }
  showName(): unknown {
    // 这里没有用abstract， 可以正常编译
    return this.name
  }
  abstract init(name: string): void // 这是用到abstract, 他只能进行描述， 无法实现像showName 的代码操作
}
// 派生类
class Angular extends Vue {
  constructor() {
    super()
  }
  init(name: string) {
    // 在派生类中要实现抽象类中用abstract定义的方法
    this.name = name
  }
}
const angular = new Angular() // 派生类可以实例化
angular.init('小花')
console.log(angular.showName()) // 小花
```
