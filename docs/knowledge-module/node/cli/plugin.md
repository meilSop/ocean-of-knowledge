<!--
 * @Date: 2023-09-12 16:24:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-07 14:28:24
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\node\cli\plugin.md
-->

# 搭建脚手架需要用到的插件

## commander [命令行自定义指令]

- 文档

[中文文档](https://github.com/tj/commander.js)

[详解使用博客文档](https://www.ngui.cc/zz/1683900.html?action=onClick)

- 安装插件

```js
npm install commander --save-dev

pnpm add @types/commander -D  // 用于快速提示
```

- 常用的 commander 方法介绍

```js
1. .version(v: string) // 指定版本信息
2. .description(desc: string) // 添加描述信息
3. .option(o: string, desc: string ) // 添加选项， 其中的 o: 可以接受 一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或|分隔。
4. .opts() // 获取解析收的选项
5. .command(command: string) // 自定义指令 command【'create <name> <username> <password>'】, 说明参数
6. .arguments(arg: string, desc: string)  // 指令的参数，
7. .action(name: string)  // 用于执行自定义指令 【它紧接上command使用】
8. .parse(process.argv)  // 用于解析命令行参数
```

- 常用的 process 的方法与属性

```js
1. process.argv  // process.argv是一个包含命令行参数的数组。在Node.js中，当我们在命令行中运行一个脚本时，可以在命令行中传递参数，这些参数会被存储在process.argv数组中。
         // process.argv数组的前两个元素是固定的，分别是Node.js的可执行文件路径和当前脚本的文件路径。从第三个元素开始，就是命令行中传递的参数。
2. process.cwd() // 获取当前操作所在的目录
3. process.chdir(path: string)  // 更改node进程的当前工作目录
```

- 使用案例

```js
const program = require('commander')

program
  .option('-s --show', 'show name')
  .option('-v --version', `display version`)
  .usage('<option> [option]') // 这里使用之后，在执行命令的时候就会生效
program.parse(process.argv)

const opt = program.opts()
if (opt.show) {
  console.log('show name')
  return
}
if (opt.version) {
  console.log(`v${require('../package.json').version}`)
  return
}

program
  .version('0.0.1')
  .command('create')
  .arguments('<name>', 'project name')
  .arguments('<username>', 'user to login')
  .arguments('<password>', 'password for user')
  // 也可以直接这样写
  // .command('create <name> <username> <password>')
  .description('create a project that from the template')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, username, password) => {
    conosle.log(name, username, password)
  })
  .usage('<command> [option]') // 这里使用之后，在执行 help时， 就会看到option 与 command了
  .parse(process.argv)
```

## inquirer [命令行询问用户问题，记录回答结果]

- 文档

[中文文档](https://github.com/SBoudrias/Inquirer.js/)

- 安装插件

```js
npm install inquirer --save

pnpm add @types/inquirer -D  // 用于快速提示
```

- 插件的 prompt([{}]) 【提示方法】中对象接收的属性类型

```js
type Prop = {
  type: String, // 询问的打印类型  input, number, confirm, list, rawlist, expand, checkbox, password, editor 需要打印的类型 (confirm 就是选择 Y/N)
  name: String, // 询问的打印名称 （key）
  message: String | Function, // 询问打印的问题
  default?: String | Function, // 询问的打印的问题的默认值
  choices?: Array | Function, // 询问打印问题的可供选项， 仅在类型为checkbox, list, rawlist, expand 生效
  validate?: Function, // 校验， 只有用户输入的内容满足校验，才能回车
  transformer?: Function, // 条件提示信息，（输入的信息后缀添加(返回的结果)）
  filter?: Function, // 过滤， 返回最终打印结果
  when?: Function, // 接收当前用户的答案, 用于判断当前想需不需要展示
  pageSize?: Number, // 改变将使用时呈现的行数, 仅在类型为checkbox, list, rawlist, expand
  prefix?: String, // 询问打印的问题的前缀
  suffix?: String, // 询问打印的问题的后缀
  askAnswered?: Boolean, // 如果答案已经存在，则强制提示问题。
  loop?: Boolean, // 启用列表循环。默认值：true
  waitUserInput?: Boolean // 用于启用/禁用在打开系统编辑器之前等待用户输入的标志 默认： true
}
```

- 使用案例

```js
const inquirer = require('inquirer')
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project Name',
      default: 'express-ejs-template',
      validate: function (v) {
        return typeof v === 'string'
      },
      transformer: function (v) {
        // 提示信息（输入的信息后缀添加(input your name)）
        return v + '(input your name)'
      },
      filter: function (v) {
        // 最终结果
        return 'name[' + v + ']'
      },
      prefix: 'pre-', // 前缀
      suffix: '-fix' //  后缀
    },
    {
      type: 'number',
      name: 'age',
      message: 'Your Age',
      // default: 12,
      validate: function (v) {
        return typeof v === 'number'
      },
      when: function (v) {
        return v.name == 'name[123]'
      },
      askAnswered: true
    },
    {
      type: 'checkbox',
      name: 'framework',
      message: 'You Used Frame Work',
      default: 'vue',
      choices: ['vue', 'react', 'angular']
    },
    {
      type: 'list',
      name: 'frame',
      message: 'You Used Frame Work',
      default: 'vue',
      choices: ['vue', 'react', 'angular']
    },
    {
      type: 'rawlist',
      name: 'work',
      message: 'You Used Frame Work',
      default: 'vue',
      choices: ['vue', 'react', 'angular']
    },
    {
      type: 'confirm',
      name: 'choice',
      message: 'your choice:',
      default: false
    },
    {
      type: 'password',
      name: 'password',
      message: 'your password:',
      default: '111'
    },
    {
      type: 'expand',
      name: 'like',
      message: 'Your Like',
      default: 'red',
      choices: [
        { key: 'R', value: 'red' }, // 当type 为expand时， 这里面的`key`是必须的， 且只能是单个字母
        { key: 'G', value: 'green' },
        { key: 'B', value: 'blue' },
        { key: 'D', value: 'dog' }
      ]
    },
    {
      type: 'editor',
      name: 'editor',
      message: 'Authoer',
      default: 'manyao.zhu.o'
    }
  ])
  .then((answers) => {
    // 打印互用输入结果
    console.log(answers)
  })
```

## chalk (粉笔) [命令美化工具]

- 安装依赖

```js
npm install chalk --save  或 yarn add chalk 或 pnpm add chalk

pnpm add @types/chalk -D // 用于快速提示
```

- chalk 的方法

[方法的详细说明请查看该文档](https://www.npmjs.com/package/chalk/v/5.3.0?activeTab=readme)

```js
// 修改器方法
reset()
bold()
dim()
...
// 颜色方法
red()
blue()
black()
...
// 背景方法
bgRed()
bgBlue()
...
// 颜色的色码方法
hex()
rgb()
...
```

- 使用案例

```js
const chalk = require('chalk')

chalk.red('我是红色文字')
chalk.bgBlue('我是蓝色背景文字')
chalk.hex('#000').bold('我是黑色加粗文字')
```

## ora [命令行 loading 动效]

- 安装依赖

```js
npm install ora --save

pnpm add @types/ora -D  // 用于快速提示
```

- 提供的方法

[详细的方法的使用说明看这个文档](https://www.npmjs.com/package/ora?activeTab=readme)

```js
// 初始化
const spinner = ora('初始化的文案')

spinner.start(desc?: string)  // 开始启动loading
spinner.text = string  // loading的文案
spinner.color = string  // loading的颜色
spinner.stop()  // 结束loading
spinner.secceed(desc?: string)  // loading 成功
spinner.warn(desc?: string)  // loading之后的警告
spinner.fail(desc?: string)  // loading的失败
spinner.info(desc?: string)  // loading的信息
spinner.clear()  // 清空loading的提示
```

- 使用案例

```js
const ora = require('ora')

const spinner = ora('clone code')

spinner.start()
spinner.text = 'loading ...'
spinner.color = 'blue'
setTimeout(() => {
  spinner.color = 'green'
  spinner.stop()
  spinner.succeed('clone success!')
  setTimeout(() => {
    console.log('加载结束')
  }, 1000)
}, 3000)
```

## cross-spawn [跨平台 shell 工具]

- 安装依赖

```js
npm install cross-spawn --save

pnpm add @types/cross-spawn -D   // 用于快速提示
```

- 方法介绍

```js
const crossSpawn = require('cross-spawn')

const result = crossSpawn.sync('命令', ['命令参数'], { stdio: 'ignore' })
```

- 使用案例

```js
const spawn = require('cross-spawn')

// clone 代码

const result = spawn.sync('git clone <gitUrl> <projectName>', [], { stdio: 'ignore' })
// 等同于
const result = spawn.sync('git', ['clone', 'gitUrl', 'projectName'], { stdio: 'ignore' })

// npm 操作指令

const child = spawn.sync('npm run dev', [], { stdio: 'inherit' })
// 等同于
const child = spawn.sync('npm', ['run', 'dev'], { stdio: 'inherit' })
```

## shelljs [跨平台 shell 工具]

- 安装依赖

```js
npm install shelljs --save

npm install @types/shelljs --save-dev  // 用于快速提示
```

- 方法介绍

```js
shell.exec('命令', options, (err) => {}) // 运行命令 options: cwd: string 指定运行命令的当前目录，async: boolean 是否异步指定、 silent: boolean 命令的输出是否禁止显示在终端上、encoding: string 指定命令输出的字符编码、timeout: number (毫秒)， 超时时间  第二个与第三个参数是可选

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

- 使用案例

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

## rimraf [删除文件 rm -rf 的插件]

- 安装依赖

```js
npm install rimraf --save
npm install @types/rimraf --save-dev
```

-- 插件使用

```js
const { rimraf, rimrafSync } = require('rimraf')
rimraf('./test.txt', function (err) {
  // 删除当前目录下的 test.txt
  console.log(err)
})

export function rm(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        reject(err)
      } else resolve()
    })
  })
}
```

## zip-local [压缩与解压的插件]

- 安装依赖
```js
npm install zip-local --save
```

- 插件的方法

插件的主要方法： [具体的方法可以查看zip文档](https://www.npmjs.com/package/zip-local)

- 使用案例

```js
var zipper = require("zip-local");
// zipping a file
zipper.zip("./hello-world.cpp", function(error, zipped) {
  if(!error) {
    zipped.compress(); // compress before exporting
    var buff = zipped.memory(); // get the zipped file as a Buffer
    // or save the zipped file to disk
    zipped.save("../package.zip", function(error) {
      if(!error) {
        console.log("saved successfully !");
      }
    });
  }
})
```


## fs-extra [指令构建中操作文件与文件的插件]

- 安装依赖

```js
npm install fs-extra --save
npm install @types/fs-extra --save-dev
```

- 插件的方法

这个插件主要针对的是 node 中的 fs 的子模块， [具体的可以查看 fs 文档](https://nodejs.cn/api/fs.html)

## easy-table [控制台输出表格]

- 安装依赖

```js
npm install easy-table --save-dev
```

- 使用方法

[方法的具体使用根据需要定， 详情请查看该文档](https://www.npmjs.com/package/easy-table)

## figlet [控制台打印 logo]

- 安装依赖

```js
npm install figlet --save-dev
```

- 使用方法

[具体的方法使用可以查看该文档【使用不适用根据需求来】](https://www.npmjs.com/package/figlet)
