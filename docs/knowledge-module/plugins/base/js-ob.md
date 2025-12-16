<!--
 * @Date: 2024-01-17 16:59:53
 * @LastEditors: zhumanyao
 * @LastEditTime: 2024-01-18 16:36:18
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\plugins\base\js-ob.md
-->

# Javascript 混淆插件

## 简介

`JavaScript Obfuscator是一个免费并且功能强大的JavaScript混淆器，其中包含多种功能，可为您的源代码提供保护。`

## 主要特征

- 变量重命名
- 字符串提取和加密
- 废代码注入
- 平展控制流
- 各种代码转换

## 插件

- Webpack plugin: `webpack-obfuscator`
- Webpack loader: `obfuscator-loader`
- Gulp: `gulp-javascript-obfuscator`
- Grunt: `grunt-contrib-obfuscator`
- Rollup: `rollup-plugin-javascript-obfuscator`
- Weex: `weex-devtool`
- Malta: `malta-js-obfuscator`
- Netlify plugin: `netlify-plugin-js-obfuscator`

## 重要告知

尽量只混淆属于您的代码.

不建议对第三方脚本以及 polyfill 进行混淆处理，因为混淆后的代码要慢 15-80％（取决于选项），并且文件要大得多。

## 安装

- 使用 yarn 或者 npm 或者 pnpm

```js
yarn add --dev javascript-obfuscator
```

```js
npm install --save-dev javascript-obfuscator
```

```js
pnpm add javascript-obfuscator -D
```

- 在浏览器中使用：

```js
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js"></script>
```

- 使用本地 node_modules

```js
<script src="./node_modules/javascript-obfuscator/dist/index.browser.js"></script>
```

## 使用方法

```js
var JavaScriptObfuscator = require('javascript-obfuscator')

// 代码片段
const code = `
  (function(){
      var variable1 = '5' - 3;
      var variable2 = '5' + 3;
      var variable3 = '5' + - '2';
      var variable4 = ['10','10','10','10','10'].map(parseInt);
      var variable5 = 'foo ' + 1 + 1;
      console.log(variable1);
      console.log(variable2);
      console.log(variable3);
      console.log(variable4);
      console.log(variable5);
  })();
`

const options = {
  compact: false,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  numbersToExpressions: true,
  simplify: true,
  shuffleStringArray: true,
  splitStrings: true,
  stringArrayThreshold: 1
}

var obfuscationResult = JavaScriptObfuscator.obfuscate(code, options)

console.log(obfuscationResult.getObfuscatedCode())
```

## 方法 API

#### obfuscate(sourceCode, options)

方法带有两个参数，sourceCode 和 options - 分别是源代码和选项：

- sourceCode（字符串，默认值：null）–任何有效的源代码，以字符串形式传递；
- options（对象，默认值：null）–带有选项的对象。 (有关可用选项，请参阅选项。)

返回 ObfuscationResult 对象，该对象包含两个方法 getObfuscatedCode 以及 getSourceMap：

- getObfuscatedCode() - 返回混淆后的代码字符串；
- getSourceMap() - 如果启用了 sourceMap 选项-返回带有 SourceMap 的字符串，或者如果将 sourceMapMode 选项设置为 inline，则返回一个空字符串。

ObfuscationResult 对象调用 toString() 将返回带有混淆代码的字符串

#### obfuscateMultiple(sourceCodesObject, options)

可以处理多个源码，其中 sourceCodesObject，其键是源代码的标识符，值是源代码：

```js
{
    foo: 'var foo = 1;',
    bar: 'var bar = 2;'
}
```

返回一个映射对象，其键是源代码的标识符，值是 ObfuscationResult 对象。

#### getOptionsByPreset(optionsPreset)

输入选项预设名字，返回预设配置对象，预设名字包括：default、low-obfuscation、medium-obfuscation、high-obfuscation

## 命令行用法

#### 压缩单个文件的用法：

```js
javascript-obfuscator input_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_folder_name [options]
javascript-obfuscator input_folder_name --output output_folder_name [options]
```

带有.js 扩展名的单个输入文件的混淆。

如果未使用--output 选项指定目标路径，则混淆文件将以 INPUT_FILE_NAME-obfuscated.js 名称保存到输入文件目录中。例如：

```js

javascript-obfuscator samples/sample.js --compact true --self-defending false
// 创建新文件 samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending false
// 创建新文件 output/output.js
```

#### 整个目录递归混淆

```js
javascript-obfuscator ./dist [options]
// 在./dist目录创建一个带有obfuscated后缀的js文件

javascript-obfuscator ./dist --output ./dist/obfuscated [options]
// 在./dist/obfuscated目录下创建同样目录结构
```

输入目录下所有.js 文件的混淆。 如果此目录包含带有-obfuscated 后缀的已混淆文件-这些文件将被忽略。

## 条件注释

您可以通过添加以下注释来禁用和启用代码片段的混淆：

```js
禁用: // javascript-obfuscator:disable 或者  /* javascript-obfuscator:disable */
启用: // javascript-obfuscator:enable 或者  /* javascript-obfuscator:enable */
```

```js
// 输入
var foo = 1
// javascript-obfuscator:disable
var bar = 2

// 输出
var _0xabc123 = 0x1
var bar = 2
```

## JavaScript Obfuscator 选项

JavaScript Obfuscator 提供以下选项

```js
// 以下都是默认值
{
  compact: true,  //压缩 压缩成一行代码
  controlFlowFlattening: false,  // 是否开启平展控制流。 对性能的最大影响是降低速度的1.5倍， 但是让代码难以阅读
  controlFlowFlatteningThreshold: 0.75,  // 每个节点采用平展控制流的概率. 该参数主要用来优化大代码的性能和代码大小 [0, 1]
  deadCodeInjection: false,  // 将随机废代码块添加到混淆代码中. 该选项显著增加混淆代码的大小（最大200%）。 开启该选项将强制启用stringArray选项
  deadCodeInjectionThreshold: 0.4, // 节点加入废代码的概率，值越大，混淆代码大小越大 [0, 1]
  debugProtection: false,  // 使用该选项，几乎不可能使用开发人员工具的调试器功能（基于WebKit和Mozilla Firefox的浏览器上）
  debugProtectionInterval: false, // 如果设置为true，则会在“控制台”选项卡上使用一个间隔来强制调试模式，这使得使用开发人员工具的其他功能更加困难。 启用了debugProtection，才可以使用。
  disableConsoleOutput: false, // 通过将它们替换为空函数，禁用console.log，console.info，console.error，console.warn，console.debug，console.exception和console.trace的使用。
  domainLock: [],  // 允许仅在特定域名或子域名上运行混淆的源代码。 这使他人很难复制和粘贴您的代码在其他地方运行。
  exclude: [],  // 排除混淆代码文件，指定文件名或者globs
  forceTransformStrings: [],
  identifierNamesGenerator: 'hexadecimal', // 变量名 设置变量名称生成器，可以使用下面的值： dictionary: 变量名称来自identifiersDictionary、 hexadecimal:变量名称像 _0xabc123、 mangled: 短变量名称如： a, b, c、 mangled-shuffled: 和mangled一样，但是变量是乱序的
  identifiersDictionary: [], // identifierNamesGenerator设置为dictionary下使用，字典内的元素可以通过变换字符大小写产生不同变量名字
  identifiersPrefix: '',  // 为所有全局标识符设置前缀。 当您要混淆多个文件时，请使用此选项。 此选项有助于避免这些文件的全局标识符之间的冲突。 每个文件的前缀都应该不同。
  ignoreRequireImports: false, // 忽略混淆require和impoort，某些情况下需要静态引入，不能替换为变量
  inputFileName: '',  // 允许使用源代码设置输入文件的名称。此名称将在内部用于源映射生成。
  log: false,  // 启用将信息输出到控制台
  numbersToExpressions: false,  // 数字 允许将数字转换为表达式
  optionsPreset: 'default',  // 选项默认值名称，所有附加选项将与该名称对应的预设选项合并。  default/ low-obfuscation 、 medium-obfuscation、 high-obfuscation
  renameGlobals: false,  //  全局变量 函数名称 指定是否混淆全局变量和函数名称。
  renameProperties: false,  // 启用属性名称的重命名   所有内置的DOM属性和核心JavaScript类中的属性都将被忽略
  renamePropertiesMode: 'safe',  // 指定renameProperties选项模式： safe 、 unsafe
  reservedNames: [],  // 使用正则过滤需要混淆的变量
  reservedStrings: [], // 使用正则过滤需要混淆的字符串
  rotateStringArray: true,  // 将stringArray移动固定和随机（在代码混淆处生成）位置。这使得将删除的字符串的顺序与其原始位置进行匹配变得更加困难。
  seed: 0,  // 此选项为随机生成器设置种子。这对于创建可重复的结果很有用。  如果种子为0-随机生成器将在没有种子的情况下工作。
  selfDefending: false,  // 此选项使输出代码可阻止格式设置和变量重命名。  如果尝试在混淆后的代码上使用JavaScript美化器，则该代码将无法正常工作。
  shuffleStringArray: true, // 随机打乱stringArray数组元素，stringArray设置为true时启用
  simplify: true,  // 简化多余的代码
  sourceMap: false,  // 启用混淆代码的Sourcemap生成
  sourceMapBaseUrl: '',  // 当sourceMapMode设置为'separate'时，将URL设置为Sourcemap导入URL
  sourceMapFileName: '',
  sourceMapMode: 'separate',  // 指定源映射生成模式：
  splitStrings: false,  // 将字符串拆分字符串块。
  splitStringsChunkLength: 10,  // 设置字符串拆分区块长度
  stringArray: true,  // 删除字符串并将其放置在特殊的数组中 例如，var m =“ Hello World”中的字符串“ Hello World”; 将被替换为var m = _0x12c456 [0x1];
  stringArrayIndexesType: [
      'hexadecimal-number'
  ],
  stringArrayEncoding: [],  // 这个设置会让你的代码慢下来 使用base64或rc4对stringArray的所有字符串文字进行编码，并插入一个特殊代码，用于在运行时将其解码回来。每个stringArray值都将通过从传递列表中随机选取的编码进行编码。这使得使用多种编码成为可能。
  transformObjectKeys: false,  // 启用Object键值的转换
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  target: 'browser',
  transformObjectKeys: false,
  unicodeEscapeSequence: false   // 将字符串转换
}
```

命令行选项

```js
  -v, --version
  -h, --help

  -o, --output

  --compact <boolean>
  --config <string>
  --control-flow-flattening <boolean>
  --control-flow-flattening-threshold <number>
  --dead-code-injection <boolean>
  --dead-code-injection-threshold <number>
  --debug-protection <boolean>
  --debug-protection-interval <boolean>
  --disable-console-output <boolean>
  --domain-lock '<list>' (comma separated)
  --exclude '<list>' (comma separated)
  --force-transform-strings '<list>' (comma separated)
  --identifier-names-generator <string> [dictionary, hexadecimal, mangled, mangled-shuffled]
  --identifiers-dictionary '<list>' (comma separated)
  --identifiers-prefix <string>
  --ignore-require-imports <boolean>
  --log <boolean>
  --numbers-to-expressions <boolean>
  --options-preset <string> [default, low-obfuscation, medium-obfuscation, high-obfuscation]
  --rename-globals <boolean>
  --rename-properties <boolean>
  --rename-properties-mode <string> [safe, unsafe]
  --reserved-names '<list>' (comma separated)
  --reserved-strings '<list>' (comma separated)
  --rotate-string-array <boolean>
  --seed <string|number>
  --self-defending <boolean>
  --shuffle-string-array <boolean>
  --simplify <boolean>
  --source-map <boolean>
  --source-map-base-url <string>
  --source-map-file-name <string>
  --source-map-mode <string> [inline, separate]
  --split-strings <boolean>
  --split-strings-chunk-length <number>
  --string-array <boolean>
  --string-array-indexes-type '<list>' (comma separated) [hexadecimal-number, hexadecimal-numeric-string]
  --string-array-encoding '<list>' (comma separated) [none, base64, rc4]
  --string-array-index-shift <boolean>
  --string-array-wrappers-count <number>
  --string-array-wrappers-chained-calls <boolean>
  --string-array-wrappers-parameters-max-count <number>
  --string-array-wrappers-type <string> [variable, function]
  --string-array-threshold <number>
  --target <string> [browser, browser-no-eval, node]
  --transform-object-keys <boolean>
  --unicode-escape-sequence <boolean>
```

- compact

类型：boolean 默认值：true

压缩代码到一行

- config

类型：string 默认值：''

包含混淆器选项的 JS / JSON 配置文件。 这些将被直接传递给 CLI 的选项覆盖。

controlFlowFlattening
类型：boolean 默认值：false

是否开启平展控制流。此选项对性能的影响最大为运行速度降低 1.5 倍。 使用 controlFlowFlatteningThreshold 设置将受控制流展平影响的节点的百分比。
平展控制流是源代码的结构转换，让代码变得难以阅读。

```js
// input
;(function () {
  function foo() {
    return function () {
      var sum = 1 + 2
      console.log(1)
      console.log(2)
      console.log(3)
      console.log(4)
      console.log(5)
      console.log(6)
    }
  }

  foo()()
})()

// output
;(function () {
  function _0x3bfc5c() {
    return function () {
      var _0x3260a5 = {
        WtABe: '4|0|6|5|3|2|1',
        GokKo: function _0xf87260(_0x427a8e, _0x43354c) {
          return _0x427a8e + _0x43354c
        }
      }
      var _0x1ad4d6 = _0x3260a5['WtABe']['split']('|'),
        _0x1a7b12 = 0x0
      while (!![]) {
        switch (_0x1ad4d6[_0x1a7b12++]) {
          case '0':
            console['log'](0x1)
            continue
          case '1':
            console['log'](0x6)
            continue
          case '2':
            console['log'](0x5)
            continue
          case '3':
            console['log'](0x4)
            continue
          case '4':
            var _0x1f2f2f = _0x3260a5['GokKo'](0x1, 0x2)
            continue
          case '5':
            console['log'](0x3)
            continue
          case '6':
            console['log'](0x2)
            continue
        }
        break
      }
    }
  }

  _0x3bfc5c()()
})()
```

- controlFlowFlatteningThreshold
  类型：boolean 默认值：false 最小：0 最大：1

每个节点采用平展控制流的概率，该参数主要用来优化大代码的性能和代码大小。大量的平展控制流会是代码运行效率变差而且代码增大。

设置为 0 表示关闭平展控制流

- 类型：boolean 默认值：false

使用此选项，将随机废代码块添加到混淆代码中。

该选项显著增加混淆代码的大小（最大 200%），如果对混淆代码大小不敏感的时候启用该选项。

开启该选项将强制启用 stringArray 选项

```js
// input
;(function () {
  if (true) {
    var foo = function () {
      console.log('abc')
      console.log('cde')
      console.log('efg')
      console.log('hij')
    }

    var bar = function () {
      console.log('klm')
      console.log('nop')
      console.log('qrs')
    }

    var baz = function () {
      console.log('tuv')
      console.log('wxy')
      console.log('z')
    }

    foo()
    bar()
    baz()
  }
})()

// output
var _0x5024 = [
  'zaU',
  'log',
  'tuv',
  'wxy',
  'abc',
  'cde',
  'efg',
  'hij',
  'QhG',
  'TeI',
  'klm',
  'nop',
  'qrs',
  'bZd',
  'HMx'
]
function _0x4502(_0x1254b1, _0x583689) {
  _0x1254b1 = _0x1254b1 - 0x0
  var _0x529b49 = _0x5024[_0x1254b1]
  return _0x529b49
}
;(function () {
  if (!![]) {
    var _0x16c18d = function () {
      if (_0x4502('0x0') !== _0x4502('0x0')) {
        console[_0x4502('0x1')](_0x4502('0x2'))
        console[_0x4502('0x1')](_0x4502('0x3'))
        console[_0x4502('0x1')]('z')
      } else {
        console[_0x4502('0x1')](_0x4502('0x4'))
        console[_0x4502('0x1')](_0x4502('0x5'))
        console[_0x4502('0x1')](_0x4502('0x6'))
        console[_0x4502('0x1')](_0x4502('0x7'))
      }
    }
    var _0x1f7292 = function () {
      if (_0x4502('0x8') === _0x4502('0x9')) {
        console[_0x4502('0x1')](_0x4502('0xa'))
        console[_0x4502('0x1')](_0x4502('0xb'))
        console[_0x4502('0x1')](_0x4502('0xc'))
      } else {
        console[_0x4502('0x1')](_0x4502('0xa'))
        console[_0x4502('0x1')](_0x4502('0xb'))
        console[_0x4502('0x1')](_0x4502('0xc'))
      }
    }
    var _0x33b212 = function () {
      if (_0x4502('0xd') !== _0x4502('0xe')) {
        console[_0x4502('0x1')](_0x4502('0x2'))
        console[_0x4502('0x1')](_0x4502('0x3'))
        console[_0x4502('0x1')]('z')
      } else {
        console[_0x4502('0x1')](_0x4502('0x4'))
        console[_0x4502('0x1')](_0x4502('0x5'))
        console[_0x4502('0x1')](_0x4502('0x6'))
        console[_0x4502('0x1')](_0x4502('0x7'))
      }
    }
    _0x16c18d()
    _0x1f7292()
    _0x33b212()
  }
})()
```

- deadCodeInjectionThreshold

类型：boolean 默认值：false 最小：0 最大：1

节点加入废代码的概率，值越大，混淆代码大小越大

- debugProtection

类型：boolean 默认值：false

如果您打开开发人员工具，会冻结您的浏览器，不允许调试。

使用该选项，几乎不可能使用开发人员工具的调试器功能（基于 WebKit 和 Mozilla Firefox 的浏览器上）

- debugProtectionInterval

类型：boolean 默认值：false

如果设置为 true，则会在“控制台”选项卡上使用一个间隔来强制调试模式，这使得使用开发人员工具的其他功能更加困难。 启用了 debugProtection，才可以使用。

- disableConsoleOutput

类型：boolean 默认值：false

通过将它们替换为空函数，禁用 console.log，console.info，console.error，console.warn，console.debug，console.exception 和 console.trace 的使用。

- domainLock

类型：string[] 默认值：[]

允许仅在特定域名或子域名上运行混淆的源代码。 这使他人很难复制和粘贴您的代码在其他地方运行。

多个域名和子域名

可以将代码锁定到多个域名或子域名。 例如，要对其进行锁定，以使代码仅在www.example.com上运行，请添加www.example.com。 要使其在包括任何子域名（example.com，sub.example.com）的根域上工作，请使用.example.com

- exclude

类型：string[] 默认值：[]

排除混淆代码文件，指定文件名或者 globs

- identifierNamesGenerator

  类型：string 默认值：hexadecimal

设置变量名称生成器，可以使用下面的值：

`dictionary: 变量名称来自identifiersDictionary`

`hexadecimal:变量名称像 _0xabc123`

`mangled: 短变量名称如： a, b, c`

`mangled-shuffled: 和mangled一样，但是变量是乱序的`

- ​​​​​​​identifiersDictionary

类型：string[] 默认值：[]

identifierNamesGenerator 设置为 dictionary 下使用，字典内的元素可以通过变换字符大小写产生不同变量名字

- identifiersPrefix

类型：string 默认值：''

为所有全局标识符设置前缀。

当您要混淆多个文件时，请使用此选项。 此选项有助于避免这些文件的全局标识符之间的冲突。 每个文件的前缀都应该不同。

- ignoreRequireImports

类型：boolean 默认值：false

忽略混淆 require 和 impoort，某些情况下需要静态引入，不能替换为变量

- inputFileName

类型：string 默认值：''

允许使用源代码设置输入文件的名称。此名称将在内部用于源映射生成。

- log

类型：boolean 默认值：false

启用将信息输出到控制台

- numbersToExpressions

类型：boolean 默认值：false

允许将数字转换为表达式

```js
// input
const foo = 1234

// output
const foo = -0xd93 + -0x10b4 + 0x41 * 0x67 + 0x84e * 0x3 + -0xff8
```

- optionsPreset

类型：string 默认值：'default'

可用参数:
`default`

`low-obfuscation`

`medium-obfuscation`

`high-obfuscation`

​​​​​​​ 选项默认值名称，所有附加选项将与该名称对应的预设选项合并。

- renameGlobals

类型：boolean 默认值：false

指定是否混淆全局变量和函数名称。

```js
//input
var $ = function (id) {
  return document.getElementById(id)
}

//output

var _0x4864b0 = function (_0x5763be) {
  return document['getElementById'](_0x5763be)
}
```

- renameProperties

类型：boolean 默认值：false

启用属性名称的重命名。 所有内置的 DOM 属性和核心 JavaScript 类中的属性都将被忽略。

要在此选项的安全和不安全模式之间切换，请使用 renamePropertiesMode 选项。

要设置重命名属性名称的格式，请使用 identifierNamesGenerator 选项。

若要控制将重命名的属性，请使用 reservedNames 选项。

```js
// input
;(function () {
  const foo = {
    prop1: 1,
    prop2: 2,
    calc: function () {
      return this.prop1 + this.prop2
    }
  }

  console.log(foo.calc())
})()

// output
;(function () {
  const _0x46529b = {
    _0x10cec7: 0x1,
    _0xc1c0ca: 0x2,
    _0x4b961d: function () {
      return this['_0x10cec7'] + this['_0xc1c0ca']
    }
  }
  console['log'](_0x46529b['_0x4b961d']())
})()
```

- renamePropertiesMode

类型：string 默认值：'safe'

指定 renameProperties 选项模式：

safe - 2.11.0 版本之后的默认值。 尝试以更安全的方式重命名属性，以防止运行时错误。 使用此模式时，某些属性将从重命名中排除。

unsafe - 2.11.0 发行之前的默认值。 无限制地以不安全的方式重命名属性。

- reservedNames

类型: string[] 默认值: []

使用正则过滤需要混淆的变量。

```js
{
  reservedNames: ['^someVariable', 'functionParameter_d']
}
```

- reservedStrings

类型: string[] 默认值: []

使用正则过滤需要混淆的字符串

```js
{
  reservedStrings: ['react-native', './src/test', 'some-string_d']
}
```

- rotateStringArray

类型：boolean 默认值：true

将 stringArray 移动固定和随机（在代码混淆处生成）位置。这使得将删除的字符串的顺序与其原始位置进行匹配变得更加困难。

- seed

类型: string|number 默认值: 0

此选项为随机生成器设置种子。这对于创建可重复的结果很有用。

如果种子为 0-随机生成器将在没有种子的情况下工作。

- selfDefending

类型: boolean 默认值: false

此选项使输出代码可阻止格式设置和变量重命名。如果尝试在混淆后的代码上使用 JavaScript 美化器，则该代码将无法正常工作。

- shuffleStringArray

类型: boolean 默认值: true

随机打乱 stringArray 数组元素，stringArray 设置为 true 时启用

- simplify

类型: boolean 默认值: true

简化多余的代码

```js
// input
if (condition1) {
  const foo = 1
  const bar = 2

  console.log(foo)

  return bar
} else if (condition2) {
  console.log(1)
  console.log(2)
  console.log(3)

  return 4
} else {
  return 5
}

// output
if (condition1) {
  const foo = 0x1,
    bar = 0x2
  return console['log'](foo), bar
} else {
  return condition2 ? (console['log'](0x1), console['log'](0x2), console['log'](0x3), 0x4) : 0x5
}
```

- sourceMap

类型: boolean 默认值: false

启用混淆代码的 Sourcemap 生成

Sourcemap 可以帮助您调试混淆后的 JavaScript 源代码。 如果要在生产中进行调试，可以将单独的 Sourcemap 文件上传到某个地方，然后将浏览器指向该位置。

- sourceMapBaseUrl

类型: string 默认值: ''

当 sourceMapMode 设置为'separate'时，将 URL 设置为 Sourcemap 导入 URL

```js
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000'

结果：

//# sourceMappingURL=http://localhost:9000/example.js.map
```

- sourceMapMode

类型: string 默认值: separate

指定源映射生成模式：

inline - 在每个.js 文件的末尾添加源映射；

separate - 生成与 Sourcemap 对应的.map 文件。 如果您通过 CLI 运行混淆器-使用混淆的代码//＃sourceMappingUrl = file.js.map 将指向源映射文件的链接添加到文件的末尾

- splitStrings

类型: boolean 默认值: false

将字符串拆分字符串块。

```js
// input
;(function () {
  var test = 'abcdefg'
})()

// output
;(function () {
  var _0x5a21 = 'ab' + 'cd' + 'ef' + 'g'
})()
```

- splitStringsChunkLength

类型: number 默认值: 10

设置字符串拆分区块长度

- stringArray

类型: boolean 默认值: true

删除字符串并将其放置在特殊的数组中。 例如，var m =“ Hello World”中的字符串“ Hello World”; 将被替换为 var m = \_0x12c456 [0x1];

- stringArrayEncoding

类型: string[] 默认值: []

这个设置会让你的代码慢下来！

使用 base64 或 rc4 对 stringArray 的所有字符串文字进行编码，并插入一个特殊代码，用于在运行时将其解码回来。

每个 stringArray 值都将通过从传递列表中随机选取的编码进行编码。这使得使用多种编码成为可能。

可用的编码如下：

'none'（boolean）：不编码 stringArray 值

'base64'（string）：使用 base64 对 stringArray 值进行编码

“rc4”（字符串）：使用 rc4 对 stringArray 值进行编码。大约比 base64 慢 30-50%，但更难获得初始值。建议在使用 rc4 编码时禁用 UnicodeScapeSequence 选项，以防止出现非常大的混淆代码。

例如，使用以下选项值时，某些 stringArray 值将不进行编码，而某些值将使用 base64 和 rc4 编码进行编码：

```js
stringArrayEncoding: ['none', 'base64', 'rc4']
```

- transformObjectKeys​​​​​​​

类型: boolean 默认值: false

启用 Object 键值的转换

```js
// input
;(function () {
  var object = {
    foo: 'test1',
    bar: {
      baz: 'test2'
    }
  }
})()

// output
var _0x2fae = ['baz', 'test2', 'foo', 'test1', 'bar']
function _0x377c(_0x1fbd3f, _0x59c72f) {
  _0x1fbd3f = _0x1fbd3f - 0x0
  var _0x14fada = _0x2fae[_0x1fbd3f]
  return _0x14fada
}
;(function () {
  var _0x8a12db = {}
  _0x8a12db[_0x377c('0x0')] = _0x377c('0x1')
  var _0xc75419 = {}
  _0xc75419[_0x377c('0x2')] = _0x377c('0x3')
  _0xc75419[_0x377c('0x4')] = _0x8a12db
  var _0x191393 = _0xc75419
})()
```

## 预设值

- 重度混淆，性能低. 性能下降 50-100%

```js
{
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1,
  debugProtection: true,
  debugProtectionInterval: true,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: true,
  shuffleStringArray: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayEncoding: ['rc4'],
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 5,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 5,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 1,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
}
```

- 中度压缩，最佳性能. 性能下降 30-35%

```js
{
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: true,
  shuffleStringArray: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
}
```

- 轻度压缩，高性能. 性能略低于压缩之前

```js
{
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false,
  renameGlobals: true,  // 全局变量和函数名称
  rotateStringArray: true,
  selfDefending: true,
  shuffleStringArray: true,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false
}
```

- 默认值，高性能

```js
{
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: false,
  shuffleStringArray: true,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false
}
```
