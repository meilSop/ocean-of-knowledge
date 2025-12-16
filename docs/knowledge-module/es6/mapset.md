<!--
 * @fileName:
 * @Date: 2023-07-03 17:07:24
 * @Author: manYao.zhu
-->

# Map 和 Set 数据结构

## Set 与 Map 都可以使用数组初始化数据

```ts
// Set
const set = new Set([1, 2, 3, 4, 2, 5, 1])
console.log(set) // Set(4) {1, 2, 3, 4, 5}  // set成员的值都是唯一的，
const arr = [...new Set([1, 2, 3, 4, 2, 5, 1])] // [1,2,3,4,5]  // 故可以用于数组（数字）的去重
// 故这个功能可以用于字符串的去重
const str = [...new Set('abbcddde')].join('') // abcde

// Map
const _arr = [
  ['name', 'zhangsan'],
  ['sex', 'boy'],
]
const map = new Map(_arr)
console.log(map) // Map(2) {'name' => 'zhangsan', 'sex' => 'boy'}
```

## Set 实例的属性方法

- 属性

```ts
Set.prototype.contructor // 构造函数， 就是Set自身
Set.prototype.size // Set实例的成员数量
```

- 方法

```ts
Set.prototype.add(value) // 添加值
Set.prototype.delete(value) // 删除某个值
Set.prototype.has(value) // 判断是否存在某个值
Set.prototype.clear() // 清楚所有成员
```

- 案例

```ts
const set = new Set()
console.log(set) // Set(0) {size: 0}
const obj = {}
set.add(obj)
console.log(set) // Set(1) {{}}
set.add(obj)
console.log(set) // Set(2) {{}}
set.add(2)
console.log(set) // Set(2) {{},2}
set.add(2)
console.log(set) // Set(2) {{},2}  // set的成员是唯一的
console.log(set.size)
set.delete(obj)
console.log(set)
console.log(set.has(2)) // true
set.clear()
console.log(set) // Set(0) {size: 0}
```
