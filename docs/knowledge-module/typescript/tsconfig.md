<!--
 * @fileName:
 * @Date: 2023-03-17 10:59:46
 * @Author: manYao.zhu
-->

# tsconfig.json 配置

## tsconfig.json 的外层配置

```json
{
  "extends": "" /* 继承配置 */,
  "compileOnSave": true /* 编辑器会根据tsconfig.json的配置更新重新生成文本 */,
  "compilerOptions": {} /* 编译选项 */,
  "include": [
    "**/*.ts",
    "src/**/*.ts",
    "*.ts"
  ] /* 指定一个匹配列表，指定需要编辑的文件 */,
  "exclude": [] /* 指定一个匹配列表，指定不需要编辑的文件 */,
  "files": [] /* 也是指定需要编辑的文件，但是它与include的不同是： files只能指定文件， 不能指定文件夹 */,
  "references": [] /* 一个对象数组，指定要引用的项目 */
}
```

## 项目配置 Projects

```json
{
  "compilerOptions": {
    "incremental": true /* TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度 */,
    "composite": true /* 是否编译构建引用项目 */,
    "diagnostics": false /* 打印诊断信息 */,
    "tsBuildInfoFile": "./buildFile" /* 增量编译文件的储存位置 */
    // "disableSourceOfProjectReferenceRedirect": true,  /* 在引用复合项目时，禁用首选源文件而不是声明文件。 */
    // "disableSolutionSearching": true,   /* 编辑时，将项目从多项目引用检查中选择出来。 */
    // "disableReferencedProjectLoad": true,  /* 减少TypeScript自动加载的项目数量。 */
  }
}
```

## 语言与版本 Language and Version

```json
{
  "compilerOptions": {
    "target": "es2016" /* 目标语言的版本 */,
    "lib": [] /* 定义TS需要引入的库， 即声明文件： es5 默认引用dom、es5、scripthost */,
    "jsx": "preserve" /* 指定生成的JSX代码. */,
    "experimentalDecorators": true /* 用于指定是否启用实验性的装饰器特性 */,
    "emitDecoratorMetadata": true /* 为装饰器提供元数据的⽀持 (用于指定是否为装上去提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引用ES2015.Reflect这个库)*/,
    "jsxFactory": "" /* jsx使用的解析器 */,
    // "jsxFragmentFactory": "",   /* 指定针对React JSX发射的片段时用于片段的JSX片段引用，例如“React.Frangment”或“Fragment”。 */
    // "jsxImportSource": "",     /* 指定在使用“JSX:areact JSX*”时用于导入JSX工厂函数的模块说明符。 */
    // "reactNamespace": "",     /* 指定为“createElement”调用的对象。这仅适用于以“反应”JSX发射为目标的情况。 */
    "noLib": true /* 不包含默认的库文件（ lib.d.ts） */
    // "useDefineForClassFields": true,   /* 发出符合ECMAScript标准的类字段 */
    // "moduleDetection": "auto",   /* 控制使用什么方法来检测模块格式的JS文件 */
  }
}
```

## 模块 Modules

```json
{
  "compilerOptions": {
    "module": "commonjs" /* 控制生成代码的模板标准 */,
    "rootDir": "./" /* 指定源文件中的根文件夹。， 也就是输出文件的目录 */,
    "moduleResolution": "node" /* 模块解析策略，ts默认用node的解析策略，即相对的方式导入 */,
    "baseUrl": "./" /* 解析非相对模块的地址，他会使用baseUrl 选项作为url路径，默认是当前目录 */,
    "paths": {
      /* 路径映射,相对于baseUrl 也就是别名*/
      "~": "src/*"
    },
    "rootDirs": [] /* 根⽂件夹列表，其组合内容表示项⽬运⾏时的结构内容 */,
    "typeRoots": [] /* 声明文件目录， 默认是node_modules/@types */,
    "types": [] /* 加载的声明文件包 */,
    "allowUmdGlobalAccess": true /* 允许在模块中全局变量的方式访问umd模块 */,
    // "moduleSuffixes": [],    /* 解析模块时要搜索的文件名后缀列表 */
    "resolveJsonModule": true /* 允许导入扩展名为“.json”的模块. */,
    "noResolve": true /* 不把 /// <reference``>或模块导入的文件加到编译文件列表 */,

    /* JavaScript Support */
    "allowJs": true /* 允许编译器编译js、 jsx文件 */,
    "checkJs": true /* 允许在JS文件中报错， 通常与allowJs一起使用 */
    // "maxNodeModuleJsDepth": 1,   /* 指定用于检查“node_modules”中的JavaScript文件的最大文件夹深度。仅适用于“allowJs”。 */
  }
}
```

## 抛出 Emit

```json
{
  "compilerOptions": {
    "declaration": true /* 生成声明文件，即 .d.ts */,
    "declarationMap": true /* 为声明文件生成sourceMap */,
    "emitDeclarationOnly": false /* 只生成声明文件，不生成js文件 */,
    "sourceMap": true /* 生成目标文件的sourceMap文件 */,
    "outFile": "./" /* 将输出⽂件合并为⼀个⽂件. */,
    "outDir": "./" /* 指定输出目录 */,
    "removeComments": true /* 删除注释 */,
    "noEmit": true /* 不输出文件，即编辑后不会生成任何js文件 */,
    "importHelpers": true /* 从 tslib 导⼊辅助⼯具函数 */,
    // "importsNotUsedAsValues": "remove",   /* 为仅用于类型的导入指定发出/检查行为 */
    "downlevelIteration": true /* 降级遍历器实现,如果目标源是es3/5，那么遍历器就会降级的实现 */,
    "sourceRoot": "" /* 指定调试器应该找到 TypeScript ⽂件⽽不是源⽂件的位置 */,
    "mapRoot": "" /* 指定调试器应该找到映射⽂件⽽不是⽣成⽂件的位置 */,
    "inlineSourceMap": true /* 在js文件中会内联sourceMap 信息  */,
    "inlineSources": true /* 将代码与 sourcemaps ⽣成到⼀个⽂件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性 */,
    "emitBOM": true /* 在输出文件的开头加入BOM头（UTF-8 Byte Order Mark） */,
    "newLine": "crlf" /* 生成文件时指定行结束符： "crlf"（windows）或 "lf"（unix） */,
    // "stripInternal": true,    /* 禁用在其JSDoc注释中包含“@internal”的发出声明 */
    "noEmitHelpers": true /* 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用 */,
    "noEmitOnError": true /* 发生错误时, 不输出任何文件 */,
    // "preserveConstEnums": true,     /* 禁用擦除生成的代码中的“const enum”声明 */
    "declarationDir": "./" /* 指定生成声明文件的存放目录 */,
    // "preserveValueImports": true,   /* 在JavaScript输出中保留未使用的导入值，否则这些值将被删除 */
    "disableSizeLimit": true /* 关闭打包时对声明文件的推断类型的大小限制 */
  }
}
```

## 互操作约束 Interop Constraints

```json
{
  "compilerOptions": {
    "isolatedModules": true /* 将每个文件作为单独的模块（与“ts.transpileModule”类似）*/,
    "allowSyntheticDefaultImports": true /* 允许从没有设置默认导出的模块中默认导⼊ */,
    "esModuleInterop": true /* 通过导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性 */,
    "preserveSymlinks": true /* 不把符号链接解析为其真实路径；将符号链接文件视为真正的文件 */,
    "forceConsistentCasingInFileNames": true /* 确保进口套管正确 */
  }
}
```

## 类型检查 Type Checking

```json
{
  "compilerOptions": {
    "strict": true /* 开启所有严格的类型检查——严格模式 */,
    "noImplicitAny": true /* 不允许隐式的any类型 */,
    "strictNullChecks": true /* 不允许把null、undefined赋值给其他类型的变量 */,
    "strictFunctionTypes": true /* 不允许函数参数双向协变 */,
    "strictBindCallApply": true /* 严格的bind/call/apply检测 */,
    "strictPropertyInitialization": true /* 类的实例属性必须初始化： 建议关闭 */,
    "noImplicitThis": true /* 不允许this有隐式的any类型 */,
    // "useUnknownInCatchVariables": true,    /* 将catch子句变量默认为“unknown”，而不是“any”。 */
    "alwaysStrict": true /* 在代码中注入'use_strict'' */,
    "noUnusedLocals": true /* 检查只声明、未使用的局部变量（只提示不报错） */,
    "noUnusedParameters": true /* 检查未使用的函数参数（只提示不报错） */,
    // "exactOptionalPropertyTypes": true,     /* 将可选属性类型解释为写入的，而不是添加“未定义” */
    "noImplicitReturns": true /* 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示，默认为false */,
    "noFallthroughCasesInSwitch": true /* 防止switch语句贯穿（即如果没有break语句后面不会执行） */,
    // "noUncheckedIndexedAccess": true,     /* 当使用索引进行访问时，将“undefined”添加到类型中 */
    // "noImplicitOverride": true,          /* 确保用重写修饰符标记派生类中的重写成员 */
    // "noPropertyAccessFromIndexSignature": true,    /* 对使用索引类型声明的键强制使用索引访问器 */
    "allowUnusedLabels": true /* 报告未使用的标签错误 */,
    "allowUnreachableCode": true /* 不报告执行不到的代码错误 */
  }
}
```

## 完整性 Completeness

```json
{
  "compilerOptions": {
    // "skipDefaultLibCheck": true,    /* 跳过TypeScript中包含的.d.ts文件的类型检查 */
    "skipLibCheck": true /* 跳过对所有.d.ts文件的类型检查 */
  }
}
```
