# Shelljs 跨平台工具库

## 安装依赖

```js
npm install shelljs --save

npm install @types/shelljs --save-dev  // 更好的提示
```

## shelljs 常用的指令

```js
shell.exec('命令', options) // 运行命令 options: cwd: string 指定运行命令的当前目录，async: boolean 是否异步指定、 silent: boolean 命令的输出是否禁止显示在终端上、encoding: string 指定命令输出的字符编码、timeout: number (毫秒)， 超时时间

shell.mkdir(dir) // 创建文件夹

shell.cp(options, source, target) // 复制文件（夹）  options： -r|-R 递归、 -f 强制、 -Rf 强制递归 ..

shell.cd([dir]) // 切换目录

shell.cat(file) // cat(file, file1) | cat([file, file1])  // 打开一个文件内容

shell.rm(options, path)  // 删除文件（夹）， options: -f， -R, -Rf

shell.which(command)  // 判断摸个命令是否可用  eg: git， node

shell.echo(str)  // 向命令行打印提示信息

shell.pwd()  // 返回当前目录

shell.grep([options,] regex_filter, file [, file ...])  // 从给定文件中读取输入字符串，并返回一个字符串，该字符串包含与给定regex_filter匹配的文件的所有行。

shell.ls(options, path), // 返回值是一个包含所有js文件路径的数组, 查看满足给定路径的的列表， options: -R   ls(file) | ls(file, file2) | ls([file, file2]) | ls(file/*,js)

shell.sed(options, serach_regex, replacement, file[,file...])  // 对文件中读取到的字符串，用给定的文案进行替换， options: -i 充分替换，且不会产生备份

shell.exit(code)  // 使用给定的退出代码退出当前进程
```

## shelljs 的简单案例

```js
var shell = require('shelljs')

//判定git命令是否可用
if (!shell.which('git')) {
  //向命令行打印git命令不可用的提示信息
  shell.echo('Sorry, this script requires git')
  //退出当前进程
  shell.exit(1)
}

//先删除'out/Release'目录
shell.rm('-rf', 'out/Release')
//拷贝文件到'out/Release'目录
shell.cp('-R', 'stuff/', 'out/Release')

//切换当前工作目录到'lib'
shell.cd('lib')
//shell.ls('*.js')返回值是一个包含所有js文件路径的数组
shell.ls('*.js').forEach(function (file) {
  //遍历数组
  //sed命令用于文件内容的替换，这里是对每个文件都执行如下3步操作，更改版本信息
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file)
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file)
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file)
})
//切换当前工作目录到上一层
shell.cd('..')

//同步执行git命令提交代码
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
```

## shelljs 在项目管理中的简单使用

- 背景

这里有个主项目，主项目需要依赖子模块进项开发；这里需要对主项目与子模块代码管理的简单使用， 以及子模块的启动（子模块是服务级）

- 案例代码

- 在运行主项目时，启动子模块的服务

```js
// 在运行主项目时，启动子模块的服务

// 启动脚本 start-server.cjs
import shelljs from 'shelljs'
export default () => {
  // 判断node是否可用
  if (!shelljs.which('node')) {
    shelljs.echo('Sorry, this javascript need node, current environment has no node or current node version not available')
    shelljs.exit(1)
  }
  shelljs.exec('npm start', {cwd: shelljs.pwd() + '/node-server/express-server', async: true})
  shelljs.exec('npm start', {cwd: shelljs.pwd() + '/node-server/fastify-server', async: true})
  shelljs.exec('npm start', {cwd: shelljs.pwd() + '/node-server/nestjs-server', async: true})
}


// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import startServer from './start-server.ts'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      startServer()
    ]
  })
}
```

- 安装依赖的脚本

```js
const shelljs = require('shelljs')

const clear = () => {
  process.stdout.write(Buffer.from('1b5b3141', 'hex').toString())
}

const serverInstall = () => {
  if (!shelljs.which('node')) {
    shelljs.echo('Sorry, this javascript need Node, please install and configuration it')
    shelljs.exit(1)
  }

  installItem('express-server')

  installItem('fastify-server')

  installItem('nestjs-server')
}

// 安装依赖
const installItem = (path) => {
  if (shelljs.which('pnpm')) {
    shelljs.exec('pnpm i', { cwd: shelljs.pwd() + '/node-server/' + path, async: true })
  } else if (shelljs.which('yarn')) {
    shelljs.exec('yarn', { cwd: shelljs.pwd() + '/node-server/' + path, async: true })
  } else {
    shelljs.exec('npm i', { cwd: shelljs.pwd() + '/node-server/' + path, async: true })
  }
}

const installMain = () => {
  if (shelljs.which('pnpm')) {
    shelljs.exec('pnpm i', { async: true })
  } else if (shelljs.which('yarn')) {
    shelljs.exec('yarn', { async: true })
  } else {
    shelljs.exec('npm i', { async: true })
  }
}

const mode = process.argv[2]

if (mode === 'all') {
  installMain()
  serverInstall()
}

if (mode === 'main') {
  installMain()
}

if (mode === 'sub') {
  serverInstall()
}
```

- 提交代码的脚本

```js
const shelljs = require('shelljs')

const clear = () => {
  process.stdout.write(Buffer.from('1b5b3141', 'hex').toString())
}

const submit = () => {
  if (!shelljs.which('git')) {
    shelljs.echo('Sorry, this javascript need Git, please install and configuration it')
    shelljs.exit(1)
  }
  // 提交express
  submitServer('express-server')
  // 提交fastify
  submitServer('fastify-server')
  // 提交nestjs
  submitServer('nestjs-server')

  updateSubmoduleCommit()

  submitMainCode()
}

// 提交express/fastify/nestjs服务
const submitServer = (path) => {
  shelljs.cd('node-server/' + path)
  shelljs.exec('git add .')
  clear()
  shelljs.exec('git commit -m "fix: 提交新代码"')
  clear()
  shelljs.exec('git push origin master')
  shelljs.cd('../..')
}

// 更新子模块提交的commit id
const updateSubmoduleCommit = () => {
  shelljs.exec('git submodule update --remote')
}

// 提交主模块的代码
const submitMainCode = () => {
  shelljs.exec('git add .')
  clear()
  shelljs.exec('git commit -m "fix: 提交新代码"')
  clear()
  shelljs.exec('git push origin master')
}

const mode = process.argv[2]

// 提交主模块与分模块
if (mode === 'all') {
  submit()
}

// 提交主模块分支代码
if (mode === 'main') {
  if (!shelljs.which('git')) {
    shelljs.echo('Sorry, this javascript need Git, please install and configuration it')
    shelljs.exit(1)
  }
  submitMainCode()
}
```

- 拉取代码的脚本

```js
const shelljs = require('shelljs')

const clear = () => {
  process.stdout.write(Buffer.from('1b5b3141', 'hex').toString())
}

const pullCode = () => {
  if (!shelljs.which('git')) {
    shelljs.echo('Sorry, this javascript need Git, please install and configuration it')
    shelljs.exit(1)
  }

  pullServer()

  // 切换express分支
  changeServerBranch('express-server')
  // 切换fastify分支
  changeServerBranch('fastify-server')
  // 切换nestjs分支
  changeServerBranch('nestjs-server')
}

// 拉取express、fastify、nestjs服务代码
const pullServer = () => {
  shelljs.exec('git submodule init')
  clear()
  shelljs.exec('git submodule update')
}

// 切换各个服务子模块到master分支，拉取最新代码
const changeServerBranch = (path) => {
  shelljs.cd('node-server/' + path)
  shelljs.exec('git checkout master')
  clear()
  shelljs.exec('git pull origin master')
  shelljs.cd('../..')
}

pullCode()
```
