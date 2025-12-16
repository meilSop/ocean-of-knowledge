<!--
 * @fileName:
 * @Date: 2023-03-16 11:48:25
 * @Author: manYao.zhu
-->

# 枚举

## ts 枚举支持的类型

- ts 只支持 **数字** 的和基于 **字符串** 的枚举

## 数字枚举

- 自动递增 (从 0 开始)
- 也可以自己定义

```ts
// 自动递增
enum Type {
  add,
  edit,
  delete,
}
console.log(Type.add) // 0
console.log(Type.edit) // 1
console.log(Type.delete) // 2

// 自定定义 数字
enum Type {
  add = 4,
  edit = 7,
  delete = 6,
}
console.log(Type.add) // 4
console.log(Type.edit) // 7
console.log(Type.delete) // 6
```

## 字符串枚举

```ts
enum Type {
  add = 'add',
  edit = 'edit',
  delete = 'delete',
}
console.log(Type.add) // add
console.log(Type.edit) // edit
console.log(Type.delete) // delete
```

## 异构枚举

- 枚举多种不同的类型 （工作中很少用到）

```ts
enum Type {
  yes = 'yes',
  no = 0,
  normal = 'normal',
}
console.log(Type.yes) // yes
console.log(Type.no) // 0
console.log(Type.normal) // normal
```

## 接口枚举

```ts
enum Type {
  yes = '1',
  no = '0',
}
interface Status {
  pass: Type.yes
}
const obj: Status = {
  pass: Type.yes,
}
```

## const 枚举

- const 枚举 与 一般枚举的区别在于编译的不同
- const 枚举， 是直接编译成值
- 一般枚举，是将枚举编译成一个函数， 再去使用

```ts
// const枚举
const enum Types {
  success = '1',
  fail = '0',
}
const str: string = '1'
if (str === Types.success) {
  console.log(Types.success)
}

// 编译之后
;('use strict')
const str = '1'
if (str === '1' /* Types.success */) {
  console.log('1' /* Types.success */)
}
```

```ts
// 一般枚举
enum Types {
  success = '1',
  fail = '0',
}
const str: string = '1'
if (str === Types.success) {
  console.log(Types.success)
}
// 编译之后
;('use strict')
var Types
;(function (Types) {
  Types['success'] = '1'
  Types['fail'] = '0'
})(Types || (Types = {}))
const str = '1'
if (str === Types.success) {
  console.log(Types.success)
}
```

## 运行时的枚举

```ts
enum Type {
  yes = 'res',
  no = 'no',
  default = 'default',
}
const showInfo = (obj: { no: string; yes: string }) => {
  console.log(obj.no + ' != ' + obj.yes)
}
showInfo(Type) // no != yes
```

## 反向映射

- 反向映射只支持数字枚举

```ts
enum Type {
  res = 22,
  no = 33,
}
const num: number = Type.no
console.log(num)

const key = Type[num] // 这里就是反向映射
console.log(key)
```

## 枚举的引用场景

- 作为普通的常量使用 eg: 星期、季节、颜色、城市 等等
- 特殊值 eg: 状态码、错误码等
