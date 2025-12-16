<!--
 * @Date: 2024-10-23 16:34:24
-->
# 依赖包的版本更新，但是安装时找不到的解决方案

## 背景 （私有源）

- 当安装依赖的时候发现之前安装的依赖， 突然发现找不到

- 对比当前找不到的版本与私有源里的版本是否对的上

- 到npm官网上去看，是否是更新了最新版本（新发版的版本，有时下载不下来）

## 解决

- 当发现版本对不上， 私有源里下不下来，而且切换npm源 也下不下来时

- 可以直接下载npm中对应版本的.tgz压缩包

- 再将下载后的压缩包手动上传到私有源即可 （原则上私有源在找不到对应版本时， 会自动到npm上下载到自己本地）

- 下载 .tgz 的包的指令 （创建一个目录， 在目录中执行命令，下载的文件就在目录里面）

```js
curl -O https://registry.npmjs.org/<package-name>/-/<package-name>-<version>.tgz
```

下载案例：

```js
curl -O https://registry.npmjs.org/lodash-es/-/lodash-es-4.17.21.tgz
```

- 需要注意：当我们需要安装摸个组下面的摸个依赖包， 例如下面的依赖， 在下载的时候， 需要在后面指定版本的时候移除组的名称

```js
curl -O https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.25.9.tgz
```

### 另外一种下载方式 直接访问连接下载

- npm 源

```js
 https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.25.9.tgz
```

- 淘宝源

```js
https://registry.npmmirror.com/@babel/helper-create-class-features-plugin/-/@babel/helper-create-class-features-plugin-7.27.0.tgz
```

```js
https://registry.npmmirror.com/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.27.0.tgz
```
