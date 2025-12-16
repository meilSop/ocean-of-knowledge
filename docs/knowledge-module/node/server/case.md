<!--
 * @fileName:
 * @Date: 2023-08-08 10:23:05
 * @Author: manYao.zhu
-->

# express 开发服务的案例

## 服务的目录结构

```js
server  ├── files  ├── user.json  // 用户数据表
        |
        ├── mysql  ├── index.cjs  // mysql 数据库的基础操作
        |
        ├── user   ├── custom_middle.cjs  // 客户接口的中间件
        |          ├── user_info_middle.cjs  // 用户数据接口的中间件
        |          ├── index.cjs  // 用户模块接口的中间件
        |
        ├── utils  ├── files_operation.cjs  // 文件操作的中间件
        |          ├── index.cjs  // 工具类的抛出口
        |
        ├── index.cjs  // 接口服务的启动入口
```

## 服务的代码案例

- server/index.cjs 服务入口

<code-exchange></code-exchange>

```js
const express = require('express')
const multiparty = require('connect-multiparty')
const cors = require('cors')
const MysqlService = require('./mysql/index.cjs')
const app = express()
const mysqlSrv = new MysqlService()

// 返回数据格式到的封装
const Response = (isSuccess, code, message, data) => {
  return {
    success: isSuccess,
    status: code,
    message,
    data,
  }
}
app.use(cors()) // 处理跨域问题

// 这里若不处理一下三种合适的，当用post方法中的参数（req.body）将获取不到
app.use(express.urlencoded({ extended: true })) // 处理 x-www-form-urlencoded
app.use(express.json()) // 处理 application/json
app.use(multiparty()) // 处理 mutipart/form-data

app.use('*', (req, res, next) => {
  // 允许任何请求地址访问
  res.setHeader('Access-Control-Allow-Origin', '*')
  //允许任何请求携带自定义数据访问
  res.setHeader('Access-Control-Allow-Headers', '*')
  // 允许请求的方法
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // 返回数据的格式
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 用户信息模块请求接口的中间件
app.use(require('./user/index.cjs')(Response, mysqlSrv))

app.listen(8989, () => {
  console.log('localhost:8989')
})
```

- server/user/index.cjs 用户模块接口的中间件

<code-exchange></code-exchange>

```js
// 这个中间件的作用是将一个模块下的多个功能点的接口进行整合
const express = require('express')
const router = express.Router()

module.exports = (response, mysql) => {
  router.use('/info', require('./user_info_middle.cjs')(response, mysql))
  router.use('/info', require('./custom_middle.cjs')(response, mysql))
  return router
}

// 这里整合的接口， 会在客户与用户接口的基础上拼接上 '/info'
```

- server/user/custom_middle.cjs 客户接口的中间件

<code-exchange></code-exchange>

```js
const express = require('express')
const router = express.Router()
const fileOpr = require('../utils/index.cjs')
const bufferJson = require('buffer-json')

module.exports = (response, mysql) => {
  // 获取客户信息
  router.post('/custom/get_info', (req, res) => {
    fileOpr.readFilePromise('../files/user.json').then((data) => {
      data = bufferJson.parse(data)

      if (Array.isArray(data)) {
        if (!req.body || !req.body.name) {
          return res.send(response(false, 500, '姓名不能为空', ''))
        }
        if (req.body && !req.body.name) {
          return res.send(response(false, 500, '密码不能为空', ''))
        }
        const query = req.body

        if (
          !data.some(
            (it) => it.name === query.name && it.password === query.password
          )
        ) {
          return res.send(response(false, 500, '输入的账号或密码不正确', ''))
        }

        res.send(response(true, 200, '登录成功', ''))
      }
    })
  })

  router.post('/custom/set_user_info', (req, res) => {
    // 读取数据
    // 同步
    // const data = fileOpr.readFileSync('../files/user.json')
    // res.send(response(true, 200, '请求接口成功',  bufferJson.parse(data)))

    // 异步
    // const callback = (err, data) => {
    //   res.send(response(true, 200, '请求接口成功',  bufferJson.parse(data)))
    // }
    // fileOpr.readFile('../files/user.json', callback)

    // promise
    // fileOpr.readFilePromise('../files/user.json').then(data => {
    //   res.send(response(true, 200, '请求接口成功',  bufferJson.parse(data)))
    // }).catch(err => {
    //   console.log('读取错误');
    // })

    // 写入数据 添加账号
    fileOpr.readFilePromise('../files/user.json').then((data) => {
      data = bufferJson.parse(data)

      if (!Array.isArray(data)) {
        data = []
      }

      if (!req.body || !req.body.name) {
        return res.send(response(false, 500, '姓名不能为空', ''))
      }
      if (req.body && !req.body.name) {
        return res.send(response(false, 500, '密码不能为空', ''))
      }
      const query = req.body
      if (data.some((it) => it.name === query.name)) {
        return res.send(response(false, 500, '添加的账号名称不能重复', ''))
      }

      data.push(query)
      const str = bufferJson.stringify(data)
      // 同步写入
      fileOpr.writeFileSync('../files/user.json', str)
      res.send(response(true, 200, '添加成功', ''))
    })
  })
  return router
}
```

- server/user/user_info_middle.cjs 用户信息接口的中间件

<code-exchange></code-exchange>

```js
const express = require('express')
const router = express.Router()

module.exports = (response, mysql) => {
  router.get('/user/set_user_info', (req, res) => {
    res.send(response(true, 200, '获取成功', { message: 'get方法的请求方式' }))
  })

  router.post('/user/set_user_info', (req, res) => {
    res.send(response(true, 200, '获取成功', { message: 'post方法的请求方式' }))
  })

  router.post('/user/:name', (req, res) => {
    res.send(response(true, 200, '获取成功', { message: '动态参数的请求方式' }))
  })

  return router
}
```

- mysql/index.cjs mysql 数据库的基础操作

<code-exchange></code-exchange>

```js
const mysql = require('mysql')

// 连接数据库的配置信息
const default_db_config = {
  host: 'localhost', // 本地的localhost
  port: '3300', // 端口号
  user: 'root', // 账户名
  password: '123456', // 密码
  database: 'test', // 数据库的名称
}

class MysqlService {
  db_config // 配置信息
  pool_instance // 连接池实例
  ct_instance // 连接实例
  constructor(config) {
    this.db_config = { ...default_db_config, ...config }
    this.createMysql()
  }

  // 创建数据库连接池
  createMysql() {
    this.pool_instance = mysql.createPool(this.db_config)
  }

  // 创建连接
  createConnection(sql) {
    this.pool_instance.getConnection((err, connection) => {
      if (err) {
        console.log(`创建连接失败：${err}`)
      } else {
        console.log('创建连接成功！')
        this.ct_instance = connection
        return this.query(sql)
      }
    })
  }

  // 回收连接到连接池
  recoveryConnection() {
    this.ct_instance.release()
  }

  // 移除连接
  removeConnection() {
    this.ct_instance.destroy()
  }

  // mysql 操作事件
  query(sql) {
    return Promise((resolve, reject) => {
      this.ct_instance.query(sql, (err, res) => {
        if (err) {
          reject(err)
          // 回收连接
          this.recoveryConnection()
        } else {
          resolve(res)
          console.log('再走')
          // 回收连接
          this.recoveryConnection()
        }
      })
    })
  }

  // 销毁连接池
  deleteMysql() {
    this.pool_instance.end()
  }
}

module.exports = MysqlService
```

- utils/index.cjs 工具类的抛出文件

<code-exchange></code-exchange>

```js
module.exports = require('./file_operation.cjs')
```

- utils/file_operation.cjs 工具类中的文件操作

<code-exchange></code-exchange>

```js
/*
 * @fileName: 文件操作的工具类
 * @Date: 2023-08-07 14:28:31
 * @Author: manYao.zhu
 */
const fs = require('node:fs')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 读取文件数据信息 [同步读取]
  readFileSync(path) {
    return fs.readFileSync(resolve(path))
  },

  // 异步读取文件 （需要用回调函数）
  readFile(path, cb) {
    fs.readFile(resolve(path), cb)
  },

  // promise 的读取文件
  readFilePromise(path) {
    return fs.promises.readFile(resolve(path))
  },

  // 写入的同步
  writeFileSync(path, data) {
    fs.writeFileSync(resolve(path), data)
  },

  // 异步的写入
  writeFile(path, data, cb) {
    fs.writeFile(resolve(path), data, cb)
  },

  // promise 的写入
  writeFilePromise(path) {
    return fs.promises.writeFile(resolve(path))
  },
}
```

- files/user.json 使用 fs 操作文件的方式来处理接口数据的 用户数据库

<code-exchange></code-exchange>

```js
;[]
```

<style scoped>
  .vp-doc .exchange-code + div[class*='language-'] {
    margin: 0;
    height: 0;
  }
</style>
