<!--
 * @fileName:
 * @Date: 2023-06-26 17:20:44
 * @Author: manYao.zhu
-->

# vitePress 构建中的坑点

## 引入的模块报找不到模块名

- 报错信息

```ts
  import { VueThemeComponent, useThemeStore, settingService, initTheme } from "@styleofpicasso/vue-theme";
                                                           ^^^^^^^^^
  SyntaxError: Named export 'initTheme' not found. The requested module '@styleofpicasso/vue-theme' is a CommonJS module,
  which may not support all module.exports as named exports.CommonJS modules can always be imported via the default export,
  for example using:

  import pkg from '@styleofpicasso/vue-theme';
  const { VueThemeComponent, useThemeStore, settingService, initTheme } = pkg;
```

- 解决方案

```ts
import * as VueTheme from '@styleofpicasso/vue-theme'
const { VueThemeComponent, useThemeStore, settingService, initTheme } = VueTheme
```

## 打包的时候报找不到 window/document

- 报错信息

```ts
document is not defined
```

- 报错原因

因为 VuePress 在打包时是通过 Node.js 服务端渲染，因为 Node.js 里没有 document 对象，所以就报错了。最终解决办法如下：

- 解决方案

```ts
// 在组件渲染之后才去做window 或 dom 的操作； 引入一些三方应用报类似的错误， 也用这种方案解决
import DefaultTheme from 'vitepress/theme'
import icon from '../../public/icon.png'
export default {
  ...DefaultTheme,
  enhanceApp: async (ctx) => {
    const { app } = ctx
    DefaultTheme.enhanceApp(ctx)
    app.component('code-exchange', CodeExchange)
    app.mixin({
      mounted() {
        // 添加logo
        var linkd = document.querySelector('#link')
        if (linkd) document.head.removeChild(linkd)
        const link = document.createElement('link')
        link.setAttribute('rel', 'icon')
        link.setAttribute('id', 'link')
        link.setAttribute('href', icon)
        document.head.appendChild(link)
      }
    })
  }
}
```
