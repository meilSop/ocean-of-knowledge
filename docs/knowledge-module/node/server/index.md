# node 使用express 编译服务端的前提 (安装依赖)

- node 开发服务端主是依赖 express 实现。 在搭建服务的时候， 需要暗转依赖依赖

- [node 的内置模块](https://www.kancloud.cn/cyyspring/nodejs/3145985)

## 1. express

- express 是 node 服务器的进度主架构

```js
npm install express --save-dev
```

## 2. cors

- cors 这个插件主要是解决跨域问题

```js
npm install cors --save-dev
```

## 3. connect-multiparty

- connect-multiparty 主要是用来解决 post 方法传递的 mutipart/form-data 格式数据的问题

```js
npm install connect-multiparty --save-dev
```

## 4. body-parser

- body-parser 主要使用拉解决 post 方法传递的 x-www-form-urlencoded 与 application/json 格式数据的问题
- 当然， express 也以及基于这个插件进行了二次封装的内置方法 （也可以直接使用 express 的方法）

```js
npm install body-parser --save-dev
```

- 该插件的使用方式

```js
const bodyParser = require('body-parser')
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 application/json
app.use(bodyParser.json())
```

## 5. buffer-json

- buffer-json 这个插件主要是用来解决 fs 操作文件中关于文件格式的处理 [buffer-json 的地址](https://www.npmjs.com/package/buffer-json)

```
npm install buffer-json --save-dev
```

## 6. mysql

- mysql 主要使用来创建数据库的

```js
npm install body-parser --save-dev
```

- mysql 主要用的语法有以下：

```js
// 引入
const mysql = require('mysql')

// 创建连接池
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'node',
})
```
