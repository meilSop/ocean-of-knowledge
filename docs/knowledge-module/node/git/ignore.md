<!--
 * @Date: 2023-08-24 09:29:47
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-08-25 09:56:10
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\node\git\ignore.md
-->

# .gitignore 文件的作用与配置

## 该文件的作用

- 将项目中不想上传到 git 代码管理平台的文件规避掉

## 使用方法

```js
// 这里列举了一下文件，还有很多
# compiled output
/dist
/tmp
/out-tsc

# dependencies
/node_modules

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode
.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
yarn-error.log
testem.log
/typings

# System Files
.DS_Store
Thumbs.db
```

## 忽略规则文件的语法

- 忽略指定文件

```js
.vscode/settings.json
```

- 忽略指定文件夹

```js
bin/
bin/gen/
```

- 忽略.class 的所有文件

```js
*.class
```

- 忽略名称中末尾为 ignore 的文件夹

```js
*ignore/
```

- 其他文件的设置

```js
#忽略.idea文件夹及文件夹下文件
.idea

#忽略以.iml结尾的文件
*.iml

# 忽略*.o和*.a文件

 *.[oa]

# 忽略*.b和*.B文件，my.b除外

*.[bB]

!my.b

# 忽略dbg文件和dbg目录

dbg

# 只忽略dbg目录，不忽略dbg文件

dbg/

# 只忽略dbg文件，不忽略dbg目录

dbg

!dbg/

# 只忽略当前目录下的dbg文件和目录，子目录的dbg不在忽略范围内

/dbg

# 以'#'开始的行，被视为注释.

 * ？：代表任意的一个字符
    * ＊：代表任意数目的字符
    * {!ab}：必须不是此类型
    * {ab,bb,cx}：代表ab,bb,cx中任一类型即可
    * [abc]：代表a,b,c中任一字符即可
    * [ ^abc]：代表必须不是a,b,c中任一字符
```
