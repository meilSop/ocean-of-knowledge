# npm 与 yarn 的镜像切换

## npm 设置淘宝镜像

- 查询当前的配置镜像

```js
npm get registry
```

- 设置淘宝镜像

```js
npm config set registry http://registry.npm.taobao.org/
```

- 切换成原始源

```js
npm config set registry https://registry.npmjs.org/
```

- 若没有安装过 cnpm，执行以下指令

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## yarn 设置淘宝镜像

- 查看当前的配置镜像

```js
yarn config get registry
```

- 切换成淘宝镜像

```js
yarn config set registry http://registry.npm.taobao.org/
```

- 切换成原始源

```js
yarn config set registry https://registry.npmjs.org/
```
