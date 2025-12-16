<!--
 * @Date: 2024-01-19 09:41:23
 * @LastEditors: zhumanyao
 * @LastEditTime: 2024-01-25 08:56:23
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\node\style.md
-->

# 前端代码风格自动化

## 背景

代码风格和性格一样，每个程序员都有自己的特点 ，但对于大家协同开发的项目，还是需要力求代码风格的一致性，以减少 Bug，但是目前现有项目在代码提交之前，没有进行代码规则检查能够确保进入 git 库的代码都是符合代码规则的。

该形式的开发模式存在以下几个缺点：

1、javascript 相关文件规范依赖插件保提示或者格式,不能在提交前自动校验格式

2、styl 样式文件缺少编码风格规则约束，社区相关插件比较少

3、在代码提交之前，对暂存区的文件的脚本和样式文件缺少校验与格式操作且对相关提交信息缺少约束，不利于后期排查问题

综上，当前开发对脚本、样式、提交信息的风格缺少自动化校验流程，代码风格不统一，对后期的维护迭代不利

## 技术介绍

针对以上问题，在项目里引入 Husky、Commitlint、Lint-staged 及 stylelint 工程化工具进行代码风格约束，以减少 bug，确定提交到仓库的代码符合约定的语法规范并且对不符合规范的代码进行自动 fix 操作。

1. 代码提交钩子[Husky](https://www.npmjs.com/package/husky)，在代码被提交到 Git 仓库之前，我们可以在这里做一些预检查或者格式化，简单说就是使用 Git 命令会触发的函数。

2. 在有了 Husky 赋能之后，我们有能力在 Git 的钩子里做一些事情，首先不得不提的是代码的提交规范和规范的校验，优雅的提交，方便团队协作和快速定位问题，首推[Commitlint](https://www.npmjs.com/package/@commitlint/config-conventional)

3. 前端文件过滤的工具[Lint-staged](https://www.npmjs.com/package/lint-staged)，对于较大型的项目，文件众多，首先遇到的就是性能问题，虽然如 Eslint 之类的也有文件过滤配置，但毕竟还是对于匹配文件的全量遍历，如全量的.js 文件，基本达不到性能要求，有时还会误格式化其他同学的代码，因此我们引入 Lint-staged，一个仅仅过滤出 Git 代码暂存区文件(被 committed 的文件)的工具。

4. [StyleLint](https://stylelint.nodejs.cn/user-guide/rules/) 是『一个强大的、现代化的 CSS 检测工具』, 与 ESLint 类似, 是通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。

5. [ESLint](https://eslint.nodejs.cn/docs/latest/) 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

6. 再利用格式美化工具 [Prettier](https://www.npmjs.com/package/prettier) 对文件的样式进行格式化

## 具体实施

#### 使用工具

此方案主要基于 node 项目工程化的前端代码格式化的工具配置使用，主要包含以下组件：

- 代码提交钩子 Husky；

- 代码的提交规范和规范的校验，优雅的提交 Commitlint 工具；

- Git 代码暂存区文件过滤工具 Lint-staged

- stylelint 和 eslint 进行样式和 js 语法校验和修复

#### 安装依赖

```js
pnpm add husky @commitlint/conventional @commitlint/cli lint-staged stylelint stylelint-order stylelinit-config-standard eslint -D

pnpm add prettier
```

## 初始化 husky

执行以下命令， 初始化 husky, 生成.husky 文件夹

```js
npm set-script prepare "husky install"  // 创建husky prepere命令
```

```js
npm run prepare    // 初始化husky
```

```js
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"    // 添加git hooks的commit-msg钩子
```

- 注意

`Windows操作系统下进行如此命令无效，因为$1在Linux系统下shell命令里面代表参数，而Windows的cmd没有$操作符。`

- 解决方法

`此命令意思是在.hsuky目录下添加一个commit-msg文件，再对commit-msg文件写该npx命令。`

`可以先执行以下命令添加commit-msg文件`

`powershell npx husky add .husky/commit-msg`

`然后在创建的文件里面填入 npx --no -- commitlint --edit即可。`

## 创建 commitlint.config.js, GIT 提交文案校验

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      // 描述的类型
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'build', 'perf', 'ci', 'revert', 'test', 'chore']
    ],
    'type-case': [0], //  描述类型是小写字母的校验
    'type-empty': [0], // 描述类型为空的校验
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72] // 描述的总长度
  }
}
```

- package.json 的添加修改内容

```js
{
  "scripts": {
+    "prepare": 'husky install',
  },
  "husky": {
    "commit-msg": "commitlint"  // 校验提交的commit文案是否合规
  }
}
```

## 格式自动化配置 —— .prettierrc

- 安装依赖

```js
pnpm add prettirer
```

- 配置文件 .prettierrc

```js
{
  "useTabs": true,
  "tabWidth": 2,
  "bracketSpacing": true,
  "bracketSameLine": true,
  "arrowParens": "always",
  "trailingComma": "all",
  "htmlWhitespaceSensitivity": "ignore",
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "rangeStart": 0,
  "proseWrap": "always",
  "endOfLine": "auto",
  "printWidth": 120,
  "tabs": true
}
```

- 配置文件 prettier.config.js

```js
module.exports = {
  useTabs: true,
  tabWidth: 2,
  // vueIndentScriptAndStyle: true,
  // { foo: bar }
  bracketSpacing: true,
  // https://prettier.io/docs/en/options.html#bracket-line
  bracketSameLine: true,
  // 箭头函数必须有括号 (x) => x
  // https://prettier.io/docs/en/options.html#arrow-function-parentheses
  arrowParens: 'always',
  trailingComma: 'all',
  //默认false,这里选择>不另起一行
  htmlWhitespaceSensitivity: 'ignore',
  semi: false, // 是否在语句末尾打印分号
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  jsxSingleQuote: true,
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  proseWrap: 'always', // 当超出print width（上面有这个参数）时就折行
  endOfLine: 'auto', // 换行符使用 lf
  printWidth: 120, // 单行输出（不折行）的（最大）长度
  tabs: true // 使用制表符 (tab) 缩进行而不是空格 (space)。
}
```

## 格式自动化配置 —— husky 的使用

- 创建 pre-commmit 文件 (执行命令)

```js
npx husky add .husky/pre-commit
```

- 创建 提交自动化指令

```js
// package.json

{
  "scripts": {
    "precommit": "prettier --config .prettierrc --check \"src/**/*.{js,ts,css,html}\" --write",  // --write ： 除了报警之外， 将会自动格式化校验的文件内容
  }
}
```

- 在 pre-commit 文件内添加命令

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

npm run precommit // 这个一行命令是自动格式化文件内容

npm run precommit && git add -A // 使用 prettier 格式化后， 并提交格式化够的内容， 相当于又执行了 git add . & git commit -m 'fix: xxx'
```

## 格式自动化配置 —— .eslintrc.js

- 安装依赖

```js
pnpm add eslint eslint-define-config eslint-plugin-import eslint-plugin-react eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier -D
```

- 配置文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser', // 指定ESLint要使用的解析器
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 对象最后需要逗号，与格式化一致
    'comma-dangle': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 关闭有默认值或可选的参数必须放到最后
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',
    // 禁止使用 tslint:<rule-flag> 等相关注释, tslint 已经被废弃
    '@typescript-eslint/ban-tslint-comment': 'error',
    // 取消 any 限制，使用 unknown 会有无法想到的报错，部分场景需要使用 any
    // https://typescript-eslint.io/rules/no-explicit-any
    '@typescript-eslint/no-explicit-any': 'off',
    // 取消全局不能使用 require(), 针对 "*.ts", "*.tsx", "*.vue"
    '@typescript-eslint/no-var-requires': 'off',
    // 可以使用 空函数 在特殊场景需要用到 (非 async/await/generator)
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods']
      }
    ],
    // 禁止多余的 non-null 断言: a!!! => a!
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    // 禁止出现空的 interface
    '@typescript-eslint/no-empty-interface': 'warn',
    'prettier/prettier': 'error',
    semi: 1,
    quotes: [
      // 尽可能使用单引号
      'error',
      'single',
      { avoidEscape: true }
    ],
    // 除了 function 外， 变量都不能在定义之前使用
    'no-use-before-define': [
      'error',
      {
        functions: false
      }
    ],
    // 同上
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false
      }
    ],
    // 不能使用 @ts-nocheck @ts-ignore 等
    '@typescript-eslint/ban-ts-comment': 'off',
    // type 规范如 String 要 写作 string，增加 Function fix 方案
    // https://typescript-eslint.io/rules/ban-types/
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: {
            fixWith: '(...args: any[]) => any'
          },
          // {} 在 vue 中含有，取消对 {} 校验
          '{}': false
        }
      }
    ],
    // 不允许使用 ! 的非空断言, 应为此语法对 未定义与父级 null | undefined 会报错
    // https://typescript-eslint.io/rules/no-non-null-assertion/#rule-details
    '@typescript-eslint/no-non-null-assertion': 'error',
    // 更加严谨的对 function 返回类型校验, 闭包的函数
    // https://typescript-eslint.io/rules/explicit-module-boundary-types/
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        // 允许 function 参数是 any 的情况，新项目不允许
        allowArgumentsExplicitlyTypedAsAny: true,
        allowDirectConstAssertionInArrowFunctions: false
      }
    ],
    // 校验没有被使用的变量会报错，但是有函数参数名称前缀含 _ 的将被允许
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
        // varsIgnorePattern: "^_",
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
        // varsIgnorePattern: "^_",
      }
    ],
    //在 function 与 () 有个空格校验
    'space-before-function-paren': 'off',
    // 禁止使用 import * as names from './named-exports'
    'import/namespace': 'error',
    // 部分文件不会有 default 导出
    'import/default': 'off',
    // 取消针对没有解析到路径资源的报错， 与微服务路径冲突
    'import/no-unresolved': 'off',
    // 禁止 require("my-loader!./my-awesome-module");
    'import/no-webpack-loader-syntax': 'error',
    // 禁止 自己模块引入自己
    'import/no-self-import': 'error',
    // 禁止 某块循环引用
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    // https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-named-as-default.md
    // 引入的方法名，不要以引入某块一致, 解决名称重复的问题
    'import/no-named-as-default': 'error',
    // 可以直接引入依赖 eg. import 'a.scss';
    'import/no-unassigned-import': 'off',
    // import 需要些 webpackChunkName
    // import(
    //   /* webpackChunkName: "someModule" */
    //   'someModule',
    // );
    'import/dynamic-import-chunkname': [
      2,
      {
        importFunctions: ['dynamicImport'],
        webpackChunknameFormat: '[a-zA-Z0-57-9-/_\\[\\]]+'
      }
    ],
    // import 语句需要放到模块的最上方
    'import/first': 'error',
    // 不要用多个 import 引入同一模块
    'import/no-duplicates': 'error',
    // 不允许 export 匿名的 Function Class Literal, 可以 Object & Array
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowLiteral: false,
        allowObject: true,
        allowArray: true
      }
    ],
    'no-unreachable': false,
    // 定义的属性没有被用到
    'no-unused-vars': 'off',
    // 参数的逗号之后需要有空格
    'comma-spacing': ['error', { before: false, after: true }]
  }
}
```

- 配置过滤检测 .eslintignore

```js
node_modules
```

## 格式自动化配置 —— husky 的使用

- 创建 pre-commmit 文件 (执行命令)

```js
npx husky add .husky/pre-commit
```

- 创建 提交自动化指令

```js
// package.json

{
  "scripts": {
    "eslint:check": "eslint src/*.{js,ts,css,html,vue} --fix"  // fix： 自动修复eslint
  }
}
```

- 在 pre-commit 文件内添加命令

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

npm run eslint:check // 这个一行命令是自动格式化文件内容

npm run eslint:check && git add -A // 使用 selint 格式化后， 并提交格式化够的内容， 相当于又执行了 git add . & git commit -m 'fix: xxx'
```

## 格式自动化配置 —— lint-staged

- 安装依赖

```js
npm i lint-staged -D
```

- 在 package.json 新增 lint-staged 选项

```js
{
  "scripts": {
    ...
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "eslint --fix",
      "prettier --write --ignore-unknown"
    ]
  },
}
```

- 在 pre-commit 文件中添加命令

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
# 注释
# npm run prettier:check && git add -A .
# 注释
# npm run eslint:check
# 新增
npx lint-staged
```

## 项目内部的 setting.json 的配置

```json
{
  "editor.fontLigatures": true,
  "files.autoGuessEncoding": true,
  "editor.linkedEditing": true,
  "editor.fontSize": 16,
  "npm.enableRunFromFolder": true,
  "typescript.suggest.completeFunctionCalls": true,
  "javascript.suggest.completeFunctionCalls": true,
  "open-in-browser.default": "Chrome",
  "gitlens.hovers.currentLine.over": "line",
  "workbench.editor.enablePreview": false,
  "editor.formatOnType": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "workbench.startupEditor": "newUntitledFile",
  // 代码格式化
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  // 添加 vue 支持
  "eslint.validate": ["javascript", "javascriptreact"],
  //  #去掉代码结尾的分号
  "prettier.semi": false,
  //  #使用带引号替代双引号
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "vue.codeActions.enabled": false,
  "git.confirmSync": false,
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.semanticTokenColorCustomizations": {
    "[Default Dark+]": {
      "rules": {
        "property.mandatory:xml": {
          "bold": true
        },
        "string.i18n:xml": {
          "italic": true
        }
      }
    },
    "[Default Light+]": {
      "rules": {
        "property.mandatory:xml": {
          "bold": true
        },
        "string.i18n:xml": {
          "italic": true
        }
      }
    },
    "[Default High Contrast]": {
      "rules": {
        "property.mandatory:xml": {
          "bold": true
        },
        "string.i18n:xml": {
          "italic": true
        }
      }
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
