<!--
 * @fileName:
 * @Date: 2023-03-13 13:47:18
 * @Author: manYao.zhu
-->

# .npmrc 配置文件的作用

## 1. .npmrc 的简述

- .npmrc 可以理解成 npm running configuration, 即 npm 运行时的配置文件
- 简单来说：.npmrc 配置文件可以设置 package.json 中的依赖包的安装来源，即从哪里下载安装依赖包

## 2. .npmrc 配置文件的优先级

- 优先级： 项目配置文件.npmrc > 用户配置文件.npmrc > 全局配置文件.npmrc
- 项目配置文件： /project/.npmrc （在项目中）
- 用户配置文件： ~/.npmrc （查看文件地址的命令： npm config get userconfig）；
  如果想恢复默认配置，只需要将用户配置文件~/.npmrc 删除即可
- 全局配置文件：$PREFIX/etc/npmrc (查看文件地址的命令： npm config get prefix)；
  如果你不曾配置过全局文件，该文件不存在
- npm 内置的配置文件/path/to/npm/npmrc （查看内置文件地址的命令： which npm）

## 3. 配置文件.npmrc 的设置方法

- 设置项目的配置文件

```ts
registry=https://registry.npm.taobao.org  // 依赖包从 https://registry.npm.taobao.org 源（镜像）里面下载
@styleofpicasso:registry=https://registry.npm.org  // 以@styleofpicasso开头的包从 https://registry.npm.org这里下载
```

- 设置用户配置文件

```ts
1. 可以通过 npm config get userconfig 查找文件路径， 直接修改文件

2. 也可以通过以下命令设置
   npm config set registry https://registry.npm.taobao.org
   npm config set @styleofpicasso:registry https://registry.npm.org

3. 删除一个命令
  npm config delete registry
```

- 设置全局配置文件

```ts
1. 可以通过 npm config get prefix 查找文件路径，直接修改文件

2. 也可以通过以下命令设置
   npm config set registry https://registry.npm.taobao.org -g
```

## 4. 组件发布配置

- package.json 配置方法

```ts
{
  "name": "@aa/xxx", // 发布npm包的名字"
  version": "1.0.0", // 你的npm包版本"
  description": "xxxx", // 包的描述
  "main": "dist/btn.js", // 指定组件的主入口文件"
  publishConfig":
    {"registry": "要发布的私有仓库地址，然后在.npmrc配置用户名密码"
  }
  ......
```

- .npmrc 配置方法

```ts
# package.json不做任何仓库的配置:
{
  "name": "@aa/xxx", // 发布npm包的名字
  "version": "1.0.0", // 你的npm包版本
  "description": "xxxx", // 包的描述
  "main": "dist/btn.js", // 指定组件的主入口文件
  ......
}
# .npmrc配置仓库地址和用户名密码：
@aa:registry=私仓地址
```

-配置好仓库信息后，执行如下发布命令，即可将打包好的组件发布到仓库中

```ts
npm publish
```

## 5. npm 常用命令

```ts
npm config set <key> <value> [-g|--global]  //给配置参数key设置值为value；
npm config get <key>                        //获取配置参数key的值；
npm config delete <key>  [-g|--global]      //删除置参数key及其值；
npm config list [-l]                		//显示npm的所有配置参数的信息；
npm config edit                     		//编辑用户配置文件
npm get <key>                           	//获取配置参数 key 生效的值；
npm set <key> <value> [-g|--global]         //给配置参数key设置值为value；
```

## 6. 注意事项

- yarn

yarn 会读取.npmrc 的配置文件，所以不必为 yarn 再设置一次

- scope 命名空间

上文提到的指定特殊的命名空间（scope）的来源，如下代码所示

```ts
@styleofpicasso:registry=https://registry.npm.org
```

其中，@styleofpicasso 是组件的 scope，scope 在模块名 name 中使用时，以@开头

- 镜像出错
  .npmrc 文件配置了私有包 registry 源，但是当前的下载源是淘宝镜像，可能会报如下错误：

```ts
error Command failed with exit code 1
```

可以将当前的下载源改成私有包 registry 源，如果改了之后还报错，可以尝试将 lock 文件，或者 node_modules 文件删掉，重新开始下载。
