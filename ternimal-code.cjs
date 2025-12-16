/*
 * @Date: 2024-01-05 19:25:24
 * @LastEditors: zhumanyao
 * @LastEditTime: 2024-01-18 09:53:54
 * @FilePath: \ocean-of-knowledge\ternimal-code.cjs
 */
const shelljs = require('shelljs')

// 将上一步的输出日志，进行清除 [展示出来之后在进行清除]
const clear = () => {
  // 解析下方代码含义
  // process.stdout.write()   // 标准输出, 将内容输出到控制台上
  // 逃脱序列定义
  // Buffer.from('1b5b3141', 'hex').toString()   //  清理当前行, [from() 的参数就是固定的这个两个值]
  // Buffer.from('1b5b3130303044', 'hex').toString();  // 移动到当前行最左边
  // Buffer.from('1b5b304b', 'hex').toString()  // 向上移动一行
  process.stdout.write(Buffer.from('1b5b3141', 'hex').toString());
}

const check = (type) => {
  if (!shelljs.which(type)) {
    shelljs.echo('Sorry, this javascript need ' + type + ', you should install and configuration it')
    shelljs.exit(1)
  }
}

// 安装依赖
const installModule = () => {
  check('node')
  if (shelljs.which('pnpm')) {
    shelljs.exec('pnpm i', { async: true })
  } else if (shelljs.which('yarn')) {
    shelljs.exec('yarn', { async: true })
  } else {
    shelljs.exec('npm i', { async: true })
  }
}

// 提交代码
const pushCode = () => {
  check('git')
  shelljs.exec('git add .')
  clear()
  shelljs.exec('git commit -m "feat: 添加新的功能点"')
  clear()
  shelljs.exec('git push origin master')
}

const mode = process.argv[2]

if (mode === 'install') {
  installModule()
}

if (mode === 'push') {
  pushCode()
}