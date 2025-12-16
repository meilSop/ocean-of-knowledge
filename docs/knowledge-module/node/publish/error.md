# 发布 npm 包常遇到的报错和解决方法

## 邮箱未验证

```js
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! you must verify your email before publishing a new package: https://www.npmjs.com/email-edit : your-package
```

这个是注册后没有验证邮箱，登录自己邮箱找到对应的邮件确认就好了。注意别选错了，注册 npm 时会发给你两个邮件，我当时就是眼瞎没有看到第二个。如果验证邮件过期的话登录自己的 npm 主页重新发一个就好了。

邮箱验证

## 包名重复

```js
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! You do not have permission to publish "your-package". Are you logged in as the correct user? : your-package
```

你的包和别人的包重名了，npm 里的包不允许重名，所以去 npm 搜一下，改个没人用的名字就可以了

## 需要登录

```js
npm ERR! code ENEEDAUTH
npm ERR! need auth auth required for publishing
npm ERR! need auth You need to authorize this machine using `npm adduser`
```

后面已经注明了，输入 npm adduser 重新登录就可以了，过程和 npm login 一样，这个问题在你切换了 npm 源之后或登录过期后都有可能发生。

## 只有管理员才有权限发布

```js
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! [no_perms] Private mode enable, only admin can publish this module [no_perms] Private mode enable, only admin can publish this module: your-package
```

这个是你的源设置成第三方源的时候才有可能发生，比如设置了淘宝源就可能会导致该问题。只要把源改回默认的就可以了，如下：

```js
npm config set registry http://registry.npmjs.org
```

## 包名过于类似

```js
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! Package name too similar to existing packages; try renaming your package to '@hopgoldy/auto-git' and publishing with 'npm publish --access=public' instead : your-package
```

如果 npm 上已经有了不少和你的包名类似的包，就会出现这个问题，在 package.json 中修改你的包名就可以了

## 无法发布到私有包

```js
npm ERR! publish Failed PUT 402
npm ERR! code E402
npm ERR! You must sign up for private packages :
```

这个当你的包名为@your-name/your-package 时才会出现，原因是当包名以@your-name 开头时，npm publish 会默认发布为私有包，但是 npm 的私有包需要付费，所以需要添加如下参数进行发布:

```js
// 这里的your-name： npm的账号； your-package: 包名
npm publish --access public
```

==注意注意== 需要注意的是@开头形式的包名跟 npm 账户有对应关系，不能随便填写。

```js
// eg: 我的账号名为 styleofpicasso， 则我的包以@开头只能命名如下
@styleofpicasso/<my-package-name>
```

## 无法找到要发布的包

```js
npm notice
npm ERR! code E404
npm ERR! 404 Not Found - PUT https://registry.npmjs.org/@xxx%2fxxx - Scope not found
npm ERR! 404
npm ERR! 404  '@xxx/xxx@0.0.0' is not in this registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Local\npm-cache\_logs\2021-12-06T14_56_55_018Z-debug.log
```

如果要使用名称 @scope/package 在 NPM 上发布包，则需要确保 Namespace @scope 在 NPM 上存在。需要创建该命名空间，需要使用 @scope 名称在 NPM 上创建组织

创建该组织后，加入组织并登录

登录成功后，发布名为 @scope/firstpackage 的包

`使用新组织时，就需要上方的操作`
