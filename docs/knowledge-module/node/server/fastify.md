# Fastify web 框架的教程集

## nodemon 插件 —— 自动监听服务端修改， 然后自动重启服务终端

- 安装依赖 （全局安装， 这样就不需要每个项目都安装了， 所有 node 启动的服务皆可以用）

```js
npm install nodemon -g
```

## fastify 的概念及特性

[fastify 的概念及特性](https://fastify.nodejs.cn/)

## fastify 的简单入门

- 实现简单的页面

```js
const Fastify = require('fastify')
const app = Fastify({ logger: true })
app.get('/', (req, res) => {
  res.send('Hello World')
})
const host = process.argv[3]
const start = async () => {
  try {
    await app.listen({ port: 8282, host: host })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
```

## fastify 路由方法 (这两种都可以)

- fastify.route

```js
fastify.route({
  url: 'xxxx',
  method: 'GET', // 还可以是/POST/PUT/DELETE等
  schema: {},
  handler(request, reply) {}
})
```

- fastify.METHOD()

```js
// 也可以是 post/put/delete
fastify.get('xxxx', {
  schema: {},
  handler(request, reply) {}
})
```

## fastify 路由的响应 (两种方法效果一致)

- 使用 reply.send() 返回接口数据

```js
fastify.get('xxxx', {
  schema: {},
  handler(request, reply) {
    reply.send({ message: '接口响应成功' })
  }
})
```

- 使用异步函数，直接返回数据

```js
fastify.get('xxxx', {
  schema: {},
  async handler(request, reply) {
    return { message: '接口响应成功' }
  }
})
```

- 返回数据的响应头设置

```js
fastify.get('xxxx', {
  schema: {},
  async handler(request, reply) {
    reply.header('Content-Type', 'application/x-www-form-urlencoded')
    reply.header('Access-Control-Allow-Origin', '*')
    reply.header('Access-Control-Expose-Headers', 'Content-Range')
    reply.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
  }
})
```

## fastify schema 提要的设置（变量申明）

- get 路由请求的声明

```js
fastiry.get('xxxx', {
  schema: {
    query: {
      type: 'object',
      properties: {
        prop1: {type: 'string'} // 这里的类型， 可以是 number/boolean/integer/object/array
      }
    }
  }
  handler(request, reply) {}
})
```

- post 路由请求的声明

```js
fastify.post('xxxx', {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      },
      required: ['name']
    }
  }
})
```

- 路由请求中动态参数的声明

```js
fastify.post('xxxx/:id', {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    }
  }
})
```

- 路由请求成功返回数据的声明

```js
fastiry.post('xxxx', {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'number' },
          success: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              total: { type: 'number' },
              list: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  handler() {}
})
```

## fastify 修饰符的开发与使用

- 修饰符的作用

装饰器 API 允许自定义核心 Fastify 对象，例如服务器实例本身以及 HTTP 请求生命周期中使用的任何请求和响应对象。 装饰器 API 可用于将任何类型的属性附加到核心对象，例如 函数、普通对象或原生类型。

该 API 是同步的。 尝试异步定义装饰可能会导致 Fastify 实例在装饰完成初始化之前启动。 为了避免此问题并注册异步装饰，必须结合使用 register API 和 fastify-plugin。

- decorate(name, value, [dependencies]) 封装附加到服务（server）实例的修饰符

```js
// 封装修饰符
fastify.decorate('unility', function (name) {
  return `Hello ${name}`
})

// 服务实例使用
fastify.unility('manyao.zhu')
```

- decorateReply(name, value, [dependencies])

顾名思义，该 API 用于向核心 Reply 对象添加新方法/属性：

```js
fastify.decorateReply('view', function (template, args) {
  // Amazing view rendering engine
})

fastify.get('/', (req, reply) => {
  reply.view('/index.html', { hello: 'world' })
})
```

- decorateRequest(name, value, [dependencies])

此 API 用于向核心 Request 对象添加新方法/属性：

```js
fastify.decorateRequest('utility', function () {
  // something very useful
})

fastify.get('/', (req, reply) => {
  const data = fastify.unility()
})
```

[了解更多修饰符相关知识](https://fastify.nodejs.cn/docs/Reference/Decorators/#decoratereplyname-value-dependencies)

## fastify 插件开发， 以及插件的注册

- 插件的开发

`1. 这里传递的fastify在插件调用的时候，不用传递进来，它将自动绑定进来； 2. options 参数是选项集， 可以传递一些我们插件需要的参数， 但是其内部将自带 prefix: 前缀， done这个参数在插件执行完之后，必须制定done()`

```js
const myPlugin = (fastify, options, done) => {
  // 这里可以做一些自己想做的事情

  // 修饰符的操作
  fastify.decorate('unility', function() {
    return "Hello" + options.name
  })

  // 路由请求的操作
  fastify.get('xxxx', {
    schema: {}
    async handler(request, reply) {
      return fastify.unitily()
    }
  })

  done()
}
module.exports = myPlugin
```

- 插件的注册

`fastify 利用 register 属性进行插件注册， 其接受两个参数， 第一个参数： 插件， 第二个参数是插件中的options属性， 该参数是可选参数`

```js
const myPlugin = require('./my-plugin')
fastify.register(myPlugin, { name: 'manyao.zhu' })

// 上面的代码等于下面的代码

fastify.register(require('./my-plugin'), { name: 'manyao.zhu' })
```

## 基于插件的使用， 实现模块化的开发

- 模块化的具体用户信息借口功能模块 （插件）

```js
// user 用戶信息 请求借口功能模块 api/routes/user.js
const {
  loginSchema,
  registrySchema,
  getUserSchema,
  getUserDetailSchema
} = require('../controllers/schemas/user.schema')
const {
  loginHandler,
  registryHandler,
  getUserHandler,
  getUserDetailHandler
} = require('../controllers/handlers/user.handler')

const userRoutes = (fastify, options, done) => {
  // 登录账号
  app.post('/login', {
    schema: loginSchema,
    handler: loginHandler
  })

  // 账号注册
  app.post('/registry', {
    schema: registrySchema,
    handler: registryHandler
  })

  app.post('/get', {
    schema: getUserSchema,
    handler: getUserHandler
  })

  // 获取用户详情
  app.get('/users/:id', {
    schema: getUserDetailSchema,
    handler: getUserDetailHandler
  })
  done()
}

module.exports = userRoutes
```

- 模块化的路由请求的总入口 （插件）

```js
// 路由请求的总入口 api/index.js
const routes = (fastify, options, done) => {
  fastify.register(require('./routes/user'), { prefix: '/account' }) // 这里就为user下的所有接口添加了 /account 前缀

  done()
}
module.exports = routes
```

- 模块化中 在服务实例中使用这个模块的功能

```js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./api/index'))

const host = process.argv[3]

const start = async () => {
  try {
    await fastify.listen({ port: 8282, host })
  } catch (err) {
    fastify.log(err)
    process.exit(1)
  }
}

start()
```

## fastify 主要 API 及其功能说明

```js
fastify(opts): 初始化一个新的 Fastify 实例。

fastify.route(opts): 为一个 HTTP 方法和 URL 路径添加一个路由。

fastify.get/post/put/delete/options/patch/head(url, opts, handler): 为特定的 HTTP 方法和 URL 路径设置处理函数。

fastify.addHook(name, fn): 添加一个生命周期的钩子。

fastify.addSchema(schema): 添加一个 JSON schema 以支持数据验证和序列化。

fastify.after(callback): 添加一个在所有插件注册完毕后执行的函数。

fastify.decorate(prop, value): 在 Fastify 实例上添加新的属性或方法。

fastify.decorateReply(prop, value): 在 reply 对象上添加新的属性或方法。

fastify.decorateRequest(prop, value): 在 request 对象上添加新的属性或方法。

fastify.listen(port, hostname, backlog, callback): 启动服务器并开始监听指定的端口。

fastify.register(plugin, opts): 注册一个插件。

fastify.ready([callback]): 确保所有插件都已注册且 ready 函数执行完毕。

fastify.setErrorHandler(func): 设置错误处理函数。

fastify.setNotFoundHandler(func): 设置当找不到匹配路由时的处理函数。

fastify.setValidatorCompiler(func): 配置用于编译一个有效性校验函数的编译器函数。

fastify.setSerializerCompiler(func): 配置用于编译一个序列化函数的编译器函数。
```

## 简单的案例

- 为了简化示例，没有涉及密码散列和基于令牌的验证。在真实环境中，您应该永远不要在数据库中存储未进行 hash 处理的密码，并且应通过 JWT 或其他方式处理身份验证。

```js
const Fastify = require('fastify')
const fastify = Fastify()

let users = {} //采用对象模拟数据库。

fastify.post('/register', async (request, reply) => {
  const { username, password } = request.body
  if (users[username]) {
    reply.code(400).send({ message: 'User already registered' })
  } else {
    users[username] = { password }
    reply.code(200).send({ message: 'User registered successfully' })
  }
})

fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body
  if (users[username] && users[username].password === password) {
    reply.code(200).send({ message: 'User logged in' })
  } else {
    reply.code(401).send({ message: 'Invalid username or password' })
  }
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
```

## 接入数据库

[Fastify 接入数据库]
