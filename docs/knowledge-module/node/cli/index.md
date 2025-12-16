# 脚手架的搭建

## 脚手架的目录结构

```js
my-cli |—— lib |—— utils |—— ask.js
       |       |         |—— delete.js
       |       |         |—— download.js
       |       |         |—— rewrite.js
       |       |
       |       |—— config.js
       |       |—— index.js
       |
       |—— package.json
```

## 脚手架的搭建案例

- package.json

```json
{
  "name": "@styleofpicasso/cli",
  "version": "0.0.1",
  "description": "Generate scaffolding for out-of-box frames based on different templates",
  "bin": {
    "my-cli": "lib/index.js"
  },
  "files": ["lib", "package.json"],
  "repository": {
    "type": "git",
    "url": "https://codeup.aliyun.com/6232e0c7479c43b0f4d75c29/cli/my-cli.git"
  },
  "keywords": ["my-cli", "template", "cli"],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "buffer-json": "^2.0.0",
    "chalk": "4.1.2",
    "commander": "8.3.0",
    "cross-spawn": "^7.0.3",
    "fs-extra": "9.1.0",
    "inquirer": "8.2.6",
    "ora": "5.4.1"
  }
}
```

- index.js

```js
#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头

const program = require('commander')
const packages = require('../package.json')
const { askUsername } = require('./utils/ask')

program
  .version('v' + packages.version, '-v --version')
  .command('create')
  .arguments('<name>', 'Name of self created project')
  .description('Name of self created project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name) => {
    askUsername(name)
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
```

- config.js

```js
const oraSpinnerConf = {
  interval: 80,
  frames: ['🕛 ', '🕐 ', '🕑 ', '🕒 ', '🕓 ', '🕔 ', '🕕 ', '🕖 ', '🕗 ', '🕘 ', '🕙 ', '🕚']
}

const gitTemplates = [
  {
    name: 'express-ejs',
    value: 'https://codeup.aliyun.com/6232e0c7479c43b0f4d75c29/template/express-ejs-template.git'
  },
  {
    name: 'vue-vite',
    value: 'https://codeup.aliyun.com/6232e0c7479c43b0f4d75c29/template/vue-vite-template.git'
  },
  {
    name: 'uniapp-mini',
    value: 'https://codeup.aliyun.com/6232e0c7479c43b0f4d75c29/template/mini-rpogram-template.git'
  }
]

const installType = [
  { name: 'Pnpm', value: 'pnpm' },
  { name: 'Npm', value: 'npm' },
  { name: 'Yarn', value: 'yarn' }
]

module.exports = {
  oraSpinnerConf,
  gitTemplates,
  installType
}
```

- utils/ask.js

```js
const inquirer = require('inquirer')
const chalk = require('chalk')
const { gitTemplates, installType } = require('../config')
const { cloneCodeFormGit } = require('./download')

// 询问用户名
const askUsername = (name) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'username',
        message: 'username:'
      }
    ])
    .then((answers) => {
      // 用户名没有填写
      if (!answers.username) {
        askUsername(name)
        return
      }
      askPassword(name, answers.username)
    })
}

// 询问用户密码
const askPassword = (name, username) => {
  inquirer
    .prompt([
      {
        type: 'password',
        name: 'password',
        message: 'password:'
      }
    ])
    .then((answers) => {
      // 密码没有填写
      if (!answers.password) {
        askPassword(name, username)
        return
      }
      // 账号错误
      if (username !== 'manyao.zhu') {
        console.log(chalk.hex('#f00').bold('Err: ') + 'Incorrect username !')
        console.log(
          chalk.magenta('You can obtain the account password at the following address：') +
            chalk.blue(
              'https://blog.csdn.net/zhumany_csdn/article/details/132872898?spm=1001.2014.3001.5501'
            )
        )
        return
      }
      // 密码错误
      if (answers.password !== '123456') {
        console.error(chalk.red('Err: ') + 'Incorrect password !')
        console.log(
          chalk.magenta('You can obtain the account password at the following address：') +
            chalk.blue(
              'https://blog.csdn.net/zhumany_csdn/article/details/132872898?spm=1001.2014.3001.5501'
            )
        )
        return
      }
      askProjectName(name)
    })
}

// 询问创建项目的基础操作信息
const askProjectName = (name) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name',
        default: name,
        transformer: function (v) {
          // 提示信息（输入的信息后缀添加(input your name)）
          return v + '(input your project Name)'
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
        default: 'Generate out of the box development projects through templates'
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port',
        default: '3434'
      },
      {
        type: 'list',
        name: 'address',
        message: 'Template Address',
        default: 'express-eje',
        choices: gitTemplates
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Installation Dependencies',
        default: true
      },
      {
        type: 'list',
        name: 'type',
        message: 'Installation Method',
        default: 'pnpm',
        choices: installType
      },
      {
        type: 'confirm',
        name: 'run',
        message: 'Automatic Operation',
        default: true
      }
    ])
    .then((answers) => {
      cloneCodeFormGit(answers)
    })
}

module.exports = {
  askUsername,
  askPassword,
  askProjectName
}
```

- utils/delete.js

```js
const fs = require('fs-extra')
const chalk = require('chalk')

// 删除文件
async function deleteFile(path) {
  try {
    return await fs.rm(path)
  } catch (err) {
    console.log(chalk.hex('#f00').bold('Err：') + err)
  }
}

// 删除文件夹
async function deleteDir(path) {
  try {
    return await fs.rm(path, { recursive: true })
  } catch (err) {
    console.log(chalk.hex('#f00').bold('Err：') + err)
  }
}

module.exports = {
  deleteFile,
  deleteDir
}
```

- utils/download.js

```js
const crossSpawn = require('cross-spawn')
const ora = require('ora')
const chalk = require('chalk')
// const { oraSpinnerConf } = require('../config')
const { deleteDir } = require('./delete')
const { rewritePackage } = require('./rewrite')

const currentPath = process.cwd().replace(/\\/g, '/') + '/'
var spinner = ora('')

// 从git仓库中拉取模板代码
const cloneCodeFormGit = (opt) => {
  startSpinner('Downloading resources (正在下载资源) ...')
  const result = crossSpawn.sync('git', ['clone', opt.address, opt.name], { stdio: 'ignore' })
  // 下载失败
  if (result.error) {
    failSpinner()
    console.log(chalk.hex('#f00').bold('Err：') + result.error)
  } else {
    successSpinner('Download successful (下载成功)')
    // 清除原有的仓库地址
    deleteDir(currentPath + opt.name + '/.git').then(() => {
      // 重写package.json
      rewritePackage(currentPath + opt.name + '/package.json', opt).then(() => {
        // 自动安装依赖
        if (opt.install) {
          // 更改node进程的当前工作目录
          process.chdir(currentPath + opt.name)
          installDependencies(opt)
        }
      })
    })
  }
}

// 使用pnpm安装依赖
const installDependencies = (opt) => {
  startSpinner('Installing dependencies (正在安装依赖) ...')
  const result = crossSpawn.sync(opt.type, ['install'], { stdio: 'ignore' })
  // 安装失败
  if (result.error) {
    failSpinner()
    console.log(chalk.hex('#f00').bold('Err：') + result.error)
  } else {
    successSpinner('Installation successful (安装成功)')
    // 自动运行
    if (opt.run) {
      runProject(opt)
    }
  }
}

// 运行项目
const runProject = (opt) => {
  startSpinner('Starting project (正在启动项目) ...')
  const result = crossSpawn.sync(opt.type, ['run', 'start'], { stdio: 'inherit' })
  // 运行失败
  if (result.error) {
    failSpinner()
    console.log(chalk.hex('#f00').bold('Err：') + result.error)
  } else {
    successSpinner()
  }
}

// loading动效的开始
async function startSpinner(title) {
  spinner.text = title
  // spinner.spinner = oraSpinnerConf
  await spinner.start()
}

// loading动效成功
const successSpinner = (title = '') => {
  spinner.stop()
  spinner.succeed(title)
}

// loading动效失败
const failSpinner = () => {
  spinner.stop()
  spinner.fail()
}

module.exports = {
  cloneCodeFormGit
}
```

- utils/rewrite.js

```js
const fs = require('fs-extra')
const chalk = require('chalk')
const bufferJson = require('buffer-json')

// 重写下载项目的package.json的相关信息
async function rewritePackage(path, opt) {
  try {
    const res = await fs.readJSON(path, { encoding: 'utf8' })

    res.name = opt.name
    res.version = opt.version
    res.description = opt.description
    if (res.scripts.dev) {
      res.scripts = Object.assign({ start: 'npm run dev' }, res.scripts, {
        dev: res.scripts.dev + ' --port ' + opt.por
      })
    }
    fs.writeJSONSync(path, res, { spaces: '\t' })
    return res
  } catch {
    console.log(chalk.red('Rewrite package.json failed!'))
  }
}

module.exports = {
  rewritePackage
}
```
