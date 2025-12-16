<!--
 * @Date: 2023-08-24 09:29:47
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-12-05 10:53:29
 * @FilePath: \ocean-of-knowledge\docs\core\service\indexed_db.md
-->

# indexedDB 储存服务

## 服务提供的方法

- 原型 IndexedDBService

```js
/**
 * @param {*} databasename 数据库名称
 * @param {*} storename 数据库对象仓库名称
 * @param {*} key 数据库对象仓库的主键 （表的主键）
 * @param {*} idxs 创建对象仓库（表）的索引配置信息； 其中包含[{name, prop, conf: {unique: false}}]  name: 索引名称， prop: 索引储存的属性
 */
class IndexedDBService {
  constructor(databasename: string, storename: string, key: string, idxs: any[] = []) {}
}
```

- create()

```js
/**
 * @description 打开（创建）indexedDB的数据库
 * @param succ 打开成功的回调
 * @param fail 创建失败的回调
 */
create(succ = () => {}, fail = () => {}): void
```

- add()

```js
/**
 * @description 添加数据
 * @param data 需要添加的数据 data: object/array
 * @param cb // 添加数据为空时的回调处理
 */
add(data: any, cb = () => {}): void
```

- update()

```js
 /**
 * @description 更新数据
 * @param data 需要更新的数据 data: object/array
 * @param cb 更新数据为空时的回调处理
 */
update(data: any, cb = () => {}): void
```

- read()

```js
 /**
 * @description 读取数据
 * @param keys  需要读取数据的key: Array/String
 * @param progressFn 读取数据进度回调函数 回调参数: 读取数据的key, 读取的数据
 * @param complateFn 读取数据完毕回调函数 回调参数：读取的数据
 */
read(keys: any, progressFn?: any, complateFn?: any): void
```

- readByIndex()

```js
// 通过索引对取数据 name: 索引的名字， list: 索引列表
/**
 * @description 通过索引对取数据
 * @param name 索引的名字
 * @param list 根据索引需要检索的值
 * @param progressFn 检索过程中的回调函数  回调参数同上
 * @param complateFn 检索结束的回调函数  回调参数同上
 */
readByIndex(name: string, list: any, progressFn?: any, complateFn?: any): void
```

- readAll()

```js
/**
 * @description 读取仓库中所有的数据
 * @param complateFn 读取所有数据成功之后回调函数  回调参数同上
 */
readAll(complateFn: any): void
```

- remove()

```js
/**
 * @description 根据给定的keys删除仓库中的数据
 * @param keys 需要删除的keys  string[]/String
 * @param cb  清除数据时的回调函数
 */
remove(keys: any, cb = () => {}): void
```

- clear()

```js
/**
 * @description 清空仓库表的数据
 * @param fn 清空成功之后的回调
 */
clear(fn = () => {}): void
```

- deleteStore()

```js
 /**
 * @description 删除 仓库表
 * @param fn 删除成功之后的回调函数
 */
deleteStore(fn = () => {}): void
```

- close()

```js
/**
 * @description 数据库的关闭
 */
close(): void
```

- deleteDatabase()

```js
/**
 * @description 删除 indexedDB 的数据库
 * @param succ 删除成功的回调函数
 * @param fail 删除失败的回调函数
 */
deleteDatabase(succ = () => {}, fail = () => {}): void
```

## 服务的使用案例

```js
import { IndexedDBService } from '@sop/lib'

const indexedInstace = new IndexedDBService('isungrow', 'isg', 'id', [{name: 'idx', prop: 'title', conf: {unique: false}}])
indexedInstace.create(() => {
  indexedInstace.add([{id: '122', title: '张三', age: 12}, {id: '123', title: '李四', age: 15}])
  indexedInstace.update([{id: '122', title: '张三111', age: 14}, {id: '124', title: '王五', age: 17}])
  indexedInstace.read('122', (data) => {console.log(data)})
  ...
})
```
