<!--
 * @Date: 2023-09-05 09:15:17
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-10-27 14:53:53
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\wechat\index.md
-->

# 微信开发相关：使用微信 JS-SDK 接口

微信 JS-SDK 实现自定义分享功能，分享给朋友，分享到朋友圈

## 支持

无论是订阅号还是服务号都支持分享等基础操作

## 准备工作

- 首先需要有一个公众号，该公众号是需要能认证的(企业认证)。

- 然后需要提前看一下开发帮助文档，了解一下基础。 [微信相关开发说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html)

## 接口使用流程

- 开发前端向后端请求微信接口调用配置信息

- 开发者后端服务器使用 AppID 和 AppSecret 向微信服务器获取 token

- 后端通过 token 获取 ticket 并创建签名

- 返回签名至前端，根据需要调用的接口功能创建配置信息

- 前端使用微信提供的 js 方法注入配置信息

- 通过接口使用验证后，使用相应的接口实现需要的功能

在使用前，需要在微信工众号里进行一些设置，并获取 AppID 和 AppSecret。通常 token 的有效期是 7200 秒,即 2 小时，此时间会随 token 一起返回。有效期内可以重复使用，即跳过步骤 2。

## 公众号设置

- 打开微信公众平台，使用管理员登录

- 登录微信公众平台 ——> 公众号设置 ——> 功能设置 ——> '填写 JS 接口安全域名' （下载 txt 文件放置到经过备案的网址目录下并确保能够访问，并添加后端服务访问域名）

- 设置与开发 —> 基本配置 —> 公众号开发者信息 获取并记录 AppID 和 AppSecret

- 设置与开发 —> 基本配置 —> 公众号开发者信息 设置添加 IP 白名单

## 前端向后端请求 ticket

- 前端在页面渲染时使用 ajax 向后端请求 ticket。具体的代码就不写了。

## 后端向微信获取 token

- 后端收到前端的请求后，向微信的 api 接口发送请求，请求类型为 GET：

```js
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
```

- 参数说明：

```js
grant_type // 请求 token 固定填写 client_credential
appid & secret //  公众号设置里获取到的 AppID 和 AppSecret
```

## 后端根据 token 生成 ticket

- 获取 token 后，使用 token 向微信服务器请求 ticket ，请求类型为 GET:

```js
https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
```

- ACCESS_TOKEN 就是之前获取到的 token 了，准备使用 JS-SDK 接口 type 参数就设置为 jsapi。成功后返回一个 json 包：

```js
{
  "errcode":0,  //  错误码
  "errmsg":"ok",  // 错误信息
  "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",  // 获取到的 ticket 数据
  "expires_in":7200  // 有效期，单位秒
}
```

- ticket 最好也保存在缓存内，到期时再重新请求。

## 根据 ticket 创建签名

- 创建签名和配置信息需要这些数据

- noncestr : 随机字符串
- jsapi_ticket : 微信服务器发送的 ticket
- timestamp : 时间戳
- url : 前端要使用 jsapi 的页面地址，注意不包括 # 号和后面的部分

```js
noncestr=Wm3WZYTPz0wzccnW
jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
timestamp=1414587457
url=http://mp.weixin.qq.com?params=value
```

- 然后对这些数据，按照字段名的 ASCII 码升序排列(字典序)后，使用 URL 键值对的格式(即 key1=value1&key2=value2…)拼接成字符串，注意所有参数名均为小写字符。排序实际上就是 jsapi_ticket -> noncerstr -> timestap -> url 。拼接好后是这样：

```js
jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW×tamp=1414587457&url=http://mp.weixin.qq.com?params=value
```

- 最后对此段字符串进行 sha1 签名，得到 signature:

```js
0f9de62fce790f9a083d5c99e95740ceb90c27ed
```

- 将这些数据和 appid 返回给前端(其中 url 是前端传送给后端的)

## 前端创建配置信息，并注入验证

- 配置信息是一个对象，其格式为：

```js
{
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
}
```

- 首先引入微信 SDK 的一个 JS 文件：

```js
http://res.wx.qq.com/open/js/jweixin-1.6.0.js
http://res2.wx.qq.com/open/js/jweixin-1.6.0.js
// 两个均支持 https ，随便哪个个都可以，另一个是备用
```

- 也可以使用 npm 包实现

```js
npm install weixin-js-sdk --save

import wx from 'weixin-js-sdk'
```

- 根据后端返回的参数设置配置对象，并注入

```js
wx.config({
  debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
  appId: res.data.appId, // 必填，公众号的唯一标识
  timestamp: parseInt(res.data.timestamp), // 必填，生成签名的时间戳
  nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
  signature: res.data.signature, // 必填，签名
  jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的 JS 接口列表
})
```

## 处理验证

- 可以使用封装好的 wx.ready 接口来处理成功验证行为，使用 wx.error 接口来处理验证失败行为

```js
wx.ready(function () {
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
})
```

```js
wx.error(function (res) {
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
})
```

- 例如实现将页面在微信分享给朋友及分享到朋友圈的功能

```js
// 成功
wx.ready(() => {
  var shareData = {
    title: '新闻',
    desc: '每日新闻',
    link: window.location.href,
    imgUrl: 'https://xxxxxxx.com/img/logo.jpg' // 这里的地址必须是绝对路径（有域名）
  }
  //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
  wx.updateAppMessageShareData(shareData)
  //自定义“分享到朋友圈”及“分享到 QQ 空间”按钮的分享内容（1.4.0）
  wx.updateTimelineShareData(shareData)
})
//错误
wx.error(function (res) {
  console.log('微信分享错误信息', res)
})
```

## SDK 接口调用说明

- 所有 SDK 接口都是通过 wx 对象(也可使用 jWeixin 对象)来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：

```js
success // 接口调用成功时执行的回调函数。
fail // 接口调用失败时执行的回调函数。
complete // 接口调用完成时执行的回调函数，无论成功或失败都会执行。
cancel // 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
trigger // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
```
