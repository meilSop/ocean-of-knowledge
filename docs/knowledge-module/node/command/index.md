# npm 与 yarn 的常用指令

## npm 常用指令

```js
npm install     //运行npm install可根据package.json的配置自动安装所有依赖包
npm uninstall   //卸载依赖，如npm uninstall webpack --save-dev 即卸载开发环境下的webpack
npm install xxx --save-dev (or 简写 npm i -D)  //将xxx安装到开发环境（devDependencies）的依赖中去
npm update  //更新依赖包版本
npm view <packagename> version  //查看npm中可供安装的package版本号（如果版本太多，会隐藏一部分不显示）
npm view <packagename> version --json  //查看npm中可供安装的package的所有版本（如果版本太多也不会隐藏）
npm install webpack@3.1.9   //安装指定版本的webpack
npm install webpack -g     //将webpack安装到全局
npm init   //用于引导在指定目录自动创建一个package.json配置文件
npm root   //查看当前的包安装路径
npm root -g    //查看全局的包安装路径
npm outdated   //在当前安装目录查看所有已经过时的依赖包，以便进行版本更新
npm outdated -g   //在全局目录下查看所有已经过时的依赖包，以便进行版本更新
npm ls   //查看当前安装的模块及依赖
npm ls -g  //查看全局环境下已安装的模块及依赖
npm help xx  //查看某条命令的详细使用说明
npm config set proxy=url   //设置代理
npm config set registry https://xxx  //设置镜像
npm config get registry  // 查看npm当前镜像源
npm install -g cnpm --registry=https://registry.npm.taobao.org  //全局安装淘宝镜像

/**
* npm缓存相关
*/
npm cache clean  --force
npm link  //将全局模式链接到本地目录 ，相应的解除链接 npm unlink
npm run      // 查看当前项目下所有定义的npm脚本命令
npm prefix   // 打印本地目录前缀。如果没有 -g 参数，它是 package.json 文件最近的父目录。如果带有 -g 参数，它就是全局目录前缀
npm list -g --depth=0 // 查看全局安装的依赖包，depth=目录层级
npm version v --no-git-tag-version  // 变更packagejson中的版本号

/**
用户操作相关
*/
npm whoami  // 查看当前npm用户
npm adduser --registry http://localhost:4873 // 给xxx源的npm添加用户
```

## yarn 常用指令

```js
yarn global list   // 查看yarn安装的全局包
yarn  // 安装所有依赖
yarn add  // 安装指令依赖
yarn upgrade <projectName>@latest  // 更新最新依赖包
```
