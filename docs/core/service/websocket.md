# websocket 服务

## 服务提供的方法

- 原型 WebsocketService

```js
// 通常在实例化一个websocket对象之后，客户端就会与服务器进行连接。但是连接的状态是不确定的，于是用readyState属性来进行标识。它有四个值，分别对应不同的状态：
// CONNECTING：值为0，表示正在连接；
// OPEN：值为1，表示连接成功，可以通信了；
// CLOSING：值为2，表示连接正在关闭；
// CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

/**
 * @param options heartTimeout: 心跳检测时间间隔， reconnectTimeout: 重新连接时间间隔
 */
class WebsocketService {
  constructor(options?: any) {}
}
```

- open()

```js
/**
 * @description  创建长链接
 * @param url  长链接地址
 * @param config  长连接的请求头字符串
 * @returns 返回长链接创建成功之后的异步操作
 */
open(url: string, config: string[]): Promise
```

- send()

```js
/**
 * @description  发送连接请求
 * @param params  请求参数
 */
send(params: any): void
```

- message()

```js
/**
 * @description  接受信息
 * @returns  返回长链接的实例
 */
message(): Websocket
```

- close()

```js
/**
 * @description  关闭长链接
 */
close()
```

## 服务的使用案例

```js
import { WebsocketService } from '@sop/lib'

const instance = new WebsocketService()
let socketInstance = null

instance.open('wss://summer-dev.nio.com/swan-ws/ld/list', ['']).then(() => {
  instance.send(JSON.stringify({ cmd: '发送请求', ...params }))
  socketInstance = instance.message()
  socketInstance.onmessage = (res) => {
    console.log(JSON.parse(res.data))
  }
})
// 关闭长链接
instance.close()
```
