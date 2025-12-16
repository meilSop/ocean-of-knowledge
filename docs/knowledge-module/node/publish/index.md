# npm 包发布整体流程

## npm 登录

```js
npm login  // 根据提示 输入用户名/ 密码 / 邮箱
```

## npm 发布

```js
npm publish  // 发布
// 或
npm publish --access public // [这里再插件命中含有@时 使用] 【首次发布时需要用】)
```

## npm 撤销发布

```js
npm unpublish <pkg>[@version]  // 删除某个指定的版本
npm unpublish <pkg> --force  // 删除整个npm市场的包

// 不过不推荐使用以上的指令， 而用以下的指令代替

npm deprecate <pkg>[@version] <message>
// 例如
npm deprecate @styleofpicasso/vue-plugin '这个包已经不再维护了'
```
