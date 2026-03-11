# Cookie 的详解

## 1. 什么是Cookie

Cookie是服务器发送到用户浏览器并保存在本地的一小段数据。浏览器会存储这些数据，并在后续向同一服务器发起请求时携带它们。

## 2. Cookie的工作原理

```text
客户端请求 → 服务器响应（Set-Cookie）→ 客户端存储 → 后续请求自动携带Cookie
```

## 3. Cookie的属性

- 基础属性

```http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict
```

- 重要属性详解

| 属性         | 说明             | 示例                                  |
|--------------|------------------|---------------------------------------|
| Expires/Max-Age | 过期时间         | Expires=Wed, 21 Oct 2025 07:28:00 GMT |
| Domain       | 作用域           | Domain=example.com                    |
| Path         | 路径限制         | Path=/admin                           |
| Secure       | 仅HTTPS传输      | Secure                                |
| HttpOnly     | 禁止JS访问       | HttpOnly                              |
| SameSite     | 防CSRF攻击       | SameSite=Strict/Lax/None              |

## 4. Cookie的类型

### 4.1 会话Cookie（Session Cookie）

- 浏览器关闭后删除
- 无Expires/Max-Age属性

### 4.2 持久Cookie（Persistent Cookie）

- 设置过期时间
- 保存在硬盘中

### 4.3 第一方Cookie

- 来自当前访问的域名

### 4.4 第三方Cookie

- 来自其他域名的资源
- 主要用于广告追踪

## 5. JavaScript操作Cookie

```js
// 设置Cookie
document.cookie = "username=John; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";

// 读取Cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if(key === name) return decodeURIComponent(value);
    }
    return null;
}

// 删除Cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
```

## 6. 服务器端设置（Node.js示例）

```js
// Express示例
const express = require('express');
const app = express();

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'john', {
        maxAge: 900000,        // 15分钟
        httpOnly: true,        // 防XSS
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'     // 防CSRF
    });
    res.send('Cookie set');
});

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Username: ${username}`);
});
```

## 7. 安全最佳实践

### 7.1 安全设置

```js
// 推荐的安全配置
res.cookie('sessionId', token, {
    httpOnly: true,      // 防止XSS攻击获取Cookie
    secure: true,        // 仅HTTPS传输
    sameSite: 'strict',  // 防止CSRF攻击
    maxAge: 24 * 60 * 60 * 1000, // 1天
    path: '/'
});
```

### 7.2 敏感信息处理

- ❌ 不要在Cookie中存储密码
- ❌ 不要存储敏感个人信息
- ✅ 使用加密的会话ID
- ✅ 考虑使用HttpOnly + Secure + SameSite组合

## 8. Cookie的局限性

- 大小限制：通常4KB
- 数量限制：每个域名约20-50个
- 安全性：容易被窃取或篡改
- 跨域限制：SameSite政策越来越严格

## 9. 现代替代方案

| 方案           | 用途               | 特点                          |
|----------------|--------------------|-------------------------------|
| Session Storage | 临时存储           | 标签页关闭即清除              |
| Local Storage  | 本地持久存储       | 长期存储，无自动发送          |
| IndexedDB      | 大量结构化数据     | 异步操作，容量大              |
| HTTP Headers   | 认证信息           | 如Authorization头             |

## 10. 调试工具 （浏览器开发者工具）

- Application → Storage → Cookies
- Network标签查看请求头中的Cookie
- 控制台：document.cookie

## 11. 实际应用场景

```js
// 1. 记住登录状态
function setLoginCookie(userId, rememberMe) {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
    };
    
    if(rememberMe) {
        options.maxAge = 30 * 24 * 60 * 60 * 1000; // 30天
    }
    
    res.cookie('userId', userId, options);
}

// 2. 购物车功能
function updateCartCookie(cartItems) {
    document.cookie = `cart=${JSON.stringify(cartItems)}; path=/; max-age=2592000`; // 30天
}
```

## 12. 什么是Session Cookie (Session Cookie是一种临时Cookie，具有以下特点：)

- 浏览器会话结束时自动删除（关闭浏览器）
- 不设置expires或max-age属性
- 保存在内存而非硬盘
- 生命周期随浏览器会话结束

```js
// 设置一个Session Cookie
document.cookie = "username=JohnDoe; path=/";

// 设置多个属性
document.cookie = "session_id=abc123xyz; path=/; SameSite=Lax";
```

## 13. 重要注意事项

### 13.1 前端Cookie的限制

```js
// ❌ 无法设置HttpOnly属性（安全限制）
document.cookie = "session=abc; HttpOnly"; // 无效，会被忽略

// ❌ 无法读取HttpOnly的Cookie
// 服务器设置的HttpOnly Cookie，JavaScript无法访问

// ✅ 只能在当前域名或子域名下设置
document.cookie = "name=value; domain=.example.com"; // 有效
```

### 13.2 安全建议

```js
// 推荐的安全设置
function setSecureSessionCookie(name, value) {
    const isHttps = window.location.protocol === 'https:';
    
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookie += '; path=/';
    cookie += '; SameSite=Strict'; // 防止CSRF
    
    if (isHttps) {
        cookie += '; Secure'; // 仅HTTPS传输
    }
    
    document.cookie = cookie;
}

// 敏感信息不要存储在Cookie中
// ❌ 不要存储密码、密钥等
// ✅ 可以存储会话ID、用户偏好等非敏感信息
```

### 13.3 浏览器兼容性

```js
// 检查浏览器是否支持Cookie
function areCookiesEnabled() {
    // 尝试设置和读取一个测试Cookie
    const testKey = 'test_cookie_' + Date.now();
    const testValue = 'test_value';
    
    document.cookie = `${testKey}=${testValue}; path=/`;
    const hasCookie = document.cookie.indexOf(testKey) !== -1;
    
    // 清理测试Cookie
    document.cookie = `${testKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    
    return hasCookie;
}

// 使用前检查
if (navigator.cookieEnabled) {
    // 现代浏览器支持
    console.log('Cookies are enabled');
} else if (areCookiesEnabled()) {
    // 备用检查方法
    console.log('Cookies are enabled');
} else {
    console.warn('Cookies are disabled');
    // 使用localStorage或sessionStorage作为备选
}
```

## 14. Session Cookie vs Local Storage

| 特性         | Session Cookie        | localStorage      |
|--------------|-----------------------|-------------------|
| 生命周期     | 浏览器会话结束        | 永久存储          |
| 自动发送     | ✅ 自动随请求发送     | ❌ 需要手动处理    |
| 大小限制     | 4KB                   | 5-10MB            |
| 安全性       | 可设置Secure/SameSite | 无自动安全机制    |
| 服务器访问   | ✅ 可通过HTTP头访问   | ❌ 仅前端访问      |
| 适用场景     | 会话管理、身份验证    | 本地缓存、用户偏好 |

## 15. 常见问题解决

### 15.1 问题1：Cookie立即过期

```js
// ❌ 错误：设置了过去的过期时间
document.cookie = "name=value; expires=0"; // 立即过期

// ✅ 正确：不设置expires就是Session Cookie
document.cookie = "name=value; path=/";
```

### 15.2 问题2：跨标签页共享

```js
// Session Cookie默认在当前标签页有效
// 如果需要在不同标签页共享，使用localStorage
localStorage.setItem('shared_data', JSON.stringify(data));

// 或者设置持久Cookie
document.cookie = `shared=${data}; max-age=3600; path=/`;
```

### 15.3 问题3：异步设置问题

```js
// Cookie设置是同步的，但需要注意执行顺序
async function loginAndSetCookie() {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            credentials: 'include' // 重要：包含Cookie
        });
        
        // 成功登录后设置前端Cookie
        CookieManager.setSessionCookie('login_status', 'true');
        
    } catch (error) {
        console.error('Login failed:', error);
    }
}
```
