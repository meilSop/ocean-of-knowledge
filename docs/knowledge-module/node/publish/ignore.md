# npm 发布过滤部分文件

## 使用.gitignore 设置忽略文件

- .gitignore 设置的忽略文件，在 git 代码管理和 npm publish 都会被忽略

## 使用 .npmignore 设置忽略文件

- .npmignore 的写法跟 .gitignore 的规则完全一样， 若同时使用 .npmignore 和 .npmignore 时， .npmignore 会生效，优先级比较高

## 使用 package.json 的 files 字段选择发布那些文件

- 直接在 package.json 中 files 字段设置发布哪些文件或目录。这个优先级高于 .npmignore 和 .gitignore。

## npm publish 默认的忽略规则

- 默认被忽略

```js
.*.swp

._*

.DS_Store

.git

.hg

.npmrc

.lock-wscript

.svn

.wafpickle-*

config.gypi

CVS

npm-debug.log

node_modules/
```

- 默认被包含、即使设置忽略也无效

```js
package.json

README (and its variants)

CHANGELOG (and its variants)

LICENSE / LICENCE
```
