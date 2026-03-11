<!--
 * @Date: 2024-07-20 16:22:26
-->
# Iframe的相关知识积累

## 使用iframe时， 父子系统如何交互 (事件的交互)

- 当A系统通过`<iframe>`内嵌B系统时，B系统中的点击事件想要通知A系统，可以使用window.postMessage机制来实现跨窗口通信。window.postMessage允许不同源（origin）的窗口之间安全地发送消息，这非常适合用于`<iframe>`与父窗口之间的通信。

### 子系统向父系统传递信息

- B（子）系统中的代码（传递信息）

```js
const dom = document.getElementById('someButton')
dom.onclick = () => {
    // 获取iframe的父窗口引用
    const parentWindow = window.parent
    // 检查是否在iframe中
    if (parentWindow && parentWindow !== window) {
        // 构建要发送的消息
        var messageData = {
            type: 'B_SYSTEM_CLICKED',
            payload: {
                buttonId: 'someButton',
                timestamp: new Date().getTime()
            }
        };
        sendMessageToParent(messageData)
    }
}
// 发送消息
function sendMessageToParent(message) {
    parentWindow.postMessage(message, 'https://a-system-domain.com');  // 这里的域名，指的是能内嵌B系统，且做交互的域名； 若相匹配所有的系统， 可以用通配符 *
    // parentWindow.postMessage(message, '*')  // 可以与所有嵌B系统的系统进行交互
}
```

- A（父）系统中的代码 （接受信息）

```js
// 处理子系统传递的数据
function handleChildMessage(event) {
    if (event.origin !== 'https://b-system-domain.com') {  // 这里是内嵌系统的域名
        return;
    }
    // 解析消息数据
    var data = event.data;
    // 确认消息类型
    if (data.type === 'B_SYSTEM_CLICKED') {
        console.log('B系统中的按钮被点击了:', data.payload);
        // 在这里执行你想要的动作
    }
}
window.addEventListener('message', handleChildMessage;, false);

window.removeEventListener('message', handleChildMessage;, false);
```

### 父系统向子系统传递信息

- B（子）系统中的代码

```js
// 处理父系统传递的数据
function handleParentMessage(event) {
    if (event.origin !== 'https://a-system-domain.com') {  // 这里是内嵌系统的域名
        return;
    }
    // 解析消息数据
    var data = event.data;
    // 确认消息类型
    if (data.type === 'A_SYSTEM_CLICKED') {
        console.log('A系统中的按钮被点击了:', data.payload);
        // 在这里执行你想要的动作
    }
}

window.addEventListener('message', handleParentMessage;, false);

window.removeEventListener('message', handleParentMessage;, false);
```

- A（父）系统中的代码

```js
// iframe加载成功
function iframeLoaded() {
    this.iframeIsload = true
    // 初始化传递数据
    const message = {
        type: 'INIT_PAGE',
        data: {}
    }
    this.sendMessageToChild(message)
}

// 发送信息
function sendMessageToChild(message) {
    if (!this.iframeIsload || !this.$refs.iframeRef) {
        return this.$message.error('iframe未准备就绪，请稍后重试')
    }
    const content = this.$refs.iframeRef?.contentWindow
    content.postMessage(message, 'https://b-system-domain.com')
}
```

## A应用通过 ifrmae 内嵌B应用， 导致B系统的统一认证页面请求接口的 cookie里的session丢失

- 背景： A应用 与 B应用都集成了单点登录。 A应用需要在通过iframe内嵌B应用； 由于两者都集成了单点登录， 理论上是登录A应用之后，内嵌的B应用将会自动登录

- 问题： A应用内嵌B应用之后， B应用在自动登录时， 跳转到sso单点登录界面时，sso请求接口中的请求头需要携带的cookie中的session数据丢失了； 导致B系统自动登录失败， 需要再次手动登录

- 分析： 请求头中的 session 数据丢失通常由跨域限制、cookie 策略或浏览器安全机制导致

- 原因： A应用与B应用的二级域名不一致，存在跨域限值与cookie策略问题

- 解决方案：

1.SSO单点登录 与 所有应用之间需要根域名一致  eg(xxx.sungrow.cn) 【sso单点登录的前置条件】

SSO 服务器设置 Cookie (sso单点登录的前提)

```
Set-Cookie: sso_session=xxx; 
Domain=.example.com;          // 共享根域名
SameSite=None;                // 允许跨站请求携带
Secure=true;                  // 强制HTTPS
HttpOnly=true;                // 防止XSS攻击
```

2.解决session丢失

父应用A 服务端修改配置 或 通过nginx代理

```
Access-Control-Allow-Origin: *, // 也可以是 http://父页面域名, http://iframe域名
Access-Control-Allow-Credentials: true  // 允许携带凭证
```
